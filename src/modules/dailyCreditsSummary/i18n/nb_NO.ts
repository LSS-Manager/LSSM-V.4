export default {
    amount: 'Mengde',
    categories: {
        allianceMission: {
            regex: /^\[Alliance]/,
            title: 'Allianseoppdrag',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%( \\(Fire Alarm System\\))?( - False Alarm)?$',
            title: 'Egne oppdrag',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        cancelledMissions: {
            regex: '^%missions%( \\(Fire Alarm System\\))? - [cC]anceled$',
            title: 'Kansellerte oppdrag',
            backgroundColor: '#7C7978',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Vehicle bought/,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Fullført oppgaven/,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Building constructed|Refund Building$|Building demolished without refund)/,
            title: 'Bygning bygget/revet',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(Station (upgraded( \(from small .*? station\))??|constructed)|Extended guard|Cancel:|Refund Building upgrade)/,
            title: 'Stasjon oppgradert',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /Completed task («.*?»|".*?")/,
            title: 'Fullført oppgave',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /Patient Treatment/,
            title: 'Pasienter',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Hospital - Alliance/,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Police - Alliance/,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Prisoner? Transported/,
            title: 'Fange',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /(education|Alliance Training Applicant)/,
            title: 'Utdanning',
            backgroundColor: '#ff00ff',
            textColor: 'white',
        },
        shitComplexes: {
            regex: /(Attached building to Building Complex Base|Upgraded to Building Complex Base|Upgraded to Building Complex|Building Complex Base upgrade finished)/,
            title: 'Bygningskompleks',
            backgroundColor: '#b5651d',
            textColor: 'white',
        },
        fireAlarmSystemCancel: {
            regex: /False Alarm/,
            titel: 'Falske alarmer',
            backgroundColor: '#c80815',
            textColor: 'white',
        },
    },
    category: 'Kategori',
    title: 'Oppsummering',
    total: 'Totalt',
    others: 'Annet',
    export: {
        export: 'Eksporter',
        json: {
            raw: 'JSON (raw)',
            prettified: 'JSON (prettified)',
        },
    },
};
