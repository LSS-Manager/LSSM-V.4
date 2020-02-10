<template>
    <div class="sidebar">
        <h4>
            <b>{{ title }}</b>
        </h4>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'sidebar',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped lang="sass">
body.dark
    .sidebar
        background-color: #505050
        color: #fff

.sidebar
    background-color: white
    border-left-style: solid
    right: 0
    height: 100%
    width: 0
    position: fixed
    top: 0
    overflow-x: hidden
    transition: 0.5s

    &.open
        padding: 1rem
        width: 250px
</style>
