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

:::warning modules V3 en V4
Voor de modules die in beide versie zijn geïmplementeerd is het aan te raden om maar 1 versie te gebruiken. Hieronder welke module en instelling van versie 4 overeenkomt met een module uit versie 3. 

<table>
<thead>
    <tr>
        <th>V4 module</th>
        <th>V4 instelling</th>
        <th>V3 module</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Uitgebreid meldingsvenster</td>
        <td>Inzetvoorsteltellers</td>
        <td>AUR-klik-teller</td>
    </tr>
    <tr>
        <td>Uitgebreid meldingsvenster</td>
        <td>Generatietijd</td>
        <td>Begintijd meldingen weergeven</td>
    </tr>
    <tr>
        <td>Notificaties</td>
        <td></td>
        <td>Browsermeldingen</td>
    </tr>
    <tr>
        <td>Dashboard</td>
        <td></td>
        <td>Dashboard</td>
    </tr>
    <tr>
        <td>Klok</td>
        <td>Toon klok als overlay</td>
        <td>Klok</td>
    </tr>
    <tr>
        <td>Inzethelper</td>
        <td></td>
        <td>Meldinghelper</td>
    </tr>
    <tr>
        <td>Overzicht</td>
        <td></td>
        <td>Overzicht</td>
    </tr>
    <tr>
        <td>Dashboard</td>
        <td>Tabblad: Statusoverzicht</td>
        <td>Statusteller</td>
    </tr>
    <tr>
        <td>Uitgebreid meldingsvenster</td>
        <td>Meldingstrefwoord</td>
        <td>Steekwoorden bij meldingen</td>
    </tr>
    <tr>
        <td>Uitgebreide gebouwweergave</td>
        <td></td>
        <td>Uitgebreide Bouwweergave</td>
    </tr>
    <tr>
        <td>User-ID</td>
        <td></td>
        <td>User-ID</td>
    </tr>
    <tr>
        <td>Korte gebouwinformatie</td>
        <td></td>
        <td>Voertuigstatus bij gebouwen</td>
    </tr>
</tbody>
</table>
:::