<template>
    <div class="mission-keywords-setting">
        <b>{{
            $t('modules.extendedCallWindow.settings.missionKeywords.keyword')
        }}</b>
        <b>{{
            $t('modules.extendedCallWindow.settings.missionKeywords.color')
        }}</b>
        <b>{{
            $t('modules.extendedCallWindow.settings.missionKeywords.preview')
        }}</b>
        <b>{{
            $t('modules.extendedCallWindow.settings.missionKeywords.missions')
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
    name: 'mission-keywords-settings-titles',
});
</script>

<style scoped lang="sass">
.mission-keywords-setting
    display: flex
    justify-content: space-between

    > *
        margin-bottom: 0
        margin-left: 0.5rem
        margin-right: 0.5rem
        width: 100%
</style>
