<template>
    <toggle-button
        :name="name"
        :value="value"
        labels
        class="setting-toggle"
        :class="{ 'pull-right': pullRight }"
        v-on="listeners"
    ></toggle-button>
</template>

<script>
export default {
    name: 'settings-toggle',
    data() {
        return {
            listeners: this.$listeners,
        };
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        value: {
            required: true,
        },
        pullRight: {
            required: false,
            default: true,
        },
    },
};
</script>

<style scoped lang="sass">
.setting-toggle.pull-right
    transform: translateY(-32px)
</style>
