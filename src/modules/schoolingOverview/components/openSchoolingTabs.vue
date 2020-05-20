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
                    <td>{{ schooling.seats }}</td>
                    <td>{{ schooling.price }}</td>
                    <td :id="`education_schooling_${schooling.id}`">
                        {{ schooling.end }}
                    </td>
                    <td v-html="schooling.owner"></td>
                </tr>
            </enhanced-table>
        </tab>
    </tabs>
</template>

<script>
import EnhancedTable from '../../../components/enhanced-table.vue';

export default {
    name: 'openSchoolingTabs',
    components: { EnhancedTable },
    data() {
        const heads = {};
        ['name', 'seats', 'price', 'end', 'owner'].forEach(
            head =>
                (heads[head] = {
                    title: this.$t(`modules.schoolingOverview.titles.${head}`),
                })
        );
        const tabTitles = this.$t('modules.schoolingOverview.tabs');
        return {
            heads,
            tabTitles,
            currentTab: tabTitles[0],
            tabs: {},
            search: '',
            sort: 'name',
            sortDir: 'asc',
        };
    },
    computed: {
        schoolings() {
            return (this.tabs[this.currentTab] || [])
                .filter(a =>
                    this.search.length > 0
                        ? JSON.stringify(Object.values(a))
                              .toLowerCase()
                              .match(this.search.toLowerCase())
                        : true
                )
                .sort((a, b) => {
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
        let tabs = {};
        document
            .querySelectorAll(
                '#schooling_opened_table tr.schooling_opened_table_searchable'
            )
            .forEach(schooling => {
                let btn = schooling.querySelector('a.btn-success');
                let name = btn.innerText;
                let category = name
                    .match(/^.*?-/)[0]
                    .replace('-', '')
                    .trim();
                let seats = parseInt(
                    schooling.querySelector('td:nth-of-type(2)').innerText
                );
                let price = schooling.querySelector('td:nth-of-type(3)')
                    .innerText;
                let end = parseInt(
                    schooling
                        .querySelector('td:nth-of-type(4)')
                        .getAttribute('sortvalue')
                );
                let owner = schooling.querySelector('td:nth-of-type(5)');
                if (!tabs.hasOwnProperty(category)) tabs[category] = [];
                tabs[category].push({
                    id: btn.href.replace(/\D+/g, ''),
                    name,
                    seats,
                    price,
                    end,
                    owner: owner.innerHTML,
                });
            });
        this.tabs = tabs;
    },
};
</script>

<style scoped lang="sass">
th
    cursor: pointer
</style>
