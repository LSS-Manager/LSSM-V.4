<template>
    <lightbox name="settings" no-title-hide :key="key">
        <h1>
            {{ $m('name') }}
            <button class="btn btn-success" :disabled="!changes" @click="save">
                {{ $m('save') }}
            </button>
            <button
                class="btn btn-warning"
                :disabled="!changes"
                @click="discard"
            >
                {{ $m('discard') }}
            </button>
            <button class="btn btn-danger" @click="reset">
                {{ $m('reset') }}
            </button>
        </h1>
        <tabs
            :class="$store.getters.nodeAttribute('settings-tabs')"
            v-if="modulesSorted.length > 0"
            ref="settingsTabs"
            :default-index="tab"
            :on-select="(_, i) => (this.tab = i)"
        >
            <tab
                v-for="moduleId in modulesSorted"
                :title="
                    $t(
                        `modules.${moduleId}.name`.replace(
                            'modules.global',
                            'globalSettings'
                        )
                    )
                "
                :key="moduleId"
                :module="moduleId"
            >
                <div
                    class="auto-sized-grid"
                    :class="{
                        wide: Object.values(settings[moduleId]).find(setting =>
                            wideGrids.includes(setting.type)
                        ),
                    }"
                >
                    <setting
                        v-for="(setting, settingId) in settings[moduleId]"
                        :key="settingId"
                        :moduleId="moduleId"
                        :settingId="settingId"
                        :name="(setting.name = `${moduleId}.${settingId}`)"
                        :title="
                            $t(
                                `modules.${moduleId}.settings.${settingId}.title`.replace(
                                    'modules.global.settings',
                                    'globalSettings'
                                )
                            )
                        "
                        :description="
                            $t(
                                `modules.${moduleId}.settings.${settingId}.description`.replace(
                                    'modules.global.settings',
                                    'globalSettings'
                                ),
                                {
                                    wiki: $store.getters.wiki,
                                }
                            )
                        "
                        :beforeDescription="
                            settingsBeforeDescription.includes(setting.type)
                        "
                        :isDisabled="
                            (setting.isDisabled = disabled(moduleId, settingId))
                        "
                        :disabled="setting.isDisabled"
                        :hidden="setting.type === 'hidden'"
                    >
                        <settings-text
                            v-if="setting.type === 'text'"
                            :name="setting.name"
                            :placeholder="
                                $t(
                                    `modules.${moduleId}.settings.${settingId}.title`
                                )
                            "
                            v-model="settings[moduleId][settingId].value"
                            @input="update(moduleId, settingId)"
                            :disabled="setting.isDisabled"
                        ></settings-text>
                        <settings-toggle
                            v-else-if="setting.type === 'toggle'"
                            :name="setting.name"
                            v-model="settings[moduleId][settingId].value"
                            @input="update(moduleId, settingId)"
                            :disabled="setting.isDisabled"
                        ></settings-toggle>
                        <settings-color
                            v-else-if="setting.type === 'color'"
                            :name="setting.name"
                            v-model="settings[moduleId][settingId].value"
                            @input="update(moduleId, settingId)"
                            :disabled="setting.isDisabled"
                        ></settings-color>
                        <settings-number
                            v-else-if="setting.type === 'number'"
                            :name="setting.name"
                            :placeholder="
                                $t(
                                    `modules.${moduleId}.settings.${settingId}.title`
                                )
                            "
                            v-model="settings[moduleId][settingId].value"
                            :min="setting.min"
                            :max="setting.max"
                            :step="setting.step"
                            @input="update(moduleId, settingId)"
                            :disabled="setting.isDisabled"
                        ></settings-number>
                        <settings-select
                            v-else-if="setting.type === 'select'"
                            :name="setting.name"
                            v-model="settings[moduleId][settingId].value"
                            :options="
                                setting.values.map(value => ({
                                    label: $t(
                                        `modules.${moduleId}.settings.${settingId}.${value}`
                                    ),
                                    value,
                                }))
                            "
                            :placeholder="
                                $t(
                                    `modules.${moduleId}.settings.${settingId}.title`
                                )
                            "
                            @input="update(moduleId, settingId)"
                            :disabled="setting.isDisabled"
                        ></settings-select>
                        <settings-multi-select
                            v-else-if="setting.type === 'multiSelect'"
                            :name="setting.name"
                            v-model="settings[moduleId][settingId].value"
                            :options="
                                setting.values.map(value => ({
                                    label: $t(
                                        `modules.${moduleId}.settings.${settingId}.${value}`
                                    ),
                                    value,
                                }))
                            "
                            :placeholder="
                                $t(
                                    `modules.${moduleId}.settings.${settingId}.title`
                                )
                            "
                            @input="update(moduleId, settingId)"
                            :disabled="setting.isDisabled"
                        ></settings-multi-select>
                        <!--                        <settings-appendable-list-->
                        <!--                            v-else-if="setting.type === 'appendable-list'"-->
                        <!--                            :setting="setting"-->
                        <!--                            :initialValues="getValue(moduleId, settingId)"-->
                        <!--                        >-->
                        <!--                            <template #titles>-->
                        <!--                                <component-->
                        <!--                                    :is="setting.titleComponent"-->
                        <!--                                ></component>-->
                        <!--                            </template>-->
                        <!--                        </settings-appendable-list>-->
                        <pre v-else>{{ setting }}</pre>
                    </setting>
                </div>
            </tab>
        </tabs>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import Setting from './setting.vue';
import SettingsText from './setting/text.vue';
import SettingsToggle from './setting/toggle.vue';
import SettingsSelect from './setting/select.vue';
import SettingsMultiSelect from './setting/multi-select.vue';
import SettingsColor from './setting/color.vue';
import SettingsNumber from './setting/number.vue';
// import SettingsAppendableList from './setting/settings-appendable-list.vue';
import Lightbox from './lightbox.vue';
import { LSSM } from '../core';
import {
    SettingsData,
    SettingsMethods,
} from '../../typings/components/Settings';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { DefaultProps, DefaultComputed } from 'vue/types/options';
import { Setting as SettingType } from '../../typings/Setting';

export default Vue.extend<
    SettingsData,
    SettingsMethods,
    DefaultComputed,
    DefaultProps
>({
    name: 'settings',
    components: {
        // SettingsAppendableList,
        SettingsToggle,
        SettingsText,
        SettingsSelect,
        SettingsMultiSelect,
        SettingsColor,
        SettingsNumber,
        Setting,
        Lightbox,
    },
    data() {
        const settings = cloneDeep(this.$store.state.settings.settings);
        return {
            settings,
            startSettings: cloneDeep(settings),
            modulesSorted: [
                'global',
                ...(this.$store.getters
                    .modulesSorted as string[]).filter(module =>
                    settings.hasOwnProperty(module)
                ),
            ],
            wideGrids: ['appendable-list'],
            settingsBeforeDescription: ['toggle'],
            key: 0,
            changes: false,
            tab: 0,
        };
    },
    methods: {
        update(moduleId, settingId) {
            this.changes =
                (moduleId &&
                    settingId &&
                    !isEqual(
                        this.settings[moduleId][settingId].value,
                        this.startSettings[moduleId][settingId].value
                    )) ||
                !!Object.entries(this.settings).find(([module, settings]) =>
                    Object.entries(settings).find(
                        ([setting, { value }]) =>
                            !isEqual(
                                value,
                                this.startSettings[module][setting].value
                            )
                    )
                );
            this.$store.commit('settings/setSettingsChanges', this.changes);
        },
        save() {
            this.$store
                .dispatch('settings/saveSettings', {
                    settings: this.settings,
                })
                .then(() => {
                    this.settings = cloneDeep(
                        this.$store.state.settings.settings
                    );
                    this.startSettings = cloneDeep(this.settings);
                    this.update();
                });
        },
        discard() {
            this.settings = cloneDeep(this.startSettings);
            this.update();
            this.key++;
        },
        reset() {
            this.$modal.show('dialog', {
                title: this.$m('resetWarning.title'),
                text: this.$m('resetWarning.text'),
                buttons: [
                    {
                        title: this.$m('resetWarning.close'),
                        default: true,
                    },
                    {
                        title: this.$m('resetWarning.total'),
                        handler: () => {
                            Object.values(this.settings).forEach(module =>
                                Object.values(module).forEach(setting =>
                                    this.$set(setting, 'value', setting.default)
                                )
                            );
                            this.save();
                            this.key++;
                            this.$modal.hide('dialog');
                        },
                    },
                    {
                        title: this.$m('resetWarning.module'),
                        handler: () => {
                            Object.values(
                                this.settings[this.modulesSorted[this.tab]]
                            ).forEach(setting =>
                                this.$set(setting, 'value', setting.default)
                            );
                            this.save();
                            this.key++;
                            this.$modal.hide('dialog');
                        },
                    },
                ],
            });
        },
        disabled(moduleId, settingId) {
            let dependence = this.settings[moduleId][settingId].dependsOn;
            let disabledFun = this.settings[moduleId][settingId].disabled;
            if (dependence) {
                const invert = dependence.startsWith('!');
                dependence = dependence.replace(/^!/, '');
                const base = dependence.startsWith('.')
                    ? this.settings[moduleId]
                    : this.settings;
                dependence = dependence.replace(/^\./, '');
                let setting = (dependence.split('/').reduce(
                    (previousValue, currentValue) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        (previousValue || base)[currentValue],
                    base
                ) as unknown) as SettingType;
                if (invert)
                    return (
                        setting?.isDisabled ||
                        (!!setting?.value ?? !!setting?.default)
                    );
                return (
                    setting?.isDisabled ||
                    (!setting?.value ?? !setting?.default)
                );
            } else if (disabledFun && typeof disabledFun === 'function') {
                return disabledFun(this.settings);
            }
            return false;
        },
        $m: (key, args) => LSSM.$t(`modules.settings.${key}`, args),
    },
});
</script>

<style lang="sass">
.vue-tab[aria-selected="true"]
    border-bottom-color: white !important
.vue-tabpanel
    transition: 0.5s

.auto-sized-grid
    display: grid
    grid-gap: 16px
    grid-template-columns: repeat(auto-fit, minmax(150px, calc(25% - 16px)))
    list-style: none
    padding-left: 0
    margin-top: 10px
    margin-bottom: 10px

.auto-sized-grid.wide
    grid-template-columns: repeat(auto-fit, minmax(150px, 100%))
</style>
