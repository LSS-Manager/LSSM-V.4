module.exports = {
    amount: 'Aantal',
    categories: {
        allianceMission: {
            regex: `^\\[Team\\]`,
            title: 'Teammeldingen',
        },
        mission: {
            regex: `^%missions%`,
            title: 'Eigen meldingen',
        },
        buyVehicle: { regex: 'Voertuig gekocht' },
        dailyLogin: { regex: 'Dagelijkse loginbeloning' },
        buildings: {
            regex: '(Gebouw gebouwd|Terugbetaling gebouw|Gebouw gesloopt)',
            title: 'Gebouw gebouwd/gesloopt',
        },
        upgradeBuilding: {
            regex: '(Post uitgebreid|Cancel:)',
            title: 'Gebouwuitbreidingen',
        },
        task: { regex: 'Taak .*? voltooid', title: 'Taken voltooid' },
        patients: { regex: 'Patiënten behandeling', title: 'Patiënten' },
        alliancePatients: { regex: 'Teamopname', title: 'Teamopnames' },
        prisoners: {
            regex: 'Arrestanten getransporteerd',
            title: 'Arrestanten',
        },
        schoolings: { regex: 'Opleiding' },
        shitComplexes: {
            regex:
                '(Gebouw bevestigd aan|Uitgebreid tot|(Geü|Up)grade naar) Gebouwencomplex',
            title: 'Gebouwencomplexen',
        },
    },
    category: 'Categorie',
    name: 'Samenvatting',
    total: 'Totaal',
    others: 'Overige',
};
