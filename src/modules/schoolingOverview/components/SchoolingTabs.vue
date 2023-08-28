<template>
    <div>
        <div class="title-wrapper">
            <h3>
                {{ title }}
                <button
                    class="btn btn-xs collapse-button"
                    :class="`btn-${collapsed ? 'success' : 'danger'}`"
                    @click="toggleCollapsed"
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
                    :columns="cols"
                    :column-translations="$cols"
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
                        <slot v-bind="{ schooling, countdownId }"></slot>
                    </tr>
                </enhanced-table>
            </tab>
        </tabs>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeMount, onMounted, ref } from 'vue';

import { faCompressAlt } from '@fortawesome/free-solid-svg-icons/faCompressAlt';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import { useRootStore } from '@stores/index';
import { useSettingsStore } from '@stores/settings';

import EnhancedTable from '../../../components/EnhancedTable.vue';
import { useI18nModule } from '../../../i18n';

import type {
    OpenSchoolings,
    OwnSchoolings,
} from 'typings/modules/SchoolingOverview/main';

const { $m, $t } = useI18nModule('schoolingOverview');

const all = $m('all').toString();

const rootStore = useRootStore();
const settingsStore = useSettingsStore();

const uuid = crypto.randomUUID();

const collapsed = ref<boolean>(false);
const search = ref<string>('');
const sort = ref<string>('');
const sortDir = ref<'asc' | 'desc'>('asc');
const currentTab = ref<string>(all);

const props = defineProps<{
    title: string;
    columns: string[];
    tabs: OpenSchoolings['tabs'] | OwnSchoolings['tabs'];
    collapsedSetting: 'hide_openschooling' | 'hide_ownschooling';
}>();

const cols = computed(() => props.columns.map(key => ({ key })));
const $cols = computed(() => $m('titles') as Record<string, string>);

const tabTitles = computed(() => [all, ...Object.keys($t('schoolings'))]);
const schoolings = computed(() => {
    const schoolings = props.tabs[currentTab.value] || [];
    return (
        search.value
            ? schoolings.filter(a =>
                  JSON.stringify(Object.values(a))
                      .toLowerCase()
                      .match(search.value.toLowerCase())
              )
            : schoolings
    ).toSorted((a, b) => {
        let modifier = 1;
        if (sortDir.value === 'desc') modifier = -1;
        if (a[sort.value] < b[sort.value]) return -1 * modifier;
        if (a[sort.value] > b[sort.value]) return modifier;
        return 0;
    });
});

const toggleCollapsed = () => {
    collapsed.value = !collapsed.value;
    settingsStore.setSetting({
        moduleId: 'schoolingOverview',
        settingId: props.collapsedSetting,
        value: collapsed.value,
    });
};

const setTab = (_, index: number) => {
    currentTab.value = tabTitles.value[index] || all;
    initCountdowns();
};
const setSorting = (key: string) => {
    sortDir.value =
        key === sort.value && sortDir.value === 'asc' ? 'desc' : 'asc';
    sort.value = key;
};
const countdownId = (schooling: { id: number }) =>
    rootStore.nodeAttribute(
        `schoolingOverview_countdown_${schooling.id}-${uuid}`,
        true
    );

const initCountdowns = () =>
    schoolings.value.forEach(schooling =>
        window[PREFIX].$utils.countdown(countdownId(schooling), schooling.end)
    );

onBeforeMount(() => {
    if (props.columns.length && !sort.value) sort.value = props.columns[0];

    settingsStore
        .getSetting<boolean>({
            moduleId: 'schoolingOverview',
            settingId: props.collapsedSetting,
        })
        .then(isCollapsed => (collapsed.value = isCollapsed));
});

onMounted(() => nextTick(initCountdowns));
</script>

<style scoped lang="sass">
th
    cursor: pointer

.title-wrapper
    display: flex
    margin-bottom: 1rem

.collapse-button
    margin-left: 1rem
</style>
