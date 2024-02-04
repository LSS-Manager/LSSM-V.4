import {
    convertNumberToAlpha,
    convertNumberToGreek,
    convertNumberToICAOAlpha,
    convertNumberToRoman,
    convertStringNumberToEmoji,
} from './numeral';

import type { Building } from 'typings/Building';
import type { defineAPIStore } from '@stores/api';
import type { ModuleMainFunction } from 'typings/Module';
import type { Vehicle } from 'typings/Vehicle';
import type {
    AliasedBuilding,
    AliasedInternalBuilding,
    AliasedInternalVehicle,
    AliasedVehicle,
} from './types';

const unitIndexMatcher =
    /\{\{\s*unitIndex(?::(?<padding>\d+)?(?::(?<start>\d+)?(?::(?<system>(?:alpha|arabic|emoji|greek|icao|roman)(?:-(?:lower|upper)(?:case)?)?)?(?::(?<group>building|buildingUnitType|dispatch|dispatchUnitType|none|unitType)?)?)?)?)?\s*\}\}/gu;

export default class TemplateHelper {
    private defaultUnitTemplate: string = '';
    private buildingAliases: AliasedInternalBuilding[] = [];
    private unitTypeAliases: AliasedInternalVehicle[] = [];
    private unitTypeTemplates: {
        enabled: boolean;
        value: { type: string; template: string }[];
    } = { enabled: false, value: [] };

    constructor(
        private readonly moduleParameters: Parameters<ModuleMainFunction>[0]
    ) {}

    public async init() {
        const { LSSM, MODULE_ID } = this.moduleParameters;

        // get the default unit template
        this.defaultUnitTemplate =
            await LSSM.$stores.settings.getSetting<string>({
                moduleId: MODULE_ID,
                settingId: 'defaultUnitTemplate',
                defaultValue: '',
            });

        const buildingAliasesSetting = await LSSM.$stores.settings.getSetting<{
            enabled: boolean;
            value: { type: string; alias: string }[];
        }>({
            moduleId: MODULE_ID,
            settingId: 'buildingAliases',
            defaultValue: {
                enabled: false,
                value: [],
            },
        });

        // construct alias tables by loading the default aliases and replacing them with the user-defined aliases
        this.buildingAliases = Object.entries(
            LSSM.$stores.translations.buildings
        ).map(([id, type]) => {
            let alias = type.caption;

            if (buildingAliasesSetting.enabled) {
                alias =
                    buildingAliasesSetting.value.find(({ type: t }) => t === id)
                        ?.alias ?? type.caption;
            }

            return {
                id: Number(id),
                ...type,
                alias,
            };
        });

        const unitAliasesSetting = await LSSM.$stores.settings.getSetting<{
            enabled: boolean;
            value: { type: string; alias: string }[];
        }>({
            moduleId: MODULE_ID,
            settingId: 'unitAliases',
            defaultValue: {
                enabled: false,
                value: [],
            },
        });

        this.unitTypeAliases = Object.entries(
            LSSM.$stores.translations.vehicles
        ).map(([id, type]) => {
            let alias = type.caption;

            if (unitAliasesSetting.enabled) {
                alias =
                    unitAliasesSetting.value.find(({ type: t }) => t === id)
                        ?.alias ?? type.caption;
            }

            return {
                id: Number(id),
                ...type,
                alias,
            };
        });

        // get the user-defined unit-type templates
        this.unitTypeTemplates = await LSSM.$stores.settings.getSetting<{
            enabled: boolean;
            value: { type: string; template: string }[];
        }>({
            moduleId: MODULE_ID,
            settingId: 'unitTemplates',
            defaultValue: {
                enabled: false,
                value: [],
            },
        });
    }

    public getNewUnitName(building: Building, vehicle: Vehicle) {
        // get the specific template for this unit type or use the default template
        let unitTemplate = this.defaultUnitTemplate;
        if (this.unitTypeTemplates.enabled) {
            unitTemplate =
                this.unitTypeTemplates.value.find(
                    ({ type }) => Number(type) === vehicle.vehicle_type
                )?.template ?? this.defaultUnitTemplate;
        }

        const buildingAlias = this.buildingAliases.find(
            a => a.id === building.building_type
        );
        const unitAlias = this.unitTypeAliases.find(
            a => a.id === vehicle.vehicle_type
        );

        return this.fillTemplate(unitTemplate, {
            building: {
                ...building,
                alias:
                    buildingAlias?.alias ??
                    buildingAlias?.caption ??
                    building.caption,
            } as AliasedBuilding,
            vehicle: {
                ...vehicle,
                alias:
                    unitAlias?.alias ?? unitAlias?.caption ?? vehicle.caption,
            } as AliasedVehicle,
        });
    }

    private fillTemplate(
        template: string,
        {
            building,
            vehicle,
        }: { building: AliasedBuilding; vehicle?: AliasedVehicle }
    ): string {
        const { LSSM } = this.moduleParameters;
        let result = template;

        const replacementVariables: Map<
            RegExp | string,
            string | ((substring: string) => string)
        > = new Map();

        // construct the replacement variables
        replacementVariables.set('buildingId', String(building.id));
        replacementVariables.set(
            'buildingType',
            LSSM.$stores.translations.buildings[building.building_type].caption
        );
        replacementVariables.set('buildingAlias', building.alias);

        // if a vehicle is given, add the vehicle-specific replacement variables
        if (vehicle) {
            replacementVariables.set('buildingCaption', building.caption);

            replacementVariables.set('unitId', String(vehicle.id));
            replacementVariables.set(
                'unitType',
                LSSM.$stores.translations.vehicles[vehicle.vehicle_type].caption
            );
            replacementVariables.set(
                'unitTypeCustom',
                vehicle.vehicle_type_caption ?? ''
            );
            replacementVariables.set('unitAlias', vehicle.alias);
            replacementVariables.set(unitIndexMatcher, matchedString => {
                const match = unitIndexMatcher.exec(matchedString);
                // reset regex
                unitIndexMatcher.lastIndex = 0;

                return this.numberUnit(building, vehicle, {
                    padding: Number(match?.groups?.padding ?? 0),
                    start: Number(match?.groups?.start ?? 1),
                    system: match?.groups?.system ?? 'arabic',
                    group: match?.groups?.group ?? 'building',
                });
            });
        }

        replacementVariables.forEach((replacement, key) => {
            const search =
                typeof key === 'string'
                    ? new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'gu')
                    : key;

            // typescript type quirk
            if (typeof replacement === 'function')
                result = result.replace(search, replacement);
            else result = result.replace(search, replacement);
        });

        return result;
    }

    private numberUnit(
        building: AliasedBuilding,
        vehicle: Vehicle,
        params: {
            padding: number;
            system: string;
            start: number;
            group: string;
        }
    ): string {
        const api: ReturnType<typeof defineAPIStore> =
            this.moduleParameters.LSSM.$stores.api;

        let vehiclesInGroup: Vehicle[] = [];

        if (params.group === 'building') {
            vehiclesInGroup = api.vehiclesByBuilding[building.id];
        } else if (
            params.group === 'dispatch' &&
            building.leitstelle_building_id
        ) {
            vehiclesInGroup =
                api.vehiclesByDispatchCenter[building.leitstelle_building_id];
        } else if (
            params.group === 'dispatchUnitType' &&
            building.leitstelle_building_id
        ) {
            vehiclesInGroup = api.vehiclesByDispatchCenter[
                building.leitstelle_building_id
            ].filter(v => v.vehicle_type === vehicle.vehicle_type);
        } else if (params.group === 'unitType') {
            vehiclesInGroup = api.vehicles.filter(
                v => v.vehicle_type === vehicle.vehicle_type
            );
        } else if (params.group === 'buildingUnitType') {
            vehiclesInGroup = api.vehiclesByBuilding[building.id].filter(
                v => v.vehicle_type === vehicle.vehicle_type
            );
        } else if (params.group === 'none') {
            vehiclesInGroup = api.vehicles;
        }

        // sort ascending by id to have a stable order
        vehiclesInGroup.sort((a, b) => a.id - b.id);

        const vehicleIndex =
            vehiclesInGroup.findIndex(v => v.id === vehicle.id) +
            params.start -
            1;

        const modifier = params.system.match(/^-(lower|upper)(?:case)?$/u)?.[1];
        const modifierFn = (str: string) => {
            if (modifier === 'lower') return str.toLowerCase();
            if (modifier === 'upper') return str.toUpperCase();
            return str;
        };

        const padStringLeft = (
            str: string,
            length: number,
            pad: string = '0'
        ) => {
            return (pad.repeat(length) + str).slice(
                Math.max(length, str.length) * -1
            );
        };

        switch (params.system) {
            case 'alpha':
                return modifierFn(convertNumberToAlpha(vehicleIndex + 1));
            case 'roman':
                return modifierFn(convertNumberToRoman(vehicleIndex));
            case 'icao':
                return modifierFn(convertNumberToICAOAlpha(vehicleIndex));
            case 'greek':
                return modifierFn(convertNumberToGreek(vehicleIndex));
            case 'emoji':
                return convertStringNumberToEmoji(
                    padStringLeft((vehicleIndex + 1).toString(), params.padding)
                );

            // arabic with optional padding
            default:
                return padStringLeft(
                    (vehicleIndex + 1).toString(),
                    params.padding
                );
        }
    }
}
