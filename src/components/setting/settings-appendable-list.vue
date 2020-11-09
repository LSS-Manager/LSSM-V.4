<template>
    <div>
        <button class="btn btn-warning pull-right" title="reset" @click="reset">
            <font-awesome-icon :icon="faUndoAlt"></font-awesome-icon>
        </button>
        <slot name="titles"></slot>
        <div
            v-for="(item, index) in updateValues"
            :key="index"
            class="appendable-list-item"
        >
            <component
                :is="setting.listItemComponent"
                :value="cloneDeep(item)"
                @input="v => changeValue(index, v)"
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

<script lang="ts">
import Vue from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import {
    AppendableList,
    AppendableListMethods,
    AppendableListComputed,
    AppendableListProps,
} from 'typings/components/setting/AppendableList';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons/faUndoAlt';

export default Vue.extend<
    AppendableList,
    AppendableListMethods,
    AppendableListComputed,
    AppendableListProps
>({
    name: 'settings-appendable-list',
    data() {
        return {
            faUndoAlt,
            cloneDeep,
        };
    },
    props: {
        setting: {
            type: Object,
            required: true,
        },
        value: {
            type: Array,
            required: true,
        },
    },
    computed: {
        updateValues() {
            return cloneDeep(this.value).filter(v => !!v);
        },
    },
    methods: {
        addItem() {
            const updated = cloneDeep(this.updateValues);
            updated.push(this.setting.defaultItem);
            this.$emit(
                'input',
                updated.filter(v => !!v)
            );
        },
        removeItem(index) {
            const updated = cloneDeep(this.updateValues);
            delete updated[index];
            this.$emit(
                'input',
                updated.filter(v => !!v)
            );
        },
        changeValue(index, value) {
            const updated = cloneDeep(this.updateValues);
            updated[index] = value;
            this.$emit(
                'input',
                updated.filter(v => !!v)
            );
        },
        reset() {
            this.$modal.show('dialog', {
                title: this.$m('resetWarningSetting.title'),
                text: this.$m('resetWarningSetting.text'),
                buttons: [
                    {
                        title: this.$m('resetWarningSetting.close'),
                        default: true,
                    },
                    {
                        title: this.$m('resetWarningSetting.reset'),
                        handler: () => {
                            this.$emit('input', this.setting.default);
                            this.$modal.hide('dialog');
                        },
                    },
                ],
            });
        },
    },
});
</script>

<style scoped lang="sass">
.appendable-list-item
    display: flex
    margin: 0.5rem

    .appendable-list-content
        width: 100%
</style>
