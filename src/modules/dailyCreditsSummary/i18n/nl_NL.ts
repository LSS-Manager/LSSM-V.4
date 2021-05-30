export default {
    amount: 'Aantal',
    categories: {
        allianceMission: {
            regex: /^\[Team\]/,
            title: 'Teammeldingen',
        },
        mission: {
            regex: '^%missions%',
            title: 'Eigen meldingen',
        },
        buyVehicle: { regex: /Voertuig gekocht/ },
        dailyLogin: { regex: /Dagelijkse loginbeloning/ },
        buildings: {
            regex: /(Gebouw gebouwd|Terugbetaling gebouw|Gebouw gesloopt)/,
            title: 'Gebouw gebouwd/gesloopt',
        },
        upgradeBuilding: {
            regex: /((Kleine p|P)ost uitgebreid|Cancel:|Gebouw-upgrade terugbetalen|)/,
            title: 'Gebouwuitbreidingen',
        },
        task: { regex: /Taak .*? voltooid/, title: 'Taken voltooid' },
        patients: { regex: /Patiënten behandeling/, title: 'Patiënten' },
        alliancePatients: { regex: /Ziekenhuis - Teamopname/, title: 'Teamopnames' },
        prisoners: {
            regex: /(Arrestanten getransporteerd|Politie - Teamaanlevering)/,
            title: 'Arrestanten',
        },
        schoolings: { regex: /(Team|Opleiding van het) personeel/, title: 'Opleidingen' },
        shitComplexes: {
            regex: /(Gebouw bevestigd aan|Uitgebreid tot|(Geü|Up)grade naar) Gebouwencomplex/,
            title: 'Gebouwencomplexen',
        },
    },
    category: 'Categorie',
    name: 'Samenvatting',
    total: 'Totaal',
    others: 'Overige',
};