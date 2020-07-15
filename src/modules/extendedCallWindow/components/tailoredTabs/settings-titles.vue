<template>
    <div class="tailored-tabs-setting">
        <b>{{ $t('modules.extendedCallWindow.settings.tailoredtabs.name') }}</b>
        <b>{{
            $t('modules.extendedCallWindow.settings.tailoredtabs.vehicles')
        }}</b>
    </div>
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
    name: 'tailored-tabs-settings-titles',
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
