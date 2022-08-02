module.exports = {
    name: 'Tilalaskuri',
    description:
        'Näyttää nopean yleiskatsauksen siitä, kuinka monta ajoneuvoa on missäkin tilassa.',
    settings: {
        percentRounding: {
            title: 'Pyöristä prosentit',
            description:
                '',
        },
        percentageInBrackets: {
            title: 'Prosenttiosuudet suluissa',
            description: 'Laittaa prosenttiluvut sulkuihin, esim. (10 %).',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Tila ${status}`,
                        description: `Näytä tilassa ${status} olevien ajoneuvojen määrä.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Tila ${status} vain tarvittaessa`,
                        description: `Näytä ajoneuvojen määrä tilassa ${status} vain, jos ajoneuvoja on tässä tilassa.`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Tilan ${status} prosenttiosuudet`,
                        description: `Näytä, kuinka monta prosenttia kaikista ajoneuvoista on tilassa ${status}.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Sammuta tilan 5 vilkkuminen',
            description: 'Poistaa tilan 5 laskurin vilkkumisen käytöstä.',
        },
        s5blinkOnGt0: {
            title: 'Tilan 5:n vilkkuminen vain tarvittaessa',
            description:
                'Tilan 5 laskuri vilkkuu vain silloin, kun ajoneuvot ovat tilassa 5.',
        },
    },
};
