<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <b>
                    {{
                        $t('modules.dashboard.chart-summaries.buildings.title')
                    }}
                </b>
                <span class="glyphicon glyphicon-info-sign tip-btn"></span>
                <div class="alert alert-info">
                    {{ $t('modules.dashboard.chart-summaries.buildings.tip') }}
                </div>
            </div>
            <div class="panel-body">
                <div :id="buildingsId"></div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <b>
                    {{ $t('modules.dashboard.chart-summaries.vehicles.title') }}
                </b>
                <span class="glyphicon glyphicon-info-sign tip-btn"></span>
                <div class="alert alert-info">
                    {{ $t('modules.dashboard.chart-summaries.vehicles.tip') }}
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

<script>
const Highcharts = require('highcharts');

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/drilldown')(Highcharts);
require('highcharts/modules/sunburst')(Highcharts);

export default {
    name: 'chart-summary',
    data() {
        return {
            buildingsId: this.$store.getters.nodeId('chart-summary-buildings'),
            buildings: this.$store.getters['api/buildingsByCategory'],
            buildingCategories: this.$t('buildingCategories'),
            buildingTypeNames: Object.values(this.$t('buildings')).map(
                type => type.caption
            ),
            buildingTypeColors: Object.values(this.$t('buildings')).map(
                type => type.color
            ),
            vehiclesId: this.$store.getters.nodeId('chart-summary-vehicles'),
            vehicles: this.$store.getters['api/vehiclesByType'],
            vehicleCategories: this.$t('vehicleCategories'),
            vehicleTypeNames: Object.values(this.$t('vehicles')).map(
                type => type.caption
            ),
            vehicleTypeColors: Object.values(this.$t('vehicles')).map(
                type => type.color
            ),
            vehiclesByBuilding: this.$store.getters['api/vehiclesByBuilding'],
        };
    },
    mounted() {
        this.highChartsDarkMode(this, Highcharts);
        const buildingVehicleDrilldowns = [];
        Highcharts.chart(this.buildingsId, {
            chart: {
                type: 'waterfall',
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
                                    building => building.building_type === type
                                ).length,
                                color:
                                    this.buildingTypeColors[type] ||
                                    `#${this.getColorFromString(
                                        this.buildingTypeNames[type],
                                        parseInt(
                                            this.buildingCategories[
                                                category
                                            ].color.replace('#', ''),
                                            16
                                        )
                                    )}`,
                            };
                        }),
                        {
                            name: category,
                            isSum: true,
                            color: this.buildingCategories[category].color,
                            drilldown: category,
                        },
                    ],
                };
            }),
            drilldown: {
                series: [
                    ...Object.keys(this.buildingCategories).map(category => {
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
                                        building.building_type === building_type
                                );
                                const vehicle_types = {};
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
                                        vehicle_types[vehicle.vehicle_type]++;
                                    });
                                });
                                if (Object.keys(vehicle_types).length) {
                                    const drilldown = {
                                        id: `${category}_${building_type}`,
                                        name: this.buildingTypeNames[
                                            building_type
                                        ],
                                        type: 'column',
                                        data: Object.keys(vehicle_types).map(
                                            vehicle_type => {
                                                return {
                                                    id: `${category}_${building_type}_${vehicle_type}`,
                                                    name: this.vehicleTypeNames[
                                                        vehicle_type
                                                    ],
                                                    y:
                                                        vehicle_types[
                                                            vehicle_type
                                                        ],
                                                    color:
                                                        this.vehicleTypeColors[
                                                            vehicle_type
                                                        ] ||
                                                        `#${this.getColorFromString(
                                                            this
                                                                .vehicleTypeNames[
                                                                vehicle_type
                                                            ],
                                                            parseInt(
                                                                this.vehicleCategories[
                                                                    category
                                                                ].color.replace(
                                                                    '#',
                                                                    ''
                                                                ),
                                                                16
                                                            )
                                                        )}`,
                                                };
                                            }
                                        ),
                                    };
                                    buildingVehicleDrilldowns.push(drilldown);
                                }
                                return {
                                    name: this.buildingTypeNames[building_type],
                                    y: buildings.length,
                                    color:
                                        this.buildingTypeColors[
                                            building_type
                                        ] ||
                                        `#${this.getColorFromString(
                                            this.buildingTypeNames[
                                                building_type
                                            ],
                                            parseInt(
                                                this.buildingCategories[
                                                    category
                                                ].color.replace('#', ''),
                                                16
                                            )
                                        )}`,
                                    drilldown:
                                        Object.keys(vehicle_types).length &&
                                        `${category}_${building_type}`,
                                };
                            }),
                        };
                    }),
                    ...buildingVehicleDrilldowns,
                ],
            },
        });

        Highcharts.getOptions().colors.splice(0, 0, 'transparent');
        Object.keys(this.vehicleCategories).forEach(category => {
            const groups = Object.keys(
                this.vehicleCategories[category].vehicles
            );
            const data = [
                {
                    id: category,
                },
            ];
            let sum = 0;
            if (groups.length > 1) {
                groups.forEach(group => {
                    const types = [];
                    let groupColor = 0;
                    Object.values(
                        this.vehicleCategories[category].vehicles[group]
                    ).forEach(type => {
                        const value = (this.vehicles[type] || []).length;
                        sum += value;
                        const color =
                            this.vehicleTypeColors[type] ||
                            `#${this.getColorFromString(
                                this.vehicleTypeNames[type],
                                parseInt(
                                    this.vehicleCategories[
                                        category
                                    ].color.replace('#', ''),
                                    16
                                )
                            )}`;
                        groupColor += parseInt(color.replace(/^#/, ''), 16);
                        // console.log(color, groupColor);
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
                        color:
                            this.vehicleTypeColors[type] ||
                            `#${this.getColorFromString(
                                this.vehicleTypeNames[type],
                                this.vehicleCategories[category].color
                            )}`,
                    });
                });
            }
            if (!sum) return;
            Highcharts.chart(`${this.vehiclesId}_${category}`, {
                chart: {
                    height: '100%',
                    type: 'sunburst',
                },
                title: {
                    text: `${category}: ${sum}`,
                },
                series: [
                    {
                        data,
                        allowDrillToNode: true,
                        cursor: 'pointer',
                        levelIsConstant: false,
                    },
                ],
            });
        });
    },
};
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
