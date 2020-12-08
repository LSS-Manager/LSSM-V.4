<template>
    <span class="preview label" :style="`background-color: ${setting.color};`">
        <span
            :class="`${setting.autotextcolor ? 'autocolor' : 'textcolor'}`"
            :style="
                `${setting.autotextcolor ? '' : `color: ${setting.textcolor}`}`
            "
        >
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
.preview span.autocolor
    background: inherit
    // noinspection CssInvalidPropertyValue
    background-clip: text
    -webkit-background-clip: text
    color: transparent
    filter: invert(1) grayscale(1) contrast(9)
.preview span.textcolor
    background: transparent
    // noinspection CssInvalidPropertyValue
    background-clip: text
    -webkit-background-clip: text
</style>
