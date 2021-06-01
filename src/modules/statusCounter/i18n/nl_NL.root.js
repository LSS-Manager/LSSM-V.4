module.exports = {
    name: 'Statusteller',
    description:
        'Geeft een snel overzicht hoeveel voertuigen welke status hebben.',
    settings: {
        percentRounding: {
            title: 'Procenten afronden',
            description:
                'Rond procenten, indien weergegeven, af op zoveel decimalen',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Status ${status}`,
                        description: `Toont het aantal voertuigen in status ${status}.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Status ${status} alleen indien in gebruik`,
                        description: `Toont het aantal voertuigen in status ${status} alleen wanneer er voertuigen deze status hebben.`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Procenten bij status ${status}`,
                        description: `Toont hoeveel procent van alle voertuigen status ${status} hebben.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Knipperen voor status 7 uitschakelen',
            description: 'Schakelt het knipperen van de status 7 tellers uit.',
        },
        s5blinkOnGt0: {
            title: 'Knipperen status 7 alleen indien in gebruik',
            description:
                'De status 7 tellers knipperen alleen als er voertuigen deze status hebben.',
        },
    },
};
