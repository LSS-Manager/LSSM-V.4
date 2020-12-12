<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <b>
                    {{ $sm('buildings.title') }}:
                    {{
                        Object.values(buildings)
                            .reduce((a, b) => (a += b.length), 0)
                            .toLocaleString()
                    }}
                </b>
                <span class="glyphicon glyphicon-info-sign tip-btn"></span>
                <div class="alert alert-info">
                    {{ $sm('buildings.tip') }}
                </div>
                <b>
                    {{ $sm('buildings.personal_count') }}:
                    {{ personalCount.toLocaleString() }}
                </b>
                <label class="pull-right">
                    <input
                        type="checkbox"
                        @change="changeBuildingChart"
                        v-model="buildingsAsColumn"
                    />
                    {{ $sm('buildings.columnchart') }}
                </label>
            </div>
            <div class="panel-body">
                <div :id="buildingsId" style="max-height: 400px"></div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <b>
                    {{ $sm('vehicles.title') }}:
                    {{
                        Object.values(vehicles)
                            .reduce((a, b) => a + b.length, 0)
                            .toLocaleString()
                    }}
                </b>
                <span class="glyphicon glyphicon-info-sign tip-btn"></span>
                <div class="alert alert-info">
                    {{ $sm('vehicles.tip') }}
                </div>
            </div>
            <div class="panel-body sunburst-grid">
                <div
                    v-for="(_, category) in vehicleCategories"
                    :key="category"
                    class="sunburst-chart"
                    :id="`${vehiclesId}_${category}`"
                    :style="
                        `flex: 1 0 min(100%, max(250px, calc(100%/${
                            Object.keys(vehicleCategories).length
                        })))`
                    "
                >
                    <div class="alert alert-danger">
                        {{
                            $t(
                                'modules.dashboard.chart-summaries.vehicles.empty',
                                { category }
                            )
                        }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Highcharts, {
    DrilldownOptions,
    Options,
    SeriesSunburstOptions,
    PointOptionsObject,
} from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import HighchartsSunburst from 'highcharts/modules/sunburst';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
import { TranslateResult } from 'vue-i18n';
import { DefaultProps } from 'vue/types/options';
import {
    ChartSummary,
    ChartSummaryMethods,
    ChartSummaryComputed,
} from '../../../../typings/modules/Dashboard/ChartSummary';
import {
    Building,
    BuildingCategory,
    InternalBuilding,
} from '../../../../typings/Building';
import { InternalVehicle, VehicleCategory } from '../../../../typings/Vehicle';

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
HighchartsSunburst(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsOfflineExporting(Highcharts);

const exportingDefault = {
    fallbackToExportServer: false,
};

export default Vue.extend<
    ChartSummary,
    ChartSummaryMethods,
    ChartSummaryComputed,
    DefaultProps
>({
    name: 'chart-summary',
    data() {
        return {
            buildingsId: this.$store.getters.nodeAttribute(
                'chart-summary-buildings',
                true
            ),
            buildings: this.$store.getters['api/buildingsByCategory'],
            buildingCategories: (this.$t('buildingCategories') as unknown) as {
                [category: string]: BuildingCategory;
            },
            buildingTypeNames: Object.fromEntries(
                Object.entries(
                    this.$t('buildings') as {
                        [id: number]: InternalBuilding;
                    }
                ).map(([index, { caption }]) => [index, caption])
            ),
            buildingTypeColors: Object.fromEntries(
                Object.entries(
                    this.$t('buildings') as {
                        [id: number]: InternalBuilding;
                    }
                ).map(([index, { color }]) => [index, color])
            ),
            vehiclesId: this.$store.getters.nodeAttribute(
                'chart-summary-vehicles',
                true
            ),
            vehicles: this.$store.getters['api/vehiclesByType'],
            vehicleCategories: (this.$t('vehicleCategories') as unknown) as {
                [category: string]: VehicleCategory;
            },
            vehicleTypeNames: Object.fromEntries(
                Object.entries(
                    this.$t('vehicles') as {
                        [id: number]: InternalVehicle;
                    }
                ).map(([index, { caption }]) => [index, caption])
            ),
            vehicleTypeColors: Object.fromEntries(
                Object.entries(
                    this.$t('vehicles') as {
                        [id: number]: InternalVehicle;
                    }
                ).map(([index, { color }]) => [index, color])
            ),
            vehiclesByBuilding: this.$store.getters['api/vehiclesByBuilding'],
            buildingsAsColumn: false,
        } as ChartSummary;
    },
    computed: {
        personalCount() {
            return (this.$store.state.api.buildings as Building[])
                .map(b => b.personal_count)
                .reduce((a, b) => a + b, 0);
        },
    },
    mounted() {
        if (this.$store.state.darkmode)
            Highcharts.setOptions(this.$utils.highChartsDarkMode);
        Highcharts.setOptions({
            lang: {
                ...(this.$t('highcharts') as {
                    [key: string]: TranslateResult;
                }),
            },
        });
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: 'dashboard',
                settingId: 'buildings_column_chart',
            })
            .then(column => {
                this.buildingsAsColumn = column ?? false;
                this.mountBuildingChart();
            });

        Highcharts.getOptions().colors?.splice(0, 0, 'transparent');
        Object.keys(this.vehicleCategories).forEach(category => {
            const groups = Object.keys(
                this.vehicleCategories[category].vehicles
            );
            const data = [
                {
                    id: category,
                },
            ] as PointOptionsObject[];
            let sum = 0;
            if (groups.length > 1) {
                groups.forEach(group => {
                    const types = [] as PointOptionsObject[];
                    let groupColor = 0;
                    Object.values(
                        this.vehicleCategories[category].vehicles[group]
                    ).forEach(type => {
                        const value = (this.vehicles[type] || []).length;
                        sum += value;
                        const color = this.vehicleTypeColors[type];
                        groupColor += parseInt(color.replace(/^#/, ''), 16);
                        types.push({
                            id: `${category}_${group}_${type}`,
                            name: this.vehicleTypeNames[type],
                            parent: `${category}_${group}`,
                            value,
                            color,
                        });
                    });
                    const color = Math.floor(
                        groupColor / types.length
                    ).toString(16);
                    data.push({
                        id: `${category}_${group}`,
                        name: group,
                        parent: category,
                        color: `#${'00000'.substring(0, 6 - color.length) +
                            color}`,
                    });
                    types.forEach(type => data.push(type));
                });
            } else {
                Object.values(
                    this.vehicleCategories[category].vehicles[groups[0]]
                ).forEach(type => {
                    const value = (this.vehicles[type] || []).length;
                    sum += value;
                    data.push({
                        id: `${category}_${type}`,
                        name: this.vehicleTypeNames[type],
                        value,
                        parent: category,
                        color: this.vehicleTypeColors[type],
                    });
                });
            }
            if (!sum) return;
            Highcharts.chart(`${this.vehiclesId}_${category}`, {
                chart: {
                    height: '100%',
                    type: 'sunburst',
                },
                exporting: {
                    ...exportingDefault,
                    filename: `lssm_vehicle_chart_${category}`,
                },
                title: {
                    text: `${category}: ${sum.toLocaleString()}`,
                },
                series: [
                    {
                        data: data.filter(
                            d => !d.hasOwnProperty('value') || d.value
                        ),
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        allowDrillToNode: true,
                        cursor: 'pointer',
                        levelIsConstant: false,
                        traverseUpButton: {
                            text: Highcharts.getOptions().lang.drillUpText
                        },
                    },
                ] as SeriesSunburstOptions[],
            } as Options);
        });
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.dashboard.${key}`, args);
        },
        $sm(key, args) {
            return this.$m(`chart-summaries.${key}`, args);
        },
        changeBuildingChart() {
            this.$store.dispatch('settings/setSetting', {
                moduleId: 'dashboard',
                settingId: 'buildings_column_chart',
                value: this.buildingsAsColumn,
            });
            this.mountBuildingChart();
        },
        mountBuildingChart() {
            const buildingVehicleDrilldowns = [] as DrilldownOptions[];
            Highcharts.chart(this.buildingsId, ({
                chart: {
                    type: this.buildingsAsColumn ? 'column' : 'waterfall',
                },
                title: null,
                legend: {
                    enabled: false,
                },
                xAxis: {
                    type: 'category',
                },
                yAxis: {
                    title: {
                        text: this.$t('amount'),
                    },
                },
                tooltip: {
                    headerFormat:
                        '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat:
                        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>',
                },
                exporting: {
                    ...exportingDefault,
                    filename: 'lssm_building_chart',
                },
                plotOptions: {
                    waterfall: {
                        pointPadding: 0,
                        groupPadding: 0,
                    },
                },
                series: Object.keys(this.buildingCategories).map(category => {
                    const types = Object.values(
                        this.buildingCategories[category].buildings
                    );
                    return {
                        name: category,
                        data: [
                            ...types.map(type => {
                                return {
                                    name: this.buildingTypeNames[type],
                                    y: (this.buildings[category] || []).filter(
                                        building =>
                                            building.building_type === type
                                    ).length,
                                    color: this.buildingTypeColors[type],
                                };
                            }),
                            {
                                name: category,
                                isSum: !this.buildingsAsColumn,
                                color: this.buildingCategories[category].color,
                                drilldown: category,
                                y: this.buildings[category]?.length ?? 0,
                            },
                        ],
                    };
                }),
                drilldown: {
                    series: [
                        ...Object.keys(this.buildingCategories).map(
                            category => {
                                const types = Object.values(
                                    this.buildingCategories[category].buildings
                                );
                                return {
                                    name: category,
                                    id: category,
                                    type: 'column',
                                    data: types.map(building_type => {
                                        const buildings = (
                                            this.buildings[category] || []
                                        ).filter(
                                            building =>
                                                building.building_type ===
                                                building_type
                                        );
                                        const vehicle_types = {} as {
                                            [type: string]: number;
                                        };
                                        buildings.forEach(building => {
                                            if (
                                                !this.vehiclesByBuilding.hasOwnProperty(
                                                    building.id
                                                )
                                            )
                                                return;
                                            this.vehiclesByBuilding[
                                                building.id
                                            ].forEach(vehicle => {
                                                if (
                                                    !vehicle_types.hasOwnProperty(
                                                        vehicle.vehicle_type
                                                    )
                                                )
                                                    vehicle_types[
                                                        vehicle.vehicle_type
                                                    ] = 0;
                                                vehicle_types[
                                                    vehicle.vehicle_type
                                                ]++;
                                            });
                                        });
                                        if (Object.keys(vehicle_types).length) {
                                            const drilldown = {
                                                id: `${category}_${building_type}`,
                                                name: this.buildingTypeNames[
                                                    building_type
                                                ],
                                                type: 'column',
                                                data: Object.keys(
                                                    vehicle_types
                                                ).map(vehicle_type => ({
                                                    id: `${category}_${building_type}_${vehicle_type}`,
                                                    name: this.vehicleTypeNames[
                                                        parseInt(vehicle_type)
                                                    ],
                                                    y:
                                                        vehicle_types[
                                                            vehicle_type
                                                        ],
                                                    color: this
                                                        .vehicleTypeColors[
                                                        parseInt(vehicle_type)
                                                    ],
                                                })),
                                            } as DrilldownOptions;
                                            buildingVehicleDrilldowns.push(
                                                drilldown
                                            );
                                        }
                                        return {
                                            name: this.buildingTypeNames[
                                                building_type
                                            ],
                                            y: buildings.length,
                                            color: this.buildingTypeColors[
                                                building_type
                                            ],
                                            drilldown:
                                                Object.keys(vehicle_types)
                                                    .length &&
                                                `${category}_${building_type}`,
                                        };
                                    }),
                                };
                            }
                        ),
                        ...buildingVehicleDrilldowns,
                    ],
                },
            } as unknown) as Options);
        },
    },
});
</script>

<style scoped lang="sass">
.tip-btn
    cursor: pointer

    &:hover
        &+ .alert
            display: block

    &+ .alert
        display: none
        position: absolute
        z-index: 1

.sunburst-grid
    display: flex
    flex-flow: row wrap
    justify-content: space-evenly
    align-items: center

    &::before,
    &::after
        display: none

    .sunburst-chart
        max-width: 500px

        .alert.alert-danger
            margin: 4rem
</style>
