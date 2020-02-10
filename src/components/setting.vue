<template>
    <div :class="$store.getters.nodeId('setting')" class="setting">
        <h4>
            <b>{{ title }}</b>
        </h4>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'setting',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped lang="sass">
.setting
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
    transition: 0.3s
    border-radius: 5px
    padding: 1rem

    &:hover
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)
</style>
