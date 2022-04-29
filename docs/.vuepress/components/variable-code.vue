<template>
    <code>{{ codeContent }}</code>
</template>

<script setup lang="ts">
import { computed, defineProps, toRefs } from 'vue';

const props = defineProps({
    variable: {
        type: String,
        required: true,
    },
});

const { variable } = toRefs(props);

const codeContent = computed(() => `{{${variable?.value}}}`);
</script>
