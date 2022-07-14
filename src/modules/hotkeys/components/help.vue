<template>
    <lightbox name="hotkeysHelp" no-fullscreen no-title-hide>
        <h2>{{ $t('modules.hotkeys.settings.hotkeys.title') }}</h2>
        <enhanced-table
            :head="{
                command: {
                    title: $t('modules.hotkeys.settings.command'),
                },
                hotkey: {
                    title: $t('modules.hotkeys.settings.hotkey'),
                },
            }"
            :table-attrs="{ class: 'table table-striped' }"
            :search="search"
            @search="s => (search = s)"
            :sort="sort"
            :sort-dir="sortDir"
            @sort="setSort"
        >
            <tr v-for="hotkey in hotkeysSorted" :key="hotkey.command">
                <th>{{ hotkey.command }}</th>
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

interface Hotkey {
    command: string;
    hotkey: string;
}

export default Vue.extend<
    { search: string; sort: keyof Hotkey; sortDir: 'asc' | 'desc' },
    { setSort(key: keyof Hotkey): void },
    {
        namedHotkeys: Hotkey[];
        hotkeysFiltered: Hotkey[];
        hotkeysSorted: Hotkey[];
    },
    {
        hotkeys: Hotkey[];
        getCommandName(command: string): string;
    }
>({
    name: 'lssmv4-hotkeys-help',
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
    data() {
        return {
            search: '',
            sort: 'command',
            sortDir: 'asc',
        };
    },
    computed: {
        namedHotkeys() {
            return [
                { command: this.getCommandName('*.help'), hotkey: 'f1' },
                ...this.hotkeys.map(hotkey => ({
                    ...hotkey,
                    command: this.getCommandName(hotkey.command),
                })),
            ];
        },
        hotkeysFiltered() {
            const search = this.search.trim().toLowerCase();
            return search
                ? this.namedHotkeys.filter(({ command, hotkey }) =>
                      `${command}:${hotkey}`.toLowerCase().match(search)
                  )
                : this.namedHotkeys;
        },
        hotkeysSorted() {
            return (
                this.search.trim().toLowerCase()
                    ? this.hotkeysFiltered
                    : this.namedHotkeys
            ).sort((a, b) => {
                let modifier = 1;
                if (this.sortDir === 'desc') modifier = -1;
                const left = a[this.sort];
                const right = b[this.sort];
                if (left < right) return -1 * modifier;
                if (left > right) return modifier;
                return 0;
            });
        },
    },
    methods: {
        setSort(s) {
            this.sortDir =
                s === this.sort && this.sortDir === 'asc' ? 'desc' : 'asc';
            this.sort = s;
        },
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
