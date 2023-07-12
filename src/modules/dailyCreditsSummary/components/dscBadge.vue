<template>
    <div class="input-group" style="width: auto">
        <span class="input-group-addon">
            {{ props.desc }}
        </span>
        <span
            class="input-group-addon"
            :class="{
                'text-success': props.total > 0,
                'text-danger': props.total < 0,
            }"
        >
            {{ props.total.toLocaleString() }} ({{
                props.amount.toLocaleString()
            }}x
            <template v-if="props.showAverage">
                , {{ Math.round(props.total / props.amount).toLocaleString() }}Ø
            </template>
            )
        </span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    backgroundColor: string;
    textColor: string;
    desc: string;
    total: number;
    amount: number;
    showAverage: boolean;
}>();
</script>

<style scoped lang="sass">
.input-group:not(last-of-type)
    margin-right: 1rem

    .input-group-addon:first-child
        background-color: v-bind('props.backgroundColor')
        color: v-bind('props.textColor')

.text-danger
    color: #a94442 !important
</style>
