---
title: Ustawienia ⚙️
lang: pl_PL
---

# Ustawienia ⚙️

Ustawienia wszystkich modułów są zarządzane centralnie w ustawieniach. Można zmienić tylko ustawienia aktywnych modułów.

W niedalekiej przyszłości chcielibyśmy zaoferować możliwość zapisywania ustawień związanych z profilem. Oznacza to, że ustawienia nie są już powiązane z urządzeniem.

:::tip Zmiany
Jak tylko wyjdziesz z ustawień i zapiszesz zmiany, gra załaduje się ponownie, aby z łatwością zastosować wszystkie ustawienia.
Jeśli masz niezapisane zmiany, nie możesz zamknąć ustawień - otrzymasz małą podpowiedź.
:::

:::danger Zresetuj ustawienia
Uwaga: jeśli zresetujesz ustawienia, nie można ich przywrócić bez wcześniejszego eksportu!
:::

## Moment.js
Ta sekcja zawiera informacje o tym, jak skonfigurować konfiguracje daty i czasu, m.in. w module [zegar](modules/clock.md).

Używamy [Moment.js](https://momentjs.com) by zaoferować duży wybór konfiguracji. Jeśli chcesz zobaczyć oryginalną dokumentację, możesz znaleźć ją [tutaj](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/).

### Live-Editor
Wypróbuj swój własny format tutaj i zobacz podgląd na żywo! Zobacz informacje o konfiguracji poniżej.

<momentjs-preview/>

### Zmienne
<momentjs-variables/>

### Krótkie formularze regionalne
<momentjs-shorts/>

### Normalny tekst
Jeśli chcesz dołączyć inne napisy do zegara takie jak `godzina` to wpisanie po prostu `LTS godznia` nie zadziała. W celu dołączenia tekstu, który nie powinien zostać sformatowany wstaw go w `[]`. Przykładowo `LTS [godzina]` spowoduje wyświetlenie `11:13:27 godzina`.

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