<template>
    <div>
        <div
            id="openschooling-title-wrapper"
            style="display: flex; margin-bottom: 1rem"
        >
            <h3>
                {{ $t('modules.schoolingOverview.open') }}
                <button
                    class="btn btn-xs"
                    :class="`btn-${collapsed ? 'success' : 'danger'}`"
                    @click="toggleCollapse"
                    id="openschooling-collapse-button"
                    style="margin-left: 1rem"
                >
                    <font-awesome-icon
                        :icon="collapsed ? faExpandAlt : faCompressAlt"
                    />
                </button>
            </h3>
        </div>
        <tabs :on-select="setTab" v-show="!collapsed">
            <tab v-for="tab in tabTitles" :key="tab" :title="tab">
                <enhanced-table
                    :head="heads"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSorting"
                    :sort="sort"
                    :sort-dir="sortDir"
                    :search="search"
                    @search="s => (search = s)"
                    @hook:mounted="initCountdowns"
                >
                    <tr
                        v-for="(schooling, id) in schoolings"
                        :key="id"
                        class="schooling_opened_table_searchable"
                    >
                        <td>
                            <a
                                class="btn btn-success"
                                :href="`/schoolings/${schooling.id}`"
                            >
                                {{ schooling.name }}
                            </a>
                        </td>
                        <td>{{ schooling.seats }}</td>
                        <td>{{ schooling.price }}</td>
                        <td :id="getCountdownId(schooling)">
                            {{ schooling.end }}
                        </td>
                        <td v-html="schooling.owner"></td>
                    </tr>
                </enhanced-table>
            </tab>
        </tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faCompressAlt } from '@fortawesome/free-solid-svg-icons/faCompressAlt';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import { useRootStore } from '@stores/index';
import { useSettingsStore } from '@stores/settings';

import type {
    OpenSchoolingTabs,
    OpenSchoolingTabsComputed,
    OpenSchoolingTabsMethods,
    OpenSchoolingTabsProps,
} from 'typings/modules/SchoolingOverview/OpenSchoolingTabs';

export default Vue.extend<
    OpenSchoolingTabs,
    OpenSchoolingTabsMethods,
    OpenSchoolingTabsComputed,
    OpenSchoolingTabsProps
>({
    name: 'lssmv4-so-openSchoolingTabs',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        const heads = {} as Record<
            string,
            {
                title: string;
            }
        >;
        ['name', 'seats', 'price', 'end', 'owner'].forEach(
            head =>
                (heads[head] = {
                    title: this.$t(
                        `modules.schoolingOverview.titles.${head}`
                    ).toString(),
                })
        );
        const all = this.$t('modules.schoolingOverview.all') as string;
        const tabTitles = [all, ...Object.keys(this.$t('schoolings'))];
        return {
            faCompressAlt,
            faExpandAlt,
            heads,
            tabTitles,
            currentTab: tabTitles[0],
            search: '',
            sort: 'name',
            sortDir: 'asc',
            all,
            collapsed: false,
            rootStore: useRootStore(),
            settingsStore: useSettingsStore(),
        } as OpenSchoolingTabs;
    },
    computed: {
        schoolings() {
            const schoolings = this.tabs[this.currentTab] || [];
            return (
                this.search
                    ? schoolings.filter(a =>
                          JSON.stringify(Object.values(a))
                              .toLowerCase()
                              .match(this.search.toLowerCase())
                      )
                    : schoolings
            ).sort((a, b) => {
                let modifier = 1;
                if (this.sortDir === 'desc') modifier = -1;
                if (a[this.sort] < b[this.sort]) return -1 * modifier;
                if (a[this.sort] > b[this.sort]) return modifier;
                return 0;
            });
        },
    },
    methods: {
        setTab(_, index) {
            this.currentTab = this.tabTitles[index];
            this.$nextTick().then(this.initCountdowns);
        },
        setSorting(key) {
            const s = key;
            this.sortDir =
                s === this.sort && this.sortDir === 'asc' ? 'desc' : 'asc';
            this.sort = s;
        },
        toggleCollapse() {
            this.collapsed = !this.collapsed;
            this.settingsStore.setSetting({
                moduleId: 'schoolingOverview',
                settingId: 'hide_openschooling',
                value: this.collapsed,
            });
        },
        getCountdownId(schooling) {
            return this.rootStore.nodeAttribute(
                `${this.$options.name}_countdown_${schooling.id}`
            );
        },
        initCountdowns() {
            this.schoolings.forEach(schooling =>
                this.$utils.countdown(
                    this.getCountdownId(schooling),
                    schooling.end
                )
            );
        },
    },
    mounted() {
        this.settingsStore
            .getSetting<boolean>({
                moduleId: 'schoolingOverview',
                settingId: 'hide_openschooling',
            })
            .then(collapsed => (this.collapsed = collapsed));
        this.$nextTick(() => this.initCountdowns());
    },
    props: {
        tabs: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style scoped lang="sass">
th
    cursor: pointer
</style>
