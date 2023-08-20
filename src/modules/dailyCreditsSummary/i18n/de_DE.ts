export default {
    amount: 'Anzahl',
    charts: {
        income: 'Einnahmen',
        expenses: 'Ausgaben',
    },
    categories: {
        allianceMission: {
            regex: /^\[Verband\]/u,
            title: 'Verbandseinsätze',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%( \\(Brandmeldeanlage\\))?( - Fehlalarm)?$',
            title: 'Eigene Einsätze',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        cancelledMissions: {
            regex: '^%missions%( \\(Brandmeldeanlage\\))? - [aA]bgebrochen$',
            title: 'Abgebrochene Einsätze',
            backgroundColor: '#7C7978',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Fahrzeug gekauft/u,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        buyEquipment: {
            regex: /Ausrüstung gekauft/u,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Täglicher Login-Bonus/u,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Gebäude gebaut|Rückerstattung Gebäude$|Gebäude abgerissen)/u,
            title: 'Gebäude gebaut/abgerissen',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(Wache (erweitert( \(von Kleinwache\))?|ausgebaut)|Abbrechen:|Rückerstattung Gebäudeausbau|Spezialisierung (abgebrochen|gebaut))/u,
            title: 'Gebäude ausgebaut',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /Erfüllte Aufgabe («.*?»|".*?")/u,
            title: 'Erfüllte Aufgaben',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /Patienten Behandlung/u,
            title: 'Patienten',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Krankenhaus - Verbandseinlieferung/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Polizei - Verbandseinlieferung/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Gefangenen? transportiert/u,
            title: 'Gefangene',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /(Ausbildung( fremdes)? Personal|Lehrgang)/u,
            title: 'Lehrgang',
            backgroundColor: '#ff00ff',
            textColor: 'white',
        },
        shitComplexes: {
            regex: /(An den Gebäudekomplex angehängte Gebäude|Aus(bau|gebaut) zu einem Gebäudekomplex)/u,
            title: 'Gebäudekomplexe',
            backgroundColor: '#b5651d',
            textColor: 'white',
        },
        fireAlarmSystemCancel: {
            regex: /Fehlalarm/u,
            title: 'Falschalarm',
            backgroundColor: '#c80815',
            textColor: 'white',
        },
    },
    category: 'Kategorie',
    title: 'Zusammenfassung',
    total: 'Insgesamt',
    others: 'Sonstiges',
    export: {
        export: 'Exportieren',
        json: {
            raw: 'JSON (Rohformat)',
            prettified: 'JSON (schöne Ausgabe)',
        },
        csv: 'CSV',
    },
};
