module.exports = {
    name: 'Compteur de Status',
    description:
        'Affiche un aperçu rapide du nombre de véhicules et de leur statut.',
    settings: {
        percentRounding: {
            title: 'Pourcentages arrondis',
            description:
                'Pourcentages arrondis - si elle est affichée - avec autant de décimales que nécessaire.',
        },
        percentageInBrackets: {
            title: 'Pourcentages entre parenthèses ',
            description:
                'Met les pourcentages entre parenthèses, par exemple (10%)',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Status ${status}`,
                        description: `Afficher le nombre de véhicules ayant le statut ${status}.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Status ${status} seulement si nécessaire`,
                        description: `Afficher le nombre de véhicules ayant le statut ${status} uniquement si les véhicules ont ce statut.`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Pourcentages pour le statut ${status}`,
                        description: `Montrer le pourcentage de tous les véhicules qui se trouvent dans le statut ${status}.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Arrêt du clignotement pour le status 5',
            description: 'Désactive le clignotement du statut 5.',
        },
        s5blinkOnGt0: {
            title: 'Clignotant pour le status 5 uniquement si nécessaire',
            description:
                'Le compteur de statut 5 ne clignote que lorsque des véhicules sont en statut 5.',
        },
    },
};
