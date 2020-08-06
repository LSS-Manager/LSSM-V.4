<template>
    <lightbox name="lssmaql">
        <h1>
            <font-awesome-icon :icon="faTerminal"></font-awesome-icon>
            LSSMAQL Console
        </h1>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import Lightbox from '../../components/lightbox.vue';
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import {
    DefaultData,
    DefaultMethods,
    DefaultComputed,
    DefaultProps,
} from 'vue/types/options';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    DefaultComputed,
    DefaultProps
>({
    name: 'lssmaql',
    components: { Lightbox },
    data: function() {
        return {
            faTerminal,
        };
    },
});
</script>

<style scoped></style>
