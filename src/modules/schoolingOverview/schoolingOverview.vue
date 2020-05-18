<template>
    <div>
        <span
            class="glyphicon glyphicon-info-sign"
            v-if="!noExternal"
            @click="hidden = !hidden"
        ></span>
        <span
            class="glyphicon glyphicon-modal-window"
            v-if="!noExternal"
            @click="external"
        ></span>
        <div
            class="alert alert-info row"
            :class="{ hidden: isHidden, external: noExternal }"
        >
            <button
                class="close"
                type="button"
                @click="hidden = !hidden"
                v-if="!noExternal"
            >
                ×
            </button>
            <h3>{{ $t('modules.schoolingOverview.name') }}</h3>
            <div class="col-lg-6">
                <h4>{{ $t('modules.schoolingOverview.own') }}</h4>
                <enhanced-table
                    :head="{
                        key: {
                            title: $t('modules.schoolingOverview.schooling'),
                        },
                        amount: {
                            title: $t('modules.schoolingOverview.amount'),
                        },
                    }"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSortOwn"
                    :sort="sortOwn"
                    :sort-dir="sortOwnDir"
                    :search="ownSchoolingsSearch"
                    @search="s => (ownSchoolingsSearch = s)"
                >
                    <tr v-for="schooling in sortedOwn" :key="schooling.key">
                        <td>{{ schooling.key }}</td>
                        <td>{{ schooling.amount }}</td>
                    </tr>
                </enhanced-table>
            </div>
            <div class="col-lg-6">
                <h4>{{ $t('modules.schoolingOverview.open') }}</h4>
                <enhanced-table
                    :head="{
                        key: {
                            title: $t('modules.schoolingOverview.schooling'),
                        },
                        amount: {
                            title: $t('modules.schoolingOverview.amount'),
                        },
                        seats: {
                            title: $t('modules.schoolingOverview.seats'),
                        },
                    }"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSortOpen"
                    :sort="sortOpen"
                    :sort-dir="sortOpenDir"
                    :search="openSchoolingsSearch"
                    @search="s => (openSchoolingsSearch = s)"
                >
                    <tr
                        v-for="schooling in sortedOpen"
                        :key="schooling.key"
                        :class="{ 'empty-schooling': !schooling.amount }"
                    >
                        <td>{{ schooling.key }}</td>
                        <td>{{ schooling.amount }}</td>
                        <td>{{ schooling.seats }}</td>
                    </tr>
                </enhanced-table>
            </div>
        </div>
    </div>
</template>

<script>
import schoolingOverview from './schoolingOverview.vue';
import EnhancedTable from '../../components/enhanced-table.vue';

export default {
    name: 'schoolingsOverview',
    components: { EnhancedTable },
    data() {
        return {
            hidden: true,
            sortOwn: 'key',
            sortOwnDir: 'asc',
            sortOpen: 'key',
            sortOpenDir: 'asc',
            ownSchoolingsSearch: '',
            openSchoolingsSearch: '',
        };
    },
    props: {
        ownSchoolings: {
            type: Object,
            required: true,
        },
        openSchoolings: {
            type: Object,
            required: true,
        },
        noExternal: {
            type: Boolean,
            required: false,
            default: () => false,
        },
    },
    computed: {
        isHidden() {
            return this.noExternal ? false : this.hidden;
        },
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
        external() {
            this.$store
                .dispatch('external/sendMessage', {
                    target: 'lssmv4_external_schoolingOverview',
                    type: 'close_request',
                    data: 'force',
                })
                .then(() =>
                    window.setTimeout(
                        () =>
                            this.$store
                                .dispatch('external/getExternalLSSM', {
                                    target: 'schoolingOverview',
                                    keepAlive: true,
                                    title: this.$t(
                                        'modules.schoolingOverview.name'
                                    ),
                                })
                                .then(({ instance }) => {
                                    instance.lssmv4_local.$modal.hide(
                                        'schoolingOverview'
                                    );
                                    instance.lssmv4_local.$modal.show(
                                        schoolingOverview,
                                        {
                                            openSchoolings: this.openSchoolings,
                                            ownSchoolings: this.ownSchoolings,
                                            noExternal: true,
                                        },
                                        {
                                            name: 'schoolingOverview',
                                            height: '100%',
                                            width: '100%',
                                        }
                                    );
                                }),
                        500
                    )
                );
        },
    },
};
</script>

<style scoped lang="sass">
th,
.glyphicon
    cursor: pointer

.alert
    &.external
        margin: 0

    .empty-schooling
        td:not(:first-of-type)
            color: red
</style>
