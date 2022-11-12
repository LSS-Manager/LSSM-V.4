export default {
    updateUserscript: {
        title: 'Skrypt użytkownika nieaktualny',
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
        title: 'Menedżer LSS: błąd',
        msg: 'Jeśli ten błąd występuje często, zgłoś go zespołowi LSSM!',
        requestIssue: {
            title: 'Błędne żądanie: Status {status}',
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
            close: 'Odrzuć',
        },
    },
    warnings: {
        version: {
            title: 'Zła wersja LSS Manager',
            text: 'Drogi użytkowniku, niestety odkryliśmy, że nie masz najnowszej wersji LSS Manager. Najnowsza wersja to {version}, ale ty masz {curver}. Proszę przeładować grę  (Ctrl + F5, na urządzeniach Apple polecenie + R), to powinno naprawić błąd. Jeśli błąd będzie się powtarzał, zgłoś go zespołowi! W przypadku użycia złej wersji nie możemy zagwarantować pełnej funkcjonalności LSS-Manager.',
            close: 'Zamknij wiadomość i przeładuj grę (zalecane)',
            abort: 'Zmaknij wiadomość bez przeładowania',
        },
    },
    anniversary1: {
        closeNote: 'Wskazówka: możesz również kliknąć balony, aby zamknąć!',
        title: '🎉 Jest powód do świętowania! 🎉',
        content:
            'Wow, how fast time flies!<br>It\'s been <b>one year</b> since the LSS Manager V.4 went online! A lot has happened this year, of course, and so on this special occasion we would like to say a special thank you to you, the users. The joy with which you test our new features inspires us again and again and gives us new motivation to continue. Also, a big thank you goes out to our translators who volunteer their time to make the LSSM usable in other versions of the game.</br>To celebrate, we\'d like to share a few facts and figures here:<ul><li><code>February 10th 2020</code>: The First Commit on GitHub was made: <a href="https://github.com/LSS-Manager/LSSM-V.4/commit/6e95836" target="_blank">6e95836</a>. Since then we have made over 5,600 commits!</li><li><code>September 19th, 2020</code>: V.4 was officially announced for the first time on the forum: <a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a>. With this, the application phase for beta testers has also started</li><li><code>October 17th 2020</code>: Beta testers have been given access to V.4 for the first time. The 4-week beta phase has thus started</li><li><code>November 21st 2020</code>: LSS Manager V.4 goes online for everyone!</li><li>Our telemetry currently records around 5,000 users in the past 6 months. Of these, over 2,200 were active in the last 14 days. The dark figure (number of users who have deactivated telemetry) can not be estimated.</li><li>Our thread in the forum has now reached almost 1,200 messages. That\'s quite a bit, but the V.3 thread, which is currently scratching the 3,500 responses, is far from catching up.</li><li>For more stats, check out our thread in the forum:<a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a></li></ul><br>We\'re looking forward to many more great moments in the time of LSSM V.4!<br>Your LSSM Team<br>Jan, Sanni & Ron',
    },
    settings: {
        name: 'Ustawienia główne',
        labelInMenu: {
            title: 'Etykieta zamiast ikony w menu',
            description:
                'Wyświetla prostą etykietę na pasku nawigacji zamiast logo LSSM',
        },
        allowTelemetry: {
            description:
                'Kontroluje, czy LSS-Manager może wysyłać dane, które pomagają nam w rozwijaniu tego rozszerzenia.',
            title: 'Zezwól na telemetrię',
        },
        branch: {
            description:
                'Choose here between stable, beta or a preview version. Note that preview versions are automatically deleted approx. 7 days after their last update.',
            title: 'Choose version',
        },
        iconBg: {
            description: 'Zmień tło likony LSSM!',
            title: 'Tło likony LSSM',
        },
        iconBgAsNavBg: {
            description:
                'Pokoloruj cały pasek nawigacyjny w kolorze tła ikony LSSM!',
            title: 'Pokoloruj pasek nawigacyjny',
        },
        loadingIndicator: {
            description:
                'Jeśli to ustawienie jest aktywne, LSSM wyświetla małe kółko ładowania w prawym dolnym rogu, gdy ładuje własne pliki.',
            title: 'Pokaż postęp ładowania',
        },
        osmDarkTooltip: {
            description:
                'To ustawienie przyciemnia podpowiedzi na mapie, jeśli włączyłeś tryb ciemny.',
            title: 'Ciemne podpowiedzi na mapie',
        },
        osmDarkControls: {
            description:
                'To ustawienie przyciemnia przyciski na mapie, jeśli włączyłeś tryb ciemny.',
            title: 'Ciemne przyciski na mapie',
        },
        v3MenuAsSubmenu: {
            title: 'V3 Menu jako podmenu',
            description:
                'Przenosi menu LSSM V3 do menu V4, aby zaoszczędzić trochę miejsca na pasku nawigacyjnym.',
        },
        debugMode: {
            title: 'Tryb debugowania',
            description:
                'Mały tryb debugowania, który wyświetla pomocne wskazówki w konsoli przeglądarki. Włączenie tej opcji jest zalecane tylko na żądanie zespołu LSSM, ponieważ konsola będzie zawierać wiele wiadomości.',
        },
    },
};
