<template>
    <div :class="$store.getters.nodeId('setting')" class="setting">
        <h4>
            <b>{{ title }}</b>
        </h4>
        <span
            v-if="
                description &&
                    description !==
                        `modules.${moduleId}.settings.${settingId}.description`
            "
            >{{ description }}<br
        /></span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'setting',
    props: {
        moduleId: {
            type: String,
            required: true,
        },
        settingId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
            default: '',
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
