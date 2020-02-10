<template>
    <toggle-button
        :name="name"
        :value="value"
        labels
        class="setting-toggle pull-right"
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
    },
};
</script>

<style scoped lang="sass">
.setting-toggle
    transform: translateY(-32px)
</style>
