import { Liquid } from 'liquidjs';

import {
    convertNumberToAlpha,
    convertNumberToAustrianPhonetic,
    convertNumberToGermanPhonetic,
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
} from 'typings/modules/nameSchema';

const argsToOptions = (args: unknown[], keys: string[]) => {
    const allElementsAreArrays = args.every(Array.isArray);

    if (allElementsAreArrays) return Object.fromEntries(args);

    return Object.fromEntries(args.map((arg, i) => [keys[i], arg]));
};

export default class TemplateHelper {
    private buildingAliases: AliasedInternalBuilding[] = [];
    private buildingTypeTemplates: {
        enabled: boolean;
        value: { type: string; template: string }[];
    } = { enabled: false, value: [] };
    private defaultBuildingTemplate: string = '';
    private defaultVehicleTemplate: string = '';
    private vehicleTypeAliases: AliasedInternalVehicle[] = [];
    private vehicleTypeTemplates: {
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
        this.engine.registerFilter(
            'german-phonetic',
            convertNumberToGermanPhonetic
        );
        this.engine.registerFilter(
            'austrian-phonetic',
            convertNumberToAustrianPhonetic
        );
        this.engine.registerFilter('index', {
            handler: (input: unknown, ...args: unknown[]) => {
                let options: {
                    padding: number;
                    start: number;
                    groupBy?: string;
                } = {
                    padding: 1,
                    start: 1,
                };

                if (this.isInputVehicle(input)) {
                    options = {
                        ...options,
                        groupBy: 'buildingVehicleType',
                        ...argsToOptions(args, ['padding', 'start', 'groupBy']),
                    };

                    const building =
                        this.moduleParameters.LSSM.$stores.api.buildingsById[
                            input.building_id
                        ];

                    return this.numberVehicle(building, input, options);
                } else if (this.isInputBuilding(input)) {
                    // default grouping for buildings is by type and dispatch center, except for dispatch centers which are grouped by building type
                    options = {
                        ...options,
                        groupBy:
                            input.building_type === 7
                                ? 'buildingType'
                                : 'dispatchBuildingType',
                        ...argsToOptions(args, ['padding', 'start', 'groupBy']),
                    };

                    return this.numberBuilding(input, options);
                } else if ((input ?? null) !== null) {
                    throw new Error(
                        'Invalid input, expected vehicle or building for index filter'
                    );
                }
            },
            raw: true,
        });
    }

    public async init() {
        const { LSSM, MODULE_ID } = this.moduleParameters;

        // get the default vehicle template
        this.defaultVehicleTemplate =
            await LSSM.$stores.settings.getSetting<string>({
                moduleId: MODULE_ID,
                settingId: 'defaultVehicleTemplate',
                defaultValue: '',
            });

        // get the default vehicle template
        this.defaultBuildingTemplate =
            await LSSM.$stores.settings.getSetting<string>({
                moduleId: MODULE_ID,
                settingId: 'defaultBuildingTemplate',
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
        ).map(([id, internalBuilding]) => {
            let alias = internalBuilding.caption;

            if (buildingAliasesSetting.enabled) {
                alias =
                    buildingAliasesSetting.value.find(({ type: t }) => t === id)
                        ?.alias ?? internalBuilding.caption;
            }

            return {
                id: Number(id),
                ...internalBuilding,
                alias,
                type: LSSM.$stores.translations.buildings[Number(id)].caption,
            };
        });

        const vehicleAliasesSetting = await LSSM.$stores.settings.getSetting<{
            enabled: boolean;
            value: { type: string; alias: string }[];
        }>({
            moduleId: MODULE_ID,
            settingId: 'vehicleAliases',
            defaultValue: {
                enabled: false,
                value: [],
            },
        });

        this.vehicleTypeAliases = Object.entries(
            LSSM.$stores.translations.vehicles
        ).map(([id, internalVehicle]) => {
            let alias = internalVehicle.caption;

            if (vehicleAliasesSetting.enabled) {
                alias =
                    vehicleAliasesSetting.value.find(({ type: t }) => t === id)
                        ?.alias ?? internalVehicle.caption;
            }

            return {
                id: Number(id),
                ...internalVehicle,
                alias,
                type: LSSM.$stores.translations.vehicles[Number(id)].caption,
            };
        });

        // get the user-defined vehicle-type templates
        this.vehicleTypeTemplates = await LSSM.$stores.settings.getSetting<{
            enabled: boolean;
            value: { type: string; template: string }[];
        }>({
            moduleId: MODULE_ID,
            settingId: 'vehicleTemplates',
            defaultValue: {
                enabled: false,
                value: [],
            },
        });

        // get the user-defined building-type templates
        this.buildingTypeTemplates = await LSSM.$stores.settings.getSetting<{
            enabled: boolean;
            value: { type: string; template: string }[];
        }>({
            moduleId: MODULE_ID,
            settingId: 'buildingTemplates',
            defaultValue: {
                enabled: false,
                value: [],
            },
        });
    }

    public getNewVehicleName(building: Building, vehicle: Vehicle) {
        // get the specific template for this vehicle type or use the default template
        let vehicleTemplate = this.defaultVehicleTemplate;
        if (this.vehicleTypeTemplates.enabled) {
            vehicleTemplate =
                this.vehicleTypeTemplates.value.find(
                    ({ type }) => Number(type) === vehicle.vehicle_type
                )?.template ?? this.defaultVehicleTemplate;
        }
        const aliasedBuilding = this.getAliasedBuilding(building);
        const aliasedVehicle = this.getAliasedVehicle(vehicle);

        return this.render(vehicleTemplate, {
            building: aliasedBuilding,
            vehicle: aliasedVehicle,
        }).replace(/\s{2,}/u, ' ');
    }

    public getNewBuildingName(building: Building) {
        // get the specific template for this vehicle type or use the default template
        let vehicleTemplate = this.defaultBuildingTemplate;
        if (this.buildingTypeTemplates.enabled) {
            vehicleTemplate =
                this.buildingTypeTemplates.value.find(
                    ({ type }) => Number(type) === building.building_type
                )?.template ?? this.defaultBuildingTemplate;
        }

        const buildingAlias = this.buildingAliases.find(
            a => a.id === building.building_type
        );

        return this.render(vehicleTemplate, {
            building: {
                ...building,
                alias:
                    buildingAlias?.alias ??
                    buildingAlias?.caption ??
                    building.caption,
            } as AliasedBuilding,
        }).replace(/\s{2,}/u, ' ');
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
            building,
            vehicle,
            dispatch: building.leitstelle_building_id
                ? this.getAliasedBuilding(
                      LSSM.$stores.api.buildingsById[
                          building.leitstelle_building_id
                      ]
                  )
                : null,
        };

        return this.engine.parseAndRenderSync(template, replacementVariables);
    }

    private isInputVehicle(input: unknown): input is Vehicle {
        return (
            !!input &&
            input.hasOwnProperty('id') &&
            input.hasOwnProperty('vehicle_type')
        );
    }
    private isInputBuilding(input: unknown): input is Building {
        return (
            !!input &&
            input.hasOwnProperty('id') &&
            input.hasOwnProperty('building_type')
        );
    }

    private numberVehicle(
        building: Building,
        vehicle: Vehicle,
        params: {
            padding: number;
            start: number;
            groupBy?: string;
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
            params.groupBy === 'dispatchVehicleType' &&
            building.leitstelle_building_id
        ) {
            vehiclesInGroup = api.vehiclesByDispatchCenter[
                building.leitstelle_building_id
            ].filter(v => v.vehicle_type === vehicle.vehicle_type);
        } else if (params.groupBy === 'vehicleType') {
            vehiclesInGroup = api.vehicles.filter(
                v => v.vehicle_type === vehicle.vehicle_type
            );
        } else if (params.groupBy === 'buildingVehicleType') {
            vehiclesInGroup = api.vehiclesByBuilding[building.id].filter(
                v => v.vehicle_type === vehicle.vehicle_type
            );
        } else if (!params.groupBy || params.groupBy === 'none') {
            vehiclesInGroup = api.vehicles;
        }

        // sort ascending by id to have a stable order
        vehiclesInGroup.sort((a, b) => a.id - b.id);

        const vehicleIndex =
            vehiclesInGroup.findIndex(v => v.id === vehicle.id) +
            params.start -
            1;

        // arabic with optional padding
        return (vehicleIndex + 1).toString().padStart(params.padding, '0');
    }
    private numberBuilding(
        building: Building,
        params: {
            padding: number;
            start: number;
            groupBy?: string;
        }
    ): string {
        const api: ReturnType<typeof defineAPIStore> =
            this.moduleParameters.LSSM.$stores.api;

        let buildingsInGroup: Building[] = api.buildings;

        if (params.groupBy === 'dispatch' && building.leitstelle_building_id) {
            buildingsInGroup =
                api.buildingsByDispatchCenter[building.leitstelle_building_id];
        } else if (
            params.groupBy === 'dispatchBuildingType' &&
            building.leitstelle_building_id
        ) {
            buildingsInGroup = api.buildingsByDispatchCenter[
                building.leitstelle_building_id
            ].filter(b => b.building_type === building.building_type);
        } else if (params.groupBy === 'buildingType') {
            buildingsInGroup = api.buildings.filter(
                b => b.building_type === building.building_type
            );
        }

        // sort ascending by id to have a stable order
        buildingsInGroup.sort((a, b) => a.id - b.id);

        const buildingIndex =
            buildingsInGroup.findIndex(b => b.id === building.id) +
            params.start -
            1;

        // arabic with optional padding
        return (buildingIndex + 1).toString().padStart(params.padding, '0');
    }

    private getAliasedBuilding(building: Building): AliasedBuilding {
        const buildingAlias = this.buildingAliases.find(
            a => a.id === building.building_type
        );

        return {
            ...building,
            alias:
                buildingAlias?.alias ??
                buildingAlias?.caption ??
                building.caption,
            type: this.moduleParameters.LSSM.$stores.translations.buildings[
                building.building_type
            ].caption,
        };
    }

    private getAliasedVehicle(vehicle: Vehicle): AliasedVehicle {
        const vehicleAlias = this.vehicleTypeAliases.find(
            a => a.id === vehicle.vehicle_type
        );

        return {
            ...vehicle,
            alias:
                vehicleAlias?.alias ?? vehicleAlias?.caption ?? vehicle.caption,
            type: this.moduleParameters.LSSM.$stores.translations.vehicles[
                vehicle.vehicle_type
            ].caption,
        };
    }
}
