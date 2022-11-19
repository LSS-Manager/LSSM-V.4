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
    anniversary: {
        closeNote: 'Tips: Du kan også klikke på ballongene for å lukke!',
    },
    settings: {
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
        branch: {
            description:
                'Choose here between stable, beta or a preview version. Note that preview versions are automatically deleted approx. 7 days after their last update.',
            title: 'Choose version',
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
};
