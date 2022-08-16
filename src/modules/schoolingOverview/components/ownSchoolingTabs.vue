<template>
    <div>
        <div
            id="openschooling-title-wrapper"
            style="display: flex; margin-bottom: 1rem"
        >
            <span style="margin-right: 2rem">
                <button
                    class="btn pull-right"
                    :class="`btn-${collapsed ? 'success' : 'danger'}`"
                    @click="toggleCollapse"
                    id="openschooling-collapse-button"
                    style="position: relative; top: 25%"
                >
                    <font-awesome-icon
                        :icon="collapsed ? faExpandAlt : faCompressAlt"
                    />
                </button>
            </span>
            <h3>
                {{ $t('modules.schoolingOverview.own') }}
            </h3>
        </div>
        <tabs
            :on-select="(_, index) => (currentTab = tabTitles[index])"
            :style="collapsed ? { display: 'none' } : {}"
        >
            <tab v-for="tab in tabTitles" :key="tab" :title="tab">
                <enhanced-table
                    :head="heads"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSorting"
                    :sort="sort"
                    :sort-dir="sortDir"
                    :search="search"
                    @search="s => (search = s)"
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
                        <td :id="`education_schooling_${schooling.id}_1`">
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
import { useSettingsStore } from '@stores/settings';

import type {
    OwnSchoolingTabs,
    OwnSchoolingTabsComputed,
    OwnSchoolingTabsMethods,
    OwnSchoolingTabsProps,
} from 'typings/modules/SchoolingOverview/OwnSchoolingTabs';

export default Vue.extend<
    OwnSchoolingTabs,
    OwnSchoolingTabsMethods,
    OwnSchoolingTabsComputed,
    OwnSchoolingTabsProps
>({
    name: 'lssmv4-so-ownSchoolingTabs',
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
        ['name', 'end', 'owner'].forEach(
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
            settingsStore: useSettingsStore(),
        } as OwnSchoolingTabs;
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
                settingId: 'hide_ownschooling',
                value: this.collapsed,
            });
        },
    },
    mounted() {
        this.settingsStore
            .getSetting<boolean>({
                moduleId: 'schoolingOverview',
                settingId: 'hide_ownschooling',
            })
            .then(collapsed => (this.collapsed = collapsed));
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
