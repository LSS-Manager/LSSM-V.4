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
            <div class="panel-body">
                <div :id="vehiclesId"></div>
            </div>
        </div>
    </div>
</template>

<script>
const Highcharts = require('highcharts');

require('highcharts/modules/drilldown')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);

export default {
    name: 'chart-summary',
    data() {
        return {
            buildingsId: this.$store.getters.nodeId('chart-summary-buildings'),
            vehiclesId: this.$store.getters.nodeId('chart-summary-vehicles'),
            buildings: this.$store.getters['api/buildingsByCategory'],
            buildingCategories: this.$t('buildingCategories'),
            buildingTypeNames: this.$t('buildings'),
            buildingchart: null,
        };
    },
    mounted() {
        Highcharts.chart(this.buildingsId, {
            chart: {
                type: 'waterfall',
            },
            title: {
                text: this.$t(
                    'modules.dashboard.chart-summaries.buildings.title'
                ),
            },
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
    },
};
</script>

<style scoped></style>
