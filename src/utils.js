module.exports = {
    getColorFromString: function(string = '', shift = 0) {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = (hash + 2 * shift) / 3;
        hash = (hash & 0x00ffffff).toString(16).toUpperCase();
        return '00000'.substring(0, 6 - hash.length) + hash;
    },
    getTextColor(color = '000000') {
        color = parseInt(color, 16);
        return Math.sqrt(
            (color & 0xff0000) ** 2 * 0.241 +
                (color & 0xff00) ** 2 * 0.691 +
                (color & 0xff) ** 2 * 0.068
        ) < 130
            ? 'fff'
            : '000';
    },
    highChartsDarkMode(vm, Highcharts) {
        if (vm.$store.state.darkmode)
            Highcharts.setOptions({
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
            });
    },
};
