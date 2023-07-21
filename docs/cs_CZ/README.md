---
title: LSS-Manager V.4
lang: cs-CZ
sidebarDepth: 2
---

# Wiki 🇨🇿 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status][lssm.status]

[Game-Online-Status](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## O LSSM

LSS MANAGER V.4 je rozšíření pro hru [Operacni-stredisko.cz][games.self] a její další jazykové verze.

S tímto rozšířením je do hry přidána Sbírka aplikací, která umožňuje využívat moduly. Samostatně si zde vyberete, které moduly chcete aktivovat. 

Pro lepší stabilitu hry nejsou načítány neaktivní moduly.


## Instalace 📥
[Užíváním LSSM souhlasíte se sběrem metadat.][docs.metadata]

Tabulku kompatibilních prohlížečů s LSSM naleznete v našich [FAQ](faq.md)

:::tip LSSM na mobilních telefonech
Nezajišťujeme používání LSSM na mobilech. Pokud Firefox na mobilu povoluje doplňky, nemůžeme zaručit funkcionalitu.

Oficiální podpora mobilních prohlížečů **není** plánována.
:::

### Krok 1: Instalace Tampermonkey
Nainstaluj doplněk Tampermonkey do tvého prohlížeče.

<tampermonkey-download-table/>

Pro ostatní prohlížeče můžete stáhnout Tampermonkey na [tampermonkey.net][tampermonkey].

:::warning
Berte prosím na vědomí, že nepodporujeme: starší prohlížeče, mobilní prohlížeče nebo Apple Safari.
:::

### Krok 2: Uživatelský script
Pokud byl Tampermonkey úspěšně nainstalován do Vašeho prohlížeče, můžete kliknout [ZDE][lssm.userscript] nebo vytvořit nový uživatelský script s následujícím obsahem:

@[code js](@userscript)

### Krok 3: Aktivace
Indikátorem LSSM je zeleně zvýrazněný text `LSSM V.4`, který se nachází v pravém horním rohu hry Operační středisko.
Pokud nemůžete tento indikátor nalézt, klikněte na ikonku tampermonkey ve Vašem prohlížeči a zkontrolujte, zda je přepínač pro LSS-manager nastaven na `Povoleno`.

Pokud máte jakékoli problémy, neváhejte kontaktovat [Podporu][docs.support].

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /cs_CZ/
[docs.apps]: /cs_CZ/apps.md
[docs.appstore]: /cs_CZ/appstore.md
[docs.bugs]: /cs_CZ/bugs.md
[docs.error_report]: /cs_CZ/error_report.md
[docs.faq]: /cs_CZ/faq.md
[docs.metadata]: /cs_CZ/metadata.md
[docs.other]: /cs_CZ/other.md
[docs.settings]: /cs_CZ/settings.md
[docs.suggestions]: /cs_CZ/suggestions.md
[docs.support]: /cs_CZ/support.md
[games.self]: https://operacni-stredisko.cz
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug