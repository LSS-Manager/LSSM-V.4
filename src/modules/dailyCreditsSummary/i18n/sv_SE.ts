export default {
    amount: 'Saldo',
    charts: {
        income: 'Inkomster',
        expenses: 'Utgifter',
    },
    categories: {
        allianceMission: {
            regex: /^\[Alliance]/,
            title: 'Alliansuppdrag',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%( \\(Fire Alarm System\\))?( - False Alarm)?$',
            title: 'Egna uppdrag',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        cancelledMissions: {
            regex: '^%missions%( \\(Fire Alarm System\\))? - [cC]anceled$',
            title: 'Avbrutna uppdrag',
            backgroundColor: '#7C7978',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Fordon köpt/,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Daglig inloggningsbelöning/,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Byggnad uppförd|Återlämna byggnad|Byggnad förstörd utan återbetalning)/,
            title: 'Byggnader: Uppförda/Återbetalade/Rivna',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(Station (upgraded( \(from small .*? station\))??|constructed)|Extended guard|Cancel:|Refund Building upgrade)/,
            title: 'Uppgraderade stationer',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /Completed task («.*?»|".*?")/,
            title: 'Avslutad uppgift',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /(Patientbehandling|Patientbehandling och transport|Patientbehandling och transport via Ambulanshelikopter)/,
            title: 'Patientbehandling och transport',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Sjukhus – allians/,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Police - Alliance/,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Fånge transporterad/,
            title: 'Fånge',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /(Personalutbildning|Alliance Training Applicant)/,
            title: 'Utbildning',
            backgroundColor: '#ff00ff',
            textColor: 'white',
        },
        shitComplexes: {
            regex: /(Attached building to Building Complex Base|Upgraded to Building Complex Base|Upgraded to Building Complex|Building Complex Base upgrade finished)/,
            title: 'Byggnadskomplex',
            backgroundColor: '#b5651d',
            textColor: 'white',
        },
        fireAlarmSystemCancel: {
            regex: /False Alarm/,
            titel: 'Falska larm',
            backgroundColor: '#c80815',
            textColor: 'white',
        },
    },
    category: 'Kategori',
    title: 'Sammanställning',
    total: 'Totalt',
    others: 'Övrigt',
    export: {
        export: 'Export',
        json: {
            raw: 'JSON (raw)',
            prettified: 'JSON (prettified)',
        },
    },
};
