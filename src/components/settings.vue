<template>
    <lightbox name="settings" no-title-hide :key="key">
        <h1>
            {{ $m('name') }}
            <button class="btn btn-success" :disabled="!changes" @click="save">
                {{ $m('save') }}
            </button>
            <span class="btn-group">
                <button
                    class="btn btn-warning"
                    :disabled="!changes"
                    @click="discard"
                >
                    {{ $m('discard') }}
                </button>
                <button class="btn btn-warning" :disabled="!changes">
                    <font-awesome-icon :icon="faHistory"></font-awesome-icon>
                    <div id="settings-changelist">
                        <div
                            v-for="(changes, module) in changeList"
                            :key="module"
                        >
                            <b>{{
                                $t(
                                    `modules.${module}.name`.replace(
                                        'modules.global',
                                        'globalSettings'
                                    )
                                )
                            }}</b>
                            <table class="table table-striped table-condensed">
                                <tbody>
                                    <tr
                                        v-for="({ saved, current },
                                        setting) in changes"
                                        :key="setting"
                                    >
                                        <td>
                                            <b>
                                                {{
                                                    $t(
                                                        `modules.${module}.settings.${setting}.title`.replace(
                                                            'modules.global.settings',
                                                            'globalSettings'
                                                        )
                                                    )
                                                }}
                                            </b>
                                        </td>
                                        <td>
                                            {{
                                                $m(
                                                    `changeList.${saved}`
                                                ).replace(
                                                    /^modules\.settings\.changeList\./,
                                                    ''
                                                )
                                            }}
                                        </td>
                                        <td>→</td>
                                        <td>
                                            {{
                                                $m(
                                                    `changeList.${current}`
                                                ).replace(
                                                    /^modules\.settings\.changeList\./,
                                                    ''
                                                )
                                            }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </button>
            </span>
            <button class="btn btn-danger" @click="reset">
                {{ $m('reset') }}
            </button>
            <a class="btn btn-info" download="LSSM_V4.lssm" :href="exportData">
                {{ $m('export') }}
            </a>
            <button class="btn btn-info" @click="$refs.import.click()">
                {{ $m('import') }}
            </button>
            <label class="hidden">
                <input
                    type="file"
                    accept="application/json,.lssm"
                    ref="import"
                    @change="importSettings"
                />
            </label>
        </h1>
        <tabs
            :class="$store.getters.nodeAttribute('settings-tabs')"
            v-if="modulesSorted.length > 0"
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
                <div class="auto-sized-grid">
                    <setting
                        v-for="(setting, settingId) in settings[moduleId]"
                        :key="settingId"
                        :wide="wideGrids.includes(setting.type)"
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
                        :appendableListDisableable="
                            !!settings[moduleId][settingId].disableable
                        "
                        :appendableListEnabled="
                            setting.type === 'appendable-list'
                                ? settings[moduleId][settingId].value.enabled
                                : false
                        "
                        @toggleEnabled="
                            updateAppendableList($event, moduleId, settingId)
                        "
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
                        <settings-textarea
                            v-else-if="setting.type === 'textarea'"
                            :name="setting.name"
                            :placeholder="
                                $t(
                                    `modules.${moduleId}.settings.${settingId}.title`
                                )
                            "
                            v-model="settings[moduleId][settingId].value"
                            @input="update(moduleId, settingId)"
                            :disabled="setting.isDisabled"
                        ></settings-textarea>
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
                                getSelectOptions(moduleId, setting, settingId)
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
                                getSelectOptions(moduleId, setting, settingId)
                            "
                            :placeholder="
                                $t(
                                    `modules.${moduleId}.settings.${settingId}.title`
                                )
                            "
                            @input="update(moduleId, settingId)"
                            :disabled="setting.isDisabled"
                        ></settings-multi-select>
                        <settings-hotkey
                            v-else-if="setting.type === 'hotkey'"
                            :name="setting.name"
                            :placeholder="
                                $t(
                                    `modules.${moduleId}.settings.${settingId}.title`
                                )
                            "
                            v-model="settings[moduleId][settingId].value"
                            @input="update(moduleId, settingId)"
                        ></settings-hotkey>
                        <settings-appendable-list
                            v-else-if="setting.type === 'appendable-list'"
                            :setting="setting"
                            v-model="settings[moduleId][settingId].value.value"
                            @input="update(moduleId, settingId)"
                            :module-id="moduleId"
                            :setting-id="settingId"
                            :orderable="!!setting.orderable"
                            :enabled="
                                settings[moduleId][settingId].value.enabled
                            "
                        ></settings-appendable-list>
                        <pre v-else>{{ setting }}</pre>
                    </setting>
                </div>
            </tab>
        </tabs>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import cloneDeep from 'lodash/cloneDeep';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import isEqual from 'lodash/isEqual';

import { DefaultProps } from 'vue/types/options';
import {
    AppendableList,
    ModuleSettings,
    Setting as SettingType,
} from '../../typings/Setting';
import {
    SettingsComputed,
    SettingsData,
    SettingsMethods,
} from '../../typings/components/Settings';

export default Vue.extend<
    SettingsData,
    SettingsMethods,
    SettingsComputed,
    DefaultProps
>({
    name: 'settings',
    components: {
        SettingsAppendableList: () =>
            import(
                /* webpackChunkName: "components/setting/settings-appendable-list" */ './setting/settings-appendable-list.vue'
            ),
        SettingsToggle: () =>
            import(
                /* webpackChunkName: "components/setting/toggle" */ './setting/toggle.vue'
            ),
        SettingsText: () =>
            import(
                /* webpackChunkName: "components/setting/text" */ './setting/text.vue'
            ),
        SettingsTextarea: () =>
            import(
                /* webpackChunkName: "components/setting/textarea" */ './setting/textarea.vue'
            ),
        SettingsSelect: () =>
            import(
                /* webpackChunkName: "components/setting/select" */ './setting/select.vue'
            ),
        SettingsMultiSelect: () =>
            import(
                /* webpackChunkName: "components/setting/multi-select" */ './setting/multi-select.vue'
            ),
        SettingsColor: () =>
            import(
                /* webpackChunkName: "components/setting/color" */ './setting/color.vue'
            ),
        SettingsNumber: () =>
            import(
                /* webpackChunkName: "components/setting/number" */ './setting/number.vue'
            ),
        SettingsHotkey: () =>
            import(
                /* webpackChunkName: "components/setting/hotkey" */ './setting/hotkey.vue'
            ),
        Setting: () =>
            import(
                /* webpackChunkName: "components/setting" */ './setting.vue'
            ),
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ './lightbox.vue'
            ),
    },
    data() {
        const settings = cloneDeep(
            this.$store.state.settings.settings
        ) as ModuleSettings;
        Object.entries(settings).forEach(([module, sets]) => {
            settings[module] = Object.fromEntries(
                Object.entries(sets).filter(([, { type }]) => type !== 'hidden')
            );
        });
        return {
            faHistory,
            settings,
            startSettings: cloneDeep(settings),
            modulesSorted: [
                'global',
                ...(this.$store.getters.modulesSorted as string[]).filter(
                    module =>
                        settings.hasOwnProperty(module) &&
                        Object.keys(settings[module]).length
                ),
            ],
            wideGrids: ['appendable-list'],
            settingsBeforeDescription: ['toggle'],
            key: 0,
            changes: false,
            tab: 0,
            exportData: '',
        };
    },
    computed: {
        liveValueMap() {
            return Object.fromEntries(
                Object.entries(this.settings).map(([module, settings]) => [
                    module,
                    Object.fromEntries(
                        Object.entries(settings).map(([setting, { value }]) => [
                            setting,
                            value,
                        ])
                    ),
                ])
            );
        },
        savedValueMap() {
            return Object.fromEntries(
                Object.entries(this.startSettings).map(([module, settings]) => [
                    module,
                    Object.fromEntries(
                        Object.entries(settings).map(([setting, { value }]) => [
                            setting,
                            value,
                        ])
                    ),
                ])
            );
        },
        changeList() {
            if (!this.changes) return {};
            return Object.fromEntries(
                Object.entries(this.savedValueMap)
                    .map(([module, settings]) => [
                        module,
                        Object.fromEntries(
                            Object.entries(settings)
                                .map(([setting, saved]) => [
                                    setting,
                                    {
                                        saved,
                                        current: this.liveValueMap[module][
                                            setting
                                        ],
                                    },
                                ])
                                .filter(
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    ([, { saved, current }]) =>
                                        !isEqual(saved, current)
                                )
                        ),
                    ])
                    .filter(([, settings]) => Object.keys(settings).length)
            );
        },
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
        updateAppendableList(state, moduleId, settingId) {
            (this.settings[moduleId][
                settingId
            ] as AppendableList).value.enabled = state;
            this.update(moduleId, settingId);
        },
        save() {
            return this.$store
                .dispatch('settings/saveSettings', {
                    settings: this.settings,
                })
                .then(() => {
                    this.settings = cloneDeep(
                        this.$store.state.settings.settings
                    );
                    this.startSettings = cloneDeep(this.settings);
                    this.update();
                    this.getExportData();
                });
        },
        discard() {
            this.settings = cloneDeep(this.startSettings);
            this.update();
            this.getExportData();
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
                        title: this.$m('resetWarning.module', {
                            module: this.$t(
                                `modules.${
                                    this.modulesSorted[this.tab]
                                }.name`.replace(
                                    'modules.global',
                                    'globalSettings'
                                )
                            ),
                        }),
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
            if (
                this.settings[moduleId][settingId].noMapkit &&
                this.$store.state.mapkit
            )
                return true;
            let dependence = this.settings[moduleId][settingId].dependsOn;
            const disabledFun = this.settings[moduleId][settingId].disabled;
            if (dependence) {
                const invert = dependence.startsWith('!');
                dependence = dependence.replace(/^!/, '');
                const base = dependence.startsWith('.')
                    ? this.settings[moduleId]
                    : this.settings;
                dependence = dependence.replace(/^\./, '');
                const setting = (dependence.split('/').reduce(
                    (previousValue, currentValue) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        (previousValue || base)[currentValue],
                    base
                ) as unknown) as SettingType;
                if (invert) {
                    return (
                        setting?.isDisabled ||
                        (!!setting?.value ?? !!setting?.default)
                    );
                }
                return (
                    setting?.isDisabled ||
                    (!setting?.value ?? !setting?.default)
                );
            } else if (disabledFun && typeof disabledFun === 'function') {
                return disabledFun(this.settings);
            }
            return false;
        },
        getExportData() {
            this.$store.dispatch('storage/getAllItems').then(storage => {
                this.exportData = `data:application/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify(
                        Object.fromEntries(
                            Object.entries(storage)
                                .filter(
                                    ([key]) =>
                                        key === 'activeModules' ||
                                        key.startsWith('settings_')
                                )
                                .map(([key, value]) => [
                                    key.replace('settings_', ''),
                                    value,
                                ])
                        )
                    )
                )}`;
            });
        },
        importSettings() {
            const { files } = this.$refs.import as HTMLInputElement;
            if (!files || !files.length) return;
            const [file] = files;
            const fileReader = new FileReader();

            fileReader.readAsText(file);

            fileReader.onload = async () => {
                const result = JSON.parse(fileReader.result as string) as {
                    [key: string]:
                        | string[]
                        | {
                              [key: string]: SettingType['value'];
                          };
                };
                if (result.activeModules) {
                    await this.$store.dispatch('storage/set', {
                        key: 'activeModules',
                        value: result.activeModules,
                    });
                }
                const resultEntries = Object.entries(result);
                resultEntries.forEach(([module, value], index) => {
                    if (['activeModules'].includes(module)) return;
                    this.$store
                        .dispatch('storage/set', {
                            key: `settings_${module}`,
                            value: {
                                ...value,
                            },
                        })
                        .then(() => {
                            if (index === resultEntries.length - 1)
                                window.location.reload();
                        });
                });
            };
        },
        $m: (key, args) =>
            (window[PREFIX] as Vue).$t(`modules.settings.${key}`, args),
        getSelectOptions(module, setting, settingId) {
            return setting.values.map((v, vi) => ({
                label: (setting.noLabelTranslation
                    ? v
                    : setting.labels?.[vi] ??
                      this.$t(`modules.${module}.settings.${settingId}.${v}`) ??
                      v) as string,
                value: v,
            }));
        },
    },
    mounted() {
        this.getExportData();
        this.$store.commit('useFontAwesome');
        (window[PREFIX] as Vue).$settings = this;
    },
});
</script>

<style scoped lang="sass">
@import 'src/sass/mixins/autoSizedGrid'

.vue-tablist
    flex-flow: wrap

    .vue-tab[aria-selected="true"]
        border-bottom-color: white !important
.vue-tabpanel
    transition: 0.5s

.auto-sized-grid
    @include auto-sized-grid

#settings-changelist
    display: none
    position: absolute
    background-color: #fff
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
    border-radius: 5px
    padding: 1rem

button:not([disabled]):hover > #settings-changelist
    display: block

body.dark #settings-changelist
    background-color: #505050
</style>
