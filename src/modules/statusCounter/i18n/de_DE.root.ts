export default {
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
                        description: `Zeige Zahl der Fahrzeuge im Status ${status} nur bei Bedarf.`,
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
    },
};
