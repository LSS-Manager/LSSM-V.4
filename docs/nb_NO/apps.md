---
title: ℹ️ Generelt
lang: nb_NO
sidebarDepth: 2
---

# ℹ️ Generell informasjon om utvidelser

På følgende sider finner du en beskrivelse av alle utvidelsene.
Vi har forsøkt å holde det så enkelt og fullstendig som mulig, men naturligvis, grunnet omfanget til LSSM er ikke det alltid enkelt.

Dersom du har forslag til endringer, kan du sende dem til oss - eller til og med utføre dem selv!

:::danger modules that do not work in Mapkit
Som beskrevet i [Appstore](appstore.md) er det moduler som dessverre ikke er kompitabel med kartet `Mapkit`. Det gjelder disse utvidelsene:
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.en_GB" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
:::
