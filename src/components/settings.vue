<template>
    <div class="lssmv4-settings-modal">
        <lightbox name="settings" no-title-hide :key="key">
            <h1>
                {{ $m('name') }}
                <button
                    class="btn btn-success"
                    :disabled="!changes"
                    @click="save"
                >
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
                        <font-awesome-icon
                            :icon="faHistory"
                        ></font-awesome-icon>
                        <div id="settings-changelist">
                            <div
                                v-for="(changes, module) in changeList"
                                :key="module"
                            >
                                <b>{{
                                    $t(
                                        `modules.${module}.name`.replace(
                                            'modules.global',
                                            'global.settings'
                                        )
                                    )
                                }}</b>
                                <table
                                    class="table table-striped table-condensed"
                                >
                                    <tbody>
                                        <tr
                                            v-for="(
                                                { saved, current }, setting
                                            ) in changes"
                                            :key="setting"
                                        >
                                            <td>
                                                <b>
                                                    {{
                                                        $t(
                                                            `modules.${module}.settings.${setting}.title`.replace(
                                                                'modules.global.settings',
                                                                'global.settings'
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
                <a
                    class="btn btn-info"
                    :class="{ disabled: !exportData }"
                    download="LSSM_V4.lssm"
                    :href="exportData"
                >
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
                :class="rootStore.nodeAttribute('settings-tabs')"
                v-if="modulesSorted.length > 0"
                :default-index="tab"
                :on-select="(_, i) => (this.tab = i)"
            >
                <template v-for="moduleId in modulesSorted" :slot="moduleId">
                    {{
                        $t(
                            `modules.${moduleId}.name`.replace(
                                'modules.global',
                                'global.settings'
                            )
                        )
                    }}
                    <a
                        v-if="
                            moduleId !== 'global' &&
                            moduleId === modulesSorted[tab]
                        "
                        :href="rootStore.moduleWiki(moduleId)"
                        class="pull-right lightbox-open wiki-btn"
                        :key="moduleId"
                    >
                        <small class="glyphicon glyphicon-info-sign"></small>
                    </a>
                </template>
                <tab
                    v-for="moduleId in modulesSorted"
                    :title="
                        $t(
                            `modules.${moduleId}.name`.replace(
                                'modules.global',
                                'global.settings'
                            )
                        )
                    "
                    :title-slot="moduleId"
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
                                        'global.settings'
                                    )
                                )
                            "
                            :description="
                                $t(
                                    `modules.${moduleId}.settings.${settingId}.description`.replace(
                                        'modules.global.settings',
                                        'global.settings'
                                    ),
                                    {
                                        wiki: `${rootStore.wiki}/`,
                                        fontAwesomeIconSearch:
                                            rootStore.fontAwesomeIconSearch,
                                    }
                                )
                            "
                            :beforeDescription="
                                settingsBeforeDescription.includes(setting.type)
                            "
                            :isDisabled="
                                (setting.isDisabled = disabled(
                                    moduleId,
                                    settingId
                                ))
                            "
                            :disabled="setting.isDisabled"
                            :hidden="setting.type === 'hidden'"
                            :appendableListDisableable="
                                !!settings[moduleId][settingId].disableable
                            "
                            :appendableListEnabled="
                                setting.type === 'appendable-list'
                                    ? settings[moduleId][settingId].value
                                          .enabled
                                    : false
                            "
                            :setting-type="setting.type"
                            @toggleEnabled="
                                updateAppendableList(
                                    $event,
                                    moduleId,
                                    settingId
                                )
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
                                :float="setting.float"
                                @input="update(moduleId, settingId)"
                                :disabled="setting.isDisabled"
                            ></settings-number>
                            <settings-slider
                                v-else-if="setting.type === 'slider'"
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
                                :unit="setting.unit"
                                @input="update(moduleId, settingId)"
                                :disabled="setting.isDisabled"
                            ></settings-slider>
                            <settings-select
                                v-else-if="setting.type === 'select'"
                                :name="setting.name"
                                v-model="settings[moduleId][settingId].value"
                                :options="
                                    getSelectOptions(
                                        moduleId,
                                        setting,
                                        settingId
                                    )
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
                                    getSelectOptions(
                                        moduleId,
                                        setting,
                                        settingId
                                    )
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
                            <settings-location
                                v-else-if="setting.type === 'location'"
                                :name="setting.name"
                                :placeholder="
                                    $t(
                                        `modules.${moduleId}.settings.${settingId}.title`
                                    )
                                "
                                v-model="settings[moduleId][settingId].value"
                                :zoom="setting.zoom"
                                @input="update(moduleId, settingId)"
                                :disabled="setting.isDisabled"
                            ></settings-location>
                            <settings-appendable-list
                                v-else-if="setting.type === 'appendable-list'"
                                :setting="setting"
                                v-model="
                                    settings[moduleId][settingId].value.value
                                "
                                @input="update(moduleId, settingId)"
                                :module-id="moduleId"
                                :setting-id="settingId"
                                :orderable="!!setting.orderable"
                                :enabled="
                                    settings[moduleId][settingId].value.enabled
                                "
                            ></settings-appendable-list>
                            <component
                                v-else-if="setting.type === 'custom'"
                                :is="setting.component"
                                v-model="settings[moduleId][settingId].value"
                                :module="settings[moduleId]"
                                @update="update(moduleId, settingId)"
                                :disabled="setting.isDisabled"
                            ></component>
                            <pre v-else>{{ setting }}</pre>
                        </setting>
                    </div>
                </tab>
            </tabs>
        </lightbox>

        <small>
            <a
                :href="rootStore.donationUrl"
                target="_blank"
                class="btn btn-xs btn-link"
            >
                {{ $m('donate') }}
            </a>
        </small>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import cloneDeep from 'lodash/cloneDeep';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import isEqual from 'lodash/isEqual';
import { useAPIStore } from '@stores/api';
import { useModulesStore } from '@stores/modules';
import { useRootStore } from '@stores/index';
import { useSettingsStore } from '@stores/settings';
import { useStorageStore } from '@stores/storage';

import loadingIndicatorStorageKey from '../../build/plugins/LoadingProgressPluginStorageKey';

import type { DefaultProps } from 'vue/types/options';
import type {
    AppendableList,
    ModuleSettings,
    Setting as SettingType,
} from '../../typings/Setting';
import type {
    SettingsComputed,
    SettingsData,
    SettingsMethods,
} from 'typings/components/Settings';

export default Vue.extend<
    SettingsData,
    SettingsMethods,
    SettingsComputed,
    DefaultProps
>({
    name: 'lssmv4-settings',
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
        SettingsSlider: () =>
            import(
                /* webpackChunkName: "components/setting/slider" */ './setting/slider.vue'
            ),
        SettingsHotkey: () =>
            import(
                /* webpackChunkName: "components/setting/hotkey" */ './setting/hotkey.vue'
            ),
        SettingsLocation: () =>
            import(
                /* webpackChunkName: "components/setting/location" */ './setting/location.vue'
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
        const settingsStore = useSettingsStore();
        const settings = cloneDeep(settingsStore.settings) as ModuleSettings;
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
                ...useModulesStore()
                    .appModuleIds.filter(
                        module =>
                            settings.hasOwnProperty(module) &&
                            Object.keys(settings[module]).length
                    )
                    .sort((a, b) =>
                        this.$t(`modules.${a}.name`)
                            .toString()
                            .localeCompare(
                                this.$t(`modules.${b}.name`).toString()
                            )
                    ),
            ],
            wideGrids: ['appendable-list'],
            settingsBeforeDescription: ['toggle'],
            key: 0,
            changes: false,
            tab: 0,
            exportData: '',
            storageStore: useStorageStore(),
            settingsStore,
            rootStore: useRootStore(),
            branches: {},
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
                                        current:
                                            this.liveValueMap[module][setting],
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
        branchSelection() {
            const branches = {
                values: ['stable', 'beta'],
                labels: [
                    `stable (${this.branches.stable?.version})`,
                    `beta (${this.branches.beta?.version})`,
                ],
            } as Record<'labels' | 'values', string[]>;

            Object.entries(this.branches)
                .filter(([branch]) => !['beta', 'stable'].includes(branch))
                .sort(
                    ([, { version: versionA }], [, { version: versionB }]) =>
                        versionB.localeCompare(versionA) // sort descending
                )
                .forEach(([branch, branchData]) => {
                    branches.values.push(branch);
                    let label = `${branch} (${branchData.version})`;
                    if ('delete' in branchData) {
                        if (branchData.label)
                            label += `<br>&nbsp;&nbsp${branchData.label}`;
                        label += `<br>&nbsp;&nbsp;[🗑️ ${branchData.delete.date.replace(
                            /\.0+$/u,
                            ''
                        )} ${branchData.delete.timezone}]`;
                    }
                    branches.labels.push(label);
                });

            return branches;
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
                Object.entries(this.settings).some(([module, settings]) =>
                    Object.entries(settings).find(
                        ([setting, { value }]) =>
                            !isEqual(
                                value,
                                this.startSettings[module][setting].value
                            )
                    )
                );
            this.settingsStore.setChangesStatus(this.changes);
        },
        updateAppendableList(state, moduleId, settingId) {
            (
                this.settings[moduleId][settingId] as AppendableList
            ).value.enabled = state;
            this.update(moduleId, settingId);
        },
        async save() {
            for (const [moduleId, settings] of Object.entries(
                this.changeList
            )) {
                for (const [settingId, { current }] of Object.entries(
                    settings
                )) {
                    await this.settingsStore.setSetting({
                        moduleId,
                        settingId,
                        value: current,
                    });
                }
            }
            await this.settingsStore.saveSettings(this.settings);
            this.settings = cloneDeep(this.settingsStore.settings);
            this.startSettings = cloneDeep(this.settings);
            this.update();
            this.getExportData();

            localStorage.setItem(
                loadingIndicatorStorageKey,
                (
                    this.settings.global.loadingIndicator.value as boolean
                ).toString()
            );
            localStorage.setItem(
                `${PREFIX}_branch`,
                this.settings.global.branch.value as string
            );
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
                        handler: () => {
                            this.$modal.hide('dialog');
                        },
                    },
                    {
                        title: this.$m('resetWarning.total'),
                        handler: () => {
                            Object.values(this.settings).forEach(module =>
                                Object.values(module).forEach(setting =>
                                    this.$set(
                                        setting,
                                        'value',
                                        setting.type === 'appendable-list'
                                            ? {
                                                  value: setting.default,
                                                  enabled: !setting.disableable,
                                              }
                                            : setting.default
                                    )
                                )
                            );
                            this.update();
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
                                    'global.settings'
                                )
                            ),
                        }),
                        handler: () => {
                            Object.values(
                                this.settings[this.modulesSorted[this.tab]]
                            ).forEach(setting =>
                                this.$set(
                                    setting,
                                    'value',
                                    setting.type === 'appendable-list'
                                        ? {
                                              value: setting.default,
                                              enabled: !setting.disableable,
                                          }
                                        : setting.default
                                )
                            );
                            this.update();
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
                (this.settings[moduleId][settingId].noMapkit ?? false) &&
                this.rootStore.mapkit
            )
                return true;
            let dependence = this.settings[moduleId][settingId].dependsOn;
            const disabledFun = this.settings[moduleId][settingId].disabled;
            if (dependence) {
                const invert = dependence.startsWith('!');
                dependence = dependence.replace(/^!/u, '');
                const base = dependence.startsWith('.')
                    ? this.settings[moduleId]
                    : this.settings;
                dependence = dependence.replace(/^\./u, '');
                const setting = dependence.split('/').reduce(
                    (previousValue, currentValue) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        (previousValue || base)[currentValue],
                    base
                ) as unknown as SettingType;
                if (invert) {
                    return (
                        setting?.isDisabled ||
                        !!(setting?.value ?? setting?.default)
                    );
                }
                return (
                    setting?.isDisabled || !(setting?.value ?? setting?.default)
                );
            } else if (disabledFun && typeof disabledFun === 'function') {
                return disabledFun(this.settings);
            }
            return false;
        },
        getExportData() {
            this.storageStore.getAllItems().then(storage => {
                this.exportData = `data:application/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify({
                        safeFileVersion: 1,
                        ...Object.fromEntries(
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
                        ),
                    })
                )}`;
            });
        },
        importSettings() {
            const { files } = this.$refs.import as HTMLInputElement;
            if (!files || !files.length) return;
            const [file] = files;
            const fileReader = new FileReader();

            fileReader.readAsText(file);

            fileReader.addEventListener('load', async () => {
                const result = JSON.parse(
                    fileReader.result as string
                ) as Record<
                    string,
                    Record<string, SettingType['value']> | string[]
                >;
                if (
                    result.activeModules &&
                    Array.isArray(result.activeModules)
                ) {
                    await this.storageStore.set({
                        key: 'activeModules',
                        value: result.activeModules,
                    });
                }
                const resultEntries = Object.entries(result);
                resultEntries.forEach(([module, value], index) => {
                    if (['activeModules', 'safeFileVersion'].includes(module))
                        return;
                    this.storageStore
                        .set({
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
            });
        },
        $m: (key, args) =>
            (window[PREFIX] as Vue).$t(`modules.settings.${key}`, args),
        getSelectOptions(module, setting, settingId) {
            if (module === 'global' && settingId === 'branch') {
                setting.values = this.branchSelection.values;
                setting.labels = this.branchSelection.labels;
            }
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
        (window[PREFIX] as Vue).$settings = this;

        useAPIStore()
            .request({
                url: this.rootStore.lssmUrl('/branches.json'),
                feature: 'settings',
            })
            .then(res => res.json() as Promise<SettingsData['branches']>)
            .then(branches => (this.branches = branches));
    },
});
</script>

<style scoped lang="sass">
@import 'src/sass/mixins/autoSizedGrid'

.vue-tabpanel
    transition: 0.5s

.auto-sized-grid
    @include auto-sized-grid

.lssmv4-settings-modal
    min-height: 100%
    display: flex
    flex-flow: column
    justify-content: space-between

    body.dark &
        :deep(a:not(.btn)),
        :deep(a.btn.btn-link)
            color: #6dd5f4

    .wiki-btn
        margin-left: 5px

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

body:not(.dark) #settings-changelist
    color: black
</style>
