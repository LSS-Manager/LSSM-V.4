<template>
    <div>
        <v-select></v-select>
        <pre>{{ arrs }}</pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import type {
    DefaultComputed,
    DefaultMethods,
    DefaultProps,
} from 'vue/types/options';

type ARROption = { label: string; id: string /*; html: string*/ };

type ARRs = (ARROption | { label: string; id: string; category: true })[];

export default Vue.extend<
    { arrs: ARRs },
    DefaultMethods<Vue>,
    DefaultComputed,
    DefaultProps
>({
    name: 'lssmv4-ecw-arr-search-dropdown',
    components: {
        VSelect: () =>
            import(
                /* webpackChunkName: "components/vue-select" */ 'vue-select'
            ),
    },
    data() {
        const getOptionFromARRElement = (arr: HTMLAnchorElement): ARROption =>
            arr.classList.contains('aao')
                ? {
                      label: arr.title,
                      id: `arr_${arr.getAttribute('aao_id') ?? ''}`,
                      // html: arr.outerHTML,
                  }
                : {
                      label: arr.textContent?.trim() ?? '',
                      id: `group_${arr.getAttribute('vehicle_group_id') ?? ''}`,
                      // html: arr.outerHTML,
                  };

        const arrs: ARRs = [];
        arrs.push(
            ...Array.from(
                document.querySelectorAll<HTMLAnchorElement>(
                    '#mission_aao_no_category .aao_searchable, #aao_without_category .aao_searchable'
                )
            ).map(getOptionFromARRElement)
        );
        return {
            arrs,
        };
    },
});
</script>
