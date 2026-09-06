module.exports = {
    name: 'Statusräknare',
    description: 'Visa en sammanställning över vilken status dina fordon har.',
    settings: {
        percentRounding: {
            title: 'Avrunda procenttal',
            description:
                'Avrunda procenttal - om det visas - till så många decimaler som behövs.',
        },
        percentageInBrackets: {
            title: 'Procent inom parentes',
            description: 'Visar procentandelen inom parentes, t.ex. (10%)',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Status ${status}`,
                        description: `Visa hur många fordon i status ${status}.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Status ${status} vid behov`,
                        description: `Visa antal fordon i status ${status} .`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Procent för status ${status}`,
                        description: `Visa vilken procent av fordon som är i status ${status}.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Blinka inte för status 5 när fordon är i status 5',
            description:
                'Inaktivera blinkande för status 5 när fordon är i status 5.',
        },
        s5blinkOnGt0: {
            title: 'Blinka för status 5 när fordon är i status 5',
            description:
                'Aktivera blinkande för status 5 när fordon är i status 5.',
        },
    },
};
