module.exports = {
    name: 'Compteur de Statut',
    description:
        'Affiche un aperçu rapide du nombre de véhicules et de leur statut.',
    settings: {
        percentRounding: {
            title: 'Arrondir les pourcentages',
            description:
                "Arrondir les pourcentages - s'ils sont affichés - à autant de décimales que vous le souhaitez.",
        },
        percentageInBrackets: {
            title: 'Afficher le pourcentages entre parenthèses',
            description:
                'Afficher les pourcentages entre parenthèses, par exemple (10%)',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Afficher le statut ${status}`,
                        description: `Afficher le nombre de véhicules ayant le statut ${status}.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Afficher le Statut ${status} seulement si nécessaire`,
                        description: `Afficher le nombre de véhicules ayant le statut ${status} uniquement si les véhicules ont ce statut.`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Afficher le pourcentages pour le statut ${status}`,
                        description: `Afficher le pourcentage des véhicules ayant le statut ${status}.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Désactiver le clignotement pour le statut 5',
            description: 'Désactiver le clignotement du statut 5.',
        },
        s5blinkOnGt0: {
            title: 'Clignotement pour le statut 5 uniquement si nécessaire',
            description:
                'Le statut 5 ne clignote que lorsque les véhicules se trouvent dans le statut 5.',
        },
    },
};
