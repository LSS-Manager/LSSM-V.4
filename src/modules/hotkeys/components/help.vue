<template>
    <lightbox name="hotkeysHelp" no-fullscreen no-title-hide>
        <h2>{{ $t('modules.hotkeys.settings.hotkeys.title') }}</h2>
        <enhanced-table
            :head="{
                command: {
                    title: $t('modules.hotkeys.settings.command'),
                    noSort: true,
                },
                hotkey: {
                    title: $t('modules.hotkeys.settings.hotkey'),
                    noSort: true,
                },
            }"
            no-search
            :table-attrs="{ class: 'table table-striped' }"
        >
            <tr>
                <th>{{ getCommandName('*.help') }}</th>
                <td class="hotkey-wrapper">
                    <input
                        type="text"
                        readonly="readonly"
                        class="form-control"
                        :style="`--length: 2ch;`"
                        disabled
                        value="f1"
                    />
                </td>
            </tr>
            <tr v-for="hotkey in hotkeys" :key="hotkey.command">
                <th>{{ getCommandName(hotkey.command) }}</th>
                <td class="hotkey-wrapper">
                    <input
                        type="text"
                        readonly="readonly"
                        class="form-control"
                        :style="`--length: ${hotkey.hotkey.length}ch;`"
                        disabled
                        :value="hotkey.hotkey"
                    />
                </td>
            </tr>
        </enhanced-table>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
} from 'vue/types/options';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    DefaultComputed,
    {
        hotkeys: {
            command: string;
            hotkey: string;
        }[];
        getCommandName(command: string): string;
    }
>({
    name: 'hotkeysHelp',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../../components/lightbox.vue'
            ),
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    props: {
        hotkeys: {
            type: Array,
            required: true,
        },
        getCommandName: {
            type: Function,
            required: true,
        },
    },
});
</script>

<style scoped lang="sass">
table
    ::v-deep & thead tr th:nth-child(2)
        text-align: center

    .hotkey-wrapper input
        --length: 10ch
        background-color: #ddd !important
        font-family: Monospace, sans-serif
        width: calc(var(--length) + 2*12px + 10px)
        text-align: center
        margin: 0 auto
</style>
