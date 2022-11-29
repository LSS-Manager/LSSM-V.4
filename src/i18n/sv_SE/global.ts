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
        title: 'LSS Manager: Fel',
        msg: 'Om detta fel inträffar ofta, rapportera det till LSSM-teamet!',
    },
    warnings: {
        version: {
            title: 'Fel version av LSS Manager',
            text: 'Kära användare, tyvärr har du inte den senaste versionen av LSS Manager. Den senaste versionen är {version} och du har {aktuell}. Ladda om spelet genom att rensa cacheminnet (Ctrl + F5 eller kommando + R på Apple), detta bör lösa problemet. Om problemet kvarstår, vänligen rapportera det till teamet! Om du använder fel version kan vi inte garantera att LSS-Manager fungerar till fullo. ',
            close: 'Stäng detta meddelande och ladda om spelet (rekommenderas)',
            abort: 'Stäng detta meddelande utan att ladda om spelet',
        },
    },
    anniversary: {
        closeNote: 'Tip: You can also click on the balloons to close!',
    },
    settings: {
        name: 'Allmänna inställningar',
        labelInMenu: {
            title: 'Titel istället för en ikon i menyn',
            description:
                'Visar en enkel titel i navigeringsfältet istället för LSSM-logotypen',
        },
        allowTelemetry: {
            description:
                'Kontrollerar om LSS-Manager får skicka data, vilket hjälper oss att utveckla detta extensions.',
            title: 'Tillåt telemetri',
        },
        branch: {
            description:
                'Choose here between stable, beta or a preview version. Note that preview versions are automatically deleted approx. 7 days after their last update.',
            title: 'Choose version',
        },
        iconBg: {
            description: 'Ändra bakgrunden till LSSM-ikon!',
            title: 'LSSM-ikon bakgrund',
        },
        iconBgAsNavBg: {
            description:
                'Färga hela navigeringsfältet med bakgrundsfärgen på LSSM-ikonen!',
            title: 'Färga navigeringsfältet',
        },
        debugMode: {
            title: 'Debug-Mode',
            description:
                'A small debug mode that displays helpful hints in the browser console. Enabling it is only recommended if requested by the LSSM team, as the console will contain many messages.',
        },
    },
};
