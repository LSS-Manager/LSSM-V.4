export default {
    amount: 'Aantal',
    charts: {
        income: 'Inkomsten',
        expenses: 'Uitgaven',
    },
    categories: {
        allianceMission: {
            regex: /^\[Team\]/u,
            title: 'Teammeldingen',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%( \\(Melding via OMS / PAC\\))?( - Loos alarm)?$',
            title: 'Eigen meldingen',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        cancelledMissions: {
            regex: '^%missions%( \\(Melding via OMS / PAC\\))? - Gecanceld$',
            title: 'Gecancelde meldingen',
            backgroundColor: '#7C7978',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Voertuig gekocht/u,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Dagelijkse loginbeloning/u,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Gebouw gebouwd|Gebouw gesloopt|Terugbetaling gebouw)/u,
            title: 'Gebouw gebouwd/gesloopt',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /((Kleine p|P)ost uitgebreid|Cancel:|Gebouw-upgrade terugbetalen|Specialisatie (geannuleerd|gebouwd))/u,
            title: 'Gebouwuitbreidingen',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /Taak .*? voltooid/u,
            title: 'Taken voltooid',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /Patiënten behandeling/u,
            title: 'Patiënten',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Ziekenhuis - Teamopname/u,
            title: 'Teamopnames',
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Politie - Teamaanlevering/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Arrestanten getransporteerd/u,
            title: 'Arrestanten',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /(Opleiding van het|Team) personeel/u,
            title: 'Opleidingen',
            backgroundColor: '#ff00ff',
            textColor: 'white',
        },
        shitComplexes: {
            regex: /(Gebouw bevestigd aan|Uitgebreid tot|(Geü|Up)grade naar) Gebouwencomplex/u,
            title: 'Gebouwencomplexen',
            backgroundColor: '#b5651d',
            textColor: 'white',
        },
        fireAlarmSystemCancel: {
            regex: /Loos alarm$/u,
            title: 'Melding via OMS/PAC - Loos alarm',
            backgroundColor: '#c80815',
            textColor: 'white',
        },
    },
    category: 'Categorie',
    title: 'Samenvatting',
    total: 'Totaal',
    others: 'Overige',
    export: {
        export: 'Exporteren',
        json: {
            raw: 'JSON (Ruwe data)',
            prettified: 'JSON (Mooie weergave)',
        },
        csv: 'CSV',
    },
};
