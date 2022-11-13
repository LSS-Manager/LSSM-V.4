export default {
    updateUserscript: {
        title: 'koodi on vanhentunut',
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
        msg: 'Jos tämä virhe toistuu usein, ilmoita siitä LSSM-tiimille!',
        requestIssue: {
            title: 'Virheellinen pyyntö: Status {status}',
            text: `Auts, valitettavasti tässä palvelinpyynnössä tapahtui virhe:<br>
<b>Status</b>: <code>{status}</code> <code>{statusText}</code><br>
<b>URL</b>: <em><code>{method}</code></em> <code>{url}</code><br>
<b>Feature</b>: <code>{feature}</code><br>
<b>Duration</b>: <code>{duration}ms</code><br>
<b>User</b>: <code>{uid}</code><br>
<b>Timestamp</b>: <code>{timestamp}</code>
<br>
Yritä suorittaa haluamasi toiminto uudelleen.<br>
Jos useat pyynnöt epäonnistuvat lyhyessä ajassa, tämä voi johtua palvelinongelmista. Yritä myöhemmin uudelleen.`,
            close: 'Hylkää',
        },
    },
    warnings: {
        version: {
            title: 'Väärä LSS Manager veriso',
            text: 'Hyvä käyttäjä, Valitettavasti jouduimme huomaamaan, että sinulla ei ole LSS Managerin uusinta versiota. Uusin versio on {version}, mutta sinulla on ensin {curver}. Lataa peli uudelleen ilman välimuistia (Ctrl + F5, Apple-laitteissa shift + command + R), tämän pitäisi korjata bugi. Jos virhe jatkuu, ilmoita siitä tiimille! Jos käytät väärää versiota, emme voi taata LSS-Managerin kaikkia toimintoja.',
            close: 'Sulje viesti ja lataa peli uudelleen (suositellaan)',
            abort: 'Sulje viesti lataamatta peliä uudestaan',
        },
    },
    settings: {
        name: 'Yleiset asetukset',
        labelInMenu: {
            title: 'Tunniste valikossa kuvakkeen sijaan',
            description:
                'Näyttää yksinkertaisen merkin navigointipalkissa LSSM-logon sijaan',
        },
        allowTelemetry: {
            description:
                'Saako LSS-Manager lähettää tietoja, jotka auttavat meitä kehittämään tätä laajennusta.',
            title: 'Salli telemetria',
        },
        branch: {
            description:
                'Valitse tästä vakaa, beta- tai esikatseluversio. Huomaa, että esikatseluversiot poistetaan automaattisesti noin. 7 päivää viimeisen päivityksen jälkeen.',
            title: 'Valitse versio',
        },
        iconBg: {
            description: 'Vaihda LSSM-Iconin tausta!',
            title: 'LSSM-Iconin tausta',
        },
        iconBgAsNavBg: {
            description:
                'Vaihda koko navigointipalkkin väriksi LSSM-kuvakkeen taustan väril!',
            title: 'Vaihda navigointipalkin väriä',
        },
        loadingIndicator: {
            description:
                'Jos tämä asetus on päällä, LSSM näyttää pienen latausympyrän oikeassa alakulmassa kun se lataa omia tiedostojaan.',
            title: 'Näytä lataus',
        },
        osmDarkTooltip: {
            description:
                'Tämä asetus tummentaa kartan tooltipsit, jos olet ottanut tumman tilan käyttöön.',
            title: 'Tummat tooltipsit kartalla',
        },
        osmDarkControls: {
            description:
                'This setting darkens buttons on map if you have enabled dark mode.',
            title: 'Tummat napit kartalla',
        },
        v3MenuAsSubmenu: {
            title: 'V3-valikko alivalikkona',
            description:
                'Siirtää LSSM V3:n valikon V4:n valikkoon säästääkseen tilaa navigointipalkissa.',
        },
        debugMode: {
            title: 'Debug-Tila',
            description:
                'Pieni debug-tila, joka näyttää hyödyllisiä vihjeitä selaimen konsolissa. Sen ottamista käyttöön suositellaan vain, jos LSSM-tiimi sitä pyytää, koska konsoli sisältää paljon viestejä.',
        },
    },
};
