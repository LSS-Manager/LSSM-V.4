import { VueConstructor } from 'vue/types/vue';

export default (Vue: VueConstructor): void => {
    Vue.prototype.$vue = Vue;
    Vue.prototype.$utils = {
        highChartsDarkMode: {
            chart: {
                backgroundColor: 'transparent',
                plotBorderColor: '#606063',
            },
            title: {
                style: {
                    color: '#ddd',
                },
            },
            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3',
                    },
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3',
                    },
                },
            },
            yAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3',
                    },
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3',
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85}',
                style: {
                    color: '#F0F0F0',
                },
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#B0B0B3',
                    },
                    marker: {
                        lineColor: '#333',
                    },
                },
            },
            legend: {
                itemStyle: {
                    color: '#E0E0E3',
                },
                itemHoverStyle: {
                    color: '#FFF',
                },
                itemHiddenStyle: {
                    color: '#606063',
                },
            },
            credits: {
                style: {
                    color: '#666',
                },
            },
            labels: {
                style: {
                    color: '#707073',
                },
            },

            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3',
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3',
                },
            },
            dataLabelsColor: '#B0B0B3',
            textColor: '#C0C0C0',
            contrastTextColor: '#F0F0F3',
            maskColor: 'rgba(255,255,255,0.3}',
        },
    };
};
