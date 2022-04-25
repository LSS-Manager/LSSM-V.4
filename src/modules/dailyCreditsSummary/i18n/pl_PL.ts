export default {
    amount: 'Ilość',
    charts: {
        income: 'Dochód',
        expenses: 'Wydatki',
    },
    categories: {
        allianceMission: {
            regex: /^\[Alliance\]/u,
            title: 'Misje Sojuszu',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%( \\(System alarmu przeciwpożarowego\\))?( - Fałszywy alarm)?$',
            title: 'Własne misje',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        cancelledMissions: {
            regex: '^%missions%( \\(System alarmu przeciwpożarowego\\))? - [aA]nulowane$',
            title: 'Anulowane misje',
            backgroundColor: '#7C7978',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Kupiony pojazd/u,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Nagroda za codzienne logowanie/u,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Zbudowane budynki|Budynki usunięte bez zwrotu|Zwrot kosztów budynku$)/u,
            title: 'Zbudowano budynek/usunięte',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(Stacja (ulepszona( \(z małej .*? stacji\))??|zbudowana)|Rozszerzona ochrona|Anuluj:|Zwrot kosztów aktualizacji budynku)/u,
            title: 'Zbudowana stacja',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /Ukończone zadanie («.*?»|".*?")/u,
            title: 'Ukończone zadanie',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /Pacjent (Opieka|Transport)/u,
            title: 'Pacjenci',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Szpital - Sojuszu/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Policja - Sojuszu/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Więzień? Przewieziony/u,
            title: 'Więzień',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /(Edukacja|Kandydat na szkolenie Sojuszu)/u,
            title: 'Edukacja',
            backgroundColor: '#ff00ff',
            textColor: 'white',
        },
        shitComplexes: {
            regex: /(Budynek dołączony do Bazy Kompleksu Budynków|Ulepszony do bazy kompleksu budynków|Ulepszony do kompleksu budynków|Ukończono rozbudowę bazy kompleksu budynków)/u,
            title: 'Kompleks budynków',
            backgroundColor: '#b5651d',
            textColor: 'white',
        },
        fireAlarmSystemCancel: {
            regex: /Fałszywy alarm/u,
            titel: 'Fałszywy alarm',
            backgroundColor: '#c80815',
            textColor: 'white',
        },
    },
    category: 'Kategoria',
    title: 'Podsumowanie',
    total: 'Łącznie',
    others: 'Inne',
    export: {
        export: 'Eksport',
        json: {
            raw: 'JSON (raw)',
            prettified: 'JSON (prettified)',
        },
    },
};
