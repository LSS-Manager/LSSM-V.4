export default {
    amount: 'Määrä',
    charts: {
        income: 'Tulot',
        expenses: 'Kulut',
    },
    categories: {
        allianceMission: {
            regex: /^\[Liittouma\]/u,
            title: 'Liittouma tehtävät',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%( \\(Palohälytysjärjestelmä\\))?( - Väärä hälytys)?$',
            title: 'Omat tehtävät',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        cancelledMissions: {
            regex: '^%missions%( \\(Palohälytysjärjestelmä\\))? – [pP]eruutettu$',
            title: 'Peruutetut tehtävät',
            backgroundColor: '#7C7978',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Ajoneuvo ostettu/u,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Päivittäisen kirjautumisen palkinto/u,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Asema rakennettu|Building demolished without refund|Palauta rahat rakennuksesta$)/u,
            title: 'Rakennettu/purettu rakennus',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(Station (upgraded( \(from small .*? station\))??|constructed)|Extended guard|Cancel:|Refund Building upgrade|Erikoistuminen (peruutettu|rakennettu))/u,
            title: 'Rakennettu asema',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /(«.*?»|".*?"|.*?) suoritettu$/u,
            title: 'Suoritettu tehtävä',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /Potilaan hoito/u,
            title: 'Potilaat',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Sairaala - liittouma/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Poliisi - liittouma/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Vanki? /u,
            title: 'Vanki',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /(Alliance Training Applicant|education)/u,
            title: 'Koulutus',
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
    category: 'Kategoria',
    title: 'Yhteenveto',
    total: 'Yhteensä',
    others: 'Muut',
    export: {
        export: 'Export',
        json: {
            raw: 'JSON (raw)',
            prettified: 'JSON (prettified)',
        },
        csv: 'CSV',
    },
};
