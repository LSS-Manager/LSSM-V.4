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
                    :id="`${vehiclesId}_${category}`"
                    class="sunburst-chart"
                    :style="
                        `flex: 1 0 min(100%, max(250px, calc(100%/${
                            Object.keys(vehicleCategories).length
                        })))`
                    "
                ></div>
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
            vehicles: this.$store.getters['api/vehiclesByCategory'],
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
                                color: this.buildingCategories[category].color,
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
                        data: types.map(type => [
                            this.buildingTypeNames[type],
                            (this.buildings[category] || []).filter(
                                building => building.building_type === type
                            ).length,
                        ]),
                    };
                }),
            },
        });

        Highcharts.getOptions().colors.splice(0, 0, 'transparent');
        Object.keys(this.vehicleCategories).map(category => {
            const data = [
                {
                    id: category,
                    name: category,
                },
                {
                    id: `${category}_1`,
                    parent: category,
                    value: 13,
                },
            ];
            Highcharts.chart(`${this.vehiclesId}_${category}`, {
                chart: {
                    height: '100%',
                    type: 'sunburst',
                },
                title: null,
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
                                    to: -0.5,
                                },
                            },
                            {
                                level: 4,
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

    &::before,
    &::after
        display: none

    .sunburst-chart
        max-width: 500px
</style>
