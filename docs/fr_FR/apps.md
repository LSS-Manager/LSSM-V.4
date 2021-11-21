---
title: ℹ️ Général
lang: fr_FR
sidebarDepth: 2
---

# ℹ️ Informations générales sur les modules

Dans les pages suivantes, vous trouverez une description de tous nos modules. Nous avons fait de notre mieux pour qu'ils soient aussi compréhensibles et complets que possible. Cependant, en raison de la taille de LSSM, ce n'est pas toujours facile.

Si vous avez des suggestions d'amélioration, vous pouvez nous les envoyer - ou même le faire vous-même.

:::danger modules qui ne fonctionnent pas dans Mapkit
Comme décrit dans l'explication de l'[Appstore](appstore.md), il y a des modules qui ne sont malheureusement pas compatibles avec le type de carte `Mapkit`. Il s'agit de ces modules :
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.fr_FR" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
:::
