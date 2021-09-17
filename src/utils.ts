import { VueConstructor } from 'vue/types/vue';

export default (Vue: VueConstructor): void => {
    Vue.prototype.$vue = Vue;
    Vue.prototype.$utils = {
        urlRegex: /(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?/gi,
        escapeRegex(s: string) {
            return s.replace(/[[\\^$.|?*+()]/g, '\\$&');
        },
        getTextNodes(
            root: Node,
            filter?: (node: Node, ...args: unknown[]) => true
        ) {
            const NoneTextParentNodes = [
                'head',
                'meta',
                'title',
                'script',
                'style',
                'link',
                'br',
                'noscript',
                'a',
            ];
            const children = Array.from(root.childNodes);
            const textChildren = children.filter(
                n => n.nodeType === 3 && (!filter || (filter && filter(n)))
            );
            const elementChildren = children.filter(
                n =>
                    n.nodeType === 1 &&
                    !NoneTextParentNodes.includes(
                        (n as Element).tagName.toLowerCase()
                    ) &&
                    (!filter || (filter && filter(n)))
            );
            return [
                ...textChildren,
                ...elementChildren.map(n => this.getTextNodes(n, filter)),
            ].flat();
        },
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
