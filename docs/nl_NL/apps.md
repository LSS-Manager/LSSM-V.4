---
title: ℹ️ Algemeen
lang: nl_NL
sidebarDepth: 2
---

# ℹ️ Algemene infomatie over modules

Op de volgende pagina's vindt u een beschrijving van al onze modules. We hebben ons best gedaan om ze zo begrijpelijk en compleet mogelijk te houden. Vanwege de grootte van LSSM is dit echter niet altijd gemakkelijk.

Als u suggesties voor verbetering heeft, kunt u deze zoals altijd naar ons opsturen - of zelfs zelf aanpassen.

:::danger Modules die niet werken in Mapkit
Zoals beschreven in de uitleg van de [Appstore](appstore.md), zijn er modules die helaas niet compatibel zijn met het kaarttype `Mapkit`. Dit zijn de volgende modules:
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.nl_NL" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
:::