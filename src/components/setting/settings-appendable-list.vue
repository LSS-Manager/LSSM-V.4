<template>
    <div :class="{ disabled: !enabled }">
        <div class="row" style="margin-left: 0px; margin-right: 0px;">
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
                @click="reset"
            >
                <font-awesome-icon :icon="faUndoAlt"></font-awesome-icon>
            </button>
        </div>
        <div
            class="row appendable-list-flex"
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
                    <component
                        v-if="item.type === 'preview'"
                        :is="item.component"
                        :setting="value"
                    ></component>
                    <settings-text
                        v-else-if="item.setting.type === 'text'"
                        :name="item.name"
                        :placeholder="item.title"
                        v-model="value[item.name]"
                        @input="changeValue(index, value, item)"
                        :disabled="false"
                    ></settings-text>
                    <settings-textarea
                        v-else-if="item.setting.type === 'textarea'"
                        :name="item.name"
                        :placeholder="item.title"
                        v-model="value[item.name]"
                        @input="changeValue(index, value, item)"
                        :disabled="false"
                    ></settings-textarea>
                    <settings-toggle
                        v-else-if="item.setting.type === 'toggle'"
                        :name="item.name"
                        v-model="value[item.name]"
                        @input="changeValue(index, value, item)"
                        :pull-right="false"
                    ></settings-toggle>
                    <settings-color
                        v-else-if="item.setting.type === 'color'"
                        :name="item.name"
                        v-model="value[item.name]"
                        @input="changeValue(index, value, item)"
                    ></settings-color>
                    <settings-number
                        v-else-if="item.setting.type === 'number'"
                        :name="item.name"
                        :placeholder="item.title"
                        v-model="value[item.name]"
                        :min="item.setting.min"
                        :max="item.setting.max"
                        :step="item.setting.step"
                        @input="changeValue(index, value, item)"
                    ></settings-number>
                    <settings-select
                        v-else-if="item.setting.type === 'select'"
                        :name="setting.name"
                        v-model="value[item.name]"
                        :options="getOptions(item, value[item.name])"
                        :placeholder="item.title"
                        @input="changeValue(index, value, item)"
                    ></settings-select>
                    <settings-multi-select
                        v-else-if="item.setting.type === 'multiSelect'"
                        :name="item.name"
                        v-model="value[item.name]"
                        :options="getOptions(item, value[item.name])"
                        :placeholder="item.title"
                        @input="changeValue(index, value, item)"
                    ></settings-multi-select>
                    <settings-hotkey
                        v-else-if="item.setting.type === 'hotkey'"
                        :name="item.name"
                        :placeholder="item.title"
                        v-model="value[item.name]"
                        @input="changeValue(index, value, item)"
                    ></settings-hotkey>
                    <div
                        v-else-if="item.setting.type === 'hidden'"
                        class="hidden"
                    ></div>
                    <pre v-else>{{ setting }}</pre>
                </div>
            </div>
            <div class="col-xs-1 appendable-list-flex">
                <button
                    class="btn btn-xs btn-danger"
                    @click="removeItem(index)"
                >
                    <font-awesome-icon :icon="faMinus"></font-awesome-icon>
                </button>
                <div class="btn-group">
                    <button
                        v-if="orderable && index > 0"
                        class="btn btn-xs btn-success"
                        @click="moveUp(index)"
                    >
                        <font-awesome-icon
                            :icon="faLongArrowAltUp"
                        ></font-awesome-icon>
                    </button>
                    <button
                        v-if="orderable && index < updateValues.length - 1"
                        class="btn btn-xs btn-success"
                        @click="moveDown(index)"
                    >
                        <font-awesome-icon
                            :icon="faLongArrowAltDown"
                        ></font-awesome-icon>
                    </button>
                </div>
            </div>
        </div>
        <button @click="addItem" class="btn btn-success">
            <font-awesome-icon :icon="faPlus"></font-awesome-icon>
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import cloneDeep from 'lodash/cloneDeep';
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons/faLongArrowAltDown';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons/faLongArrowAltUp';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons/faUndoAlt';

import {
    AppendableList,
    AppendableListComputed,
    AppendableListMethods,
    AppendableListProps,
} from 'typings/components/setting/AppendableList';
import { AppendableListSetting } from 'typings/Setting';

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
        SettingsTextarea: () =>
            import(
                /* webpackChunkName: "components/setting/textarea" */ './textarea.vue'
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
            faMinus,
            faLongArrowAltUp,
            faLongArrowAltDown,
            faPlus,
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
        moduleId: {
            type: String,
            required: true,
        },
        settingId: {
            type: String,
            required: true,
        },
        orderable: {
            type: Boolean,
            required: true,
        },
        enabled: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        layout() {
            const sizes = this.setting.listItem.map(
                ({ size }) => (size ?? -1) % 12
            ) as number[];
            const sum = sizes.reduce((a, b) => (b >= 0 ? a + b : a), 0);
            const autos = sizes.filter(s => s === 0).length;
            sizes.forEach(
                (s, index) =>
                    s === 0 && (sizes[index] = (12 - (sum % 12)) / autos)
            );
            return sizes.map(s => Math.ceil(s));
        },
        updateValues() {
            return cloneDeep(this.value)
                .filter(v => !!v)
                .map(v => ({ ...this.setting.defaultItem, ...v }));
        },
        uniqueColumns() {
            return this.setting.listItem
                .filter(item => item.hasOwnProperty('setting') && item.unique)
                .map(item => (item as AppendableListSetting).name);
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
        changeValue(index, value, { name: column, title }) {
            if (
                this.uniqueColumns.includes(column) &&
                this.value.map(item => item[column]).includes(value[column])
            ) {
                this.$modal.show('dialog', {
                    title: this.$t(
                        'modules.settings.appendableList.unique.title'
                    ),
                    text: this.$t(
                        'modules.settings.appendableList.unique.text',
                        {
                            value: value[column],
                            title,
                        }
                    ),
                    buttons: [
                        {
                            title: this.$t(
                                'modules.settings.appendableList.unique.confirm'
                            ),
                            default: true,
                        },
                    ],
                });
                return this.$set(value, column, this.value[index][column]);
            }
            const updated = cloneDeep(this.updateValues);
            updated[index] = value;
            this.$emit(
                'input',
                updated.filter(v => !!v)
            );
        },
        getOptions({ setting, unique, name }, currentValue) {
            const options = setting.values.map((v, vi) => ({
                label: setting.labels?.[vi] ?? v,
                value: v,
            }));
            if (unique) {
                const usedValues = this.updateValues.map(item => item[name]);
                return options.filter(
                    ({ value }) =>
                        !usedValues.includes(value) || value === currentValue
                );
            }
            return options;
        },
        moveUp(index) {
            const updated = cloneDeep(this.updateValues);
            [updated[index - 1], updated[index]] = [
                updated[index],
                updated[index - 1],
            ];
            this.$emit(
                'input',
                updated.filter(v => !!v)
            );
        },
        moveDown(index) {
            const updated = cloneDeep(this.updateValues);
            [updated[index], updated[index + 1]] = [
                updated[index + 1],
                updated[index],
            ];
            this.$emit(
                'input',
                updated.filter(v => !!v)
            );
        },
        reset() {
            this.$modal.show('dialog', {
                title: this.$t('modules.settings.resetWarningSetting.title'),
                text: this.$t('modules.settings.resetWarningSetting.text', {
                    module: this.$t(`modules.${this.moduleId}.name`),
                    setting: this.$t(
                        `modules.${this.moduleId}.settings.${this.settingId}.title`
                    ),
                }),
                buttons: [
                    {
                        title: this.$t(
                            'modules.settings.resetWarningSetting.close'
                        ),
                        default: true,
                    },
                    {
                        title: this.$t(
                            'modules.settings.resetWarningSetting.reset'
                        ),
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
.appendable-list-flex
    display: flex

    .appendable-list-flex
        justify-content: space-evenly
        align-items: center
.disabled
    pointer-events: none
    cursor: not-allowed
    opacity: 0.5
</style>
