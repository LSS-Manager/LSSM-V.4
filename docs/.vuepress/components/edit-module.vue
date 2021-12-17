<template>
    <span>
        <a :href="link" target="_blank">
            {{ this.$themeConfig.variables.editModuleLinkText[this.$lang] }}
        </a>
    </span>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'edit-module',
    computed: {
        link() {
            return `${this.$themeConfig.variables.github}/edit/dev/src/modules/${this.module}/docs/${this.$lang}.md`;
        },
    },
    props: {
        module: {
            type: String,
            required: true,
        },
    },
});
</script>

<style scoped>
span {
    float: right;
    margin-top: 1rem;
}
</style>
