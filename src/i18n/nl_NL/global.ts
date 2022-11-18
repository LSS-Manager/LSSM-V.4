export default {
    updateUserscript: {
        title: 'Userscript verouderd',
        text: `Beste LSSM-gebruiker,<br>
        Helaas is je LSSM V.4 userscript verouderd. In de laatste versie zijn er veranderingen geweest, die belangrijk zijn voor de werking van LSSM V.4.<br>
        Je hebt minimaal versie {minVersion} nodig, de update kan gedaan worden door te klikken op {updateLink}.<br>
        Soms werkt de update niet met die link (met een onbekende reden). Dan kan je de update in Tampermonkey doen (klik op het tampermonkey icoon in de browser, dan  "Overzicht". Vink het vakje aan voor het LSSM userscript en selecteer "update" als actie.<br>
        Als dat ook niet werkt, kan je het LSSM script aanpassen door die leeg te halen en dan de inhoud te plakken van: {bypassLink}.<br>
        Soms wordt LSSM meerdere keren geïnstalleerd na een update. In dat geval verwijder alle LSSM V.4. versies en installeer deze opnieuw.<br><br>
        Met vriendelijke groet,<br>
        Jullie LSSM team`,
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
    anniversary: {
        closeNote: 'Tip: Je kan ook op de ballonnen drukken om dit te sluiten!',
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
