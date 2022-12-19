module.exports = {
    name: 'Přehled statusů',
    description: 'Zobrazí rychlý přehled počtu vozidel s konkrétními statusy.',
    settings: {
        percentRounding: {
            title: 'Zaokrouhlení procent',
            description:
                'Zaokrouhlení procent - pokud je zobrazeno, na kolik desetiných míst zaoukrouhlit.',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Status ${status}`,
                        description: `Zobrazí počet vozidel se statusem ${status}.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Status ${status} pouze pokud je použit`,
                        description: `Zobrazí počet vozidel se statusem ${status} pouze v případě, že je tento status využit.`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Procento vozidel ve statusu ${status}`,
                        description: `Zobrazí kolik procent ze všech vozidel je ve statusu ${status}.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Vypnout blikání pro status 5',
            description: 'Vypne blikání u přehledu vozidel ve statusu 5.',
        },
        s5blinkOnGt0: {
            title: 'Blikání pro počty statusu 5 pokud je využit',
            description:
                'Počet vozidel se statusem 5 bliká pouze pokud je status využit.',
        },
    },
};
