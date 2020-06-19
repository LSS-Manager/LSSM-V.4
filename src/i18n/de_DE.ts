const moduleRootFiles = require.context('../', true, MODULE_ROOT_I18N_FILES);
const furtherFiles = require.context('./de_DE/', true, /.*(\/index)?\.js(on)?/);
const modules = {
    appstore: {
        save: 'Speichern',
        reset: 'Reset',
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
                'Möchtest du wirklich Einstellungen auf ihre Standardwerte zurücksetzen? Dies lässt sich nicht rückgängig machen!',
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
} as { [moduleId: string]: { [key: string]: unknown } };
moduleRootFiles
    .keys()
    .forEach(key => (modules[key.split('/')[2]] = moduleRootFiles(key)));

const t = {} as { [key: string]: unknown };

furtherFiles
    .keys()
    .forEach(
        key => (t[key.split('/')[1].replace(/\..*$/, '')] = furtherFiles(key))
    );

export default {
    modules,
    ...t,
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
    globalSettings: {
        name: 'Allgemeine Einstellungen',
        labelInMenu: {
            title: 'Label statt Icon im Menü',
            description:
                'Zeigt in der Navigationsleiste statt dem LSSM-Logo ein einfaches Label an.',
        },
    },
    vehicles: [
        {
            caption: 'LF 20',
            color: '#cc0000',
            coins: 25,
            credits: 5_000,
            minPersonnel: 1,
            maxPersonnel: 9,
            wtank: 2_000,
            special: '',
        },
        {
            caption: 'LF 10',
            color: '#bb0000',
        },
        {
            caption: 'DLK 23',
            color: '#d92626',
        },
        {
            caption: 'ELW 1',
            color: '#d02525',
        },
        {
            caption: 'RW',
            color: '#ad1f1f',
        },
        {
            caption: 'GW-A',
            color: '#9c1c1c',
        },
        {
            caption: 'LF 8/6',
            color: '#aa0000',
        },
        {
            caption: 'LF 20/16',
            color: '#990000',
        },
        {
            caption: 'LF 10/6',
            color: '#880000',
        },
        {
            caption: 'LF 16-TS',
            color: '#770000',
        },
        {
            caption: 'GW-Öl',
            color: '#8b1818',
        },
        {
            caption: 'GW-L2-Wasser',
            color: '#e61919',
        },
        {
            caption: 'GW-Messtechnik',
            color: '#791515',
        },
        {
            caption: 'SW 1000',
            color: '#dc1818',
        },
        {
            caption: 'SW 2000',
            color: '#ca1616',
        },
        {
            caption: 'SW 2000-Tr',
            color: '#b81414',
        },
        {
            caption: 'SW Kats',
            color: '#a51212',
        },
        {
            caption: 'TLF 2000',
            color: '#cc2222',
        },
        {
            caption: 'TLF 3000',
            color: '#bb2222',
        },
        {
            caption: 'TLF 8/8',
            color: '#aa2222',
        },
        {
            caption: 'TLF 8/18',
            color: '#992222',
        },
        {
            caption: 'TLF 16/24-Tr',
            color: '#882222',
        },
        {
            caption: 'TLF 16/25',
            color: '#772222',
        },
        {
            caption: 'TLF 16/45',
            color: '#662222',
        },
        {
            caption: 'TLF 20/40',
            color: '#552222',
        },
        {
            caption: 'TLF 20/40-SL',
            color: '#442222',
        },
        {
            caption: 'TLF 16',
            color: '#332222',
        },
        {
            caption: 'GW-Gefahrgut',
            color: '#681212',
        },
        {
            caption: 'RTW',
            color: '#f59f00',
        },
        {
            caption: 'NEF',
            color: '#e09200',
        },
        {
            caption: 'HLF 20',
            color: '#440000',
        },
        {
            caption: 'RTH',
            color: '#ddaa3c',
        },
        {
            caption: 'FuStW',
            color: '#005500',
        },
        {
            caption: 'GW-Höhenrettung',
            color: '#570f0f',
        },
        {
            caption: 'ELW 2',
            color: '#bf2222',
        },
        {
            caption: 'leBefKw',
            color: '#288f28',
        },
        {
            caption: 'MTW',
            color: '#450c0c',
        },
        {
            caption: 'TSF-W',
            color: '#220000',
        },
        {
            caption: 'KTW',
            color: '#ffb61a',
        },
        {
            caption: 'GKW',
            color: '#00138f',
        },
        {
            caption: 'MTW-TZ',
            color: '#0016a3',
        },
        {
            caption: 'MzKW',
            color: '#0018b8',
        },
        {
            caption: 'LKW K 9',
            color: '#001bcc',
        },
        {
            caption: 'BRmG R',
            color: '#001ee0',
        },
        {
            caption: 'Anh DLE',
            color: '#0021f5',
        },
        {
            caption: 'MLW 5',
            color: '#0a2bff',
        },
        {
            caption: 'WLF',
            color: '#f04242',
        },
        {
            caption: 'AB-Rüst',
            color: '#ad0e0e',
        },
        {
            caption: 'AB-Atemschutz',
            color: '#9c0b0b',
        },
        {
            caption: 'AB-Öl',
            color: '#8b0707',
        },
        {
            caption: 'GruKw',
            color: '#2d9f29',
        },
        {
            caption: 'FüKw',
            color: '#31af31',
        },
        {
            caption: 'GefKw',
            color: '#36bf36',
        },
        {
            caption: 'Dekon-P',
            color: '#450909',
        },
        {
            caption: 'AB-Dekon-P',
            color: '#450707',
        },
        {
            caption: 'KdoW-LNA',
            color: '#805c0f',
        },
        {
            caption: 'KdoW-OrgL',
            color: '#926911',
        },
        {
            caption: 'FwK',
            color: '#230606',
        },
        {
            caption: 'KTW Typ B',
            color: '#cc5200',
        },
        {
            caption: 'ELW 1 (SEG)',
            color: '#a34100',
        },
        {
            caption: 'GW-San',
            color: '#8f3900',
        },
        {
            caption: 'Polizeihubschrauber',
            color: '#14743f',
        },
        {
            caption: 'AB-Schlauch',
            color: '#e60808',
        },
        {
            caption: 'GW-Taucher',
            color: '#88ecc4',
        },
        {
            caption: 'GW-Wasserrettung',
            color: '#91dab5',
        },
        {
            caption: 'LKW 7 Lkr 19 tm',
            color: '#123183',
        },
        {
            caption: 'Anh MzB',
            color: '#1b428a',
        },
        {
            caption: 'Anh SchlB',
            color: '#245390',
        },
        {
            caption: 'Anh MzAB',
            color: '#296497',
        },
        {
            caption: 'Tauchkraftwagen',
            color: '#36759e',
        },
        {
            caption: 'MZB',
            color: '#9ac8a6',
        },
        {
            caption: 'AB-MZB',
            color: '#bf7f6a',
        },
        {
            caption: 'WaWe 10',
            color: '#36b15d',
        },
        {
            caption: 'GRTW',
            color: '#cc8500',
        },
        {
            caption: 'NAW',
            color: '#b87700',
        },
        {
            caption: 'FLF',
            color: '#7a534a',
        },
        {
            caption: 'Rettungstreppe',
            color: '#6f6157',
        },
        {
            caption: 'AB-Gefahrgut',
            color: '#680101',
        },
        {
            caption: 'AB-Einsatzleitung',
            color: '#bf1111',
        },
        {
            caption: 'SEK - ZF',
            color: '#217d1a',
        },
        {
            caption: 'SEK - MTF',
            color: '#1a7d1b',
        },
        {
            caption: 'MEK - ZF',
            color: '#1a7d22',
        },
        {
            caption: 'MEK - MTF',
            color: '#1a7d2a',
        },
        {
            caption: 'GW-Werkfeuerwehr',
            color: '#99222b',
        },
        {
            caption: 'ULF mit Löscharm',
            color: '#992234',
        },
        {
            caption: 'TM 50',
            color: '#992b22',
        },
        {
            caption: 'Turbolöscher',
            color: '#993422',
        },
        {
            caption: 'TLF 4000',
            color: '#dd2222',
        },
        {
            caption: 'KLF',
            color: '#660000',
        },
        {
            caption: 'MLF',
            color: '#550000',
        },
        {
            caption: 'HLF 10',
            color: '#330000',
        },
        {
            caption: 'Rettungshundefahrzeug',
            color: '#663300',
        },
        {
            caption: 'Anh Hund',
            color: '#422629',
        },
        {
            caption: 'MTW-OV',
            color: '#14165e',
        },
    ],
    buildings: [
        {
            caption: 'Feuerwache',
            color: '#bb0000',
            coins: 30,
            credits: 100_000,
            extensions: [
                {
                    caption: 'Rettungsdienst',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Tage',
                },
                {
                    caption: 'Wasserrettung',
                    credits: 400_000,
                    coins: 25,
                    duration: '7 Tage',
                },
                {
                    caption: 'Flughafen',
                    credits: 300_000,
                    coins: 25,
                    duration: '7 Tage',
                },
                {
                    caption: 'Großwache',
                    credits: 1_000_000,
                    coins: 50,
                    duration: '7 Tage',
                },
                {
                    caption: 'Werkfeuerwehr',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Tage',
                },
                {
                    caption: 'Abrollbehälter-Stellplatz (bis zu 9 mal)',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Tage',
                },
            ],
            levelcost: ['1. 10.000', '2. 50.000', '3.-16. 100.000'],
            maxBuildings: 2_400,
            maxLevel: 16,
            special:
                'Ab der 24. Feuerwache steigen die Kosten für den Neubau einer Wache nach folgender Formel: <code>100.000+200.000*LOG<sub>2</sub>(Anzahl der vorhandenen Feuerwachen − 22)</code>. Der Coins-Preis bleibt konstant!',
            startPersonnel: 10,
            startVehicles: [
                'LF 20',
                'LF 10',
                'LF 8/6',
                'LF 20/16',
                'LF 10/6',
                'LF 16-TS',
                'KLF',
                'MLF',
                'TSF-W',
                '(HLF 20 und HLF 10 ab Dienstgrad "Gruppenfüher(in)" => Baukosten 20.000 höher)',
            ],
        },
        {
            caption: 'Feuerwehrschule',
            color: '#992222',
            coins: 50,
            credits: 500_000,
            extensions: [
                {
                    caption: 'Klassenzimmer (bis zu 3 mal)',
                    credits: 400_000,
                    coins: 40,
                    duration: '7 Tage',
                },
            ],
            levelcost: [],
            maxBuildings: 'Keine Grenze',
            maxLevel: 0,
            special:
                'Finanzminister und Admins können Verbands-Feuerwehrschulen mit Hilfe von Credits aus der Verbandskasse (aus-)bauen. Lehrgangsmeister und Admins können Lehrgänge an Verbands-Feuerwehrschulen starten.',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Rettungswache',
            color: '#ffa500',
            coins: 35,
            credits: 200_000,
            extensions: [],
            levelcost: ['1. 10.000', '2. 50.000', '3.-14. 100.000'],
            maxBuildings: 'Keine Grenze',
            maxLevel: 14,
            special: '',
            startPersonnel: 3,
            startVehicles: ['RTW'],
        },
        {
            caption: 'Rettungsschule',
            color: '#ddc722',
            coins: 50,
            credits: 500_000,
            extensions: [
                {
                    caption: 'Klassenzimmer (bis zu 3 mal)',
                    credits: 400_000,
                    coins: 40,
                    duration: '7 Tage',
                },
            ],
            levelcost: [],
            maxBuildings: 'Keine Grenze',
            maxLevel: 0,
            special:
                'Finanzminister und Admins können Verbands-Rettungsschulen mit Hilfe von Credits aus der Verbandskasse (aus-)bauen. Lehrgangsmeister und Admins können Lehrgänge an Verbands-Rettungsschulen starten.',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Krankenhaus',
            color: '#bbe944',
            coins: 25,
            credits: 200_000,
            extensions: [
                {
                    caption: '"Allgemeine Innere" und "Allgemeine Chirugie"',
                    credits: 10_000,
                    coins: 10,
                    duration: '7 Tage',
                },
                {
                    caption: 'verschiedene Fachrichtungen',
                    credits: 70_000,
                    coins: 15,
                },
            ],
            levelcost: ['1.-20. 19.000 Credits / 11 Coins'],
            maxBuildings: 'Keine Grenze',
            maxLevel: 20,
            special:
                'Finanzminister und Admins können Verbands-Krankenhäuser mit Hilfe von Credits aus der Verbandskasse (aus-)bauen.',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Rettungshubschrauber-Station',
            color: '#e7ad2f',
            coins: 50,
            credits: 1_000_000,
            extensions: [],
            levelcost: ['1.-7. 1.000.000 Credits / 50 Coins'],
            maxBuildings: 'siehe Besonderheiten',
            maxLevel: 6,
            special:
                'Pro Station können bis zu 7 Landeplätze gebaut werden (Ausbaustufen). Bis zum 125. Gebäude (aller Art) können insgesamt max. 4 Landeplätze gebaut werden. Danach wächst die Zahl alle 25 Geäude um 1 (Beginnend beim 125.).',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Polizeiwache',
            color: '#007700',
            coins: 35,
            credits: 100_000,
            extensions: [
                {
                    caption: 'Zelle (bis zu 10 mal)',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Tage',
                },
            ],
            levelcost: ['1. 10.000', '2. 50.000', '3.-14. 100.000'],
            maxBuildings: 1_100,
            maxLevel: 14,
            special:
                'Ab der 24. Polizeiwache steigen die Kosten für den Neubau einer Wache nach folgender Formel: <code>100.000+200.000*LOG<sub>2</sub>(Anzahl der vorhandenen Polizeiache − 22)</code>. Der Coins-Preis bleibt konstant!',
            startPersonnel: 2,
            startVehicles: ['FuStW'],
        },
        {
            caption: 'Leitstelle',
            color: '#24c3ae',
            coins: 0,
            credits: 0,
            extensions: [],
            levelcost: [],
            maxBuildings: 'Alle 25 Gebäude eine Leitstelle',
            maxLevel: 0,
            special: 'Die Leitstelle ist die Verwaltungszentrale.',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Polizeischule',
            color: '#225522',
            coins: 50,
            credits: 500_000,
            extensions: [
                {
                    caption: 'Klassenzimmer (bis zu 3 mal)',
                    credits: 400_000,
                    coins: 40,
                    duration: '7 Tage',
                },
            ],
            levelcost: [],
            maxBuildings: 'Keine Grenze',
            maxLevel: 0,
            special:
                'Finanzminister und Admins können Verbands-Polizeischulen mit Hilfe von Credits aus der Verbandskasse (aus-)bauen. Lehrgangsmeister und Admins können Lehrgänge an Verbands-Polizeischulen starten.',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'THW-Ortsverein',
            color: '#000f76',
            coins: 35,
            credits: 200_000,
            extensions: [
                {
                    caption: 'Bergungsgruppe',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Tage',
                },
                {
                    caption: 'Zugtrupp',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Tage',
                },
                {
                    caption: 'Fachgruppe Räumen',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Tage',
                },
                {
                    caption: 'Fachgruppe Wassergefahren',
                    credits: 500_000,
                    coins: 25,
                    duration: '7 Tage',
                },
                {
                    caption: '2. Technischer Zug',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Tage',
                },
                {
                    caption: '2. Technischer Zug: Bergungsgruppe 2',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Tage',
                },
                {
                    caption: '2. Technischer Zug: Zugtrupp',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Tage',
                },
                {
                    caption: 'Fachgruppe Ortung',
                    credits: 450_000,
                    coins: 25,
                    duration: '7 Tage',
                },
            ],
            levelcost: [],
            maxBuildings: 'Keine Grenze bekannt',
            maxLevel: 0,
            special:
                'Mit dem Bau eines THW-Ortsverbands bekommt man einen GKW und 9 Mitglieder geschenkt. Baukosten für weitere THW-Liegenschaften: 2. Ortsverband 300.000 Credits/ 35 Coins, 3. Ortsverband 358.496 Credits/ 35 Coins, 4. Ortsverband 432.193 Credits/ 35 Coins, 5. Ortsverband 458.496 Credits/ 35 Coins. Formel: <code>200.000+100.000*LOG<sub>2</sub>(Anzahl der vorhandenen Wachen + 1)</code>',
            startPersonnel: 9,
            startVehicles: ['GKW'],
        },
        {
            caption: 'THW Bundesschule',
            color: '#222d54',
            coins: 50,
            credits: 500_000,
            extensions: [
                {
                    caption: 'Klassenzimmer (bis zu 3 mal)',
                    credits: 400_000,
                    coins: 40,
                    duration: '7 Tage',
                },
            ],
            levelcost: [],
            maxBuildings: 'Keine Grenze',
            maxLevel: 0,
            special:
                'Finanzminister und Admins können Verbands-THW-Schulen mit Hilfe von Credits aus der Verbandskasse (aus-)bauen. Lehrgangsmeister und Admins können Lehrgänge an Verbands-THW-Schulen starten.',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Bereitschaftspolizei',
            color: '#227722',
            coins: 50,
            credits: 500_000,
            extensions: [
                {
                    caption: '2. Zug der 1. Hunderschaft',
                    coins: 5,
                    credits: 25_000,
                    duration: '3 Tage',
                },
                {
                    caption: '3. Zug der 1. Hunderschaft',
                    coins: 5,
                    credits: 25_000,
                    duration: '3 Tage',
                },
                {
                    caption: 'Sonderfahrzeug: Gefangenenkraftwagen',
                    coins: 5,
                    credits: 25_000,
                    duration: '3 Tage',
                },
                {
                    caption: 'Technischer Zug: Wasserwerfer',
                    coins: 5,
                    credits: 25_000,
                    duration: '3 Tage',
                },
                {
                    caption: 'SEK: 1. Zug',
                    coins: 10,
                    credits: 100_000,
                    duration: '7 Tage',
                },
                {
                    caption: 'SEK: 2. Zug',
                    coins: 10,
                    credits: 100_000,
                    duration: '7 Tage',
                },
                {
                    caption: 'MEK: 1. Zug',
                    coins: 10,
                    credits: 100_000,
                    duration: '7 Tage',
                },
                {
                    caption: 'MEK: 2. Zug',
                    coins: 10,
                    credits: 100_000,
                    duration: '7 Tage',
                },
            ],
            levelcost: ['Keine Ausbaustufen möglich'],
            maxBuildings: 'Keine Grenze',
            maxLevel: 0,
            special:
                'Mit dem Bau einer Bereitschaftspolizei bekommt man automatisch 4 Stellplätze für einen Zug (3 GruKw & 1 leBefKw) geschenkt. Die Wache generiert noch keine Einsätze. Um Einsätze zu erhalten muss man die erste Ausbaustufe bauen.',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Schnelleinsatzgruppe (SEG)',
            color: '#e05b00',
            coins: 30,
            credits: 100_000,
            extensions: [],
            levelcost: [],
            maxBuildings: 'Keine Grenze',
            maxLevel: 0,
            special: 'SEGs können ab der 5. Rettungswache gebaut werden.',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Polizeihubschrauberstation',
            color: '#148423',
            coins: 50,
            credits: 1_000_000,
            extensions: [],
            levelcost: ['1.-7. 1.000.000 Credits / 50 Coins'],
            maxBuildings: 'siehe Besonderheiten',
            maxLevel: 6,
            special:
                'Pro Station können bis zu 7 Landeplätze gebaut werden (Ausbaustufen). Bis zum 125. Gebäude (aller Art) können insgesamt max. 4 Landeplätze gebaut werden. Danach wächst die Zahl alle 25 Geäude um 1 (Beginnend beim 125.).',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Bereitstellungsraum',
            coins: 0,
            credits: 0,
            extensions: [],
            levelcost: [],
            maxBuildings: 1,
            maxLevel: 0,
            special:
                'An einem Bereitstellungsraum kann man selbst beliebig viele der eigenen Fahrzeuge stationieren, Verbandsmitglieder können den Raum mitnutzen. Ein Bereitstellungsraum bleibt 24 Stunden bestehen, man kann ihn aber jederzeit wieder auf 24h zurücksetzen.',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Wasserrettung',
            color: '#7fffd4',
            coins: 30,
            credits: 500_000,
            extensions: [],
            levelcost: ['1. 10.000', '2. 50.000', '3.-5. 100.000'],
            maxBuildings: 'Keine Grenze',
            maxLevel: 5,
            special:
                'Beim Bau bekommst du 10 Leute sowie ein GW-Wasserrettung geschenkt.',
            startPersonnel: 6,
            startVehicles: ['GW-Wasserrettung'],
        },
        {
            caption: 'Verbandszellen',
            coins: 'x',
            credits: 100_000,
            extensions: [
                {
                    caption: 'Zelle (bis zu 10 mal)',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Tage',
                },
            ],
            levelcost: [],
            maxBuildings: 'Keine Grenze',
            maxLevel: 0,
            special:
                'Dieses Gebäude kann nur von Admins und Finanzministern mit Credits aus der Verbandskasse gebaut und ausgebaut werden. Die gebauten Zellen stehen allen Verbandsmitgliedern zur Verfügung.',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Polizei-Sondereinheiten',
            color: '#1a7e23',
            coins: 40,
            credits: 400_000,
            extensions: [
                {
                    caption: 'SEK: 1. Zug',
                    coins: 10,
                    credits: 100_000,
                    duration: '7 Tage',
                },
                {
                    caption: 'SEK: 2. Zug',
                    coins: 10,
                    credits: 100_000,
                    duration: '7 Tage',
                },
                {
                    caption: 'MEK: 1. Zug',
                    coins: 10,
                    credits: 100_000,
                    duration: '7 Tage',
                },
                {
                    caption: 'MEK: 2. Zug',
                    coins: 10,
                    credits: 100_000,
                    duration: '7 Tage',
                },
            ],
            levelcost: ['Keine Ausbaustufen möglich'],
            maxBuildings: 'Keine Grenze',
            maxLevel: 0,
            special: '',
            startPersonnel: 0,
            startVehicles: [],
        },
        {
            caption: 'Feuerwache (Kleinwache)',
            color: '#aa1111',
            coins: 25,
            credits: 50_000,
            extensions: [
                {
                    caption: 'Abrollbehälter-Stellplatz (bis zu 2 mal)',
                    credits: 100_000,
                    coins: 20,
                    duration: '7 Tage',
                },
            ],
            levelcost: [
                '1. 10.000',
                '2. 50.000',
                '3.-5. 100.000',
                'Umbau zur normalen Wache: Differenz-Preis zur normalen Wache',
            ],
            maxBuildings: 2_400,
            maxLevel: 5,
            special:
                'Ab der 24. Feuerwache steigen die Kosten für den Neubau einer Wache nach folgender Formel: <code>(100.000+200.000*LOG<sub>2</sub>(Anzahl der vorhandenen Feuerwachen − 22)) / 2</code>. max. 1 Million Credits. Der Coins-Preis bleibt konstant!',
            startPersonnel: 10,
            startVehicles: [
                'LF 20',
                'LF 10',
                'LF 8/6',
                'LF 20/16',
                'LF 10/6',
                'LF 16-TS',
                'KLF',
                'MLF',
                'TSF-W',
                '(HLF 20 und HLF 10 ab Dienstgrad "Gruppenfüher(in)" => Baukosten 15.000 höher)',
            ],
        },
        {
            caption: 'Polizeiwache (Kleinwache)',
            color: '#116611',
            coins: 25,
            credits: 50_000,
            extensions: [
                {
                    caption: 'Zelle (bis zu 2 mal)',
                    credits: 25_000,
                    coins: 5,
                    duration: '7 Tage',
                },
            ],
            levelcost: [
                '1. 10.000',
                '2. 50.000',
                '3.-4. 100.000',
                'Umbau zur normalen Wache: Differenz-Preis zur normalen Wache',
            ],
            maxBuildings: 1_100,
            maxLevel: 4,
            special:
                'Ab der 24. Polizeiwache berechnen sich die Kosten für den Neubau einer Wache nach folgender Formel: <code>(100.000+200.000*LOG<sub>2</sub>(Anzahl der vorhandenen Polizeiwachen − 22)) / 2</code>. Der Coins-Preis bleibt konstant!',
            startPersonnel: 2,
            startVehicles: ['FuStW'],
        },
        {
            caption: 'Rettungswache (Kleinwache)',
            color: '#eeb611',
            coins: 25,
            credits: 100_000,
            extensions: [],
            levelcost: [
                '1. 10.000',
                '2. 50.000',
                '3.-5. 100.000',
                'Umbau zur normalen Wache: Differenz-Preis zur normalen Wache',
            ],
            maxBuildings: 'Keine Grenze',
            maxLevel: 5,
            special: '',
            startPersonnel: 3,
            startVehicles: ['RTW'],
        },
        {
            caption: 'Rettungshundestaffel',
            color: '#663300',
            coins: 50,
            credits: 450_000,
            extensions: [],
            levelcost: ['1. 10.000', '2. 50.000', '3.-5. 100.000'],
            maxBuildings: 'Keine Grenze',
            maxLevel: 5,
            special: '',
            startPersonnel: 10,
            startVehicles: ['Rettungshundefahrzeug'],
        },
    ],
    buildingCategories: {
        Feuerwehr: {
            buildings: [0, 1, 18],
            color: '#ff0000',
        },
        Rettungsdienst: {
            buildings: [2, 3, 5, 12, 15, 20, 21],
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
                'Rettungshundefahrzeuge': [91],
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
                'GKW': [39],
                'Bergungsgruppe': [41],
                'Zugtrupp': [40],
                ['Fachgruppe Räumen']: [42, 43, 44, 45],
                'Fachgruppe Ortung': [92, 93],
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
    vehicleBuildings: [0, 2, 5, 6, 9, 11, 12, 13, 15, 17, 18, 19, 20, 21],
    bedBuildings: [4],
    schoolBuildings: [1, 3, 8, 10],
    dispatchCenterBuildings: [7],
    amount: 'Anzahl',
    search: 'Suche',
    alliance: 'Verband',
    premiumNotice:
        'Diese Funktion erweitert eine Premium-Funktion des Spiels und ist deshalb nur für Spieler mit einem Leitstellenspiel-Premium-Account verfügbar!',
    credits: 'Credits',
    close: 'Schließen',
    fullscreen: {
        expand: 'Vollbildmodus aktivieren',
        compress: 'Vollbildmodus deaktivieren',
    },
    hideTitle: 'Überschrift anzeigen | Überschrift verstecken',
};
