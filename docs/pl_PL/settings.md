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
