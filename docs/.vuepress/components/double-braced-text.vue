<template>
    {{ codeContent }}
</template>

<script setup lang="ts">
import { computed, defineProps, toRefs } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
});

const { text } = toRefs(props);

const codeContent = computed(() => `{{${text?.value}}}`);
</script>
