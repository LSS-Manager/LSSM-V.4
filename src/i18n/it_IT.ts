const modules = {
    appstore: {
        save: 'Save',
        reset: 'Reset',
        noMapkit:
            'Questo modulo non funziona con il tipo di mappa "Mapkit" dovuto ad alcune limitazioni di Mapkit ',
        dev: "Questo modulo è attualmente ancora in fase di sviluppo. L'attivazione può portare a funzioni incomplete e difettose!",
        closeWarning: {
            title: 'Cambiamenti non salvati',
            text: "Hai apportato modifiche nell'AppStore che non sono state ancora salvate. Resettali o salvali per chiudere l'AppStore.",
            abort: 'Cancella',
            saveAndExit: 'Salvare e uscire',
            exit: 'Chiudi il messaggio',
        },
    },
    settings: {
        name: 'Impostazioni',
        save: 'Salva',
        discard: 'Annulla i Cambiamenti',
        reset: 'Resetta',
        export: 'Esporta',
        import: 'Importa',
        resetWarning: {
            title: 'Resetta i cambiamenti',
            text: 'Vuoi davvero ripristinare le impostazioni ai valori predefiniti? Questo non può essere annullato!',
            close: 'Annulla',
            total: 'Tutte le impostazioni',
            module: 'Solo per questo modulo',
        },
        resetWarningSetting: {
            title: 'Reset impostazioni',
            text: 'Volete davvero ripristinare questa impostazione <b>{setting}</b> del modulo <b>{modul}</b> al suo valore di default?',
            close: 'Annulla',
            reset: 'Resetta',
        },
        closeWarning: {
            title: 'Cambiamenti non salvati',
            text: 'Hai apportato modifiche alle impostazioni che non sono ancora state salvate. Ripristinarli, eliminarli o salvarli per chiudere le impostazioni.',
            abort: 'Cancella',
            saveAndExit: 'Salvare e uscire',
            exit: 'Uscire senza salvare',
        },
        changeList: {
            true: 'Su',
            false: 'Off',
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
        msg: 'Se questo errore avviene frequentamente, per cortesia contatta il Team di LSSM!',
        requestIssue: {
            title: 'Erroneous request: Status {status}',
            text: `Ouch, unfortunately an error occurred with this server request:<br>
<b>Status</b>: <code>{status}</code> <code>{statusText}</code><br>
<b>URL</b>: <em><code>{method}</code></em> <code>{url}</code><br>
<b>Feature</b>: <code>{feature}</code><br>
<b>Duration</b>: <code>{duration}ms</code><br>
<b>User</b>: <code>{uid}</code><br>
<b>Timestamp</b>: <code>{timestamp}</code>
<br>
Please try to perform the desired action again.<br>
If several requests fail in a short time, this could be due to server problems. Please try again at a later time.`,
            close: 'Dismiss',
        },
    },
    warnings: {
        version: {
            title: 'Versione di LSS Manager sbagliata!',
            text: "Gentile utente, abbiamo notato che non disponi dell'ultima versione di LSS Manager. L'ultima versione è {version}, ma hai {curver}. Ricarica il gioco senza cache (su Windows con Ctrl + F5, sui dispositivi Apple con Command + R), questo dovrebbe risolvere il bug. Se l'errore persiste, segnalalo al team! Se utilizzi una versione sbagliata, non possiamo garantire la piena funzionalità di LSS-Manager.",
            close: 'Chiudi il messaggio e ricarica il gioco (Raccomandato)',
            abort: 'Chiudi il messaggio senza ricaricare il gioco.',
        },
    },
    anniversary1: {
        closeNote: 'Tip: You can also click on the balloons to close!',
        title: '🎉 There is reason to celebrate! 🎉',
        content:
            'Wow, how fast time flies!<br>It\'s been <b>one year</b> since the LSS Manager V.4 went online! A lot has happened this year, of course, and so on this special occasion we would like to say a special thank you to you, the users. The joy with which you test our new features inspires us again and again and gives us new motivation to continue. Also, a big thank you goes out to our translators who volunteer their time to make the LSSM usable in other versions of the game.</br>To celebrate, we\'d like to share a few facts and figures here:<ul><li><code>February 10th 2020</code>: The First Commit on GitHub was made: <a href="https://github.com/LSS-Manager/LSSM-V.4/commit/6e95836" target="_blank">6e95836</a>. Since then we have made over 5,600 commits!</li><li><code>September 19th, 2020</code>: V.4 was officially announced for the first time on the forum: <a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a>. With this, the application phase for beta testers has also started</li><li><code>October 17th 2020</code>: Beta testers have been given access to V.4 for the first time. The 4-week beta phase has thus started</li><li><code>November 21st 2020</code>: LSS Manager V.4 goes online for everyone!</li><li>Our telemetry currently records around 5,000 users in the past 6 months. Of these, over 2,200 were active in the last 14 days. The dark figure (number of users who have deactivated telemetry) can not be estimated.</li><li>Our thread in the forum has now reached almost 1,200 messages. That\'s quite a bit, but the V.3 thread, which is currently scratching the 3,500 responses, is far from catching up.</li><li>For more stats, check out our thread in the forum:<a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a></li></ul><br>We\'re looking forward to many more great moments in the time of LSSM V.4!<br>Your LSSM Team<br>Jan, Sanni & Ron',
    },
    globalSettings: {
        name: 'Impostazioni generali',
        labelInMenu: {
            title: "Etichetta al posto dell'icona nel menu",
            description:
                'Visualizza una semplice etichetta nella barra di navigazione al posto del logo LSSM',
        },
        allowTelemetry: {
            description:
                'Controlla se LSS-Manager è autorizzato a inviare dati che ci aiutano nello sviluppo di questa estensione.',
            title: 'Consenti telemetria',
        },
        iconBg: {
            description: 'Cambia il colore di sfondo di LSSM-Icon!',
            title: 'LSSM-Icon Colore di sfondo',
        },
        iconBgAsNavBg: {
            description:
                "Colora l'intera barra di navigazione con il colore di LSSM-Icon sfondo!",
            title: 'colorare la barra di navigazione',
        },
        osmDarkTooltip: {
            description:
                'Questa impostazione rende scuri i tooltip sulla mappa se hai abilitato la modalità scura',
            title: 'Tooltips scuri sulla mappa',
        },
        debugMode: {
            title: 'Debug-Mode',
            description:
                'A small debug mode that displays helpful hints in the browser console. Enabling it is only recommended if requested by the LSSM team, as the console will contain many messages.',
        },
    },
    vehicles: {
        0: {
            caption: 'ABP',
            color: '#bf0a0a',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 3,
            wtank: 8000,
            ftank: 250,
            possibleBuildings: [0, 18],
        },
        1: {
            caption: 'AS',
            color: '#d92626',
            coins: 30,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 18],
            special: 'Richiesto dopo aver costruito 3 caserme dei pompieri',
        },
        2: {
            caption: 'AV/FNZ',
            color: '#d02525',
            coins: 25,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 18],
            special: 'Richiesto dopo aver costruito 6 caserme dei pompieri',
        },
        3: {
            caption: 'CA/POLI',
            color: '#ad1f1f',
            coins: 25,
            credits: 12_180,
            minPersonnel: 1,
            maxPersonnel: 4,
            possibleBuildings: [0, 18],
            special: 'Richiesto dopo aver costruito 4 caserme dei pompieri',
        },
        4: {
            caption: 'Ambulanza BLSD',
            color: '#9c6d1c',
            coins: 25,
            credits: 5000,
            minPersonnel: 2,
            maxPersonnel: 5,
            possibleBuildings: [0, 2, 20],
        },
        5: {
            caption: 'KILO',
            color: '#990000',
            coins: 25,
            credits: 17_300,
            minPersonnel: 1,
            maxPersonnel: 3,
            wtank: 18_000,
            possibleBuildings: [0, 18],
            special: 'Richiesta dopo aver costruito 7 caserme dei pompieri',
        },
        6: {
            caption: 'AF/NBCR',
            color: '#770000',
            coins: 25,
            credits: 19_200,
            minPersonnel: 1,
            maxPersonnel: 6,
            possibleBuildings: [0, 18],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    'N.B.C.R.': {
                        all: true,
                    },
                },
            },
            special: 'Richiesto dopo aver costruito 11 caserme dei pompieri',
        },
        7: {
            caption: 'Volante',
            color: '#2c8123',
            coins: 25,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 19],
        },
        8: {
            caption: 'Elisoccorso',
            color: '#e69b19',
            coins: 30,
            credits: 300_000,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [5],
        },
        9: {
            caption: 'APS',
            color: '#bb0000',
            coins: 25,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            wtank: 2500,
            ftank: 400,
            possibleBuildings: [0, 18],
        },
        10: {
            caption: 'AF/ARIA',
            color: '#aa0000',
            coins: 25,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            possibleBuildings: [0, 18],
            special: 'Richiesto dopo aver cstruito 5 caserme dei pompieri.',
        },
        11: {
            caption: 'UCL',
            color: '#791515',
            coins: 25,
            credits: 20_000,
            minPersonnel: 1,
            maxPersonnel: 6,
            possibleBuildings: [0, 18],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    'Corso per funzionario (UCL)': {
                        all: true,
                    },
                },
            },
            special: 'Richiesto dopo aver costruito 13 caserme dei pompieri',
        },
        12: {
            caption: 'AG',
            color: '#dc1818',
            coins: 25,
            credits: 18_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0, 18],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    ['Corso autista di Autogrù']: {
                        all: true,
                    },
                },
            },
            special: 'Richiesto dopo aver costruito 8 caserme dei pompieri',
        },
        13: {
            caption: 'Elicottero della Polizia',
            color: '#227723',
            coins: 30,
            credits: 300_000,
            minPersonnel: 1,
            maxPersonnel: 5,
            possibleBuildings: [13],
            schooling: {
                Polizia: {
                    'Reparto volo della polizia': {
                        all: true,
                    },
                },
            },
            special:
                'Può essere acquistato con i crediti all raggiungimento del Rango:Caporeparto esperto.',
        },
        14: {
            caption: 'Furgone antisommossa',
            color: '#12a521',
            coins: 25,
            credits: 10_000,
            minPersonnel: 6,
            maxPersonnel: 9,
            possibleBuildings: [6, 19, 21],
            schooling: {
                Polizia: {
                    'Specializzazione antisommossa/UOPI': {
                        all: true,
                    },
                },
            },
            special: 'Richiesto dopo aver costruito 8 stazioni di polizia ',
        },
        15: {
            caption: 'Unità cinofila antidroga',
            color: '#36aa22',
            coins: 25,
            credits: 7000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 19, 21],
            schooling: {
                Polizia: {
                    ['Specializzazione unità cinofila']: {
                        all: true,
                    },
                },
            },
            special: 'Richiesta dopo aver costruito 6 stazioni di polizia',
        },
        16: {
            caption: 'Moto della Polizia',
            color: '#296622',
            coins: 18,
            credits: 2500,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [6, 19],
            schooling: {
                Polizia: {
                    'Specializzazione motociclista': {
                        all: true,
                    },
                },
            },
        },
        17: {
            caption: 'UOPI SUV',
            color: '#178813',
            coins: 23,
            credits: 7000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [6, 19, 21],
            schooling: {
                Polizia: {
                    'Specializzazione antisommossa/UOPI': {
                        all: true,
                    },
                },
            },
            special: 'Richiesto dopo aver costruito 8 stazioni di polizia',
        },
        18: {
            caption: 'VLV',
            color: '#685d12',
            coins: 25,
            credits: 20_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            possibleBuildings: [0, 2, 20],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    'Corso medico di emergenza': {
                        all: true,
                    },
                },
                'Soccorso': {
                    'Corso medico di emergenza': {
                        all: true,
                    },
                },
            },
            special: 'Richiesto dopo aver costruito 3 stazioni di soccorso ',
        },
        19: {
            caption: 'MSA',
            color: '#f59f00',
            coins: 25,
            credits: 25_000,
            minPersonnel: 2,
            maxPersonnel: 5,
            possibleBuildings: [0, 2, 20],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    'Corso medico di emergenza': {
                        all: true,
                    },
                },
                'Soccorso': {
                    'Corso medico di emergenza': {
                        all: true,
                    },
                },
            },
        },
        20: {
            caption: 'Ambulanza ordinaria',
            color: '#e09200',
            coins: 20,
            credits: 5000,
            minPersonnel: 2,
            maxPersonnel: 4,
            possibleBuildings: [0, 2, 20],
        },
        21: {
            caption: 'Volante Finanza',
            color: '#001bcc',
            coins: 10,
            credits: 15_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [21],
        },
        22: {
            caption: 'Furgone artificieri',
            color: '#0a2bff',
            coins: 35,
            credits: 35_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 19],
            schooling: {
                Polizia: {
                    'Corso Artificieri': {
                        all: true,
                    },
                },
            },
        },
        23: {
            caption: 'Camion NSSA',
            color: '#7181e7',
            coins: 25,
            credits: 10_000,
            minPersonnel: 2,
            maxPersonnel: 2,
            possibleBuildings: [0, 15],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    'Corso per operatore tecnico NSSA': {
                        all: true,
                    },
                },
            },
        },
        24: {
            caption: 'Pickup SAF',
            color: '#6b7dee',
            coins: 25,
            credits: 10_000,
            minPersonnel: 3,
            maxPersonnel: 3,
            possibleBuildings: [0, 15],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    'Corso per operatore tecnico SAF': {
                        all: true,
                    },
                },
            },
        },
        25: {
            caption: 'Barca',
            color: '#7187ff',
            coins: 12,
            credits: 6000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0, 15],
            special: 'Mezzo di rimorchio necessario (Pickup SAF, Camion NSSA)',
        },
        26: {
            caption: 'AF/BUS',
            color: '#9b1624',
            coins: 25,
            credits: 10_000,
            minPersonnel: 1,
            maxPersonnel: 9,
            possibleBuildings: [0, 18],
        },
        27: {
            caption: 'DTS',
            color: '#e09200',
            coins: 25,
            credits: 20_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            possibleBuildings: [2, 20],
            special: 'Richiesto dopo aver costruito 6 stazioni di soccorso',
        },
        28: {
            caption: 'Pickup con Modulo Boschivo',
            color: '#dc1818',
            coins: 5,
            credits: 5000,
            minPersonnel: 2,
            maxPersonnel: 4,
            wtank: 400,
            possibleBuildings: [0, 18],
        },
        29: {
            caption: 'Autocarro AIB - AF/BOSC',
            color: '#dc1818',
            coins: 8,
            credits: 8000,
            minPersonnel: 2,
            maxPersonnel: 4,
            wtank: 1000,
            possibleBuildings: [0],
        },
        30: {
            caption: 'Autobotte AIB',
            color: '#dc1818',
            coins: 15,
            credits: 19_000,
            minPersonnel: 1,
            maxPersonnel: 3,
            wtank: 4000,
            possibleBuildings: [0],
        },
        31: {
            caption: 'Funzionario AIB - DOS',
            color: '#dc1818',
            coins: 15,
            credits: 20_000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    'Direttore Operazioni Spegnimento': {
                        all: true,
                    },
                },
            },
        },
        32: {
            caption: 'Camion con Rimorchio',
            color: '#dc1818',
            coins: 10,
            credits: 5000,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [0],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    'Autista Movimento Terra': {
                        min: 0,
                    },
                    'Autista Mezzi Pesanti': {
                        all: true,
                    },
                },
            },
        },
        33: {
            caption: 'Scavatore su Rimorchio',
            color: '#dc1818',
            coins: 15,
            credits: 20_000,
            minPersonnel: 0,
            maxPersonnel: 0,
            possibleBuildings: [0],
            special:
                'Richiede 1 persona addestrata per il veicolo trainante (Autista Movimento Terra)',
        },
        34: {
            caption: 'Elicottero Antincendio',
            color: '#dc1818',
            coins: 25,
            credits: 300_000,
            minPersonnel: 2,
            maxPersonnel: 2,
            wtank: 2000,
            possibleBuildings: [24],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    'Pilota Velivoli Antincendio': {
                        all: true,
                    },
                },
            },
        },
        35: {
            caption: 'Canadair',
            color: '#dc1818',
            coins: 25,
            credits: 600_000,
            minPersonnel: 2,
            maxPersonnel: 5,
            wtank: 6000,
            possibleBuildings: [24],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    'Pilota Velivoli Antincendio': {
                        all: true,
                    },
                },
            },
        },
        36: {
            caption: 'P.M.A.',
            color: '#f59f00',
            coins: 15,
            credits: 50_000,
            minPersonnel: 1,
            maxPersonnel: 4,
            possibleBuildings: [0, 2],
            schooling: {
                'Caserma dei vigili del fuoco': {
                    'Corso Operatore MaxiEmergenze': {
                        all: true,
                    },
                },
                'Soccorso': {
                    'Corso Operatore MaxiEmergenze': {
                        all: true,
                    },
                },
            },
        },
        37: {
            caption: 'ACT/SCHIUMA',
            color: '#dc1818',
            coins: 15,
            credits: 35_000,
            minPersonnel: 2,
            maxPersonnel: 3,
            ftank: 2000,
            possibleBuildings: [0],
        },
        38: {
            caption: 'Pattuglia Polizia Stradale',
            color: '#0a2bff',
            coins: -1,
            credits: -1,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 19],
        },
        39: {
            caption: 'Moto Polizia Stradale',
            color: '#0a2bff',
            coins: -1,
            credits: -1,
            minPersonnel: 1,
            maxPersonnel: 1,
            possibleBuildings: [6, 19],
        },
        40: {
            caption: 'Pattuglia Forestale',
            color: '#0a2bff',
            coins: -1,
            credits: -1,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 19],
        },
        41: {
            caption: 'Idrante Antisommossa',
            color: '#0a2bff',
            coins: -1,
            credits: -1,
            minPersonnel: 1,
            maxPersonnel: 2,
            possibleBuildings: [6, 19],
        },
    },
    buildingCategories: {
        'Vigili del Fuoco': {
            buildings: [0, 1, 15, 18, 24],
            color: '#ff2d2d',
        },
        'Soccorso': {
            buildings: [2, 3, 4, 5, 20],
            color: '#ffa500',
        },
        'Polizia': {
            buildings: [6, 8, 19, 13, 21],
            color: '#00ac00',
        },
        'Altro': {
            buildings: [7, 14, 22, 23],
            color: '#02a18c',
        },
    },
    vehicleCategories: {
        'Vigili del Fuoco': {
            vehicles: {
                'Autopompa': [0, 9],
                'Kilolitrica': [5],
                'Veicoli speciali': [1, 2, 3, 6, 10, 11, 12, 26, 37],
                'Soccorso in acqua': [23, 24, 25],
                'Mezzi AIB': [28, 29, 30, 31, 32, 33, 34, 35],
            },
            color: '#ff2d2d',
        },
        'Soccorso': {
            vehicles: {
                Ambulanza: [4, 20, 27],
                Elisoccorso: [8],
                Medica: [18, 19, 36],
            },
            color: '#ffa500',
        },
        'Polizia': {
            vehicles: {
                'Volante': [7],
                'UOPI': [14, 17, 22],
                'Moto Polizia': [16],
                'Elicottero': [13],
                'Antidroga': [15],
                'Finanza': [21],
                'New': [38, 39, 40, 41],
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
        'Caserma dei vigili del fuoco': [
            {
                caption: 'N.B.C.R.',
                duration: '3 giorni',
                staffList: 'N.B.C.R.',
            },
            {
                caption: 'Corso per funzionario (UCL)',
                duration: '5 giorni',
                staffList: 'Comando mobile',
            },
            {
                caption: 'Servizio antincendio aeroportuale in addestramento',
                duration: '3 giorni',
            },
            {
                caption: 'Corso per operatore tecnico SAF',
                duration: '3 giorni',
                staffList: 'Corso per operatore tecnico SAF',
            },
            {
                caption: 'Navigazione in oceano',
                duration: '5 giorni',
            },
            {
                caption: 'Corso autista di Autogrù',
                duration: '3 giorni',
                staffList: 'Autogrù',
            },
            {
                caption: 'Corso medico di emergenza',
                duration: '7 giorni',
                staffList: 'Medico di emergenza',
            },
            {
                caption: 'Corso per operatore tecnico NSSA',
                duration: '5 giorni',
                staffList: 'Corso per operatore tecnico NSSA',
            },
            {
                caption: 'Autista Movimento Terra',
                duration: '3 giorni',
                staffList: 'Autista Movimento Terra',
            },
            {
                caption: 'Pilota Velivoli Antincendio',
                duration: '5 giorni',
                staffList: 'Pilota Velivoli Antincendio',
            },
            {
                caption: 'Direttore Operazioni Spegnimento',
                duration: '3 giorni',
                staffList: 'Direttore Operazioni Spegnimento',
            },
            {
                caption: 'Corso Operatore MaxiEmergenze',
                duration: '5 giorni',
                staffList: 'Operatore MaxiEmergenze',
            },
        ],
        'Polizia': [
            {
                caption: 'Reparto volo della polizia',
                duration: '7 giorni',
                staffList: 'Reparto volo della polizia',
            },
            {
                caption: 'Specializzazione antisommossa/UOPI',
                duration: '5 giorni',
                staffList: 'Specializzazione antisommossa/UOPI',
            },
            {
                caption: 'Specializzazione unità cinofila',
                duration: '5 giorni',
                staffList: 'Specializzazione unità cinofila',
            },
            {
                caption: 'Specializzazione motociclista',
                duration: '3 giorni',
                staffList: 'Specializzazione motociclista',
            },
            {
                caption: 'Corso Artificieri',
                duration: '3 giorni',
                staffList: 'Corso Artificieri',
            },
            {
                caption: 'Operatore Idrante Antisommossa',
                duration: '3 giorni',
                staffList: 'Operatore Idrante Antisommossa',
            },
        ],
        'Soccorso': [
            {
                caption: 'Corso medico di emergenza',
                duration: '7 giorni',
                staffList: 'Medico di emergenza',
            },
            {
                caption: 'Corso Operatore MaxiEmergenze',
                duration: '5 giorni',
                staffList: 'Operatore MaxiEmergenze',
            },
        ],
    },
    amount: 'Quantità',
    search: 'Cerca',
    alliance: 'Alleanza',
    premiumNotice: "Quest'opzione è permessa solo ad utenti premium",
    credits: 'Crediti',
    coins: 'Monete',
    close: 'Chiudi',
    fullscreen: {
        expand: 'Attiva modalità schermo intero',
        compress: 'Disabilita modalità schermo intero',
    },
    hideTitle: 'Show heading | Hide heading',
    vehicle: 'Cars | Car | Cars',
    building: 'Edifici',
    station: 'stazioni | Stazione | Stazioni',
    distance: 'Distanza | Distanze',
    vehicleType: 'Tipo di veicolo',
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
        'Parco',
        'Lago',
        'Ospedale',
        'Bosco',
        "Fermata dell'autobus",
        'Fermata del tram',
        'Stazione ferroviaria (traffico regionale)',
        'Stazione ferroviaria (traffico regionale e viaggi a lunga distanza)',
        'Stazione merci',
        'Supermercato (piccolo)',
        'Supermercato (grande)',
        'Stazione di servizio',
        'Scuola',
        'Museo',
        'Centro commerciale',
        'Officina meccanica',
        'Uscita autostradale',
        'Mercatino di Natale',
        'Discoteca',
        'Stadio',
        'Azienda agricola',
        'Edificio adibito a uffici',
        'Piscina',
        'Passaggio a livello',
        'Teatro',
        'Luna park',
        'Fiume',
        'Piccolo aeroporto (pista)',
        'Grande aeroporto (pista)',
        'Terminal aeroporto',
        'Banca',
        'Magazzino',
        'Ponte',
        'Tavola calda',
        'Porto mercantile',
        'Piattaforma ecologica',
        'Grattacielo',
        'Molo navi da crociera',
        'Porticciolo',
        'Passaggio a livello pedonale',
        'Galleria',
        'Magazzino a celle frigorifere',
        'Centrale elettrica',
        'Fabbrica',
        'Deposito rottami',
        'Stazione metropolitana',
        'Piccolo serbatoio di accumulo sostanze chimiche',
        'Grande serbatoio di accumulo sostanze chimiche',
        'Hotel',
        'Bar',
        'Discarica',
        'Parcheggio coperto',
        'Silos',
        'Centro della città',
        'Laboratorio di Ricerca',
        'Campo sportivo',
        'Collina',
        'Campo',
        'Brughiera',
        'Gariga',
        'Cascina',
        'Campeggio',
        'Autogrill',
        'Piazzola di Sosta',
        'Chiesa',
    ],
    only_alliance_missions: [57, 74],
    transfer_missions: [214],
    ranks: {
        missionchief: {
            0: 'Vigile del fuoco',
            200: 'Vigile del fuoco esperto',
            10_000: 'Vigile del fuoco coordinatore',
            100_000: 'Caposquadra',
            1_000_000: 'Caposquadra esperto',
            5_000_000: 'Caporeparto',
            20_000_000: 'Caporeparto esperto',
            50_000_000: 'Ispettore antincendi',
            1_000_000_000: 'Direttore antincendi capo esperto',
            2_000_000_000: 'Dirigente generale',
            5_000_000_000: 'Dirigente generale Capo del Corpo',
        },
        policechief: {
            0: 'Agente',
            200: 'Agente scelto',
            10_000: 'Assistente',
            100_000: 'Assistente capo',
            1_000_000: 'Sovrintendente',
            5_000_000: 'Ispettore',
            20_000_000: 'Ispettore capo',
            50_000_000: 'Commissario',
            1_000_000_000: 'Commissario capo',
            2_000_000_000: 'Vice questore',
            5_000_000_000: 'Questore',
        },
    },
};
