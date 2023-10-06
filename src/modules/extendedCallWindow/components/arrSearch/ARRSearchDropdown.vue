<template>
    <v-select
        :id="id"
        class="arr-search"
        :options="options"
        :clearable="false"
        multiple
        :placeholder="$m('settings.arrSearch.title')"
        :selectable="option => !option.category"
        :close-on-select="closeDropdownOnSelect"
        :clear-search-on-select="false"
        :components="{ Deselect: emptyComponent }"
        :filter-by="filterBy"
        @option:selecting="selectARR"
        v-model="clickedARRs"
    >
        <div slot="no-options">
            {{ $t('noOptions') }}
        </div>
        <template #option="option">
            <a v-if="!option.category" v-html="option.html"></a>
            <b v-else>{{ option.label }}</b>
        </template>
        <template #selected-option="option">
            <a v-html="option.html"></a>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import { useRootStore } from '@stores/index';
import VSelect, { type VueSelectProps } from 'vue-select';

import { useI18nModule } from '../../../../i18n';

interface BaseOption {
    label: string;
    id: string;
    origEl: HTMLElement;
}

interface ARROption extends BaseOption {
    html: string;
}
interface CategoryOption extends BaseOption {
    category: true;
    labels: string[];
}

type Option = ARROption | CategoryOption;
type Options = Option[];

const { $m } = useI18nModule('extendedCallWindow');

const rootStore = useRootStore();

const id = rootStore.nodeAttribute('ecw-arr_search-dropdown', true);

const options = ref<Options>([]);
const clickedARRs = ref<Options>([]);

const emptyComponent: VueSelectProps['components']['Deselect'] = {
    render: createElement => createElement(),
};

defineProps<{ closeDropdownOnSelect: boolean }>();

const selectARR = (option: Option) => option.origEl?.click();

const filterBy = (option: Option, label: string, search: string) => {
    const searchString = search.toLowerCase();
    if ('category' in option) {
        return option.labels.some(label =>
            label.toLowerCase().includes(searchString)
        );
    }

    return (label || '').toLocaleLowerCase().includes(searchString);
};

const _getOptionFromARRElement = (arr: HTMLAnchorElement): ARROption => ({
    label: (arr.title || arr.textContent?.trim()) ?? '',
    id: `${PREFIX}_${arr.id}`,
    html: arr.outerHTML.replace(
        new RegExp(`(?<=id=")(?=${arr.id}")`),
        `${PREFIX}_`
    ),
    origEl: arr,
});

const _updateARR = (arr: HTMLAnchorElement) => {
    if (arr.getAttribute('reset') === 'true') clickedARRs.value.splice(0);
    const arrOption = options.value.find(({ origEl }) =>
        arr.isEqualNode(origEl)
    );
    if (arrOption && 'html' in arrOption) {
        arrOption.html = arr.outerHTML.replace(
            new RegExp(`(?<=id=")(?=${arr.id}")`),
            `${PREFIX}_`
        );
    }
};

rootStore.hook({
    event: 'aaoClickHandler',
    post: true,
    callback: _updateARR,
});

rootStore.hook({
    event: 'vehicleGroupClickHandler',
    post: true,
    callback: _updateARR,
});

rootStore.hook({
    event: 'aao_available',
    post: true,
    callback(id: number) {
        const arr = document.querySelector<HTMLAnchorElement>(
            `#mission-aao-group #aao_${id}`
        );
        if (arr) _updateARR(arr);
    },
});

rootStore.hook({
    event: 'vehicle_group_available',
    post: true,
    callback(id: number) {
        const arr = document.querySelector<HTMLAnchorElement>(
            `#mission-aao-group #vehicle_group_${id}`
        );
        if (arr) _updateARR(arr);
    },
});

rootStore.hook({
    event: 'vehicleSelectionReset',
    callback: () => this.$set(this, 'clickedARRs', []),
});

onBeforeMount(() => {
    // add ARR entries without category
    options.value.push(
        ...Array.from(
            document.querySelectorAll<HTMLAnchorElement>(
                '#mission_aao_no_category .aao_searchable, #aao_without_category .aao_searchable'
            )
        ).map(_getOptionFromARRElement)
    );
    // add ARR entries in Categories
    document
        .querySelectorAll<HTMLAnchorElement>(
            '#aao-tabs > li > a[href^="#aao_category_"]'
        )
        .forEach(category => {
            const title = category.textContent?.trim() ?? '';
            const tab = category.getAttribute('href') ?? '';
            const categoryOption = {
                label: title,
                id: tab,
                category: true,
                origEl: category,
                labels: [],
            } satisfies CategoryOption;
            options.value.push(
                categoryOption,
                ...Array.from(
                    document.querySelectorAll<HTMLAnchorElement>(
                        `${tab} .aao_searchable`
                    )
                ).map(el => {
                    const option = _getOptionFromARRElement(el);
                    if (!categoryOption.labels.includes(option.label))
                        categoryOption.labels.push(option.label);
                    return option;
                })
            );
        });
});
</script>

<style scoped module lang="sass">
:global(#mission-aao-group > *:not(.arr-search))
    display: none
</style>
