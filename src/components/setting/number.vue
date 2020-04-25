<template>
    <div class="form-horizontal">
        <label>
            <input
                :name="name"
                :placeholder="placeholder"
                :value="value"
                :min="min"
                :max="max"
                :step="step"
                :disabled="disabled"
                type="number"
                class="form-control"
                v-on="listeners"
            />
        </label>
    </div>
</template>

<script>
export default {
    name: 'settings-number',
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
            type: Number,
            required: false,
        },
        min: {
            type: Number,
            required: false,
        },
        max: {
            type: Number,
            required: false,
        },
        step: {
            type: Number,
            required: false,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
};
</script>

<style scoped lang="sass">
label
    width: 100%
</style>
