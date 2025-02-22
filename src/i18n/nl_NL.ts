const modules = {
    appstore: {
        save: 'Opslaan',
        reset: 'Reset',
        noMapkit:
            'Deze module werkt niet met de Mapkit kaart door de beperkingen van Mapkit!',
        dev: 'Deze module is nog in ontwikkeling. Activeren kan leiden tot incomplete en niet werkende functies!',
        closeWarning: {
            title: 'Niet opgeslagen wijzigingen',
            text: 'Je hebt aanpassingen gedaan in de AppStore die je nog niet hebt opgeslagen. Reset of sla de aanpassingen op om de AppStore te sluiten.',
            abort: 'Annuleren',
            saveAndExit: 'Opslaan en sluiten',
            exit: 'Sluiten zonder op te slaan',
        },
    },
    settings: {
        name: 'Instellingen',
        save: 'Opslaan',
        discard: 'Negeer wijzigingen',
        reset: 'Reset',
        export: 'Exporteer',
        import: 'Importeer',
        donate: 'donate voluntarily',
        appendableList: {
            unique: {
                title: 'Dubbele waarde',
                text: 'Er mag geen dubbele waarde zijn in de **{title}** kolom. De waarde **{value}** bestaat al!',
                confirm: 'OK',
            },
        },
        resetWarning: {
            title: 'Reset de instellingen',
            text: 'Weet je zeker dat je de instellingen wilt reseten naar de standaard waarden? Dit kan niet ongedaan gemaakt worden!',
            close: 'Annuleren',
            total: 'Alle instellingen',
            module: 'Alleen van de module <b>{module}</b>',
        },
        resetWarningSetting: {
            title: 'Reset instelling',
            text: 'Wil je echt de instelling <b>{setting}</b> van de module <b>{module}</b> terugzetten naar de standaard instellingen?',
            close: 'Annuleren',
            reset: 'Resetten',
        },
        closeWarning: {
            title: 'Niet opgeslagen wijzigingen',
            text: 'Je hebt aanpassingen gedaan die je nog niet hebt opgeslagen. Reset of sla de aanpassingen op om de instellingen te sluiten',
            abort: 'Annuleren',
            saveAndExit: 'Opslaan en sluiten',
            exit: 'Sluiten zonder op te slaan',
        },
        changeList: {
            true: 'Aan',
            false: 'Uit',
        },
        locationSelect: {
            location: 'Selecteer positie',
            zoom: 'Selecteer positie en zoom',
            sync: 'Gebruik huidige positie',
        },
    },
} as Record<string, Record<string, unknown>>;

export default {
    modules,
    buildingCategories: {
        Brandweer: {
            buildings: [0, 4, 17, 22, 23],
            color: '#ff2d2d',
        },
        Ambulance: {
            buildings: [2, 3, 6, 7, 13],
            color: '#ffa500',
        },
        Politie: {
            buildings: [5, 8, 9, 11, 18],
            color: '#00ac00',
        },
        Waterredding: {
            buildings: [16, 19, 20, 21],
            color: '#f5a42a',
        },
        Algemeen: {
            buildings: [1, 10, 14, 15],
            color: '#02a18c',
        },
    },
    vehicleCategories: {
        Brandweer: {
            vehicles: {
                'Tankautospuiten': [0, 1, 6, 7, 8, 9, 12, 14, 15, 17],
                'Overige voertuigen': [
                    2, 3, 4, 5, 10, 11, 18, 19, 20, 21, 24, 31, 34, 56, 62, 68,
                    70, 71, 72,
                ],
                'Waterongevallen': [33, 36, 49, 50],
                'Vliegtuigbrandbestrijding': [41, 42, 43, 44],
                'Haakarmbakken': [26, 27, 29, 32, 45, 51, 61, 69, 89, 91],
                'Signalisatie': [81, 82, 83],
                'STH': [90],
                'USAR': [92, 93, 94, 95, 96, 97],
                'Natuurbrandbestrijding': [85, 86, 87, 88],
            },
            color: '#ff2d2d',
        },
        Ambulance: {
            vehicles: {
                'Ambulances': [16, 30, 38, 52, 57, 63, 102, 103],
                'MMT voertuigen': [23, 37],
                'GGB': [100, 101],
            },
            color: '#ffa500',
        },
        Politie: {
            vehicles: {
                'Noodhulp': [22, 25, 46, 59],
                'Mobiele Eenheid': [39, 40, 64],
                'Hondengeleider': [47, 48],
                'Politiehelikopter': [28],
                'Officier van Dienst - Politie': [35],
                'Arrestatieteam': [53, 54, 55],
                'Arrestantenvervoer': [58],
                'Biketeam': [60],
                'Paarden': [73, 74, 75],
                'Dienst Infra': [46, 98, 99],
            },
            color: '#00ac00',
        },
        Waterredding: {
            vehicles: {
                Voertuigen: [65, 66, 76],
                Boten: [67, 77, 78, 79],
                Helikopters: [80],
            },
            color: '#f5a42a',
        },
    },
    small_buildings: {
        3: 13,
        0: 17,
        5: 18,
    },
    amount: 'Aantal',
    search: 'Zoeken',
    mapSearch: 'Locatie zoeken',
    alliance: 'Team',
    premiumNotice:
        'Deze functie breidt een premium functie van het spel uit en is daarom alleen beschikbaar voor spelers met een premium spelaccount!',
    credits: 'Credits',
    coins: 'Coins',
    close: 'Sluiten',
    fullscreen: {
        expand: 'Gebruik full-screen modus',
        compress: 'Schakel full-screen modus uit',
    },
    hideTitle: 'Titel weergeven | Titel verbergen',
    vehicle: 'Voertuigen | Voertuig | Voertuigen',
    building: 'Gebouwen',
    station: 'Posten | Post | Posten',
    distance: 'Afstand | Afstanden',
    vehicleType: 'Voertuig type',
    noOptions: 'Geen opties beschikbaar.',
    fmsReal2Show: {
        1: 4,
        2: 5,
        3: 1,
        4: 2,
        5: 7,
        6: 6,
        7: 3,
        9: 9,
    },
    fmsTexts: {
        1: 'Uitgerukt',
        2: 'Ter plaatse',
        3: 'Transport patiënt/arrestant',
        4: 'Beschikbaar',
        5: 'Op post',
        6: 'Buiten dienst',
        7: 'Aanvraag spraakcontact',
        9: 'Wachten op ophalen',
    },
    pois: [
        'Park',
        'Meer',
        'Ziekenhuis',
        'Bos',
        'Bushalte',
        'Tramhalte',
        'Station',
        'Centraal Station',
        'Rangeeremplacement',
        'Buurtsuper',
        'Supermarkt',
        'Tankstation',
        'School',
        'Museum',
        'Winkelcentrum',
        'Garagebedrijf',
        'Snelweg oprit / afrit',
        'Kerstmarkt',
        'Magazijn',
        'Café/Club',
        'Stadion',
        'Boerderij',
        'Kantoorgebouw',
        'Zwembad',
        'Spoorwegovergang',
        'Theater',
        'Marktplein',
        'Rivier',
        'Sloot',
        'Vliegveld (klein): Start-/Landingsbaan',
        'Vliegveld (klein): Hangaar',
        'Vliegveld (klein): Vliegtuig parkeerplaats',
        'Vliegveld (groot): Start-/Landingsbaan',
        'Vliegveld (groot): Terminal',
        'Vliegveld (groot): Platform / Gate',
        'Vliegveld (groot): Parkeergarage',
        'Parkeergarage',
        'Verzorgingshuis',
        'Manege',
        'Hotel',
        'Restaurant',
        'Bankkantoor',
        'Sporthal',
        'Camping',
        'Gevangenis',
        'Asielzoekerscentrum',
        'Afvalverwerker',
        'Kerkgebouw',
        'Bouwmarkt',
        'Transformatorhuisje',
        'Industrieterrein',
        'Bedrijventerrein',
        'Haventerrein',
        'Bouwterrein',
        'Silo',
        'Huisartsenpraktijk',
        'Sportveld',
        'Jachthaven',
        'Frietkraam',
        'Verzorgingsplaats (Snelweg)',
        'Zendmast',
        'Stadscentrum',
        'Strand',
        'Strandopgang',
        'Duinen',
        'Tunnel',
        'Vuurwerkopslag',
        'Gasverdeelstation',
        'Windmolenpark',
        'Pretpark',
        'Circuit',
        'Pontsteiger',
        'Nucleaire installatie',
        'Casino',
    ],
    only_alliance_missions: [41, 43, 59, 145, 234, 346, 347],
    transfer_missions: [137, 1103],
    ranks: {
        missionchief: {
            0: 'Aspirant',
            200: 'Brandwacht (Manschap A)',
            10_000: 'Hoofdbrandwacht (Manschap B)',
            100_000: 'Brandmeester',
            1_000_000: 'Hoofdbrandmeester',
            5_000_000: 'Commandeur',
            50_000_000: 'Adjunct-Hoofdcommandeur',
            500_000_000: 'Hoofdcommandeur',
            5_000_000_000: 'Erelid',
        },
        policechief: {
            0: 'Aspirant',
            200: 'Surveillant',
            10_000: 'Agent',
            100_000: 'Hoofdagent',
            1_000_000: 'Brigadier',
            5_000_000: 'Inspecteur',
            50_000_000: 'Hoofdinspecteur',
            500_000_000: 'Commissaris',
            5_000_000_000: 'Hoofdcommissaris',
        },
    },
};
