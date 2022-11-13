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
    anniversary1: {
        closeNote: 'Tips: Du kan også klikke på ballongene for å lukke!',
        title: '🎉 Det er grunn til å feire! 🎉',
        content:
            'Wow, så fort tiden går!<br>Det har gått <b>ett år</b> siden LSS Manager V.4 ble online! Mye har selvfølgelig skjedd i år, og derfor vil vi i denne spesielle anledningen rette en spesiell takk til dere brukere. Gleden du tester de nye funksjonene våre med inspirerer oss igjen og igjen og gir oss ny motivasjon til å fortsette. En stor takk rettes også til oversetterne våre som frivillig gir seg tid til å gjøre LSSM brukbar i andre versjoner av spillet.</br>For å feire vil vi gjerne dele noen fakta og tall her:<ul ><li><code>10. februar 2020</code>: Den første forpliktelsen på GitHub ble gjort: <a href="https://github.com/LSS-Manager/LSSM-V.4/commit/6e95836" target="_blank">6e95836</a>. Siden den gang har vi foretatt over 5600 forpliktelser!</li><li><code>19. september 2020</code>: V.4 ble offisielt annonsert for første gang på forumet: <a href="https:/ /forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a>. Med dette har også søknadsfasen for betatestere startet</li><li><code>17. oktober 2020</code>: Betatestere har fått tilgang til V.4 for første gang. Den 4-ukers betafasen har dermed startet</li><li><code>21. november 2020</code>: LSS Manager V.4 går online for alle!</li><li>Telemetrien vår registrerer for tiden rundt 5000 brukere de siste 6 månedene. Av disse var over 2200 aktive de siste 14 dagene. Mørketallet (antall brukere som har deaktivert telemetri) kan ikke estimeres.</li><li>Tråden vår i forumet har nå nådd nesten 1200 meldinger. Det er ganske mye, men V.3-tråden, som for øyeblikket skraper opp de 3500 svarene, er langt fra å ta igjen.</li><li>For mer statistikk, sjekk ut tråden vår i forumet:<a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a></li>< /ul><br>Vi ser frem til mange flere flotte øyeblikk i LSSM V.4-tiden!<br>Ditt LSSM-team<br>Jan, Sanni & Ron',
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
