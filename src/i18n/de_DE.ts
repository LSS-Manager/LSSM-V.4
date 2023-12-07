const modules = {
    appstore: {
        save: 'Speichern',
        reset: 'Reset',
        noMapkit:
            'Dieses Modul funktioniert mit dem Kartentyp "Mapkit" wegen Beschränkungen seitens Mapkit nicht!',
        dev: 'Dieses Modul befindet sich aktuell noch in der Entwicklung. Ein Aktivieren kann zu unvollständigen und fehlerhaften Funktionen führen!',
        closeWarning: {
            title: 'Ungespeicherte Änderungen',
            text: 'Du hast Änderungen im AppStore vorgenommen, die noch nicht gespeichert sind. Setze sie zurück oder speichere sie, um den AppStore zu schließen.',
            abort: 'Abbrechen',
            saveAndExit: 'Speichern und verlassen',
            exit: 'Ohne Speichern verlassen',
        },
    },
    settings: {
        name: 'Einstellungen',
        save: 'Speichern',
        discard: 'Änderungen verwerfen',
        reset: 'Reset',
        export: 'Exportieren',
        import: 'Importieren',
        donate: 'freiwillig Spenden',
        appendableList: {
            unique: {
                title: 'Doppelter Wert',
                text: 'In der Spalte **{title}** dürfen keine doppelten Werte vorkommen. Der Wert **{value}** ist bereits vorhanden!',
                confirm: 'OK',
            },
        },
        resetWarning: {
            title: 'Zurücksetzen der Einstellungen',
            text: 'Möchtest du wirklich Einstellungen auf ihre Standardwerte zurücksetzen? Dies lässt sich nicht rückgängig machen!',
            close: 'Abbrechen',
            total: 'Alle Einstellungen',
            module: 'Nur von diesem Modul <b>{module}</b>',
        },
        resetWarningSetting: {
            title: 'Einstellung zurücksetzen',
            text: 'Möchtest du wirklich diese eine Einstellung <b>{setting}</b> des Moduls <b>{module}</b> auf ihren Standartwert zurücksetzen?',
            close: 'Abbrechen',
            reset: 'Zurücksetzen',
        },
        closeWarning: {
            title: 'Ungespeicherte Änderungen',
            text: 'Du hast Änderungen in den Einstellungen vorgenommen, die noch nicht gespeichert sind. Setze sie zurück, verwerfe sie oder speichere sie, um die Einstellungen zu schließen.',
            abort: 'Abbrechen',
            saveAndExit: 'Speichern und verlassen',
            exit: 'Ohne Speichern verlassen',
        },
        changeList: {
            true: 'An',
            false: 'Aus',
        },
        locationSelect: {
            location: 'Position auswählen',
            zoom: 'Position und Zoomstufe auswählen',
            sync: 'aktuelle Position verwenden',
        },
    },
} as Record<string, Record<string, unknown>>;

export default {
    modules,
    buildingCategories: {
        Feuerwehr: {
            buildings: [0, 1, 18],
            color: '#ff2d2d',
        },
        Rettungsdienst: {
            buildings: [2, 3, 5, 12, 15, 20, 21],
            color: '#ffa500',
        },
        Polizei: {
            buildings: [6, 8, 11, 13, 17, 19],
            color: '#00ac00',
        },
        THW: {
            buildings: [9, 10],
            color: '#0000ff',
        },
        Sonstiges: {
            buildings: [4, 7, 14, 16, 22, 23],
            color: '#02a18c',
        },
    },
    vehicleCategories: {
        Feuerwehr: {
            vehicles: {
                ['Löschfahrzeuge']: [0, 1, 6, 7, 8, 9, 30, 37, 88, 89, 90],
                ['Tanklöschfahrzeuge']: [
                    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 87, 121,
                ],
                Schlauchwagen: [11, 13, 14, 15, 16],
                Sonderfahrzeuge: [
                    2, 3, 4, 5, 10, 12, 27, 33, 34, 36, 53, 57, 114, 115, 118,
                    120, 126, 128, 129,
                ],
                ['WLF & Abrollbehälter']: [
                    46, 47, 48, 49, 54, 62, 71, 77, 78, 108, 116, 117, 119,
                ],
                Flughafenfeuerwehr: [75, 76],
                Werkfeuerwehr: [83, 84, 85, 86],
                Logistikfahrzeuge: [104, 105, 106, 107],
                Netzersatzanlagen: [111, 113],
            },
            color: '#ff2d2d',
        },
        Rettungsdienst: {
            vehicles: {
                'Rettungsdienstfahrzeuge': [28, 29, 55, 56, 73, 74, 97],
                'Rettungshubschrauber': [31],
                'KTW': [38],
                'SEG-Fahrzeuge': [58, 59, 60],
                'Rettungshundefahrzeuge': [91],
                'Drohne': [127],
                ['BT & VPF']: [130, 131, 132, 133],
            },
            color: '#ffa500',
        },
        Polizei: {
            vehicles: {
                'Funkstreifenwagen': [32, 95, 98, 103],
                'Bereitschaftspolizei-Fahrzeuge': [35, 50, 51, 52, 72],
                'Polizeihubschrauber': [61, 96],
                'SEK': [79, 80],
                'MEK': [81, 82],
                'Diensthunde': [94],
            },
            color: '#00ac00',
        },
        THW: {
            vehicles: {
                'GKW': [39],
                'Notversorgung': [41, 110],
                'Zugtrupp': [40],
                ['Fachgruppe Räumen']: [42, 43, 44, 45],
                'Fachgruppe Ortung': [92, 93],
                'Fachgruppe Wasserschaden/Pumpen': [100, 101, 102, 123],
                'Schwere Bergung': [109],
                'Netzersatzanlagen': [112, 122],
                'MTW-OV': [124],
                'Tr UL': [125],
            },
            color: '#0000ff',
        },
        Wasserrettung: {
            vehicles: {
                ['Rettungsdienst & Feuerwehr']: [63, 64, 70],
                THW: [65, 66, 67, 68, 69],
            },
            color: '#02a18c',
        },
    },
    small_buildings: {
        0: 18,
        2: 20,
        6: 19,
    },
    amount: 'Anzahl',
    search: 'Suche',
    mapSearch: 'Ort Suchen...',
    alliance: 'Verband',
    premiumNotice:
        'Diese Funktion erweitert eine Premium-Funktion des Spiels und ist deshalb nur für Spieler mit einem Leitstellenspiel-Premium-Account verfügbar!',
    credits: 'Credits',
    coins: 'Coins',
    close: 'Schließen',
    fullscreen: {
        expand: 'Vollbildmodus aktivieren',
        compress: 'Vollbildmodus deaktivieren',
    },
    hideTitle: 'Überschrift anzeigen | Überschrift verstecken',
    vehicle: 'Fahrzeuge | Fahrzeug | Fahrzeuge',
    building: 'Gebäude',
    station: 'Wachen | Wache | Wachen',
    distance: 'Entfernung | Entferungen',
    vehicleType: 'Fahrzeugtyp',
    noOptions: 'Keine Auswahlmöglichkeiten passen zu deiner Suche.',
    fmsReal2Show: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        9: 9,
    },
    fmsTexts: {
        1: 'Einsatzbereit über Funk',
        2: 'Einsatzbereit auf Wache',
        3: 'Auf Anfahrt',
        4: 'Am Einsatzort',
        5: 'Sprechwunsch',
        6: 'Nicht einsatzbereit',
        7: 'Transportfahrt',
        9: 'Wartet auf Abholung',
    },
    pois: [
        'Park',
        'See',
        'Krankenhaus',
        'Wald',
        'Bushaltestelle',
        'Straßenbahnhaltestelle',
        'Bahnhof (Regionalverkehr)',
        'Bahnhof (Regional und Fernverkehr)',
        'Güterbahnhof',
        'Supermarkt (Klein)',
        'Supermarkt (Groß)',
        'Tankstelle',
        'Schule',
        'Museum',
        'Einkaufszentrum',
        'Auto-Werkstatt',
        'Autobahnauf.- / abfahrt',
        'Weihnachtsmarkt',
        'Lagerhalle',
        'Diskothek',
        'Stadion',
        'Bauernhof',
        'Bürokomplex',
        'Schwimmbad',
        'Bahnübergang',
        'Theater',
        'Festplatz',
        'Fluss',
        'Baumarkt',
        'Flughafen (klein): Start-/Landebahn',
        'Flughafen (klein): Gebäude',
        'Flughafen (klein): Flugzeug Standplatz',
        'Flughafen (groß): Start-/Landebahn',
        'Flughafen (groß): Terminal',
        'Flughafen (groß): Vorfeld / Standplätze',
        'Flughafen (groß): Parkhaus',
        'Biogasanlage',
        'Bank',
        'Kirche',
        'Chemiepark',
        'Industrie-Allgemein',
        'Automobilindustrie',
        'Müllverbrennungsanlage',
        'Eishalle',
        'Holzverarbeitung',
        'Motorsportanlage',
        'Tunnel',
        'Klärwerk',
        'Innenstadt',
        'Möbelhaus',
        'Campingplatz',
        'Kompostieranlage',
        'Textilverarbeitung',
        'Moor',
        'Hüttenwerk',
        'Kraftwerk',
        'Werksgelände',
    ],
    only_alliance_missions: [41, 43, 59, 75, 99, 207, 221, 222, 256, 350],
    transfer_missions: [147, 613],
    ranks: {
        missionchief: {
            0: 'Anwärter(in)',
            200: 'Feuerwehrmann/-frau',
            10_000: 'Oberfeuerwehrmann/-frau',
            100_000: 'Hauptfeuerwehrmann/-frau',
            1_000_000: 'Stv. Gruppenführer(in)',
            5_000_000: 'Gruppenführer(in)',
            10_000_000: 'Stv. Zugführer(in)',
            20_000_000: 'Zugführer(in)',
            50_000_000: 'Stv. Wehrführer(in)',
            100_000_000: 'Wehrführer(in)',
            200_000_000: 'Stv. Kreisbrandmeister(in)',
            500_000_000: 'Kreisbrandmeister(in)',
            1_000_000_000: 'Stv. Landesbrandmeister(in)',
            2_000_000_000: 'Landesbrandmeister(in)',
            5_000_000_000: 'Ehrenmitglied',
            10_000_000_000: 'Stv. Bundesbranddirektor(in)',
        },
        policechief: {
            0: 'Polizeimeisteranwärter(in)',
            200: 'Polizeimeister(in)',
            10_000: 'Polizeiobermeister(in)',
            100_000: 'Polizeihauptmeister(in)',
            1_000_000: 'Polizeikommissar(in)',
            5_000_000: 'Polizeioberkommissar(in)',
            10_000_000: 'Polizeihauptkommissar(in)',
            20_000_000: 'Erste(r) Polizeihauptkommissar(in)',
            50_000_000: 'Polizeirat / Polizeirätin',
            100_000_000: 'Polizeioberrat / Polizeioberrätin',
            200_000_000: 'Polizeidirektor(in)',
            500_000_000: 'Leitende(r) Polizeidirektor(in)',
            1_000_000_000: 'Direktor(in) der Bundespolizei',
            2_000_000_000: 'Präsident(in) der Bundespolizeidirektion',
            5_000_000_000: 'Vizepräsident(in) der Bundespolizei',
            10_000_000_000: 'Präsident(in) der Bundespolizei',
        },
    },
};
