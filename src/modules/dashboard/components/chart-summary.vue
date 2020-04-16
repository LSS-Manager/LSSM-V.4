<template>
    <div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h5>
                    {{
                        $t('modules.dashboard.chart-summaries.buildings.title')
                    }}
                </h5>
            </div>
            <div class="panel-body">
                <div :id="buildingsId"></div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h5>
                    {{ $t('modules.dashboard.chart-summaries.vehicles.title') }}
                </h5>
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
            buildingTypeNames: this.$t('buildings'),
            vehiclesId: this.$store.getters.nodeId('chart-summary-vehicles'),
            vehicles: this.$store.getters['api/vehiclesByType'],
            vehicleCategories: this.$t('vehicleCategories'),
            vehicleTypeNames: this.$t('vehicles'),
        };
    },
    mounted() {
        this.highChartsDarkMode(this, Highcharts);
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
                                color: `#${this.getColorFromString(
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
                series: Object.keys(this.buildingCategories).map(category => {
                    const types = Object.values(
                        this.buildingCategories[category].buildings
                    );
                    return {
                        name: category,
                        id: category,
                        type: 'column',
                        data: types.map(type => {
                            return {
                                name: this.buildingTypeNames[type],
                                y: (this.buildings[category] || []).filter(
                                    building => building.building_type === type
                                ).length,
                                color: `#${this.getColorFromString(
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
                    };
                }),
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
                    Object.values(
                        this.vehicleCategories[category].vehicles[group]
                    ).forEach(type => {
                        const value = (this.vehicles[type] || []).length;
                        sum += value;
                        types.push({
                            id: `${category}_${group}_${type}`,
                            name: this.vehicleTypeNames[type],
                            parent: `${category}_${group}`,
                            value,
                        });
                    });
                    data.push({
                        id: `${category}_${group}`,
                        name: group,
                        parent: category,
                        color: `#${this.getColorFromString(
                            group,
                            parseInt(
                                this.vehicleCategories[category].color.replace(
                                    '#',
                                    ''
                                ),
                                16
                            )
                        )}`,
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
                        color: `#${this.getColorFromString(
                            this.vehicleTypeNames[type],
                            parseInt(
                                this.vehicleCategories[category].color.replace(
                                    '#',
                                    ''
                                ),
                                16
                            )
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
                        levels: [
                            {
                                level: 1,
                                levelIsConstant: false,
                            },
                            {
                                level: 2,
                                color: this.vehicleCategories[category].color,
                            },
                            {
                                level: 3,
                                colorVariation: {
                                    key: 'brightness',
                                    to: 0.5,
                                },
                            },
                        ],
                    },
                ],
            });
        });
    },
};
</script>

<style scoped lang="sass">
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
