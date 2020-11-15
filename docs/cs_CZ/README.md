---
title: General
lang: cs_CZ
sidebarDepth: 2
---

# Wiki 🇨🇿 <Badge :text="'LSSM V.' + ($themeConfig.variables.versions.stable || 4)"/>

*Current versions:*
> Stable: <i>{{ $themeConfig.variables.versions.stable }}</i> (not yet released)
> 
> beta: <i>{{ $themeConfig.variables.versions.beta }}</i>

## O LSSM

LSS MANAGER V.4 je rozšíření pro hru [Operacni-stredisko.cz](https://www.operacni-stredisko.cz/) a její další jazykové verze.

S tímto rozšířením je do hry přidána Sbírka aplikací, která umožňuje využívat moduly. Samostatně si zde vyberete, které moduly chcete aktivovat. 

Pro lepší stabilitu hry nejsou načítány neaktivní moduly.


## Instalace 📥
[Užíváním LSSM souhlasíte se sběrem metadat.](metadata.md)

Tabulku kompatibilních prohlížečů s LSSM naleznete v našich [FAQ](faq.md)

::: tip LSSM na mobilních telefonech
Nezajišťujeme používání LSSM na mobilech. Pokud Firefox na mobilu povoluje doplňky, nemůžeme zaručit funkcionalitu.

Oficiální podpora mobilních prohlížečů **není** plánována.
:::

### Krok 1: Instalace Tampermonkey
Nainstaluj doplněk Tampermonkey do tvého prohlížeče.

Prohlížeč|Odkaz
-------|----
Chrome | [Stáhnout](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
Firefox| [Stáhnout](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
Safari | [Stáhnout](https://safari.tampermonkey.net/tampermonkey.safariextz)
Opera  | [Stáhnout](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)

Pro ostatní prohlížeče můžete stáhnout Tampermonkey na [tampermonkey.net](https://www.tampermonkey.net/).

::: warning
Berte prosím na vědomí, že nepodporujeme: starší prohlížeče, mobilní prohlížeče, Microsoft Edge nebo Internet Explorer.
:::

### Krok 2: Uživatelský script
Pokud byl Tampermonkey úspěšně nainstalován do Vašeho prohlížeče, můžete kliknout <a :href="$themeConfig.variables.server + 'lssm-v4.user.js'" target="_blank">ZDE</a> nebo vytvořit nový uživatelský script s následujícím obsahem:

<<< ./dist/static/lssm-v4.user.js

### Krok 3: Aktivace
Indikátorem LSSM je zeleně zvýrazněný text `LSSM V.4`, který se nachází v pravém horním rohu hry Operační středisko.
Pokud nemůžete tento indikátor nalézt, klikněte na ikonku tampermonkey ve Vašem prohlížeči a zkontrolujte, zda je přepínač pro LSS-manager nastaven na `Povoleno`.

Pokud máte jakékoli problémy, neváhejte kontaktovat [Podporu](support.md).
