module.exports = {
    name: 'Licznik stanu',
    description: 'Pokazuje szybki przegląd liczby pojazdów i ich stanów.',
    settings: {
        percentRounding: {
            title: 'Procenty zaokrąglone',
            description:
                'Procenty zaokrąglone - jeśli są wyświetlane - do tylu miejsc po przecinku, ile potrzeba.',
        },
        percentageInBrackets: {
            title: 'Procenty w nawiasach',
            description: 'Umieszcza wartości procentowe w nawiasach, np. (10%)',
        },
        ...Object.fromEntries(
            new Array(10).fill([]).flatMap((_, status) => [
                [
                    `show_${status}`,
                    {
                        title: `Status ${status}`,
                        description: `Pokaż liczbę pojazdów w statusie ${status}.`,
                    },
                ],
                [
                    `hide_${status}`,
                    {
                        title: `Status ${status} tylko jeśli jest to wymagany`,
                        description: `Pokaż liczbę pojazdów w statusie ${status} tylko wtedy, gdy pojazdy mają ten status.`,
                    },
                ],
                [
                    `percent_${status}`,
                    {
                        title: `Procenty statusu ${status}`,
                        description: `Pokaż, jaki procent wszystkich pojazdów ma dany status ${status}.`,
                    },
                ],
            ])
        ),
        s5noblink: {
            title: 'Wyłącz miganie dla S5',
            description: 'Wyłącza miganie stanu 5.',
        },
        s5blinkOnGt0: {
            title: 'Miganie dla S5 tylko wtedy, gdy jest to wymagane',
            description:
                'Licznik stanu 5 miga tylko wtedy, gdy pojazdy są w stanie 5.',
        },
    },
};
