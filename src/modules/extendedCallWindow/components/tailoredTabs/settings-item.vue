<template>
    <div class="tailored-tabs-setting"></div>
</template>

<script lang="ts">
import Vue from 'vue';
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
    name: 'tailored-tabs-settings-item',
});
</script>

<style scoped lang="sass">
.tailored-tabs-setting
    display: flex
    justify-content: space-between

    > *
        margin-bottom: 0
        margin-left: 0.5rem
        margin-right: 0.5rem
        width: 100%
</style>
