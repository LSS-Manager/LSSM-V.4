---
titel: ℹ️ Allmänt
lang: sv_SE
sidebarDepth: 2
---

# ℹ️ Allmän information om moduler


På följande sidor hittar du en beskrivning av alla våra moduler. Vi har gjort vårt bästa för att hålla dem så begripliga och fullständiga som möjligt. Men på grund av storleken på LSSM är det inte alltid lätt.

Om du har förbättringsförslag kan du skicka dem till oss som alltid - eller till och med göra det själv.

:::danger Moduler som inte fungerar i Mapkit
Som beskrivs i förklaringen till [Appstore](appstore.md), det finns moduler som tyvärr inte är kompatibla med karttypen `Mapkit`. Det är dessa moduler:
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.sv_SE" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
:::
