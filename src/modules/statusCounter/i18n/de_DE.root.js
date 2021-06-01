module.exports = {
    name: 'Statuszähler',
    description:
        'Zeigt eine schnelle Übersicht, wie viele Fahrzeuge in welchem Status sind.',
    settings: {
        percentRounding: {
            title: 'Prozente runden',
            description:
                'Rundet Prozente – falls angezeigt – auf so viele Nachkommastellen',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Status ${status}`,
                        description: `Zeige Zahl der Fahrzeuge im Status ${status}.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Status ${status} nur bei Bedarf`,
                        description: `Zeige Zahl der Fahrzeuge im Status ${status} nur, wenn Fahrzeuge in diesem Status sind.`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Prozente bei Status ${status}`,
                        description: `Zeige wie viel Prozent aller Fahrzeuge im Status ${status} sind.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Blinken für S5 abschalten',
            description: 'Deaktiviert das Blinken des Status 5 Zählers.',
        },
        s5blinkOnGt0: {
            title: 'Blinken für S5 nur bei Bedarf',
            description:
                'Der Status 5 Zähler blinkt nur wenn Fahrzeuge im Status 5 sind.',
        },
    },
};
