export default {
    updateUserscript: {
        title: 'Userscript out of date',
        text: `Vážený uživateli LSSM,<br>
Váš uživatelský skript LSSM V.4 je bohužel zastaralý. V nejnovější verzi byly provedeny změny uživatelského skriptu, které jsou důležité pro funkci LSSM V.4.<br>
Potřebujete alespoň verzi {minVersion}, aktualizaci lze provést pohodlně kliknutím na {updateLink}.<br>
Někdy aktualizace nefunguje kliknutím na odkaz (z neznámých důvodů). Poté můžete buď spustit aktualizaci v rámci Tampermonkey (klikněte na ikonu tampermonkey ve vašem prohlížeči a poté na „Přehled“. Zaškrtněte políčko před uživatelským skriptem LSSM a jako akci vyberte „Aktualizovat“.<br>
Někdy se LSSM po aktualizaci nainstaluje vícekrát. V tomto případě pomůže odinstalovat/odstranit všechny instalace LSSM V.4 v Tampermonkey a poté jednou znovu nainstalovat LSSM V.4.<br><br>
S pozdravem<br>
váš tým LSSM`,
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
