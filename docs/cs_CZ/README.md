---
title: LSS-Manager V.4
lang: cs-CZ
sidebarDepth: 2
---

# Wiki 🇨🇿 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: <i>{{ $theme.variables.versions.stable }}</i>
> 
> beta: <i>{{ $theme.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status](https://status.lss-manager.de)

[Game-Online-Status](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## O LSSM

LSS MANAGER V.4 je rozšíření pro hru [Operacni-stredisko.cz](https://www.operacni-stredisko.cz/) a její další jazykové verze.

S tímto rozšířením je do hry přidána Sbírka aplikací, která umožňuje využívat moduly. Samostatně si zde vyberete, které moduly chcete aktivovat. 

Pro lepší stabilitu hry nejsou načítány neaktivní moduly.


## Instalace 📥
[Užíváním LSSM souhlasíte se sběrem metadat.](metadata.md)

Tabulku kompatibilních prohlížečů s LSSM naleznete v našich [FAQ](faq.md)

:::tip LSSM na mobilních telefonech
Nezajišťujeme používání LSSM na mobilech. Pokud Firefox na mobilu povoluje doplňky, nemůžeme zaručit funkcionalitu.

Oficiální podpora mobilních prohlížečů **není** plánována.
:::

### Krok 1: Instalace Tampermonkey
Nainstaluj doplněk Tampermonkey do tvého prohlížeče.

<tampermonkey-download-table/>

Pro ostatní prohlížeče můžete stáhnout Tampermonkey na [tampermonkey.net](https://www.tampermonkey.net/).

:::warning
Berte prosím na vědomí, že nepodporujeme: starší prohlížeče, mobilní prohlížeče nebo Apple Safari.
:::

### Krok 2: Uživatelský script
Pokud byl Tampermonkey úspěšně nainstalován do Vašeho prohlížeče, můžete kliknout <a :href="$theme.variables.server + 'lssm-v4.user.js'" target="_blank">ZDE</a> nebo vytvořit nový uživatelský script s následujícím obsahem:

@[code js](@userscript)

### Krok 3: Aktivace
Indikátorem LSSM je zeleně zvýrazněný text `LSSM V.4`, který se nachází v pravém horním rohu hry Operační středisko.
Pokud nemůžete tento indikátor nalézt, klikněte na ikonku tampermonkey ve Vašem prohlížeči a zkontrolujte, zda je přepínač pro LSS-manager nastaven na `Povoleno`.

Pokud máte jakékoli problémy, neváhejte kontaktovat [Podporu](support.md).
