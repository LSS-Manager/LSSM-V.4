export default {
    amount: 'Počet',
    charts: {
        income: 'Příjmy',
        expenses: 'Výdaje',
    },
    categories: {
        allianceMission: {
            regex: /^\[Aliance\]/u,
            title: 'Alianční mise',
            backgroundColor: '#ff2800',
            textColor: 'white',
        },
        mission: {
            regex: '^%missions%( \\(Elektronická požární signalizace\\))?( - Planý poplach)?$',
            title: 'Vlastní mise',
            backgroundColor: '#ff2400',
            textColor: 'white',
        },
        cancelledMissions: {
            regex: '^%missions%( \\(Elektronická požární signalizace\\))? - [zZ]rušeno$',
            title: 'Zrušené mise',
            backgroundColor: '#7C7978',
            textColor: 'white',
        },
        buyVehicle: {
            regex: /Zakoupená vozidla/u,
            backgroundColor: '#007fff',
            textColor: 'white',
        },
        dailyLogin: {
            regex: /Denní odměna za přihlášení/u,
            backgroundColor: '#8db600',
            textColor: 'black',
        },
        buildings: {
            regex: /(Budova postavena|Budova odstraněna bez refundace|Refundovat budovu$)/u,
            title: 'Budovy postavené/smazané',
            backgroundColor: '#ed872d',
            textColor: 'black',
        },
        upgradeBuilding: {
            regex: /(Stanice (vylepšena( \(z malé .*? stanice\))??|vybudována)|Zrušit:|Vytvořená specializace|Specializace zrušena)/u,
            title: 'Rozšíření stanic',
            backgroundColor: '#000080',
            textColor: 'white',
        },
        task: {
            regex: /Dokončen úkol («.*?»|".*?")/u,
            title: 'Dokončené úkoly',
            backgroundColor: '#bb3385',
            textColor: 'white',
        },
        patients: {
            regex: /(Převoz a ošetření pacienta|Ošetření pacienta)/u,
            title: 'Zranění',
            backgroundColor: '#fff600',
            textColor: 'black',
        },
        alliancePatients: {
            regex: /Nemocnice – aliance/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        alliancePrisoners: {
            regex: /Policie – aliance/u,
            backgroundColor: '#ffff99',
            textColor: 'black',
        },
        prisoners: {
            regex: /Vězeň převezen/u,
            title: 'Vězni',
            backgroundColor: '#0bda51',
            textColor: 'black',
        },
        schoolings: {
            regex: /Školení personálu/u,
            title: 'Školení',
            backgroundColor: '#ff00ff',
            textColor: 'white',
        },
        shitComplexes: {
            regex: /(Připojení budovy k základně komplexu budov|Vylepšeno na základnu komplexu budov|Vylepšeno na komplex budov|Základna komplexu budov dokončena)/u,
            title: 'Komplex budov',
            backgroundColor: '#b5651d',
            textColor: 'white',
        },
        fireAlarmSystemCancel: {
            regex: /Planý poplach/u,
            titel: 'Plané poplachy',
            backgroundColor: '#c80815',
            textColor: 'white',
        },
    },
    category: 'Kategorie',
    title: 'Přehled',
    total: 'Celkem',
    others: 'Ostatní',
    export: {
        export: 'Exportovat',
        json: {
            raw: 'JSON (raw)',
            prettified: 'JSON (upravený)',
        },
        csv: 'CSV',
    },
};
