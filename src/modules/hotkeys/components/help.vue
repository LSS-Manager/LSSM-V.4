<template>
    <lightbox name="hotkeysHelp" no-fullscreen no-title-hide>
        <h2>{{ $t('modules.hotkeys.settings.hotkeys.title') }}</h2>
        <enhanced-table
            :head="{
                name: {
                    title: $t('modules.hotkeys.settings.command'),
                    attrs: { colspan },
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
            <tr v-for="hotkey in hotkeysList" :key="hotkey.command">
                <template v-for="(caption, index) in hotkey.name">
                    <td
                        :key="`${hotkey.command}-${index}`"
                        :colspan="index < hotkey.colspan ? 1 : colspan - index"
                        :rowspan="hotkey.rowspan[index]"
                        v-if="hotkey.rowspan[index]"
                    >
                        {{ caption }}
                    </td>
                </template>
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
    name: string[];
    colspan: number;
}

type Sort = 'hotkey' | 'name';

export default Vue.extend<
    { search: string; sort: Sort; sortDir: 'asc' | 'desc' },
    {
        setSort(key: Sort): void;
        getRowSpan(command: string, index: number): number;
    },
    {
        namedHotkeys: Hotkey[];
        hotkeysFiltered: Hotkey[];
        hotkeysSorted: Hotkey[];
        hotkeysList: (Hotkey & { rowspan: number[] })[];
        colspan: number;
    },
    {
        hotkeys: Omit<Hotkey, 'name'>[];
        getCommandName(command: string): string[];
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
            sort: 'name',
            sortDir: 'asc',
        };
    },
    computed: {
        namedHotkeys() {
            return [
                {
                    command: '*.help',
                    name: this.getCommandName('*.help'),
                    hotkey: 'f1',
                    colspan: 1,
                },
                ...this.hotkeys.map(hotkey => ({
                    ...hotkey,
                    name: this.getCommandName(hotkey.command),
                    colspan: hotkey.command.split('.').length - 1,
                })),
            ];
        },
        hotkeysFiltered() {
            const search = this.search.trim().toLowerCase();
            return search
                ? this.namedHotkeys.filter(({ name, hotkey }) =>
                      `${name}:${hotkey}`.toLowerCase().match(search)
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
                // yes, the comparison works with arrays to. Thank you JS! :)
                if (left < right) return -1 * modifier;
                if (left > right) return modifier;
                return 0;
            });
        },
        hotkeysList() {
            return this.hotkeysSorted.map(hotkey => ({
                ...hotkey,
                rowspan: hotkey.command
                    .split('.')
                    .map((_, index) => this.getRowSpan(hotkey.command, index)),
            }));
        },
        colspan() {
            return Math.max(
                ...this.hotkeys.map(h => h.command.split('.').length)
            );
        },
    },
    methods: {
        setSort(s) {
            this.sortDir =
                s === this.sort && this.sortDir === 'asc' ? 'desc' : 'asc';
            this.sort = s;
        },
        getRowSpan(command, index) {
            if (this.sort !== 'name') return 1;
            let rowSpan = 0;
            let passedHotkey = false;
            for (const hotkey of this.hotkeysSorted) {
                if (hotkey.command === command) {
                    passedHotkey = true;
                    rowSpan++;
                    continue;
                }
                if (
                    hotkey.command.startsWith(
                        command
                            .split('.')
                            .splice(0, index + 1)
                            .join('.')
                    )
                ) {
                    if (!passedHotkey) break;
                    else rowSpan++;
                }
            }
            return rowSpan;
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
    :deep(& thead tr th:nth-child(2))
        text-align: center

    .hotkey-wrapper input
        --length: 10ch
        background-color: #ddd !important
        font-family: Monospace, sans-serif
        width: calc(var(--length) + 2*12px + 10px)
        text-align: center
        margin: 0 0 0 auto
</style>
