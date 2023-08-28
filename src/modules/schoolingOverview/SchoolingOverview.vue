<template>
    <div>
        <span
            class="glyphicon glyphicon-info-sign"
            @click="hidden = !hidden"
        ></span>
        <div class="alert alert-info row" :class="{ hidden }">
            <button class="close" type="button" @click="hidden = !hidden">
                ×
            </button>
            <h3>{{ $m('name') }}</h3>
            <div class="col-lg-6">
                <h4>{{ $m('own') }}</h4>
                <enhanced-table
                    :columns="[{ key: 'key' }, { key: 'amount' }]"
                    :column-translations="$cols"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setOwnSort"
                    :sort="sortOwn"
                    :sort-dir="sortOwnDir"
                    :search="ownSearch"
                    @search="s => (ownSearch = s)"
                >
                    <tr v-for="schooling in ownSorted" :key="schooling.key">
                        <td>{{ schooling.key }}</td>
                        <td>{{ schooling.amount }}</td>
                    </tr>
                </enhanced-table>
            </div>
            <div class="col-lg-6">
                <h4>{{ $m('open') }}</h4>
                <enhanced-table
                    :columns="[
                        { key: 'key' },
                        { key: 'amount' },
                        { key: 'seats' },
                    ]"
                    :column-translations="$cols"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setOpenSort"
                    :sort="sortOpen"
                    :sort-dir="sortOpenDir"
                    :search="openSearch"
                    @search="s => (openSearch = s)"
                >
                    <tr
                        v-for="schooling in openSorted"
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

<script setup lang="ts">
import { computed, ref } from 'vue';

import EnhancedTable from '../../components/EnhancedTable.vue';
import { useI18nModule } from '../../i18n';

import type {
    OpenSchoolings,
    OwnSchoolings,
} from 'typings/modules/SchoolingOverview/main';

type SortDir = 'asc' | 'desc';

const { $m } = useI18nModule('schoolingOverview');

const hidden = ref<boolean>(true);
const sortOwn = ref<'amount' | 'key'>('key');
const sortOwnDir = ref<SortDir>('asc');
const sortOpen = ref<'amount' | 'key' | 'seats'>('key');
const sortOpenDir = ref<SortDir>('asc');
const ownSearch = ref<string>('');
const openSearch = ref<string>('');

const props = defineProps<{
    ownSchoolings: OwnSchoolings['amounts'];
    openSchoolings: OpenSchoolings['amounts'];
}>();

const $cols = computed(() => ({
    key: $m('schooling'),
    amount: $m('amount'),
    seats: $m('seats'),
}));

const ownSchoolings = computed(() =>
    Object.entries(props.ownSchoolings).map(([schooling, amount]) => ({
        amount,
        key: schooling,
    }))
);
const ownFiltered = computed(() =>
    ownSearch.value
        ? ownSchoolings.value.filter(schooling =>
              JSON.stringify(Object.values(schooling))
                  .toLowerCase()
                  .match(ownSearch.value.toLowerCase())
          )
        : ownSchoolings.value
);
const ownSorted = computed(() =>
    ownFiltered.value.toSorted((a, b) => {
        let modifier = 1;
        if (sortOwnDir.value === 'desc') modifier = -1;
        if (a[sortOwn.value] < b[sortOwn.value]) return -1 * modifier;
        if (a[sortOwn.value] > b[sortOwn.value]) return modifier;
        return 0;
    })
);

const setOwnSort = (key: (typeof sortOwn)['value']) => {
    sortOwnDir.value =
        key === sortOwn.value && sortOwnDir.value === 'asc' ? 'desc' : 'asc';
    sortOwn.value = key;
};

const openSchoolings = computed(() =>
    Object.entries(props.openSchoolings).map(
        ([schooling, { amount, seats }]) => ({
            amount,
            seats,
            key: schooling,
        })
    )
);
const openFiltered = computed(() =>
    openSearch.value
        ? openSchoolings.value.filter(schooling =>
              JSON.stringify(Object.values(schooling))
                  .toLowerCase()
                  .match(openSearch.value.toLowerCase())
          )
        : openSchoolings.value
);
const openSorted = computed(() =>
    openFiltered.value.toSorted((a, b) => {
        let modifier = 1;
        if (sortOpenDir.value === 'desc') modifier = -1;
        if (a[sortOpen.value] < b[sortOpen.value]) return -1 * modifier;
        if (a[sortOpen.value] > b[sortOpen.value]) return modifier;
        return 0;
    })
);

const setOpenSort = (key: (typeof sortOpen)['value']) => {
    sortOpenDir.value =
        key === sortOpen.value && sortOpenDir.value === 'asc' ? 'desc' : 'asc';
    sortOpen.value = key;
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
