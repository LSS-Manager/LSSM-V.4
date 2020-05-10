---
title: ℹ️ Allgemein
lang: de_DE
sidebarDepth: 2
---

# ℹ️ Allgemeines zu Modulen

Auf den folgenden Seiten findest du zu allen unseren Modulen eine Beschreibung. Wir haben unser bestes gegeben, diese so verständlich, und trotzdem vollständig, wie möglich zu halten. Allerdings ist dies aufgrund des Umfangs des LSSM nicht immer einfach.

Wenn du Verbesserungsvorschläge hast, kannst du uns diese wie immer zukommen lassen – oder sogar selbst einbauen.

:::danger Module, die in Mapkit nicht funktionieren
Wie in der Erklärung zum [Appstore](appstore.md) beschrieben, gibt es Module, die leider nicht mit dem Kartentyp `Mapkit` kompatibel sind. Dies sind diese Module:
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.de_DE" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
:::
