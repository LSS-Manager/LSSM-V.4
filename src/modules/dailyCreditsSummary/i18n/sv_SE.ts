export default {
    amount: 'Saldo',
    charts: {
        income: 'Inkomster',
        expenses: 'Utgifter',
    },
    categories: {
        allianceMission: {
            regex: /^\[Allians]/,
            title: 'Alliansuppdrag',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%( \\(Automatlarm\\))?( - Falskt alarm)?$',
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
            regex: /(Byggnad uppförd|Återlämna byggnad|Byggnad förstörd utan återbetalning|Station byggd)/,
            title: 'Byggnader',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(– Utbyggnad$|Avbryt:|Refund Building upgrade)/,
            title: 'Stationsuppgraderingar',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /^Klarade uppgiften/,
            title: 'Avslutade uppgifter',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /Patientbehandling/,
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
            regex: /Polis – Allians/,
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
            regex: /(Personalutbildning|utbildning($| Avbrutet))/,
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
            regex: /Falskt alarm/,
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
