---
titolo: ℹ️ Generale
lang: it_IT
sidebarDepth: 2
---

# ℹ️ Informazioni generali sui moduli

Nelle seguenti pagine potrai trovare la descrizione di tutti i moduli. Abbiamo fatto del nostro meglio per tenergli il più comprensibili e completi possibile. Tuttavia, per via delle dimensioni di LSSM questo non è sempre facile.

Se hai delle idee o suggerimenti per migliorare, puoi mandarceli come sempre, oppure fargli da solo.

:::danger Moduli che non funzionano con Mapkit
Come descritto nelle spiegazioni del [Negozio](appstore.md), ci sono moduli che sfortunatamente non sono compatibili con la mappa `Mapkit`. Questi sono i moduli in questione:
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.en_GB" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
:::
