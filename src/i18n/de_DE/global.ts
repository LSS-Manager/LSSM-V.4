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
    anniversary: {
        closeNote:
            'Tipp: Zum Schließen kannst du auch auf die Ballons klicken!',
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
