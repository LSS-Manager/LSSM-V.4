export default {
    updateUserscript: {
        title: 'Userscript veraltet',
        text: `Lieber LSSM-Nutzer,<br>
leider ist dein LSSM V.4 Userscript veraltet. In der neuesten Version wurden Änderungen am Userscript vorgenommen, die wichtig für die Funktion des LSSM V.4 sind.<br>
Du benötigst mindestens Version {minVersion}, das Update kannst du bequem per Klick auf {updateLink} durchführen.<br>
Manchmal funktioniert ein Update per Link aus unerklärlichen Gründen nicht richtig. Dann lässt sich ein Update manuell triggern: Tampermonkey-Icon im Browser anklicken → "Übersicht" anklicken → Haken beim LSSM V.4 Script setzen → bei Aktion "Aktualisieren" drücken.<br>
Wenn das auch nicht klappt, kannst du den Inhalt des Scripts in Tampermonkey mit dem Inhalt von {bypassLink} ersetzen.<br>
Manchmal ist der LSSM nach einem Update plötzlich mehrfach installiert. In diesem Fall hilft es, alle LSSM V.4-Installationen einmal in Tampermonkey zu deinstallieren/entfernen und dann den LSSM V.4 einmal neu zu installieren.<br><br>
Liebe Grüße,<br>
Dein LSSM-Team`,
        close: 'Ok',
    },
    error: {
        title: 'LSS-Manager: Fehler',
        msg: 'Sollte dieser Fehler öfters auftreten, so melde ihn bitte an das LSSM-Team!',
        requestIssue: {
            title: 'Fehlerhafte Anfrage: Status {status}',
            text: `Huch, bei dieser Serveranfrage ist leider ein Fehler aufgetreten:<br>
<b>Status</b>: <code>{status}</code> <code>{statusText}</code><br>
<b>URL</b>: <em><code>{method}</code></em> <code>{url}</code><br>
<b>Feature</b>: <code>{feature}</code><br>
<b>Dauer</b>: <code>{duration}ms</code><br>
<b>User</b>: <code>{uid}</code><br>
<b>Timestamp</b>: <code>{timestamp}</code>
<br>
Bitte versuche, die gewünschte Aktion nochmals auszuführen.<br>
Sollten mehrere Anfragen in kurzer Zeit fehlschlagen, könnte das an Serverproblemen liegen. Bitte versuche es dann zu einem späteren Zeitpunkt erneut.`,
            close: 'Hinweis schließen',
        },
    },
    warnings: {
        version: {
            title: 'Falsche LSS-Manager Version',
            text: 'Lieber Nutzer, leider mussten wir feststellen, dass du nicht die neueste Version vom LSS-Manager hast. Die neuste Version ist {version}, du hast aber erst {curver}. Bitte lade das Spiel ohne Cache (mit Strg + F5, bei Apple-Geräten command + R) neu, das sollte den Fehler beheben. Sollte der Fehler weiterhin bestehen, bitte melde das an das Team! Bei der Nutzung einer falschen Version können wir nicht die volle Funktionalität des LSS-Managers gewährleisten.',
            close: 'Meldung schließen und Spiel neu laden (empfohlen)',
            abort: 'Meldung schließen ohne Spiel neu zu laden',
        },
    },
    anniversary1: {
        closeNote:
            'Tipp: Zum Schließen kannst du auch auf die Ballons klicken!',
        title: '🎉 Es gibt Grund zu Feiern! 🎉',
        content:
            'Wow, wie schnell die Zeit vergeht!<br>Es ist nun schon <b>ein Jahr</b> her, dass der LSS-Manager V.4 online ging! In diesem Jahr hat sich natürlich einiges getan und deshalb möchten wir zu diesem besonderen Anlass ganz besonders euch, den Nutzern, danken. Die Freude, mit der Ihr unsere neuen Features austestet begeistert uns immer wieder und gibt uns immer wieder neue Motivation, weiter zu machen. Ebenfalls geht ein fettes Danke an unsere Übersetzer, die sich ehrenamtlich darum kümmern, den LSSM auch in anderen Versionen des Spiels nutzbar machen zu können.</br>Zur Feier des Tages möchten wir hier ein paar Fakten und Zahlen veröffentlichen:<ul><li><code>10.02.2020</code>: Der Erste Commit auf GitHub wurde gemacht: <a href="https://github.com/LSS-Manager/LSSM-V.4/commit/6e95836" target="_blank">6e95836</a>. Seitdem haben wir über 5.600 Commits getätigt!</li><li><code>19.09.2020</code>: Die V.4 wurde ein erstes Mal offiziell im Forum angekündigt: <a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS-Manager V.4</a>. Damit hat auch die Bewerbungsphase für Beta-Tester gestartet</li><li><code>17.10.2020</code>: Die Beta-Tester haben das erste Mal Zugriff auf die V.4 bekommen. Die 4-wöchige Beta-Phase hat damit begonnen</li><li><code>21.11.2020</code>: Der LSS-Manager V.4 geht für alle online!</li><li>Unsere Telemetrie verzeichnet aktuell rund 5.000 Nutzer in den vergangenen 6 Monaten. Davon waren über 2.200 in den letzten 14 Tagen aktiv. Die Dunkelziffer (Zahl der Nutzer, die die Telemetrie deaktiviert haben) ist nicht abschätzbar.</li><li>Unser Thread im Forum hat mittlerweile fast 1.200 Nachrichten erreicht. Das ist zwar einiges, aber der Thread der V.3, der aktuell an den 3.500 Antworten kratzt, ist noch lange nicht aufgeholt.</li><li>Weitere Statistiken findest du in unserem Thread im Forum: <a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS-Manager V.4</a></li></ul><br>Wir freuen uns auf viele weitere schöne Momente in der Zeit des LSSM V.4!<br>Euer LSSM-Team<br>Jan, Sanni & Ron',
    },
    settings: {
        name: 'Allgemeine Einstellungen',
        labelInMenu: {
            title: 'Label statt Icon im Menü',
            description:
                'Zeigt in der Navigationsleiste statt dem LSSM-Logo ein einfaches Label an.',
        },
        allowTelemetry: {
            description:
                'Steuert, ob Der LSS-Manager Daten senden darf, die uns bei der Entwicklung helfen.',
            title: 'Telemetrie erlauben',
        },
        branch: {
            description:
                'Wähle hier zwischen stable, beta oder einer Preview-Version. Beachte, dass Preview-Versionen ca. 7 Tage nach dem letzten Update automatisch gelöscht werden.',
            title: 'Version wählen',
        },
        iconBg: {
            description:
                'Ändere hiermit die Farbe des Hintergrunds des LSSM-Icons!',
            title: 'LSSM-Icon Hintergrund',
        },
        iconBgAsNavBg: {
            description:
                'Wenn diese Einstellung aktiviert ist, nimmt die ganze Leiste oben die Hintergrundfarbe des LSSM-Icons an.',
            title: 'Navigationsleiste einfärben',
        },
        loadingIndicator: {
            description:
                'Ist diese Einstellung aktiv, zeigt der LSSM einen kleinen Ladekreisel in der unteren rechten Ecke an, wenn er eigene Dateien lädt.',
            title: 'Ladekreisel anzeigen',
        },
        osmDarkTooltip: {
            description:
                'Diese Einstellung sorgt dafür, dass die Tooltips auf der Karte dunkel sind, wenn du das Spiel im dunklen Modus hast.',
            title: 'Dunkle Tooltips in der Karte',
        },
        osmDarkControls: {
            description:
                'Zeigt die Knöpfe auf der Karte in einer dunkleren Farbe an, wenn du das Spiel im dunklen Modus hast.',
            title: 'Dunkle Knöpfe in der Karte',
        },
        v3MenuAsSubmenu: {
            title: 'V3 Menü als Untermenü',
            description:
                'Verschiebt das Menü des LSSM V3 in das Menü der V4 um Platz in der Navigationsleiste zu sparen.',
        },
        debugMode: {
            title: 'Debug-Modus',
            description:
                'Ein kleiner Debug-Modus, der hilfreiche Hinweise in der Browserkonsole ausgibt. Das Aktivieren wird nur empfohlen, wenn durch das LSSM-Team darum bittet, da die Konsole viele Nachrichten enthalten wird.',
        },
    },
};
