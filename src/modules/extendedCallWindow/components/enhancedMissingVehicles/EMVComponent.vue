<template>
    <div
        class="alert alert-missing-vehicles"
        :class="[{ overlay, minified }, alertColor]"
        :data-raw-text="missingText.trim()"
        ref="alert"
    >
        <template v-for="icon in icons">
            <font-awesome-icon
                v-if="'condition' in icon ? icon.condition : true"
                :key="`${icon.key}_icon`"
                :icon="icon.icon"
                class="pull-right"
                :class="{ 'hover-tip': hoverTip }"
                fixed-width
                :title="getIconTitle(icon)"
                v-on="getIconHandler(icon)"
            />
            <div
                v-if="hoverTip && ('condition' in icon ? icon.condition : true)"
                class="alert alert-info"
                :key="`${icon.key}_hoverTip`"
            >
                {{ getIconTitle(icon) }}
            </div>
        </template>

        <div v-if="textMode">
            {{ missingText }}
        </div>
        <div v-else-if="extras">{{ extras }}</div>
        <div class="clearfix"></div>

        <template v-if="textMode"></template>
        <!-- one column -->
        <div v-else-if="overlay || pushedRight">
            <e-m-v-table
                :calc-max-staff="calcMaxStaff"
                :missing-requirements="missingRequirementsSorted"
                :sort="sort"
                :sort-dir="sortDir"
                @sort="setSort"
            ></e-m-v-table>
        </div>
        <!-- two columns -->
        <div class="row" v-else>
            <div class="col-md-6">
                <e-m-v-table
                    :calc-max-staff="calcMaxStaff"
                    :missing-requirements="
                        missingRequirementsSorted.slice(
                            0,
                            Math.ceil(missingRequirementsSorted.length / 2)
                        )
                    "
                    :sort="sort"
                    :sort-dir="sortDir"
                    @sort="setSort"
                ></e-m-v-table>
            </div>
            <div class="col-md-6">
                <e-m-v-table
                    :calc-max-staff="calcMaxStaff"
                    :missing-requirements="
                        missingRequirementsSorted.slice(
                            Math.ceil(missingRequirementsSorted.length / 2)
                        )
                    "
                    :sort="sort"
                    :sort-dir="sortDir"
                    @sort="setSort"
                ></e-m-v-table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    computed,
    onBeforeMount,
    onMounted,
    ref,
    type Ref,
    type UnwrapRef,
} from 'vue';

import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons/faAngleDoubleLeft';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons/faAngleDoubleUp';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons/faArrowsAlt';
import { faCompressAlt } from '@fortawesome/free-solid-svg-icons/faCompressAlt';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import { faParagraph } from '@fortawesome/free-solid-svg-icons/faParagraph';
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable';
import { useSettingsStore } from '@stores/settings';
// import { useAPIStore } from '@stores/api';
// import { useRootStore } from '@stores/index';

import EMVTable from './EMVTable.vue';
import { useI18nModule } from '../../../../i18n';
import vehicleListObserveHandler from '../../assets/emv/getVehicleListObserveHandler';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { Requirement } from 'typings/modules/ExtendedCallWindow/EnhancedMissingVehicles';

interface Icon {
    condition?: boolean;
    key: string;
    icon: IconDefinition;
    event?: 'click' | 'mousedown';
    handler(e: MouseEvent): void;
}

interface Drag {
    active: boolean;
    top: number;
    left: number;
    offset: {
        x: number;
        y: number;
    };
}

type Column = UnwrapRef<typeof sort>;

const IS_DRAGGING_CLASS = `${PREFIX}-is-dragging`;

const { $m } = useI18nModule('extendedCallWindow.enhancedMissingVehicles');

const settingsStore = useSettingsStore();

const alert = ref<HTMLDivElement>();

const sort = ref<'driving' | 'missing' | 'selected' | 'total' | 'vehicle'>(
    'vehicle'
);
const sortDir = ref<'asc' | 'desc'>('asc');

const overlay = ref<boolean>(false);
const minified = ref<boolean>(false);
const textMode = ref<boolean>(false);
const pushedRight = ref<boolean>(false);
const hoverTip = ref<boolean>(false);
const calcMaxStaff = ref<boolean>(false);

const isDragging = ref<boolean>(false);
const dragTop = ref<string>('60px');
const dragLeft = ref<string>(`${window.innerWidth * 0.03}px`);
const dragOffset = ref<{ x: number; y: number }>({ x: 0, y: 0 });

const icons = computed<Icon[]>(() => [
    {
        key: 'textMode',
        icon: textMode.value ? faTable : faParagraph,
        handler: () => {
            textMode.value = !textMode.value;
            setSetting('textMode', textMode.value);
        },
    },
    {
        key: 'minified',
        icon: minified.value ? faExpandAlt : faCompressAlt,
        handler: () => {
            minified.value = !minified.value;
            setSetting('minified', minified.value);
        },
    },
    {
        condition: overlay.value,
        key: 'dragging',
        icon: faArrowsAlt,
        event: 'mousedown',
        handler: (e: MouseEvent) => {
            const offset = alert.value?.getBoundingClientRect();
            if (!offset) return;

            document.body.classList.add(IS_DRAGGING_CLASS);
            dragOffset.value.x = offset.x - e.clientX;
            dragOffset.value.y = offset.y - e.clientY;
            isDragging.value = true;

            document.addEventListener('mouseup', dragEnd);
            document.addEventListener('mousemove', dragging);
        },
    },
    {
        key: 'overlay',
        icon: overlay.value ? faAngleDoubleDown : faAngleDoubleUp,
        handler: () => {
            overlay.value = !overlay.value;
            setSetting('overlay', overlay.value);
        },
    },
    {
        key: `push${pushedRight.value ? 'Left' : 'Right'}`,
        icon: pushedRight.value ? faAngleDoubleLeft : faAngleDoubleRight,
        handler: () => {
            pushedRight.value = !pushedRight.value;

            const alertEl = alert.value;
            if (alertEl) {
                if (pushedRight.value) {
                    document
                        .querySelector<HTMLFormElement>('#mission-form')
                        ?.prepend(alertEl);
                } else {
                    document
                        .querySelector<HTMLDivElement>(
                            '.mission_header_info.row ~ div ~ .clearfix, .mission_header_info.row ~ .clearfix'
                        )
                        ?.after(alertEl);
                }
            }

            setSetting('pushRight', pushedRight.value);
        },
    },
]);

const getIconHandler = (icon: Icon) => ({
    [icon.event || 'click']: icon.handler,
});
const getIconTitle = (icon: Icon) => $m(`tip.${icon.key}`).toString();

const alertColor = computed<`alert-${'danger' | 'success'}`>(() => {
    if (
        props.missingRequirements.every(
            req =>
                (req.total ?? req.missing) <=
                (typeof req.selected === 'number'
                    ? req.selected
                    : calcMaxStaff.value
                    ? req.selected.max
                    : req.selected.min)
        )
    )
        return 'alert-success';
    return 'alert-danger';
});

const props = defineProps<{
    missingRequirements: Requirement[];
    extras: string;
    missingText: string;
}>();

const requirements = ref<Requirement[]>(props.missingRequirements) as Ref<
    Requirement[]
>;

const missingRequirementsSorted = computed(() =>
    requirements.value.toSorted((a, b) => {
        let modifier = 1;
        if (sortDir.value === 'desc') modifier = -1;

        const sortBy = sort.value;

        if (sortBy === 'vehicle')
            return modifier * a[sortBy].localeCompare(b[sortBy]);
        let left = a[sortBy];
        let right = b[sortBy];

        if (sortBy === 'total') {
            if (typeof left !== 'number') left = a.missing;
            if (typeof right !== 'number') right = b.missing;
        }

        if (typeof left !== 'number' && 'min' in left) left = left.min;
        if (typeof right !== 'number' && 'min' in right) right = right.min;

        if (!left) left = 0;
        if (!right) right = 0;

        if (left < right) return -1 * modifier;
        if (left > right) return modifier;
        return 0;
    })
);

const dragging = (e: MouseEvent) => {
    if (!isDragging.value) return;
    e.preventDefault();
    dragTop.value = `${Math.min(
        Math.max(e.clientY + dragOffset.value.y, 0),
        window.innerHeight
    )}px`;
    dragLeft.value = `${Math.min(
        Math.max(e.clientX + dragOffset.value.x, 0),
        window.innerWidth
    )}px`;
};

const dragEnd = () => {
    isDragging.value = false;
    document.body.classList.remove(IS_DRAGGING_CLASS);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('mousemove', dragging);
    return setSetting<Drag>('drag', {
        active: isDragging.value,
        top: parseInt(dragTop.value),
        left: parseInt(dragLeft.value),
        offset: dragOffset.value,
    });
};

const setSort = (key: Column) => {
    sortDir.value =
        key === sort.value && sortDir.value === 'asc' ? 'desc' : 'asc';
    sort.value = key;
};

const getSetting = <T = boolean,>(settingId: string): Promise<T> =>
    settingsStore.getSetting({
        moduleId: 'extendedCallWindow',
        settingId,
    });

const setSetting = <T,>(settingId: string, value: T): Promise<T> =>
    settingsStore.setSetting({
        moduleId: 'extendedCallWindow',
        settingId,
        value,
    });

onBeforeMount(() => {
    Promise.all(
        [
            'overlay',
            'minified',
            'textMode',
            'pushRight',
            'hoverTip',
            'emvMaxStaff',
        ].map(getSetting)
    ).then(
        settings =>
            ([
                overlay.value,
                minified.value,
                textMode.value,
                pushedRight.value,
                hoverTip.value,
                calcMaxStaff.value,
            ] = settings)
    );

    getSetting<Drag>('drag').then(drag => {
        isDragging.value = false;
        dragTop.value = `${Math.min(drag.top, window.innerHeight - 100)}px`;
        dragLeft.value = `${Math.min(drag.left, window.innerWidth - 100)}px`;
        dragOffset.value = drag.offset;
    });
});
onMounted(() => {
    const LSSM = window[PREFIX];
    const observeHandler = vehicleListObserveHandler(
        LSSM,
        props.missingRequirements,
        requirements.value,
        LSSM.$utils.getMissionTypeInMissionWindow(),
        (requirement, value) => (requirement.selected = value),
        $m
    );

    const amountElement = document.querySelector('#vehicle_amount');

    if (!observeHandler || !amountElement) return;

    const amountObserver = new MutationObserver(observeHandler);

    amountObserver.observe(amountElement, {
        childList: true,
        characterData: true,
    });

    observeHandler();
});
</script>

<style scoped lang="sass">
.hover-tip
  cursor: pointer

  &:hover
    &+ .alert
      display: block

  &+ .alert
    display: none
    position: absolute
    z-index: 1

.alert.alert-missing-vehicles
    &.overlay
        z-index: 3
        position: fixed
        top: v-bind(dragTop)
        left: v-bind(dragLeft)
        min-width: 100px
        max-width: calc(100% / 3)
        height: auto
        max-height: calc((100vh - 51.5px - 3%) * 0.97)
        transition: 100ms linear
        margin-bottom: 0.625em
        overflow: auto

    &.minified
        max-height: 1rem
        min-width: auto
        overflow: hidden

        > div
            display: none

    h3
        margin-top: 0 !important

    .svg-inline--fa
        cursor: pointer
        position: relative
        top: -6px

    &.dragging-field
        cursor: move
</style>
