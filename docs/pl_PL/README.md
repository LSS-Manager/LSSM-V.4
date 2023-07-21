---
title: LSS-Manager V.4
lang: pl-PL
sidebarDepth: 2
---

# Wiki 🇵🇱 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status][lssm.status]

[Game-Online-Status](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## O nas (LSSM)

LSS MANAGER V.4 to rozszerzenie dla [operatorratunkowy.pl][games.self] i jego innych wersji językowych.

Dzięki temu rozszerzeniu do gry zostaje dodany sklep z aplikacjami, umożliwiający korzystanie z modułów. Możesz zdecydować, które moduły chcesz aktywować.

Dezaktywowane wtyczki nie są ładowane do przeglądarki, aby zapewnić lepszą wydajność.


## Instalacja 📥
[Korzystając z LSSM, zgadzasz się na zbieranie metadanych.][docs.metadata]

Tabelę, z którymi przeglądarkami jest zgodny LSSM, można znaleźć na naszym [FAQ](faq.md)

::: tip Korzystanie z LSSM na telefonach komórkowych
LSSM nie obsługuje urządzeń mobilnych. Chociaż Firefox na urządzeniach mobilnych zezwala na dodatki, nie gwarantujemy funkcjonalności.

Obecnie **nie** planujemy oficjalnego wsparcia przeglądarek mobilnych.
:::
### Krok 1: Zainstaluj Tampermonkey
Zainstaluj rozszerzenie Tampermonkey w swojej przeglądarce.

<tampermonkey-download-table/>

W przypadku innych przeglądarek możesz pobrać Tampermonkey na [tampermonkey.net][tampermonkey].

::: warning Uwaga!
Należy pamiętać, że oficjalnie nie wspieramy: 
-starszych przeglądarkek;
-przeglądarkek mobilnych;
-Apple Safari.
:::

### Krok 2: Skrypt użytkownika
Jeśli Tampermonkey został pomyślnie zainstalowany w twojej przeglądarce, możesz kliknąć [tutaj][lssm.userscript] lub utworzyć nowy skrypt użytkownika o następującej treści:

@[code js](@userscript)

### Krok 3: Aktywuj
Wskaźnik LSSM to podświetlony na zielono tekst „LSSM V.4”, znajdujący się w prawym górnym rogu OperatoraRatunkowego.
Jeśli nie możesz znaleźć tego wskaźnika, kliknij ikonę tampermonkey w przeglądarce i sprawdź, czy przełącznik skryptu LSS-Manager jest ustawiony na `on`.

Jeśli masz jakiekolwiek problemy, skontaktuj się z nami: [Support][docs.support].

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /pl_PL/
[docs.apps]: /pl_PL/apps.md
[docs.appstore]: /pl_PL/appstore.md
[docs.bugs]: /pl_PL/bugs.md
[docs.error_report]: /pl_PL/error_report.md
[docs.faq]: /pl_PL/faq.md
[docs.metadata]: /pl_PL/metadata.md
[docs.other]: /pl_PL/other.md
[docs.settings]: /pl_PL/settings.md
[docs.suggestions]: /pl_PL/suggestions.md
[docs.support]: /pl_PL/support.md
[games.self]: https://operatorratunkowy.pl
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug