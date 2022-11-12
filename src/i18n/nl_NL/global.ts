export default {
    updateUserscript: {
        title: 'Userscript verouderd',
        text: `Dear LSSM-User,<br>
unfortunately your LSSM V.4 userscript is outdated. In the latest version changes have been made to the userscript, which are important for the function of LSSM V.4.<br>
You need at least version {minVersion}, the update can be done comfortably by clicking on {updateLink}.<br>
Sometimes the update does not work by clicking the link (for unknown reasons). Then you can either trigger an update within Tampermonkey (click on the tampermonkey icon in your browser, then "Overview". Check the box in front of the LSSM userscript and select "Update" as action.<br>
If that also does not work, edit the LSSM Script within Tampermonkey by replacing all script content with the content of {bypassLink}.<br>
Sometimes, LSSM is installed multiple times after an update. In this case it helps to uninstall/remove all LSSM V.4 installations in Tampermonkey and then reinstall LSSM V.4 once.<br><br>
Kind regards,<br>
your LSSM team`,
        close: 'Oké',
    },
    error: {
        title: 'LSS Manager: Error',
        msg: 'Als deze foutmelding regelmatig optreedt, neem dan contact op met het LSSM team!',
        requestIssue: {
            title: 'Foutief serververzoek: Status {status}',
            text: `Oh, helaas heeft er een error plaats gevonden met dit verzoek bij de server:<br>
<b>Statuscode</b>: <code>{status}</code> <code>{statusText}</code><br>
<b>URL</b>: <em><code>{method}</code></em> <code>{url}</code><br>
<b>Functie</b>: <code>{feature}</code><br>
<b>Duur</b>: <code>{duration}ms</code><br>
<b>Gebruiker</b>: <code>{uid}</code><br>
<b>Tijdstip</b>: <code>{timestamp}</code>
<br>
Probeer opnieuw om de gewenste actie nogmaals uit te voeren.<br>
Indien het meerdere keren in een korte termijn fout gaat, dan kan het een gevolg zijn van server problemen. Probeer het dan op een later tijdstip nogmaals.`,
            close: 'Mededeling sluiten',
        },
    },
    warnings: {
        version: {
            title: 'Verkeerde LSS Manager versie',
            text: 'Beste gebruiker, helaas moeten we vaststellen dat je niet de laatste versie van LSS Manager gebruikt. De nieuwste versie is {version}, maar je gebruikt {curver}. Herlaad het spel zonder cache (met Ctrl + F5, op Apple apparaten command + R), dit zou de fout moeten oplossen. Als de fout blijft bestaand, meld het dan aan het LSS Manager team! Als je de verkeerde versie gebruikt, kunnen we niet de volledige functionaliteit garanderen van de LSS-Manager.',
            close: 'Sluit melding en herlaad het spel (aanbevolen)',
            abort: 'Sluit melding zonder te herladen',
        },
    },
    anniversary1: {
        closeNote: 'Tip: You can also click on the balloons to close!',
        title: '🎉 There is reason to celebrate! 🎉',
        content:
            'Wow, how fast time flies!<br>It\'s been <b>one year</b> since the LSS Manager V.4 went online! A lot has happened this year, of course, and so on this special occasion we would like to say a special thank you to you, the users. The joy with which you test our new features inspires us again and again and gives us new motivation to continue. Also, a big thank you goes out to our translators who volunteer their time to make the LSSM usable in other versions of the game.</br>To celebrate, we\'d like to share a few facts and figures here:<ul><li><code>February 10th 2020</code>: The First Commit on GitHub was made: <a href="https://github.com/LSS-Manager/LSSM-V.4/commit/6e95836" target="_blank">6e95836</a>. Since then we have made over 5,600 commits!</li><li><code>September 19th, 2020</code>: V.4 was officially announced for the first time on the forum: <a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a>. With this, the application phase for beta testers has also started</li><li><code>October 17th 2020</code>: Beta testers have been given access to V.4 for the first time. The 4-week beta phase has thus started</li><li><code>November 21st 2020</code>: LSS Manager V.4 goes online for everyone!</li><li>Our telemetry currently records around 5,000 users in the past 6 months. Of these, over 2,200 were active in the last 14 days. The dark figure (number of users who have deactivated telemetry) can not be estimated.</li><li>Our thread in the forum has now reached almost 1,200 messages. That\'s quite a bit, but the V.3 thread, which is currently scratching the 3,500 responses, is far from catching up.</li><li>For more stats, check out our thread in the forum:<a href="https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/" target="_blank">LSS Manager V.4</a></li></ul><br>We\'re looking forward to many more great moments in the time of LSSM V.4!<br>Your LSSM Team<br>Jan, Sanni & Ron',
    },
    settings: {
        name: 'Algemene instellingen',
        labelInMenu: {
            title: 'Label in plaats van afbeelding in menu',
            description:
                'Laat een simpel label zien in het menu in plaats van het LSSM logo',
        },
        allowTelemetry: {
            description:
                'Bepaalt of LSS-Manager gegevens mag verzenden die ons helpen bij het ontwikkelen van deze extensie.',
            title: 'Telemetrie toestaan',
        },
        branch: {
            description:
                'Kies hier tussen stable, beta of een andere voorvertonings versie. De voorvertonings versies worden ongeveer 7 dagen na hun laatste update verwijderd.',
            title: 'Choose version',
        },
        iconBg: {
            description: 'Verander de achtergrond van het LSSM-logo!',
            title: 'LSSM-logo achtergrond',
        },
        iconBgAsNavBg: {
            description:
                'Kleur de hele menubalk in de kleur van de achtergrond van het LSSM-logo!',
            title: 'Kleur menubalk',
        },
        loadingIndicator: {
            description:
                'Als deze instelling actief is, dan toont LSSM een kleine laadcirkel in de rechterbeneden hoek als LSSM nog aan het laden is.',
            title: 'Toon laad voortgang',
        },
        osmDarkTooltip: {
            description:
                'Deze instelling maakt tooltips op de kaart donker als je de donkere spelmodus gebruikt.',
            title: 'Donkere tooltips op de kaart',
        },
        osmDarkControls: {
            description:
                'Deze instelling zorgt dat er donkere knoppen op de kaart getoond worden als je een donker thema van het spel gebruikt.',
            title: 'Donkere knoppen op de kaart',
        },
        v3MenuAsSubmenu: {
            title: 'V3 menu als submenu',
            description:
                'Verplaatst het menu van LSSM V3 van de menubalk naar een knop in het menu van V4.',
        },
        debugMode: {
            title: 'Debug-Modus',
            description:
                'Een kleine debug modus that behulpzame tips geeft in de browser console. Dit aanzetten is alleen aanbevolen als dit door het LSSM team wordt gevraagd, aangezien de console veel berichten zal bevatten.',
        },
    },
};
