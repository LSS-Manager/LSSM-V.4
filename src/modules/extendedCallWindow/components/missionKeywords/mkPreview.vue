<template>
    <span class="label">
        <span v-if="setting.autotextcolor">
            {{ setting.keyword }}
        </span>
        <template v-else>{{ setting.keyword }}</template>
    </span>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
    setting: {
        keyword: string;
        color: string;
        textcolor: string;
        autotextcolor: boolean;
    };
}>();
const { setting } = toRefs(props);
</script>

<style scoped lang="sass">
.label
    background-color: v-bind('setting.color')
    color: v-bind('setting.textcolor')

    span
        background: inherit
        background-clip: text
        -webkit-background-clip: text
        color: transparent
        filter: invert(1) grayscale(1) contrast(9)
</style>
