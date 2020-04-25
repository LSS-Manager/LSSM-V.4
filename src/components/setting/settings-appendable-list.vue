<template>
    <div>
        <slot name="titles"></slot>
        <div
            v-for="(item, index) in cloneDeep(values)"
            :key="index"
            class="appendable-list-item"
        >
            <component
                :is="setting.listItemComponent"
                v-bind="cloneDeep(item)"
                @change="v => changeValue(index, v)"
                class="appendable-list-content"
            ></component>
            <button @click="removeItem(index)" class="btn btn-danger">
                <i class="fas fa-minus"></i>
            </button>
        </div>
        <button @click="addItem" class="btn btn-success">
            <i class="fas fa-plus"></i>
        </button>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'settings-appendable-list',
    data() {
        return {
            values: [],
            cloneDeep,
        };
    },
    props: {
        setting: {
            type: Object,
            required: true,
        },
        initialValues: {
            type: Array,
            required: true,
        },
    },
    methods: {
        addItem() {
            this.values.push(this.setting.defaultItem);
            this.emit();
        },
        removeItem(index) {
            this.values.splice(index, 1);
            this.emit();
        },
        changeValue(index, values) {
            this.values[index] = values;
            this.emit();
        },
        emit() {
            this.$emit('change', this.values);
        },
    },
    mounted() {
        this.values = cloneDeep(this.initialValues);
    },
};
</script>

<style scoped lang="sass">
.appendable-list-item
    display: flex
    margin: 0.5rem

    .appendable-list-content
        width: 100%
</style>
