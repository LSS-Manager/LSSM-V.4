<template>
    <div>
        <label class="pull-right">
            <input type="search" class="search_input_field" v-model="search" />
        </label>
        <tabs>
            <tab
                v-for="tab in $t('modules.schoolingOverview.tabs')"
                :key="tab"
                :title="tab"
            >
                <table
                    id="schooling_opened_table"
                    class="table table-striped tablesorter tablesorter-default"
                    role="grid"
                >
                    <thead>
                        <tr>
                            <th
                                v-for="(head, id) in tableHead"
                                :key="head"
                                @click="setSorting(id)"
                            >
                                {{ head }}
                            </th>
                        </tr>
                    </thead>
                    <tbody aria-live="polite" aria-relevant="all">
                        <tr
                            v-for="(schooling, id) in schoolings[tab]"
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
                    </tbody>
                </table>
            </tab>
        </tabs>
    </div>
</template>

<script>
export default {
    name: 'openSchoolingTabs',
    data() {
        return {
            tableHead: Array.from(
                document.querySelectorAll('#schooling_own_table thead th')
            ).map(x => x.innerText),
            tabs: {},
            search: '',
            sort: 'name',
            sortDir: 'asc',
        };
    },
    computed: {
        schoolings() {
            let data = {};
            Object.keys(this.tabs).forEach(category => {
                data[category] = this.tabs[category]
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
            });
            return data;
        },
    },
    methods: {
        setSorting(id) {
            let s = ['name', 'end', 'ownerName'][id];
            this.sortDir =
                s === this.sort && this.sortDir === 'asc' ? 'desc' : 'asc';
            this.sort = s;
        },
    },
    beforeMount() {
        let tabs = {};
        document
            .querySelectorAll('#schooling_own_table tbody tr')
            .forEach(schooling => {
                let btn = schooling.querySelector('a.btn-success');
                let name = btn.innerText;
                let category = name
                    .match(/^.*?-/)[0]
                    .replace('-', '')
                    .trim();
                let end = schooling
                    .querySelector('td:nth-of-type(2)')
                    .getAttribute('sortvalue');
                let owner = schooling.querySelector('td:nth-of-type(3)');
                if (!tabs.hasOwnProperty(category)) tabs[category] = [];
                tabs[category].push({
                    id: btn.href.replace(/\D+/g, ''),
                    name,
                    end,
                    owner: owner.innerHTML,
                    ownerName: owner.innerText,
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
