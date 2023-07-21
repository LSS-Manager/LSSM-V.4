---
title: Metadane
lang: pl_PL
sidebarDepth: 0
---

# Zbieranie metadanych użytkownika

Używając `LSSM` (Leitstellenspiel Manager, userscript for the browser) użytkownik wyraża zgodę na zbieranie metadanych. Przechowywanie będą następujące informacje:

* Unikalny identyfikator użytkownika (ID)
    * w tym unikalny "Sekret" (unikalny, niepubliczny ciąg znaków do identyfikacji)
* Nazwa użytkownika
* Ilość budynków
* Używana przeglądarka
    * w tym informacja o jej wersji
* Czas zebrania danych
* Aktywne moduły
* Język gry
    * w tym informacje, czy wersja policyjna (jeśli jest dostępna) czy nie
* Jaki typ mapy jest aktywny (OSM czy Mapkit)
* Wersja LSSM
* LSSM branch (`stable`, `beta` or a preview-branch)
* version of the installed LSSM userscript

Dane te są wykorzystywane do ulepszania rozszerzenia, a także do kierowania rozwojem istniejących lub przyszłych modułów.
 Stanowią też podstawę do tworzenia ciekawych statystyk, które mogą być publikowane np. jako newsy (więcej informacji patrz [poniżej](#publikowanie-statystyk)).

**Użytkownik może (dez)aktywować gromadzenie tych danych w dowolnym momencie w [ustawieniach][docs.settings].**

**W dowolnym momencie można zażądać usunięcia już zebranych danych, wysyłając wiadomość do programistów na jeden ze sposobów wymienionych w [support][docs.support] lub wysyłając nieformalny e-mail na adres `developer[at]lss-manager.de`.**

Za każdym razem, gdy otwierana jest strona główna gry, dane telemetryczne (jeśli są włączone) są wysyłane na serwer LSSM.
 Jeżeli dla użytkownika istnieje już rekord danych, zostanie on nadpisany, historia poszczególnych danych nie zostanie zapisana.
 Jeśli rekord danych nie otrzymał aktualizacji przez ponad 6 miesięcy, zostanie automatycznie usunięty.

# Publikowanie statystyk

Zespół LSSM może publikować następujące statystyki telemetryczne:

* łączna liczba aktualnych rekordów telemetrii dla kolejnych okresów czasu:
    * ostatnich 6 miesięcy
    * ostatnich 30 dni
    * ostatnich 7 dni
    * ostatnich 24 godzin
    * Dzisiejsza data kalendarzowa według czasu niemieckiego
* liczba wpisów telemetrycznych użytkowników z kontem premium lub bez
* liczba wpisów telemetrycznych użytkowników w zależności od języka gry
    * w tym podział na wersję policyjną i wersję „normalną”, jeśli jest dostępna
* liczba wpisów telemetrycznych na przeglądarkę
    * w tym podział na główną wersję przeglądarki. Tj. „Firefox 100.3” i „Firefox 100.4” są połączone jako „Firefox 100”.
* liczba wpisów telemetrycznych na typ mapy
* liczba wpisów telemetrycznych na wersję LSSM
* liczba wpisów telemetrycznych dla każdego z dostępnych modułów.

Wnioskowanie do poszczególnych rekordów jest **nie** możliwe dzięki tym statystykom.

## Zbieranie metadanych przez zewnętrznych dostawców

Sam LSSM nie używa żadnych narzędzi, bibliotek, narzędzi itp., które mogłyby zbierać metadane od użytkowników.
W przypadku korzystania z przeglądarki i menedżera skryptów użytkownika, takiego jak [Tampermonkey][tampermonkey], nie można uniknąć gromadzenia ich metadanych.
Wszystkie te zebrane dane nie są dostępne ani widoczne dla zespołu LSSM i nie można im zapobiegać, faworyzować ani manipulować przez LSSM.
Informacje o gromadzeniu danych przez odpowiednie oprogramowanie można znaleźć w źródłach informacji odpowiedniego oprogramowania.

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