---
title: ℹ️ General
lang: cs_CZ
sidebarDepth: 2
---

# ℹ️ Základní informace o modulech

Na následujících stránkách naleznete popis všech našich modulů. Snažili jsme se, aby byly co nejvíce srozumitelné a kompletní, nicméně díky rozsáhlosti celého LSSM to není vždy lehké. 

Pokud máte návrhy na zlepšení, můžete nám je poslat nebo dokonce samostatně vytvořit. 

::: danger moduly, které v Mapktitu nefungují
Jak je popsáno ve vysvětlení [Sbírky aplikací](appstore.md), také existují moduly, které bohužel nejsou kompatibilní s Mapkitem. Jedná se o tyto moduly:
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.en_US" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
:::
