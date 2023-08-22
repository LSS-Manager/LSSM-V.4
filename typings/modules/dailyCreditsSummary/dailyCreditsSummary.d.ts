interface BasicChartOptions {
    chart: {
        type: 'pie';
        backgroundColor: string;
        margin: number;
        spacing: number[];
        height: string;
        borderRadius: string;
    };
    tooltip: {
        pointFormat: string;
    };
    plotOptions: {
        pie: {
            cursor: 'pointer';
            dataLabels: {
                enabled: true;
                format: string;
            };
        };
    };
}

interface ChartOptions extends BasicChartOptions {
    title: { text: string; align: string };
    series: [
        {
            name: string;
            data: { name: string; y: number }[];
        },
    ];
}

export interface Category {
    desc: string;
    total: number;
    amount: number;
    backgroundColor: string;
    textColor: string;
}
