module.exports = {
    name: 'Statusteller',
    description:
        'Viser en rask oversikt over hvor mange kjøretøy som er i hvilken status.',
    settings: {
        percentRounding: {
            title: 'Avrund prosenter',
            description:
                'Avrund prosenter - hvis de vises - til så mange desimaler som nødvendig.',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Status ${status}`,
                        description: `Vis antall kjøretøy i status ${status}.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Status ${status} bare hvis nødvendig`,
                        description: `Vis antall kjøretøy i status ${status} bare hvis kjøretøy har denne statusen.`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Prosentandeler for status ${status}`,
                        description: `Vis hvor mange prosent av alle kjøretøyer som er i status ${status}.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Slå av blinkingen for S5',
            description: 'Deaktiverer blinkingen av status 5-telleren.',
        },
        s5blinkOnGt0: {
            title: 'Blinker kun for S5 når det er nødvendig',
            description:
                'Status 5-telleren blinker kun når kjøretøy er i status 5.',
        },
    },
};
