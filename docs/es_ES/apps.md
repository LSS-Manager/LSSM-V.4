---
title: ℹ️ General
lang: es_ES
sidebarDepth: 2
---

# ℹ️ Información general sobre módulos

En las siguientes páginas encontrará una descripción de todos nuestros módulos. Hemos hecho todo lo posible para mantenerlos lo más comprensibles y completos posible. Sin embargo, debido al tamaño de LSSM, esto no siempre es fácil.

Si tiene sugerencias para mejorar, puede enviárnoslas como siempre, ó incluso hacerlo usted mismo.

:::danger 
Módulos que no funcionan en Mapkit
Como se describe en la explicación de la [Appstore] (appstore.md), hay módulos que, lamentablemente, no son compatibles con el tipo de mapa `Mapkit`. Estos son estos módulos:
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.en_US" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
:::
