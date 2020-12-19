---
title: ℹ️ General
lang: pl_PL
sidebarDepth: 2
---

# ℹ️ General information on modules

On the following pages you will find a description of all our modules. We have done our best to keep them as understandable and complete as possible. However, due to the size of LSSM this is not always easy.

If you have suggestions for improvement, you can send them to us as always - or even do it yourself.

:::danger modules that do not work in Mapkit
As described in the explanation of the [Appstore](appstore.md), there are modules which are unfortunately not compatible with the map type `Mapkit`. These are these modules:
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.en_US" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
:::
