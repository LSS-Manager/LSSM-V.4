export default {
    amount: 'Anzahl',
    categories: {
        allianceMission: {
            regex: /^\[Verband\]/,
            title: 'Verbandseinsätze',
        },
        mission: {
            regex: '^%missions%',
            title: 'Eigene Einsätze',
        },
        buyVehicle: { regex: /Fahrzeug gekauft/ },
        dailyLogin: { regex: /Täglicher Login-Bonus/ },
        buildings: {
            regex: /(Gebäude gebaut|Rückerstattung Gebäude$|Gebäude abgerissen)/,
            title: 'Gebäude gebaut/abgerissen',
        },
        upgradeBuilding: {
            regex: /(Wache (erweitert( \(von Kleinwache\))?|ausgebaut)|Abbrechen:|Rückerstattung Gebäudeausbau)/,
            title: 'Gebäude ausgebaut',
        },
        task: { regex: /Erfüllte Aufgabe ".*?"/, title: 'Erfüllte Aufgabe' },
        patients: { regex: /Patienten Behandlung/, title: 'Patienten' },
        alliancePatients: { regex: /Krankenhaus - Verbandseinlieferung/, title: 'Krankenhaus - Verbandseinlieferung' },
        prisoners: {
            regex: /Gefangenen? transportiert/,
            title: 'Gefangene',
        },
        schoolings: { regex: /(Lehrgang|Ausbildung( fremdes)? Personal)/, title: 'Lehrgang' },
        shitComplexes: {
            regex:
                /(An den Gebäudekomplex angehängte Gebäude|Aus(bau|gebaut) zu einem Gebäudekomplex)/,
            title: 'Gebäudekomplexe',
        },
    },
    category: 'Kategorie',
    name: 'Zusammenfassung',
    total: 'Insgesamt',
    others: 'Sonstiges',
};