<template>
    <lightbox name="settings">
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
                :class="{
                    'has-sidebar-open': sidebarIsOpen,
                }"
                :module="moduleId"
            >
                <sidebar
                    v-if="settings[moduleId].sidebar"
                    :title="settings[moduleId].sidebar.title"
                    :class="{ open: sidebars[moduleId] }"
                >
                    <div v-html="settings[moduleId].sidebar.content"></div>
                </sidebar>
                <span
                    class="glyphicon glyphicon-info-sign pull-right toggle-sidebar"
                    @click="toggleSidebar(moduleId, $event)"
                ></span>
                <div class="auto-sized-grid">
                    <setting
                        v-for="(setting, settingId) in settings[moduleId]
                            .settings"
                        :key="settingId"
                        :title="$t(`modules.${moduleId}.settings.${settingId}`)"
                    >
                        <settings-text
                            v-if="setting.type === 'text'"
                            :name="`${moduleId}.${settingId}`"
                            :placeholder="
                                $t(`modules.${moduleId}.settings.${settingId}`)
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
                        <pre v-else>{{ setting }}</pre>
                    </setting>
                </div>
            </tab>
        </tabs>
    </lightbox>
</template>

<script>
import Lightbox from './components/lightbox.vue';
import Setting from './components/setting.vue';
import Sidebar from './components/sidebar.vue';
import SettingsText from './components/setting/text.vue';
import SettingsToggle from './components/setting/toggle.vue';

import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'settings',
    components: { SettingsToggle, SettingsText, Sidebar, Setting, Lightbox },
    data() {
        return {
            settings: cloneDeep(this.$store.state.settings.settings),
            settingsUpdate: cloneDeep(this.$store.state.settings.settings),
            sidebars: {},
            sidebarIsOpen: false,
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
        toggleSidebar(moduleId, event) {
            this.$set(this.sidebars, moduleId, !this.sidebars[moduleId]);
            this.sidebarIsOpen = !this.sidebarIsOpen;
            event.currentTarget.classList.toggle('glyphicon-info-sign');
            event.currentTarget.classList.toggle('glyphicon-remove-sign');
        },
        getValue(moduleId, settingId) {
            return (
                this.settings[moduleId].settings[settingId].value ||
                this.settings[moduleId].settings[settingId].default
            );
        },
        save() {
            this.$store.dispatch('settings/save', {
                settings: this.settingsUpdate,
            });
            this.discard();
            this.$store.commit('settings/settingsReload', true);
        },
        discard() {
            this.settings = cloneDeep(this.$store.state.settings.settings);
            this.settingsUpdate = cloneDeep(
                this.$store.state.settings.settings
            );
            document
                .querySelectorAll(
                    `.${this.$store.getters.nodeId('setting')} input`
                )
                .forEach(input => {
                    let name = input.getAttribute('name').split('.');
                    let value = this.getValue(name[0], name[1]);
                    switch (input.getAttribute('type')) {
                        case 'checkbox':
                            if (input.checked !== value) input.click();
                            break;
                        default:
                            input.value = value;
                    }
                });
            this.$store.commit('settings/settingsState', this.changes);
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
.vue-tabpanel
    transition: 0.5s

    &.has-sidebar-open
        margin-right: 250px

.auto-sized-grid
    display: grid
    grid-gap: 16px
    grid-template-columns: repeat(auto-fit, minmax(150px, 500px))
    list-style: none
    padding-left: 0
    margin-top: 10px
    margin-bottom: 10px

.toggle-sidebar
    cursor: pointer
    transform: scale(1.2)
    padding-right: 1rem
</style>
