<template>
    <div>
        <div class="row">
            <div class="col col-xs-11 row">
                <div
                    class="col"
                    v-for="(item, index) in setting.listItem"
                    :key="index"
                    :class="`col-xs-${layout[index]}`"
                >
                    {{ item.title }}
                </div>
            </div>
            <button
                class="col col-xs-1 btn btn-warning pull-right"
                title="reset"
                @click="reset"
            >
                <font-awesome-icon :icon="faUndoAlt"></font-awesome-icon>
            </button>
        </div>
        <div
            class="row"
            v-for="(value, index) in updateValues"
            :key="`item_${index}`"
        >
            <div class="col col-xs-11 row">
                <div
                    class="col"
                    v-for="(item, list_index) in setting.listItem"
                    :key="list_index"
                    :class="`col-xs-${layout[list_index]}`"
                >
                    <settings-text
                        v-if="item.setting.type === 'text'"
                        :name="item.name"
                        :placeholder="item.title"
                        v-model="value[item.name]"
                        @input="changeValue(index, value)"
                    ></settings-text>
                    <settings-toggle
                        v-else-if="item.setting.type === 'toggle'"
                        :name="item.name"
                        v-model="value[item.name]"
                        @input="changeValue(index, value)"
                        :pull-right="false"
                    ></settings-toggle>
                    <settings-color
                        v-else-if="item.setting.type === 'color'"
                        :name="item.name"
                        v-model="value[item.name]"
                        @input="changeValue(index, value)"
                    ></settings-color>
                    <settings-number
                        v-else-if="item.setting.type === 'number'"
                        :name="item.name"
                        :placeholder="item.title"
                        v-model="value[item.name]"
                        :min="item.setting.min"
                        :max="item.setting.max"
                        :step="item.setting.step"
                        @input="changeValue(index, value)"
                    ></settings-number>
                    <settings-select
                        v-else-if="item.setting.type === 'select'"
                        :name="setting.name"
                        v-model="value[item.name]"
                        :options="
                            item.setting.values.map(v => ({
                                label: v,
                                value: v,
                            }))
                        "
                        :placeholder="item.title"
                        @input="changeValue(index, value)"
                    ></settings-select>
                    <settings-multi-select
                        v-else-if="item.setting.type === 'multiSelect'"
                        :name="item.name"
                        v-model="value[item.name]"
                        :options="
                            item.setting.values.map(v => ({
                                label: v,
                                value: v,
                            }))
                        "
                        :placeholder="item.title"
                        @input="changeValue(index, value)"
                    ></settings-multi-select>
                    <settings-hotkey
                        v-else-if="item.setting.type === 'hotkey'"
                        :name="item.name"
                        :placeholder="item.title"
                        v-model="value[item.name]"
                        @input="changeValue(index, value)"
                    ></settings-hotkey>
                    <pre v-else>{{ setting }}</pre>
                </div>
            </div>
            <div class="col-xs-1">
                <pre>{{ value }}</pre>
            </div>
        </div>
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
    components: {
        SettingsToggle: () =>
            import(
                /* webpackChunkName: "components/setting/toggle" */ './toggle.vue'
            ),
        SettingsText: () =>
            import(
                /* webpackChunkName: "components/setting/text" */ './text.vue'
            ),
        SettingsSelect: () =>
            import(
                /* webpackChunkName: "components/setting/select" */ './select.vue'
            ),
        SettingsMultiSelect: () =>
            import(
                /* webpackChunkName: "components/setting/multi-select" */ './multi-select.vue'
            ),
        SettingsColor: () =>
            import(
                /* webpackChunkName: "components/setting/color" */ './color.vue'
            ),
        SettingsNumber: () =>
            import(
                /* webpackChunkName: "components/setting/number" */ './number.vue'
            ),
        SettingsHotkey: () =>
            import(
                /* webpackChunkName: "components/setting/hotkey" */ './hotkey.vue'
            ),
    },
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
        layout() {
            const sizes = this.setting.listItem.map(
                ({ size }) => size % 12
            ) as number[];
            const sum = sizes.reduce((a, b) => a + b, 0);
            const autos = sizes.filter(s => s === 0).length;
            sizes.forEach(
                (s, index) =>
                    s === 0 && (sizes[index] = (12 - (sum % 12)) / autos)
            );
            return sizes.map(s => Math.ceil(s));
        },
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
                title: this.$t('settings.resetWarningSetting.title'),
                text: this.$t('settings.resetWarningSetting.text'),
                buttons: [
                    {
                        title: this.$t('settings.resetWarningSetting.close'),
                        default: true,
                    },
                    {
                        title: this.$t('settings.resetWarningSetting.reset'),
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
