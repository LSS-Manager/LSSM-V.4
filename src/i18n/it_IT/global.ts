export default {
    updateUserscript: {
        title: 'Userscript out of date',
        text: `Dear LSSM-User,<br>
unfortunately your LSSM V.4 userscript is outdated. In the latest version changes have been made to the userscript, which are important for the function of LSSM V.4.<br>
You need at least version {minVersion}, the update can be done comfortably by clicking on {updateLink}.<br>
Sometimes the update does not work by clicking the link (for unknown reasons). Then you can either trigger an update within Tampermonkey (click on the tampermonkey icon in your browser, then "Overview". Check the box in front of the LSSM userscript and select "Update" as action.<br>
If that also does not work, edit the LSSM Script within Tampermonkey by replacing all script content with the content of {bypassLink}.<br>
Sometimes, LSSM is installed multiple times after an update. In this case it helps to uninstall/remove all LSSM V.4 installations in Tampermonkey and then reinstall LSSM V.4 once.<br><br>
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
    settings: {
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
        branch: {
            description:
                'Choose here between stable, beta or a preview version. Note that preview versions are automatically deleted approx. 7 days after their last update.',
            title: 'Choose version',
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
};
