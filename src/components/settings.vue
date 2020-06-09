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
                        ></settings-text>
                        <settings-toggle
                            v-else-if="setting.type === 'toggle'"
                            :name="setting.name"
                            v-model="settings[moduleId][settingId].value"
                            @input="update(moduleId, settingId)"
                        ></settings-toggle>
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
        };
    },
    methods: {
        async update(moduleId, settingId) {
            this.changes =
                !isEqual(
                    this.settings[moduleId][settingId].value,
                    this.startSettings[moduleId][settingId].value
                ) ||
                !!Object.entries(this.settings).find(([module, settings]) =>
                    Object.entries(settings).find(
                        ([setting, { value }]) =>
                            !isEqual(
                                value,
                                this.startSettings[module][setting].value
                            )
                    )
                );
        },
        save() {
            // TODO: Save
        },
        discard() {
            // TODO: Discard
        },
        reset() {
            // TODO: Reset
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
    grid-template-columns: repeat(auto-fit, minmax(150px, 500px))
    list-style: none
    padding-left: 0
    margin-top: 10px
    margin-bottom: 10px

.auto-sized-grid.wide
    grid-template-columns: repeat(auto-fit, minmax(150px, 100%))
</style>
