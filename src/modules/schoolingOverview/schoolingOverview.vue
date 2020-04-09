<template>
    <div>
        <span
            class="glyphicon glyphicon-info-sign"
            @click="isHidden = !isHidden"
        ></span>
        <div class="alert alert-info row" :class="{ hidden: isHidden }">
            <button class="close" type="button" @click="isHidden = !isHidden">
                ×
            </button>
            <h3>{{ $t('modules.schoolingOverview.name') }}</h3>
            <div class="col-lg-6">
                <h4>{{ $t('modules.schoolingOverview.own') }}</h4>
                <label class="pull-right">
                    <input
                        type="search"
                        class="search_input_field"
                        v-model="ownSchoolingsSearch"
                    />
                </label>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th @click="setSortOwn('key')">
                                {{ $t('modules.schoolingOverview.schooling') }}
                            </th>
                            <th @click="setSortOwn('amount')">
                                {{ $t('modules.schoolingOverview.amount') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="schooling in sortedOwn" :key="schooling.key">
                            <td>{{ schooling.key }}</td>
                            <td>{{ schooling.amount }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-6">
                <h4>{{ $t('modules.schoolingOverview.open') }}</h4>
                <label class="pull-right">
                    <input
                        type="search"
                        class="search_input_field"
                        v-model="openSchoolingsSearch"
                    />
                </label>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th @click="setSortOpen('key')">
                                {{ $t('modules.schoolingOverview.schooling') }}
                            </th>
                            <th @click="setSortOpen('amount')">
                                {{ $t('modules.schoolingOverview.amount') }}
                            </th>
                            <th @click="setSortOpen('seats')">
                                {{ $t('modules.schoolingOverview.seats') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="schooling in sortedOpen"
                            :key="schooling.key"
                            :class="{ 'empty-schooling': !schooling.amount }"
                        >
                            <td>{{ schooling.key }}</td>
                            <td>{{ schooling.amount }}</td>
                            <td>{{ schooling.seats }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'schoolingsOverview',
    data() {
        return {
            isHidden: true,
            ownSchoolings: {},
            openSchoolings: {},
            sortOwn: 'key',
            sortOwnDir: 'asc',
            sortOpen: 'key',
            sortOpenDir: 'asc',
            ownSchoolingsSearch: '',
            openSchoolingsSearch: '',
        };
    },
    computed: {
        sortedOwn() {
            let unsorted = [];
            Object.keys(this.ownSchoolings).forEach(schooling =>
                unsorted.push({
                    key: schooling,
                    amount: this.ownSchoolings[schooling],
                })
            );
            return unsorted
                .filter(a =>
                    this.ownSchoolingsSearch.length > 0
                        ? JSON.stringify(Object.values(a))
                              .toLowerCase()
                              .match(this.ownSchoolingsSearch.toLowerCase())
                        : true
                )
                .sort((a, b) => {
                    let modifier = 1;
                    if (this.sortOwnDir === 'desc') modifier = -1;
                    if (a[this.sortOwn] < b[this.sortOwn]) return -1 * modifier;
                    if (a[this.sortOwn] > b[this.sortOwn]) return modifier;
                    return 0;
                });
        },
        sortedOpen() {
            let unsorted = [];
            Object.keys(this.openSchoolings).forEach(schooling =>
                unsorted.push({
                    key: schooling,
                    amount: this.openSchoolings[schooling].amount,
                    seats: this.openSchoolings[schooling].seats,
                })
            );
            return unsorted
                .filter(a =>
                    this.openSchoolingsSearch.length > 0
                        ? JSON.stringify(Object.values(a))
                              .toLowerCase()
                              .match(this.openSchoolingsSearch.toLowerCase())
                        : true
                )
                .sort((a, b) => {
                    let modifier = 1;
                    if (this.sortOpenDir === 'desc') modifier = -1;
                    if (a[this.sortOpen] < b[this.sortOpen])
                        return -1 * modifier;
                    if (a[this.sortOpen] > b[this.sortOpen]) return modifier;
                    return 0;
                });
        },
    },
    methods: {
        setSortOwn(s) {
            this.sortOwnDir =
                s === this.sortOwn && this.sortOwnDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.sortOwn = s;
        },
        setSortOpen(s) {
            this.sortOpenDir =
                s === this.sortOpen && this.sortOpenDir === 'asc'
                    ? 'desc'
                    : 'asc';
            this.sortOpen = s;
        },
    },
    mounted() {
        document
            .querySelectorAll('#schooling_own_table tbody tr')
            .forEach(schooling => {
                let name = schooling.querySelector('a.btn-success').innerText;
                if (!this.ownSchoolings.hasOwnProperty(name))
                    this.$set(this.ownSchoolings, name, 0);
                this.ownSchoolings[name]++;
            });
        document
            .querySelectorAll(
                '#schooling_opened_table tr.schooling_opened_table_searchable'
            )
            .forEach(schooling => {
                let name = schooling.querySelector('a.btn-success').innerText;
                if (!this.openSchoolings.hasOwnProperty(name))
                    this.$set(this.openSchoolings, name, {
                        amount: 0,
                        seats: 0,
                    });
                this.openSchoolings[name].amount++;
                this.openSchoolings[name].seats += parseInt(
                    schooling.querySelector('td:nth-of-type(2)').innerText
                );
            });
        this.$t('modules.schoolingOverview.schoolings').forEach(
            schooling =>
                !this.openSchoolings.hasOwnProperty(schooling) &&
                (this.openSchoolings[schooling] = { amount: 0, seats: 0 })
        );
    },
};
</script>

<style scoped lang="sass">
th,
.glyphicon-info-sign
    cursor: pointer

.empty-schooling
    td:not(:first-of-type)
        color: red
</style>
