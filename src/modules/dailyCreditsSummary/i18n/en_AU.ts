export default {
    amount: 'Amount',
    charts: {
        income: 'Income',
        expenses: 'Expenses',
    },
    categories: {
        allianceMission: {
            regex: /^\[Alliance\]/u,
            title: 'Alliance Missions',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%( \\(Fire Alarm System\\))?( - False Alarm)?$',
            title: 'Own Missions',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        cancelledMissions: {
            regex: '^%missions%( \\(Fire Alarm System\\))? - [cC]anceled$',
            title: 'Cancelled Missions',
            backgroundColor: '#7C7978',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Vehicle bought/u,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Daily Login Reward/u,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Building constructed|Building demolished without refund|Refund Building$)/u,
            title: 'Building constructed/demolished',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(Station (upgraded( \(from small .*? station\))??|constructed)|Extended guard|Cancel:|Refund Building upgrade|Specialization (built|canceled))/u,
            title: 'Station constructed',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /Completed task («.*?»|".*?")/u,
            title: 'Completed Task',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /Patient Treatment/u,
            title: 'Patients',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Hospital - Alliance/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Police - Alliance/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Prisoner? Transported/u,
            title: 'Prisoner',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /(Alliance Training Applicant|education)/u,
            title: 'Education',
            backgroundColor: '#ff00ff',
            textColor: 'white',
        },
        shitComplexes: {
            regex: /(Attached building to Building Complex Base|Upgraded to Building Complex Base|Upgraded to Building Complex|Building Complex Base upgrade finished)/u,
            title: 'Building Complex',
            backgroundColor: '#b5651d',
            textColor: 'white',
        },
        fireAlarmSystemCancel: {
            regex: /False Alarm/u,
            titel: 'False Alarms',
            backgroundColor: '#c80815',
            textColor: 'white',
        },
    },
    category: 'Category',
    title: 'Summary',
    total: 'Total',
    others: 'Others',
    export: {
        export: 'Export',
        json: {
            raw: 'JSON (raw)',
            prettified: 'JSON (prettified)',
        },
        csv: 'CSV',
    },
};
