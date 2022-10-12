const modules = {
    appstore: {
        save: 'Lagre',
        reset: 'Tilbakestill',
        noMapkit:
            'Denne utvidelsen fungerer ikke med karttypen "MapKit" grunnet begrensninger på MapKit!',
        dev: 'Denne utvidelsen er fortsatt under utvikling, aktivering kan medføre feil.',
        closeWarning: {
            title: 'Ulagrede endringer',
            text: 'Du har gjort endringer som ikke har blitt lagret.',
            close: 'Lukk vindu',
        },
    },
    settings: {
        name: 'Innstillinger',
        save: 'Lagre',
        discard: 'Forkast endringer',
        reset: 'Resett',
        export: 'Eksporter',
        import: 'Importer',
        resetWarning: {
            title: 'Tilbakestill endringer',
            text: 'Vil du virkelig tilbakestille alle innstillinger til standard?',
            close: 'Avbryt',
            total: 'Alle innstillinger',
            module: 'Kun for denne modulen',
        },
        resetWarningSetting: {
            title: 'Tilbakestill innstillinger',
            text: 'Vil du virkelig tilbakestille denne innstillingen <b>{setting}</b> for modulen <b>{module}</b> til standardverdien?',
            close: 'Avbryt',
            reset: 'Nullstille',
        },
        closeWarning: {
            title: 'Ulagrede endringer',
            text: 'Du har gjort endringer i innstillingene som ikke er lagret. Tilbakestill, fjern dem eller lagre dem for å lukke innstillinger.',
            close: 'Lukk vindu',
        },
        changeList: {
            true: 'På',
            false: 'Av',
        },
        locationSelect: {
            location: 'Velg posisjon',
            zoom: 'Velg posisjon og zoom',
            sync: 'bruk nåværende posisjon',
        },
    },
} as Record<string, Record<string, unknown>>;

export default {
    modules,
    updateUserscript: {
        title: 'Userscript out of date',
        text: `Dear LSSM-User,<br>
unfortunately your LSSM V.4 userscript is outdated. In the latest version changes have been made to the userscript, which are important for the function of the LSSM V.4.<br>
You need at least version {minVersion}, the update can be done comfortably by clicking on {updateLink}.<br>
Sometimes the update does not work by clicking the link (for unknown reasons). Then you can either trigger an update within Tampermonkey (click on the tampermonkey icon in your browser, then "Overview". Check the box in front of the LSSM userscript and select "Update" as action.<br>
If that also does not work, edit the LSSM Script within Tampermonkey by replacing all script content with the content of {bypassLink}.<br>
Sometimes, LSSM is installed multiple times after an update. In this case, please delete the script that does not have version 4.5.10 (in Tampermonkey).<br>
We're sorry for any caused issue if updates did not work correctly.
<br>
Kind regards,<br>
your LSSM team`,
        close: 'Ok',
    },
    error: {
        title: 'LSS Manager: Error',
        msg: 'Om denne feilen skjer ofte, vennligst rapporter det til LSSM teamet!',
    },
    warnings: {
        version: {
            title: 'Feil LSS Manager versjon',
            text: 'Kjære bruker, vi ser at du ikke bruker siste versjon av LSS Manager. Den siste vesjonen er {version}, men du har {curver}. Last inn spillet på nytt med (Ctrl + F5, på Apple enheter Command + F5), dette bør fikse feilen. Om feilen fortsetter vennligst rapporter det til LSSM teamet.',
            close: 'Lukk vindu og omlast spillet (anbefalt).',
            abort: 'Likk vindu uten å omlaste spillet',
        },
    },
    anniversary1: {
        closeNote: 'Tips: Du kan også klikke på ballongene for å lukke!',
        title: '🎉 Det er grunn til å feire! 🎉',
        content:
            'Wow, så fort tiden går!<br>Det har gått <b>ett år</b> siden LSS Manager V.4 ble online! Mye har selvfølgelig skjedd i år, og derfor vil vi i denne spesielle anledningen rette en spesiell takk til dere brukere. Gleden du tester de nye funksjonene våre med inspirerer oss igjen og igjen og gir oss ny motivasjon til å fortsette. En stor takk rettes også til oversetterne våre som frivillig gir seg tid til å gjøre LSSM brukbar i andre versjoner av spillet.</br>For å feire vil vi gjerne dele noen fakta og tall her:<ul ><li><code>10. februar 2020</code>: Den første forpliktelsen på GitHub ble gjort: <a href="https://github.com/LSS-Manager/LSSM-V.4/commit/6e95836" target="_blank">6e95836</a>. Siden den gang har vi foretatt over 5600 forpliktelser!</li><li><code>19. september 2020</code>: V.4 ble offisielt annonsert for første gang på forumet: <a href="https:/ /forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a>. Med dette har også søknadsfasen for betatestere startet</li><li><code>17. oktober 2020</code>: Betatestere har fått tilgang til V.4 for første gang. Den 4-ukers betafasen har dermed startet</li><li><code>21. november 2020</code>: LSS Manager V.4 går online for alle!</li><li>Telemetrien vår registrerer for tiden rundt 5000 brukere de siste 6 månedene. Av disse var over 2200 aktive de siste 14 dagene. Mørketallet (antall brukere som har deaktivert telemetri) kan ikke estimeres.</li><li>Tråden vår i forumet har nå nådd nesten 1200 meldinger. Det er ganske mye, men V.3-tråden, som for øyeblikket skraper opp de 3500 svarene, er langt fra å ta igjen.</li><li>For mer statistikk, sjekk ut tråden vår i forumet:<a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a></li>< /ul><br>Vi ser frem til mange flere flotte øyeblikk i LSSM V.4-tiden!<br>Ditt LSSM-team<br>Jan, Sanni & Ron',
    },
    globalSettings: {
        name: 'Innstillinger',
        labelInMenu: {
            title: 'Etikett istedenfor ikon i navigasjonslinjen',
            description:
                'Viser en enkel etikett i navigasjonslinjen i stedet for LSSM-logoen.',
        },
        allowTelemetry: {
            description:
                'Styrer om LSS-Manager får samle data som hjelper oss i å utvikle utvidelsen.',
            title: 'Tillatt telemetri',
        },
        iconBg: {
            description: 'Konfigurer bakgrunnen til LSSM-ikonet',
            title: 'LSSM-Ikon Bakgrunn',
        },
        iconBgAsNavBg: {
            description:
                'Bytt farge på hele navigasjonsbaren i fargen til LSSM bakgrunnen!',
            title: 'Navigasjonsbar farge',
        },
        debugMode: {
            title: 'Debug-Mode',
            description:
                'A small debug mode that displays helpful hints in the browser console. Enabling it is only recommended if requested by the LSSM team, as the console will contain many messages.',
        },
    },
    vehicles: {
        0: {
            caption: 'Mannskapsbil',
            color: '#cc0000',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 6,
            wtank: 2500,
            ftank: 200,
        },
        1: {
            caption: 'Lett mannskapsbil',
            color: '#bb0000',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 3,
            wtank: 500,
            ftank: 50,
        },
        2: {
            caption: 'Stigebil',
            color: '#d92626',
            coins: 30,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            special: 'Nødvendig etter at du har bygd 3 brannstasjoner.',
        },
        3: {
            caption: 'Innsatslederbil brann',
            color: '#d02525',
            coins: 25,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            special: 'Nødvendig etter at du har bygd 6 brannstasjoner.',
        },
        4: {
            caption: 'Tungredningsbil',
            color: '#ad1f1f',
            coins: 25,
            credits: 12_180,
            minPersonnel: 1,
            maxPersonnel: 4,
            special: 'Nødvendig etter at du har bygd 4 brannstasjoner.',
        },
        5: {
            caption: 'Ambulanse',
            color: '#9c691c',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 3,
        },
        6: {
            caption: 'Tankbil',
            color: '#990000',
            coins: 25,
            credits: 17_300,
            minPersonnel: 1,
            maxPersonnel: 3,
            ftank: 400,
            wtank: 10_000,
            special: 'Nødvendig etter at du har bygd 7 brannstasjoner.',
        },
        7: {
            caption: 'CBRNe enhet',
            color: '#770000',
            coins: 25,
            credits: 19_200,
            minPersonnel: 1,
            maxPersonnel: 6,
            special: 'Nødvendig etter at du har bygd 11 brannstasjoner.',
            schooling: {
                Brannstasjon: {
                    'CBRNe-enhet': {
                        all: true,
                    },
                },
            },
        },
        8: {
            caption: 'Patruljebil',
            color: '#378b18',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 2,
        },
        9: {
            caption: 'Luftambulanse',
            color: '#e67219',
            coins: 30,
            credits: 300_000,
            minPersonnel: 1,
            maxPersonnel: 1,
        },
        10: {
            caption: 'Snorkelbil',
            color: '#dc1818',
            coins: 25,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            special:
                'For å kjøpe med kreditter krever det rang: Kaptein, <br> Lavere rangerte medlemmer kan kjøpe kjøretøyet for 25 mynter. <br> Quint fungerer som en stigebil og en brannbil.',
        },
        11: {
            caption: 'Politihelikopter',
            color: '#1b8f0f',
            coins: 30,
            credits: 300_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            schooling: {
                Politi: {
                    Politihelikopterflyvning: {
                        all: true,
                    },
                },
            },
        },
        12: {
            caption: 'Pansret kjøretøy',
            color: '#1ca512',
            coins: 25,
            credits: 17_300,
            minPersonnel: 6,
            maxPersonnel: 6,
            schooling: {
                Politi: {
                    ['Våpentrening']: {
                        all: true,
                    },
                },
            },
            special: 'Nødvendig etter at du har bygt 8 politistasjoner.',
        },
        13: {
            caption: 'Hundepatrulje',
            color: '#1a6d22',
            coins: 25,
            credits: 7000,
            minPersonnel: 1,
            maxPersonnel: 2,
            schooling: {
                Politi: {
                    Hundepatrulje: {
                        all: true,
                    },
                },
            },
            special: 'Nødvendig etter at du har bygt 6 politistasjoner.',
        },
        14: {
            caption: 'Politimotorsykkel',
            color: '#3a6622',
            coins: 18,
            credits: 2500,
            minPersonnel: 1,
            maxPersonnel: 1,
            schooling: {
                Politi: {
                    Politimotorsykkel: {
                        all: true,
                    },
                },
            },
        },
        15: {
            caption: 'Delta kjøretøy',
            color: '#253322',
            coins: 23,
            credits: 7000,
            minPersonnel: 2,
            maxPersonnel: 4,
            schooling: {
                Politi: {
                    ['Våpentrening']: {
                        all: true,
                    },
                },
            },
        },
        16: {
            caption: 'Røykdykkerbil',
            color: '#aa0000',
            coins: 25,
            credits: 11_860,
            minPersonnel: 1,
            maxPersonnel: 3,
            special: 'Nødvendig etter at du har bygd 5 brannstasjoner.',
        },
        17: {
            caption: 'Innsatsstøttebil',
            color: '#791515',
            coins: 25,
            credits: 25_500,
            minPersonnel: 1,
            maxPersonnel: 6,
            schooling: {
                Brannstasjon: {
                    Skadestedsledelse: {
                        all: true,
                    },
                },
            },
            special: 'Nødvendig etter at du har bygd 13 brannstasjoner.',
        },
        18: {
            caption: 'Redningsbil',
            color: '#880000',
            coins: 25,
            credits: 12_180,
            minPersonnel: 1,
            maxPersonnel: 4,
            wtank: 2000,
            ftank: 150,
        },
        19: {
            caption: 'Dykkerbil',
            color: '#225577',
            coins: 25,
            credits: 10_000,
            minPersonnel: 4,
            maxPersonnel: 5,
            schooling: {
                Brannstasjon: {
                    'Redningsdykker kurs': {
                        all: true,
                    },
                },
            },
            special: 'Krever spesialistutdanning (Redningsdykker kurs)',
        },
        20: {
            caption: 'Lett redningsbåt',
            color: '#22776d',
            coins: 12,
            credits: 6000,
            minPersonnel: 0,
            maxPersonnel: 0,
            special:
                'Et egnet kjøretøy trengs for å trekke tilhengeren / båthenger. (Dykkerbil, Mannskapsbil, Lett mannskapsbil)',
        },
        21: {
            caption: 'Branntankbil',
            color: '#570f0f',
            coins: 19,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            wtank: 8000,
            ftank: 300,
        },
        22: {
            caption: 'Utrykningspolitibil',
            color: '#0ead23',
            coins: 10,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            schooling: {
                Politi: {
                    Utrykningspoliti: {
                        all: true,
                    },
                },
            },
        },
        23: {
            caption: 'Utrykningsenhetbil',
            color: '#1f8d20',
            coins: 15,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            schooling: {
                Politi: {
                    Utrykningspoliti: {
                        all: true,
                    },
                    ['Våpentrening']: {
                        all: true,
                    },
                },
            },
        },
        24: {
            caption: 'Legebil',
            color: '#9c1c1c',
            coins: 20,
            credits: 4000,
            minPersonnel: 1,
            maxPersonnel: 1,
            schooling: {
                Redning: {
                    Intensivbehandling: {
                        all: true,
                    },
                },
            },
            special: 'Krever spesialistutdanning (Legevaktslege)',
        },
        25: {
            caption: 'Innsatslederbil helse',
            color: '#997122',
            coins: 25,
            credits: 25_000,
            minPersonnel: 1,
            maxPersonnel: 1,
            special: 'Nødvendig etter at du har bygd 10 redningsstasjoner',
        },
        26: {
            caption: 'Akuttbil',
            color: '#9c1c1c',
            coins: 20,
            credits: 4000,
            minPersonnel: 2,
            maxPersonnel: 2,
        },
        27: {
            caption: 'Ambulansemotorsykkel',
            color: '#9c1c1c',
            coins: 20,
            credits: 4000,
            minPersonnel: 1,
            maxPersonnel: 1,
            schooling: {
                Redning: {
                    Ambulansemotorsykkel: {
                        all: true,
                    },
                },
            },
        },
        28: {
            caption: 'Syketransport',
            color: '#9c1c1c',
            coins: 12,
            credits: 5000,
            minPersonnel: 2,
            maxPersonnel: 2,
        },
        29: {
            caption: 'First responder bil',
            color: '#9c1c1c',
            coins: 25,
            credits: 4000,
            minPersonnel: 1,
            maxPersonnel: 1,
        },
        30: {
            caption: 'Akutthjelper',
            color: '#9c1c1c',
            coins: 12,
            credits: 2500,
            minPersonnel: 1,
            maxPersonnel: 1,
            schooling: {
                Redning: {
                    Intensivbehandling: {
                        all: true,
                    },
                },
            },
            special: 'Krever spesialistutdanning (Legevaktslege)',
        },
        31: {
            caption: 'Intensivambulanse',
            color: '#9c1c1c',
            coins: 30,
            credits: 10_000,
            minPersonnel: 3,
            maxPersonnel: 3,
            schooling: {
                Redning: {
                    Intensivbehandling: {
                        all: true,
                    },
                },
            },
            special: 'Krever spesialistutdanning (Legevaktslege)',
        },
        32: {
            caption: 'Akuttbil',
            color: '#9c1c1c',
            coins: 20,
            credits: 4000,
            minPersonnel: 2,
            maxPersonnel: 4,
        },
        33: {
            caption: 'Skogbrannhelikopter',
            color: '#570f0f',
            coins: 25,
            credits: 300_000,
            minPersonnel: 2,
            maxPersonnel: 5,
            wtank: 2000,
            schooling: {
                Brannstasjon: {
                    'Skogbrann helikopterutdanning': {
                        all: true,
                    },
                },
            },
        },
        34: {
            caption: 'ATV',
            color: '#570f0f',
            coins: 5,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 2,
            wtank: 2000,
            schooling: {
                Brannstasjon: {
                    ATV: {
                        all: true,
                    },
                },
            },
        },
        35: {
            caption: 'Skum Tankbil',
            color: '#570f0f',
            coins: 15,
            credits: 35_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            ftank: 3000,
        },
        36: {
            caption: 'Tilhengerpumpe',
            color: '#570f0f',
            coins: 10,
            credits: 10_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            special:
                'Et egnet kjøretøy trengs for å trekke tilhengeren / båthenger. (Mannskapsbil, Lett mannskapsbil, Tankbil, Skum Tankbil)',
        },
        37: {
            caption: 'Slangebil',
            color: '#570f0f',
            coins: 10,
            credits: 20_000,
            minPersonnel: 2,
            maxPersonnel: 3,
        },
        38: {
            caption: 'Slangebil med pumpe',
            color: '#570f0f',
            coins: 15,
            credits: 40_000,
            minPersonnel: 2,
            maxPersonnel: 3,
        },
        39: {
            caption: 'Slangetilhenger',
            color: '#570f0f',
            coins: 10,
            credits: 20_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            special:
                'Et egnet kjøretøy trengs for å trekke tilhengeren / båthenger. (Mannskapsbil, Lett mannskapsbil, Tankbil, Skum Tankbil)',
        },
    },
    buildingCategories: {
        Brann: {
            buildings: [1, 2, 3, 25],
            color: '#ff2d2d',
        },
        Helse: {
            buildings: [4, 5, 6, 11, 21],
            color: '#ffa500',
        },
        Politi: {
            buildings: [7, 8, 10, 13, 9],
            color: '#00ac00',
        },
        Annet: {
            buildings: [0, 12, 22, 23],
            color: '#02a18c',
        },
    },
    vehicleCategories: {
        'Firefighters': {
            vehicles: {
                'Fire trucks': [0, 1, 10, 18, 20],
                'WaterTanker': [6, 20],
                'Special vehicles': [2, 3, 4, 6, 7, 10, 16, 17, 29, 32],
                'Boats': [19],
            },
            color: '#ff2d2d',
        },
        'Rescue Vehicles': {
            vehicles: {
                'Ambulances': [5, 26, 27, 28, 30, 31],
                'HEMS': [9],
                'First Responder': [0, 1],
                'Rescue Boat': [19],
            },
            color: '#ffa500',
        },
        'Police Vehicles': {
            vehicles: {
                'Patruljebil': [8],
                'SWAT': [15, 12, 22],
                'Police Motorcycle': [14],
                'Police helicopter': [11],
                'K-9 Unit': [13],
                'Sheriff': [21],
            },
            color: '#00ac00',
        },
    },
    small_buildings: {
        0: 18,
        2: 20,
        6: 19,
    },
    schoolings: {
        Brannstasjon: [
            {
                caption: 'CBRNe-enhet',
                duration: '3 dager',
                staffList: 'CBRNe-enhet',
            },
            {
                caption: 'Skadestedsledelse',
                duration: '5 dager',
                staffList: 'Skadestedsledelse',
            },
            {
                caption: 'ARFF-Training',
                duration: '3 dager',
                staffList: 'ARFF-Training',
            },
            {
                caption: 'Sjønavigering',
                duration: '5 dager',
                staffList: 'Sjønavigering',
            },
            {
                caption: 'Redningsdykker kurs',
                duration: '4 dager',
                staffList: 'Redningsdykker kurs',
            },
            {
                caption: 'Skogbrann helikopterutdanning',
                duration: '5 dager',
                staffList: 'Skogbrann helikopterutdanning',
            },
            {
                caption: 'ATV',
                duration: '3 dager',
                staffList: 'ATV',
            },
        ],
        Politi: [
            {
                caption: 'Politihelikopterflyvning',
                duration: '7 dager',
                staffList: 'Politihelikopterflyvning',
            },
            {
                caption: 'Våpentrening',
                duration: '5 dager',
                staffList: 'Våpentrening',
            },
            {
                caption: 'Hundepatrulje',
                duration: '5 dager',
                staffList: 'Hundepatrulje',
            },
            {
                caption: 'Politimotorsykkel',
                duration: '3 dager',
                staffList: 'Politimotorsykkel',
            },
            {
                caption: 'Utrykningspoliti',
                duration: '3 dager',
                staffList: 'Utrykningspoliti',
            },
        ],
        Redning: [
            {
                caption: 'Intensivbehandling',
                duration: '5 dager',
                staffList: 'Intensivbehandling',
            },
            {
                caption: 'Ambulansemotorsykkel',
                duration: '3 dager',
                staffList: 'Ambulansemotorsykkel',
            },
        ],
    },
    amount: 'Antall',
    search: 'Søk',
    alliance: 'Allianse',
    premiumNotice:
        'Denne utvidelsen utvider en premium funksjon av spillet, og er derfor kun tilgjengelig for premium brukere av Nødsentralspillet.',
    credits: 'Kreditter',
    coins: 'Mynter',
    close: 'Lukk',
    fullscreen: {
        expand: 'Aktiver fullskjerm',
        compress: 'Deaktiver fullskjerm',
    },
    hideTitle: 'Show heading | Hide heading',
    vehicle: 'Biler | Bil | Biler',
    building: 'Bygninger',
    station: 'Stasjoner | Stasjon | Stasjoner',
    distance: 'Distanse | Distanser',
    vehicleType: 'Kjøretøytype',
    noOptions: 'Sorry, no matching options.',
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
    pois: [
        'Park',
        'Innsjø',
        'Sykehus',
        'Skog',
        'Busstopp',
        'Trikkestopp',
        'Togstasjon (regional)',
        'Togstasjon (regional og langdistanse)',
        'Godsstasjon',
        'Matvarebutikk (liten)',
        'Matvarebutikk (stor)',
        'Bensinstasjon',
        'Skole',
        'Museum',
        'Kjøpesenter',
        'Bilverksted',
        'Motorveiavkjøring',
        'Julemarked',
        'Lagerbygning',
        'Nattklubb',
        'Stadion',
        'Gård',
        'Kontorbygning',
        'Basseng',
        'Planovergang',
        'Teater',
        'Tivoli',
        'Elv',
        'Liten flyplass (flystripe)',
        'Stor flyplass (flystripe)',
        'Flyplassterminal',
        'Bank',
        'Varehus',
        'Bro',
        'Gatekjøkken',
        'Cargohavn',
        'Gjenvinningssenter',
        'Skyskraper',
        'Cruisehavn',
        'Marina',
        'Planovergang (Fotgjengere)',
        'Tunnel',
        'Kaldt varehus',
        'Kraftverk',
        'Fabrikk',
        'Skrotplass',
        'Metrostasjon',
        'Liten kjemisk lagringstank',
        'Stor kjemisk lagringstank',
        'Hotell',
        'Bar',
        'Avfallsdeponi',
        'Parkeringshus',
        'Silo',
        'Lyskryss',
        'Snekkerverksted',
        'Restaurant',
        'Sentrum',
        'Ås',
        'Brygge',
        'Lekeplassutstyr',
        'Motocrossbane',
        'Omsorgsbolig',
        'Atomkraftverk',
        'Felt',
        'Kratt',
        'Lyng',
        'Hytte',
        'Campingplass',
        'Klippe',
        'Sagbruk',
        'Propan lager',
        'Kirke',
    ],
    only_alliance_missions: [57, 74],
    transfer_missions: [306, 307],
    ranks: {
        missionchief: {
            0: 'Brannaspirant',
            200: 'Brannkonstabel',
            10_000: 'Underbrannmester',
            100_000: 'Brannmester',
            1_000_000: 'Overbrannmester',
            5_000_000: 'Brigadeleder',
            20_000_000: 'Brigadesjef',
            50_000_000: 'Seksjonsleder',
            1_000_000_000: 'Avdelingsleder',
            2_000_000_000: 'Varabrannsjef',
            5_000_000_000: 'Brannsjef',
        },
        policechief: {
            0: 'Politistudent',
            200: 'Politibetjent 1',
            10_000: 'Politibetjent 2',
            100_000: 'Politibetjent 3',
            1_000_000: 'Politiførstebetjent',
            5_000_000: 'Politioverbetjent',
            20_000_000: 'Politistasjonssjef',
            50_000_000: 'Politifullmektig',
            1_000_000_000: 'Politiadvokat',
            2_000_000_000: 'Politimester',
            5_000_000_000: 'Politidirektør',
        },
    },
};
