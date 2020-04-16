const files = require.context(
    '../',
    true,
    /modules\/(?!template).*?\/i18n\/de_DE.root(\.js(on)?)?/
);
const modules = {
    appstore: {
        save: 'Speichern',
        reset: 'Reset',
        search: 'Suche',
        noMapkit:
            'Dieses Modul funktioniert mit dem Kartentyp "Mapkit" wegen Beschränkungen seitens Mapkit nicht!',
        dev:
            'Dieses Modul befindet sich aktuell noch in der Entwicklung. Ein Aktivieren kann zu unvollständigen und fehlerhaften Funktionen führen!',
        closeWarning: {
            title: 'Ungespeicherte Änderungen',
            text:
                'Du hast Änderungen im AppStore vorgenommen, die noch nicht gespeichert sind. Setze sie zurück oder speichere sie, um den AppStore zu schliessen.',
            close: 'Meldung schliessen',
        },
    },
    settings: {
        name: 'Einstellungen',
        save: 'Speichern',
        discard: 'Änderungen verwerfen',
        reset: 'Reset',
        resetWarning: {
            title: 'Zurücksetzen der Einstellungen',
            text:
                'Möchtest du wirklich Einstellungen auf ihre Standardwerte zurücksetzen?',
            close: 'Abbrechen',
            total: 'Alle Einstellungen',
            module: 'Nur von diesem Modul',
        },
        closeWarning: {
            title: 'Ungespeicherte Änderungen',
            text:
                'Du hast Änderungen in den Einstellungen vorgenommen, die noch nicht gespeichert sind. Setze sie zurück, verwerfe sie oder speichere sie, um die Einstellungen zu schliessen.',
            close: 'Meldung schliessen',
        },
    },
};
files.keys().forEach(key => (modules[key.split('/')[2]] = files(key)));

module.exports = {
    modules,
    error: {
        title: 'LSS-Manager: Fehler',
        msg:
            'Sollte dieser Fehler öfters auftreten, so melde ihn bitte an das LSSM-Team!',
    },
    warnings: {
        version: {
            title: 'Falsche LSS-Manager Version',
            text:
                'Lieber Nutzer, leider mussten wir fetstellen, dass du nicht die neueste Version vom LSS-Manager hast. Die neuste Version ist {version}, du hast aber erst {curver}. Bitte lade das Spiel ohne Cache (mit Strg + F5, bei Apple-Geräten command + R) neu, das sollte den Fehler beheben. Sollte der Fehler weiterhin bestehen, bitte melde das an das Team! Bei der Nutzung einer falschen Version können wir nicht die volle Funktionalität des LSS-Managers gewährleisten.',
            close: 'Meldung schließen und Spiel neu laden (empfohlen)',
            abort: 'Meldung schließen ohne Spiel neu zu laden',
        },
    },
    vehicles: [
        {
            caption: 'LF 20',
        },
        {
            caption: 'LF 10',
        },
        {
            caption: 'DLK 23',
        },
        {
            caption: 'ELW 1',
        },
        {
            caption: 'RW',
        },
        {
            caption: 'GW-A',
        },
        {
            caption: 'LF 8/6',
        },
        {
            caption: 'LF 20/16',
        },
        {
            caption: 'LF 10/6',
        },
        {
            caption: 'LF 16-TS',
        },
        {
            caption: 'GW-Öl',
        },
        {
            caption: 'GW-L2-Wasser',
        },
        {
            caption: 'GW-Messtechnik',
        },
        {
            caption: 'SW 1000',
        },
        {
            caption: 'SW 2000',
        },
        {
            caption: 'SW 2000-Tr',
        },
        {
            caption: 'SW Kats',
        },
        {
            caption: 'TLF 2000',
        },
        {
            caption: 'TLF 3000',
        },
        {
            caption: 'TLF 8/8',
        },
        {
            caption: 'TLF 8/18',
        },
        {
            caption: 'TLF 16/24-Tr',
        },
        {
            caption: 'TLF 16/25',
        },
        {
            caption: 'TLF 16/45',
        },
        {
            caption: 'TLF 20/40',
        },
        {
            caption: 'TLF 20/40-SL',
        },
        {
            caption: 'TLF 16',
        },
        {
            caption: 'GW-Gefahrgut',
        },
        {
            caption: 'RTW',
        },
        {
            caption: 'NEF',
        },
        {
            caption: 'HLF 20',
        },
        {
            caption: 'RTH',
        },
        {
            caption: 'FuStW',
        },
        {
            caption: 'GW-Höhenrettung',
        },
        {
            caption: 'ELW 2',
        },
        {
            caption: 'leBefKw',
        },
        {
            caption: 'MTW',
        },
        {
            caption: 'TSF-W',
        },
        {
            caption: 'KTW',
        },
        {
            caption: 'GKW',
        },
        {
            caption: 'MTW-TZ',
        },
        {
            caption: 'MzKW',
        },
        {
            caption: 'LKW K 9',
        },
        {
            caption: 'BRmG R',
        },
        {
            caption: 'Anh DLE',
        },
        {
            caption: 'MLW 5',
        },
        {
            caption: 'WLF',
        },
        {
            caption: 'AB-Rüst',
        },
        {
            caption: 'AB-Atemschutz',
        },
        {
            caption: 'AB-Öl',
        },
        {
            caption: 'GruKw',
        },
        {
            caption: 'FüKw',
        },
        {
            caption: 'GefKw',
        },
        {
            caption: 'Dekon-P',
        },
        {
            caption: 'AB-Dekon-P',
        },
        {
            caption: 'KdoW-LNA',
        },
        {
            caption: 'KdoW-OrgL',
        },
        {
            caption: 'FwK',
        },
        {
            caption: 'KTW Typ B',
        },
        {
            caption: 'ELW 1 (SEG)',
        },
        {
            caption: 'GW-San',
        },
        {
            caption: 'Polizeihubschrauber',
        },
        {
            caption: 'AB-Schlauch',
        },
        {
            caption: 'GW-Taucher',
        },
        {
            caption: 'GW-Wasserrettung',
        },
        {
            caption: 'LKW 7 Lkr 19 tm',
        },
        {
            caption: 'Anh MzB',
        },
        {
            caption: 'Anh SchlB',
        },
        {
            caption: 'Anh MzAB',
        },
        {
            caption: 'Tauchkraftwagen',
        },
        {
            caption: 'MZB',
        },
        {
            caption: 'AB-MZB',
        },
        {
            caption: 'WaWe 10',
        },
        {
            caption: 'GRTW',
        },
        {
            caption: 'NAW',
        },
        {
            caption: 'FLF',
        },
        {
            caption: 'Rettungstreppe',
        },
        {
            caption: 'AB-Gefahrgut',
        },
        {
            caption: 'AB-Einsatzleitung',
        },
        {
            caption: 'SEK - ZF',
        },
        {
            caption: 'SEK - MTF',
        },
        {
            caption: 'MEK - ZF',
        },
        {
            caption: 'MEK - MTF',
        },
        {
            caption: 'GW-Werkfeuerwehr',
        },
        {
            caption: 'ULF mit Löscharm',
        },
        {
            caption: 'TM 50',
        },
        {
            caption: 'Turbolöscher',
        },
        {
            caption: 'TLF 4000',
        },
        {
            caption: 'KLF',
        },
        {
            caption: 'MLF',
        },
        {
            caption: 'HLF 10',
        },
    ],
    buildings: [
        {
            caption: 'Feuerwache',
            color: '#bb0000',
        },
        {
            caption: 'Feuerwehrschule',
            color: '#992222',
        },
        {
            caption: 'Rettungswache',
            color: '#ffa500',
        },
        {
            caption: 'Rettungsschule',
            color: '#ddc722',
        },
        {
            caption: 'Krankenhaus',
            color: '#bbe944',
        },
        {
            caption: 'Rettungshubschrauber-Station',
            color: '#e7ad2f',
        },
        {
            caption: 'Polizeiwache',
            color: '#007700',
        },
        {
            caption: 'Leitstelle',
            color: '#24c3ae',
        },
        {
            caption: 'Polizeischule',
            color: '#225522',
        },
        {
            caption: 'THW-Ortsverein',
            color: '#000f76',
        },
        {
            caption: 'THW Bundesschule',
            color: '#222d54',
        },
        {
            caption: 'Bereitschaftspolizei',
            color: '#227722',
        },
        {
            caption: 'Schnelleinsatzgruppe (SEG)',
            color: '#e05b00',
        },
        {
            caption: 'Polizeihubschrauberstation',
            color: '#148423',
        },
        {
            caption: 'Bereitstellungsraum',
        },
        {
            caption: 'Wasserrettung',
            color: '#7fffd4',
        },
        {
            caption: 'Verbandszellen',
        },
        {
            caption: 'Polizei-Sondereinheiten',
            color: '#1a7e23',
        },
        {
            caption: 'Feuerwache (Kleinwache)',
            color: '#aa1111',
        },
        {
            caption: 'Polizeiwache (Kleinwache)',
            color: '#116611',
        },
        {
            caption: 'Rettungswache (Kleinwache)',
            color: '#eeb611',
        },
    ],
    small_buildings: {
        0: 18,
        2: 20,
        6: 19,
    },
    buildingCategories: {
        Feuerwehr: {
            buildings: [0, 1, 18],
            color: '#ff0000',
        },
        Rettungsdienst: {
            buildings: [2, 3, 5, 12, 15, 20],
            color: '#ffa500',
        },
        Polizei: {
            buildings: [6, 8, 11, 13, 17, 19],
            color: '#008800',
        },
        THW: {
            buildings: [9, 10],
            color: '#0000ff',
        },
        Sonstiges: {
            buildings: [4, 7],
            color: '#02a18c',
        },
    },
    vehicleCategories: {
        Feuerwehr: {
            vehicles: {
                ['Löschfahrzeuge']: [90, 30, 1, 0, 37, 88, 89, 6, 7, 8, 9],
                ['Tanklöschfahrzeuge']: [
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26,
                    87,
                ],
                Schlauchwagen: [11, 13, 14, 15, 16],
                Sonderfahrzeuge: [2, 3, 4, 5, 10, 12, 27, 33, 34, 36, 53, 57],
                ['WLF & Abrollbehälter']: [46, 47, 48, 49, 54, 62, 71, 77, 78],
                Flughafenfeuerwehr: [75, 76],
                Werkfeuerwehr: [83, 84, 85, 86],
            },
            color: '#ff0000',
        },
        Rettungsdienst: {
            vehicles: {
                'Rettungsdienstfahrzeuge': [28, 29, 55, 56, 73, 74],
                'Rettungshubschrauber': [31],
                'KTW': [38],
                'SEG-Fahrzeuge': [58, 59, 60],
            },
            color: '#ffa500',
        },
        Polizei: {
            vehicles: {
                'Funkstreifenwagen': [32],
                'Bereitschaftspolizei-Fahrzeuge': [35, 50, 51, 52, 72],
                'Polizeihubschrauber': [61],
                'SEK': [79, 80],
                'MEK': [81, 82],
            },
            color: '#008800',
        },
        THW: {
            vehicles: {
                GKW: [39],
                Bergungsgruppe: [41],
                Zugtrupp: [40],
                ['Fachgruppe Räumen']: [42, 43, 44, 45],
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
    amount: 'Anzahl',
};

//
// export default {
//     modules: {
//         dashboard: {
//             name: 'Dashboard',
//             description:
//                 'Fügt eine Übersicht über eigene Gebäude und Fahrzeuge dem Spiel hinzu',
//             ...dashboard,
//         },
//     },
// };
