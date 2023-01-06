export default {
    updateUserscript: {
        title: 'koodi on vanhentunut',
        text: `Hyvä LSSM-käyttäjä,<br>
valitettavasti LSSM V.4 -käyttäjäkoodisi on vanhentunut. Uusimmassa versiossa userscriptiin on tehty muutoksia, jotka ovat tärkeitä LSSM V.4:n toiminnan kannalta.<br>
Tarvitset vähintään version {minVersion}, päivitys onnistuu kätevästi klikkaamalla {updateLink}.<br>
Joskus päivitys ei toimi napsauttamalla linkkiä (tuntemattomista syistä). Sitten voit joko käynnistää päivityksen Tampermonkeyssa (klikkaa selaimen tampermonkey-kuvaketta ja sitten "Yleiskatsaus". Valitse LSSM-käyttäjäkoodin edessä oleva valintaruutu ja valitse toiminnoksi "Päivitä".<br>
Jos tämäkään ei auta, muokkaa LSSM-skriptiä Tampermonkeyssa korvaamalla kaikki skriptin sisältö kohteen {bypassLink} sisällöllä.<br>
Joskus LSSM asennetaan useita kertoja päivityksen jälkeen. Tässä tapauksessa auttaa poistamaan kaikki LSSM V.4 -asennukset Tampermonkeysta ja asentamaan sitten LSSM V.4 uudelleen kerran.<br><br>
Ystävällisin terveisin,<br>
LSSM-tiimisi`,
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
            title: 'Väärä LSS Manager versio',
            text: 'Hyvä käyttäjä, valitettavasti sinulla ei ole uusinta LSSM versiota. Uusin versio on {version}, mutta sinulla on {curver}. Lataa peli uudelleen ilman välimuistia (Ctrl + F5, Apple-laitteissa shift + command + R), tämän pitäisi korjata bugi. Jos virhe jatkuu, ilmoita siitä tiimille! Jos käytät väärää versiota, emme voi taata LSS-Managerin kaikkia toimintoja.',
            close: 'Sulje viesti ja lataa peli uudelleen (suositellaan)',
            abort: 'Sulje viesti lataamatta peliä uudestaan',
        },
    },
    anniversary: {
        closeNote: 'Vinkki: Voit myös sulkea ilmapalloja napsauttamalla!',
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
