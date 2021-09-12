module.exports = {
    name: 'Contatore stato',
    description:
        'Mostra una rapida panoramica di quanti veicoli sono in quale stato.',
    settings: {
        percentRounding: {
            title: 'Percentuali arrotondate',
            description:
                'Arrotonda le percentuali - se mostrate - al numero di decimali necessario.',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Stato ${status}`,
                        description: `Mostra numero di veicoli in stato ${status}.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Stato ${status} solo se richiesto`,
                        description: `Mostra numero di veicoli in stato ${status} solo se i veicoli si trovano in questo stato.`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Percentuali per stato ${status}`,
                        description: `Mostra quale percentuale di tutti i veicoli sono in stato ${status}.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Spegni lampeggiante per S5',
            description: 'Disattiva il lampeggio del contatore di stato 5.',
        },
        s5blinkOnGt0: {
            title: 'Lampeggiante per S5 solo quando richiesto',
            description:
                'Il contatore di stato 5 lampeggia solo quando i veicoli sono in stato 5.',
        },
    },
};
