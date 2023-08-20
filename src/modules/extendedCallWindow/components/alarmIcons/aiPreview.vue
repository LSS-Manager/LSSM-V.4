<template>
    <a href="#" class="btn btn-success navbar-btn btn-sm">
        <font-awesome-icon
            v-if="isValidIcon"
            :icon="[setting.type, setting.icon]"
            class="type-icon"
        ></font-awesome-icon>
        Alarm
        <span id="vehicle_amount" class="badge vehicle_amount_selected">
            0
        </span>
    </a>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

import iconNames from '../../../../generated/faIcons.json';

const props = defineProps<{
    setting: {
        type: 'fab' | 'far' | 'fas';
        icon: string;
    };
}>();

const { setting } = toRefs(props);

const styleMap = {
    fab: 'brands',
    far: 'regular',
    fas: 'solid',
} as const;

const isValidIcon = computed(() => {
    return iconNames[styleMap[setting.value.type]].includes(setting.value.icon);
});
</script>
