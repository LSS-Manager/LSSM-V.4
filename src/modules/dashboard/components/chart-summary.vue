<template>
    <div>
        <div class="panel">
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
        <div class="panel">
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
        this.buildingchart = Highcharts.chart(this.buildingsId, {
            chart: {
                type: 'column',
            },
            title: {
                text: this.$t(
                    'modules.dashboard.chart-summaries.buildings.title'
                ),
            },
            subtitle: {
                text: this.$t(
                    'modules.dashboard.chart-summaries.buildings.subtitle'
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
            series: [
                {
                    name: this.$t(
                        'modules.dashboard.chart-summaries.buildings.title'
                    ),
                    data: Object.keys(this.buildingCategories).map(category => {
                        return {
                            name: category,
                            y: (this.buildings[category] || []).length,
                            drilldown: category,
                            color: this.buildingCategories[category].color,
                        };
                    }),
                },
            ],
            drilldown: {
                series: Object.keys(this.buildingCategories).map(category => {
                    const types = Object.values(
                        this.buildingCategories[category].buildings
                    );
                    return {
                        name: category,
                        id: category,
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
