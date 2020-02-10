<template>
    <div class="form-horizontal">
        <label>
            <input
                :name="name"
                :placeholder="placeholder"
                :value="value"
                type="text"
                class="form-control"
                v-on="listeners"
            />
        </label>
    </div>
</template>

<script>
export default {
    name: 'settings-text',
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
        placeholder: {
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
label
    width: 100%
</style>
