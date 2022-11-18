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
        msg: 'Pokud k této chybě dochází často, prosím kontaktujte tým LSSM!',
    },
    warnings: {
        version: {
            title: 'Špatná verze LSS Managera',
            text: 'Vážený uživateli, bohužel jsme zjistili, že nemáte nejnovější verzi doplňku LSS Manager. Nejnovější verze je {version}, ale vy aktuálně máte {curver}. Prosíme o znovunačtení hry bez mezipaměti (pomocí Ctrl + F5, na zařízeních Apple příkaz + R), tímto může být chyba odstraněna. Pokud chyba přetrvává, prosím nahlašte to týmu LSSM! Pokud používáte špatnou verzi, nemůžeme garantovat plnou funkcionalitu doplňku LSS-Manager.',
            close: 'Uzavřít zprávu a znovunačíst hru(doporučeno)',
            abort: 'Zavřít zprávu bez znovunačtení hry',
        },
    },
    anniversary: {
        closeNote: 'Tip: You can also click on the balloons to close!',
    },
    settings: {
        name: 'Základní nastavení',
        labelInMenu: {
            title: 'Popisek namísto ikony v menu',
            description:
                'Zobrazí jednotuchý popisek v navigační liště namísto loga LSSM',
        },
        allowTelemetry: {
            description:
                'Povolit LSSM odesílat data, což pomáhá při vývoji tohoto rozšíření.',
            title: 'Povolení telemetrie',
        },
        branch: {
            description:
                'Choose here between stable, beta or a preview version. Note that preview versions are automatically deleted approx. 7 days after their last update.',
            title: 'Choose version',
        },
        iconBg: {
            description: 'Změnit barvu pozadí ikony LSSM',
            title: 'pozadí ikony LSSM',
        },
        iconBgAsNavBg: {
            description:
                'barva celé navigační lišty v barvě pozadí  ikony LSSM',
            title: 'Zbarvení navigační lišty',
        },
        debugMode: {
            title: 'Debug-Mode',
            description:
                'A small debug mode that displays helpful hints in the browser console. Enabling it is only recommended if requested by the LSSM team, as the console will contain many messages.',
        },
    },
};
