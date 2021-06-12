<template>
    <div class="input-group" style="width: auto">
        <span
            class="input-group-addon"
            :style="`background: ${backgroundColor};color: ${textColor}`"
        >
            {{ desc }}
        </span>
        <span
            class="input-group-addon"
            :class="{ 'text-success': total > 0, 'text-danger': total < 0 }"
        >
            {{ total.toLocaleString() }} ({{ amount.toLocaleString() }}x
            <template v-if="showAverage">
                , {{ Math.round(total / amount).toLocaleString() }}Ø
            </template>
            )
        </span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'dcs-badge',
    props: {
        backgroundColor: {
            type: String,
            required: true,
        },
        textColor: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        showAverage: {
            type: Boolean,
            required: true,
        },
    },
});
</script>

<style scoped lang="sass">
.input-group:not(last-of-type)
    margin-right: 1rem

.text-danger
    color: #a94442 !important
</style>
