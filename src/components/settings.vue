<template>
    <lightbox name="settings" no-title-hide :key="key">
        <h1>
            {{ $t('modules.settings.name') }}
            <button class="btn btn-success" :disabled="!changes" @click="save">
                {{ $t('modules.settings.save') }}
            </button>
            <button
                class="btn btn-warning"
                :disabled="!changes"
                @click="discard"
            >
                {{ $t('modules.settings.discard') }}
            </button>
            <button class="btn btn-danger" @click="reset">
                {{ $t('modules.settings.reset') }}
            </button>
        </h1>
        <tabs
            :class="$store.getters.nodeId('settings-tabs')"
            v-if="modulesSorted.length > 0"
        >
            <tab
                v-for="moduleId in modulesSorted"
                :title="$t(`modules.${moduleId}.name`)"
                :key="moduleId"
                :module="moduleId"
            >
                <div
                    class="auto-sized-grid"
                    :class="{
                        wide: Object.values(
                            settings[moduleId].settings
                        ).find(setting => wideGrids.includes(setting.type)),
                    }"
                >
                    <setting
                        v-for="(setting, settingId) in settings[moduleId]
                            .settings"
                        :key="settingId"
                        :moduleId="moduleId"
                        :settingId="settingId"
                        :title="
                            $t(
                                `modules.${moduleId}.settings.${settingId}.title`
                            )
                        "
                        :description="
                            $t(
                                `modules.${moduleId}.settings.${settingId}.description`,
                                {
                                    wiki: $store.getters.wiki,
                                }
                            )
                        "
                    >
                        <settings-text
                            v-if="setting.type === 'text'"
                            :name="`${moduleId}.${settingId}`"
                            :placeholder="
                                $t(
                                    `modules.${moduleId}.settings.${settingId}.title`
                                )
                            "
                            :value="getValue(moduleId, settingId)"
                            @change="
                                detectChange(
                                    moduleId,
                                    settingId,
                                    $event.currentTarget.value
                                )
                            "
                        ></settings-text>
                        <settings-toggle
                            v-else-if="setting.type === 'toggle'"
                            :name="`${moduleId}.${settingId}`"
                            :value="getValue(moduleId, settingId)"
                            @change="
                                detectChange(moduleId, settingId, $event.value)
                            "
                        ></settings-toggle>
                        <settings-appendable-list
                            v-else-if="setting.type === 'appendable-list'"
                            :setting="setting"
                            :initialValues="getValue(moduleId, settingId)"
                            @change="
                                values =>
                                    detectChange(moduleId, settingId, values)
                            "
                        >
                            <template #titles>
                                <component
                                    :is="setting.titleComponent"
                                ></component>
                            </template>
                        </settings-appendable-list>
                        <pre v-else>{{ setting }}</pre>
                    </setting>
                </div>
            </tab>
        </tabs>
    </lightbox>
</template>

<script>
import Lightbox from './lightbox.vue';
import Setting from './setting.vue';
import SettingsText from './setting/text.vue';
import SettingsToggle from './setting/toggle.vue';
import SettingsAppendableList from './setting/settings-appendable-list.vue';

import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'settings',
    components: {
        SettingsAppendableList,
        SettingsToggle,
        SettingsText,
        Setting,
        Lightbox,
    },
    data() {
        return {
            settings: cloneDeep(this.$store.state.settings.settings),
            settingsUpdate: cloneDeep(this.$store.state.settings.settings),
            wideGrids: ['appendable-list'],
            key: 0,
            cloneDeep,
        };
    },
    computed: {
        modulesSorted() {
            return this.$store.getters.modulesSorted({
                modules: this.settings,
            });
        },
        changes() {
            let changes = [];
            Object.keys(this.settings).forEach(key => {
                Object.keys(this.settings[key].settings).forEach(setting => {
                    if (
                        'undefined' ===
                        typeof this.settingsUpdate[key].settings[setting].value
                    )
                        return;
                    let stng = this.settings[key].settings[setting];
                    changes.push(
                        ('undefined' === typeof stng.value
                            ? stng.default
                            : stng.value) ===
                            this.settingsUpdate[key].settings[setting].value
                    );
                });
            });
            return !changes.every(x => x);
        },
    },
    methods: {
        getValue(moduleId, settingId) {
            const setting = this.settings[moduleId].settings[settingId];
            return setting.hasOwnProperty('value') &&
                typeof setting.value !== 'undefined'
                ? setting.value
                : setting.default;
        },
        save() {
            this.$store.dispatch('settings/save', {
                settings: this.settingsUpdate,
            });
            this.discard();
            this.$store.commit('settings/settingsReload', true);
        },
        discard() {
            this.key++;
            this.settings = cloneDeep(this.$store.state.settings.settings);
            this.settingsUpdate = cloneDeep(
                this.$store.state.settings.settings
            );
        },
        reset() {
            this.$modal.show('dialog', {
                title: this.$t('modules.settings.resetWarning.title'),
                text: this.$t('modules.settings.resetWarning.text'),
                buttons: [
                    {
                        title: this.$t('modules.settings.resetWarning.close'),
                        default: true,
                    },
                    {
                        title: this.$t('modules.settings.resetWarning.total'),
                        handler: () => {
                            Object.keys(this.settingsUpdate).forEach(module => {
                                Object.keys(
                                    this.settingsUpdate[module].settings
                                ).forEach(setting => {
                                    delete this.settingsUpdate[module].settings[
                                        setting
                                    ].value;
                                });
                            });
                            this.save();
                            this.$modal.hide('dialog');
                        },
                    },
                    {
                        title: this.$t('modules.settings.resetWarning.module'),
                        handler: () => {
                            let module = document
                                .querySelector(
                                    `.${this.$store.getters.nodeId(
                                        'settings-tabs'
                                    )} .vue-tabpanel`
                                )
                                .getAttribute('module');
                            Object.keys(
                                this.settingsUpdate[module].settings
                            ).forEach(setting => {
                                delete this.settingsUpdate[module].settings[
                                    setting
                                ].value;
                            });
                            this.save();
                            this.$modal.hide('dialog');
                        },
                    },
                ],
            });
        },
        detectChange(moduleId, settingId, value) {
            this.$set(
                this.settingsUpdate[moduleId].settings[settingId],
                'value',
                value
            );
            this.$store.commit('settings/settingsState', this.changes);
        },
    },
};
</script>

<style lang="sass">
.vue-tab[aria-selected="true"]
    border-bottom-color: white !important
.vue-tabpanel
    transition: 0.5s

.auto-sized-grid
    display: grid
    grid-gap: 16px
    grid-template-columns: repeat(auto-fit, minmax(150px, 500px))
    list-style: none
    padding-left: 0
    margin-top: 10px
    margin-bottom: 10px

.auto-sized-grid.wide
    grid-template-columns: repeat(auto-fit, minmax(150px, 100%))
</style>
