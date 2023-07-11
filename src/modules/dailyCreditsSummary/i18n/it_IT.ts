export default {
    amount: 'Quantità',
    charts: {
        income: 'Introiti',
        expenses: 'Spese',
    },
    categories: {
        allianceMission: {
            regex: /^\[Alleanza\]/u,
            title: "Missioni dell'alleanza",
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%( \\(Sistema di allarme antincendio\\))?( - Falso allarme)?$',
            title: 'Missioni Proprie',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        cancelledMissions: {
            regex: '^%missions%( \\(Sistema di allarme antincendio\\))? - [aA]nnullata$',
            title: 'Missioni Cancellate',
            backgroundColor: '#7C7978',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Veicolo acquistato/u,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Ricompensa per accesso giornaliero/u,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Building demolished without refund|Edificio costruito|Refund Building$)/u,
            title: 'Edificio costruito/demolito',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(Stazione (upgraded( \(from small .*? station\))??|costruita)|Guardia estesa|Cancel:|Refund Building upgrade|Specializzazione (annullata|costruita))/u,
            title: 'Stazione costruita',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /Attività ".*?"/u,
            title: 'Attività completata',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /Trattamento Paziente/u,
            title: 'Pazienti',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Ospedale - Alleanza/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Polizia - Alleanza/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Prigioniero? Trasportato/u,
            title: 'Prigioniero',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /(Alliance Training Applicant|education)/u,
            title: 'Educazione',
            backgroundColor: '#ff00ff',
            textColor: 'white',
        },
        shitComplexes: {
            regex: /(Attached building to Building Complex Base|Upgraded to Building Complex Base|Upgraded to Building Complex|Building Complex Base upgrade finished)/u,
            title: 'Complesso di Edifici',
            backgroundColor: '#b5651d',
            textColor: 'white',
        },
        fireAlarmSystemCancel: {
            regex: /Falso Allarme/u,
            titel: 'Falso Allarme',
            backgroundColor: '#c80815',
            textColor: 'white',
        },
    },
    category: 'Categoria',
    title: 'Riepilogo',
    total: 'Totale',
    others: 'Altro',
    export: {
        export: 'Esporta',
        json: {
            raw: 'JSON (grezzo)',
            prettified: 'JSON (abbellito)',
        },
        csv: 'CSV',
    },
};
