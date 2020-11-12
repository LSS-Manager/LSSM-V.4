<template>
    <span class="preview label" :style="`background-color: ${setting.color};`">
        <span>
            {{ setting.keyword }}
        </span>
    </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'mk-preview',
    props: {
        setting: {
            type: Object,
            required: true,
        },
    },
});
</script>

<style scoped lang="sass">
.preview span
    background: inherit
    // noinspection CssInvalidPropertyValue
    background-clip: text
    -webkit-background-clip: text
    color: transparent
    filter: invert(1) grayscale(1) contrast(9)
</style>
