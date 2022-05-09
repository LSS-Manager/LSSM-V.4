---
title: LSS-Manager V.4
lang: pl-PL
sidebarDepth: 2
---

# Wiki 🇵🇱 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: <i>{{ $theme.variables.versions.stable }}</i>
> 
> beta: <i>{{ $theme.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[Game-Online-Status](https://stats.uptimerobot.com/OEKDJSpmvK)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## O nas (LSSM)

LSS MANAGER V.4 to rozszerzenie dla [operatorratunkowy.pl](https://www.operatorratunkowy.pl) i jego innych wersji językowych.

Dzięki temu rozszerzeniu do gry zostaje dodany sklep z aplikacjami, umożliwiający korzystanie z modułów. Możesz zdecydować, które moduły chcesz aktywować.

Dezaktywowane wtyczki nie są ładowane do przeglądarki, aby zapewnić lepszą wydajność.


## Instalacja 📥
[Korzystając z LSSM, zgadzasz się na zbieranie metadanych.](metadata.md)

Tabelę, z którymi przeglądarkami jest zgodny LSSM, można znaleźć na naszym [FAQ](faq.md)

::: tip Korzystanie z LSSM na telefonach komórkowych
LSSM nie obsługuje urządzeń mobilnych. Chociaż Firefox na urządzeniach mobilnych zezwala na dodatki, nie gwarantujemy funkcjonalności.

Obecnie **nie** planujemy oficjalnego wsparcia przeglądarek mobilnych.
:::
### Krok 1: Zainstaluj Tampermonkey
Zainstaluj rozszerzenie Tampermonkey w swojej przeglądarce.

<tampermonkey-download-table/>

W przypadku innych przeglądarek możesz pobrać Tampermonkey na [tampermonkey.net](https://www.tampermonkey.net/).

::: warning Uwaga!
Należy pamiętać, że oficjalnie nie wspieramy: 
-starszych przeglądarkek;
-przeglądarkek mobilnych;
-Microsoft Edge;
-Internet Explorer.
:::

### Krok 2: Skrypt użytkownika
Jeśli Tampermonkey został pomyślnie zainstalowany w twojej przeglądarce, możesz kliknąć <a :href="$theme.variables.server + 'lssm-v4.user.js'" target="_blank">tutaj</a> lub utworzyć nowy skrypt użytkownika o następującej treści:

@[code js](@userscript)

### Krok 3: Aktywuj
Wskaźnik LSSM to podświetlony na zielono tekst „LSSM V.4”, znajdujący się w prawym górnym rogu OperatoraRatunkowego.
Jeśli nie możesz znaleźć tego wskaźnika, kliknij ikonę tampermonkey w przeglądarce i sprawdź, czy przełącznik skryptu LSS-Manager jest ustawiony na `on`.

Jeśli masz jakiekolwiek problemy, skontaktuj się z nami: [Support](support.md).
