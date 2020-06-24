<template>
    <tabs :on-select="(_, index) => (currentTab = tabTitles[index])">
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
                    <td
                        :id="`education_schooling_${schooling.id}_1`"
                        :onload="
                            `educationCountdown(${schooling.end}, ${schooling.id}_1);`
                        "
                    >
                        {{ schooling.end }}
                    </td>
                    <td v-html="schooling.owner"></td>
                </tr>
            </enhanced-table>
        </tab>
    </tabs>
</template>

<script lang="ts">
import Vue from 'vue';
import EnhancedTable from '../../../components/enhanced-table.vue';
import {
    OwnSchoolingTabs,
    OwnSchoolingTabsMethods,
    OwnSchoolingTabsComputed,
    OwnSchooling,
} from 'typings/modules/SchoolingOverview/OwnSchoolingTabs';
import { DefaultProps } from 'vue/types/options';

export default Vue.extend<
    OwnSchoolingTabs,
    OwnSchoolingTabsMethods,
    OwnSchoolingTabsComputed,
    DefaultProps
>({
    name: 'ownSchoolingTabs',
    components: { EnhancedTable },
    data() {
        const heads = {} as {
            [key: string]: {
                title: string;
            };
        };
        ['name', 'end', 'owner'].forEach(
            head =>
                (heads[head] = {
                    title: this.$t(
                        `modules.schoolingOverview.titles.${head}`
                    ).toString(),
                })
        );
        const tabTitles = Object.values(
            this.$t('modules.schoolingOverview.tabs')
        );
        return {
            heads,
            tabTitles,
            currentTab: tabTitles[0],
            tabs: {},
            search: '',
            sort: 'name',
            sortDir: 'asc',
        } as OwnSchoolingTabs;
    },
    computed: {
        schoolings() {
            const schoolings = this.tabs[this.currentTab] || [];
            return (this.search
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
            let s = key;
            this.sortDir =
                s === this.sort && this.sortDir === 'asc' ? 'desc' : 'asc';
            this.sort = s;
        },
    },
    beforeMount() {
        let tabs = {} as {
            [tab: string]: OwnSchooling[];
        };
        document
            .querySelectorAll('#schooling_own_table tbody tr')
            .forEach(schooling => {
                let btn = schooling.querySelector(
                    'a.btn-success'
                ) as HTMLLinkElement;
                if (!btn) return;
                let name = btn.textContent || '';
                let category =
                    name
                        ?.match(/^.*?-/)?.[0]
                        .replace('-', '')
                        .trim() || '';
                const endNode = schooling.querySelector('td:nth-of-type(2)');
                let owner = schooling.querySelector('td:nth-of-type(3)');
                if (!endNode || !owner) return;
                let end = parseInt(endNode.getAttribute('sortvalue') || '0');
                if (!tabs.hasOwnProperty(category)) tabs[category] = [];
                tabs[category].push({
                    id: btn.href.replace(/\D+/g, ''),
                    name,
                    end,
                    owner: owner.innerHTML,
                });
            });
        this.tabs = tabs;
    },
});
</script>

<style scoped lang="sass">
th
    cursor: pointer
</style>
