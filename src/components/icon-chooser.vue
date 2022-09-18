<template>
    <lightbox name="icon-chooser" no-fullscreen no-title-hide no-x-btn>
        <fa-icon-chooser version="6.2.0" />
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import '@fortawesome/fa-icon-chooser/dist/fa-icon-chooser/fa-icon-chooser.esm';
import type {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
    DefaultProps,
} from 'vue/types/options';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    DefaultComputed,
    DefaultProps
>({
    name: 'icon-chooser',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ './lightbox.vue'
            ),
    },
    data() {
        return {};
    },
});
</script>

<style scoped lang="sass">
fa-icon-chooser
    margin: 0
    width: 100%
</style>
