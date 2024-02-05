import { Liquid } from 'liquidjs';

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

const argsToOptions = (args: unknown[], keys: string[]) => {
    const allElementsAreArrays = args.every(Array.isArray);

    if (allElementsAreArrays) return Object.fromEntries(args);

    return Object.fromEntries(args.map((arg, i) => [keys[i], arg]));
};

export default class TemplateHelper {
    private defaultUnitTemplate: string = '';
    private buildingAliases: AliasedInternalBuilding[] = [];
    private unitTypeAliases: AliasedInternalVehicle[] = [];
    private unitTypeTemplates: {
        enabled: boolean;
        value: { type: string; template: string }[];
    } = { enabled: false, value: [] };
    private engine = new Liquid({
        cache: true,

        // remove duplicate whitespace
        greedy: true,

        // disable filesystem access
        dynamicPartials: false,
        relativeReference: false,
        fs: {
            existsSync: () => false,
            exists: () => Promise.resolve(false),
            readFile: () => Promise.resolve(''),
            readFileSync: () => '',
            resolve: () => '',
            contains: () => false,
            fallback: () => undefined,
        },
    });

    constructor(
        private readonly moduleParameters: Parameters<ModuleMainFunction>[0]
    ) {
        this.engine.registerFilter('roman', convertNumberToRoman);
        this.engine.registerFilter('alpha', convertNumberToAlpha);
        this.engine.registerFilter('greek', convertNumberToGreek);
        this.engine.registerFilter('icao', convertNumberToICAOAlpha);
        this.engine.registerFilter('emoji', convertStringNumberToEmoji);
        this.engine.registerFilter('index', {
            handler: (input: unknown, ...args: unknown[]) => {
                const options = {
                    padding: 1,
                    start: 1,
                    groupBy: 'buildingUnitType',
                    ...argsToOptions(args, ['padding', 'start', 'groupBy']),
                };

                if (this.isInputVehicle(input)) {
                    const building =
                        this.moduleParameters.LSSM.$stores.api.buildingsById[
                            input.building_id
                        ];

                    return this.numberUnit(building, input, options);
                } else {
                    throw new Error('Numbering buildings is not yet supported');
                }
            },
            raw: true,
        });
    }

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

        return this.render(unitTemplate, {
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

    private render(
        template: string,
        {
            building,
            vehicle,
        }: { building: AliasedBuilding; vehicle?: AliasedVehicle }
    ): string {
        const { LSSM } = this.moduleParameters;
        const replacementVariables: Record<string, unknown> = {
            building: {
                ...building,
                type: LSSM.$stores.translations.buildings[
                    building.building_type
                ].caption,
            },
        };

        // if a vehicle is given, add the vehicle-specific replacement variables
        if (vehicle) {
            replacementVariables['vehicle'] = {
                ...vehicle,
                type: LSSM.$stores.translations.vehicles[vehicle.vehicle_type]
                    .caption,
            };
        }

        return this.engine.parseAndRenderSync(template, replacementVariables);
    }

    private isInputVehicle(input: unknown): input is Vehicle {
        return (
            !!input &&
            input.hasOwnProperty('id') &&
            input.hasOwnProperty('vehicle_type')
        );
    }

    private numberUnit(
        building: Building,
        vehicle: Vehicle,
        params: {
            padding: number;
            start: number;
            groupBy: string;
        }
    ): string {
        const api: ReturnType<typeof defineAPIStore> =
            this.moduleParameters.LSSM.$stores.api;

        let vehiclesInGroup: Vehicle[] = [];

        if (params.groupBy === 'building') {
            vehiclesInGroup = api.vehiclesByBuilding[building.id];
        } else if (
            params.groupBy === 'dispatch' &&
            building.leitstelle_building_id
        ) {
            vehiclesInGroup =
                api.vehiclesByDispatchCenter[building.leitstelle_building_id];
        } else if (
            params.groupBy === 'dispatchUnitType' &&
            building.leitstelle_building_id
        ) {
            vehiclesInGroup = api.vehiclesByDispatchCenter[
                building.leitstelle_building_id
            ].filter(v => v.vehicle_type === vehicle.vehicle_type);
        } else if (params.groupBy === 'unitType') {
            vehiclesInGroup = api.vehicles.filter(
                v => v.vehicle_type === vehicle.vehicle_type
            );
        } else if (params.groupBy === 'buildingUnitType') {
            vehiclesInGroup = api.vehiclesByBuilding[building.id].filter(
                v => v.vehicle_type === vehicle.vehicle_type
            );
        } else if (params.groupBy === 'none') {
            vehiclesInGroup = api.vehicles;
        }

        // sort ascending by id to have a stable order
        vehiclesInGroup.sort((a, b) => a.id - b.id);

        const vehicleIndex =
            vehiclesInGroup.findIndex(v => v.id === vehicle.id) +
            params.start -
            1;

        const padStringLeft = (
            str: string,
            length: number,
            pad: string = '0'
        ) => {
            return (pad.repeat(length) + str).slice(
                Math.max(length, str.length) * -1
            );
        };

        // arabic with optional padding
        return padStringLeft((vehicleIndex + 1).toString(), params.padding);
    }
}
