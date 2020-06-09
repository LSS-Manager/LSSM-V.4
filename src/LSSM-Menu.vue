<template>
    <li class="dropdown" :id="id">
        <a
            href="#"
            class="dropdown-toggle"
            :id="menuId"
            role="button"
            data-toggle="dropdown"
            :style="`background-color: ${iconBg}`"
        >
            <span v-if="labelInMenu" class="label label-success">
                LSSM V.4
            </span>
            <!--suppress HtmlUnknownTarget -->
            <img
                :src="lssmLogo"
                alt="LSSM V.4"
                title="LSSM V.4"
                class="navbar-icon"
                v-else
            />
            <b class="caret"></b>
        </a>
        <ul class="dropdown-menu" role="menu" :aria-labelledby="menuId">
            <li role="presentation" style="text-align: center;">
                <span class="label label-default">
                    {{ version }} [{{ mode }}]
                </span>
            </li>
            <li role="presentation" class="divider"></li>
            <li role="presentation">
                <a href="#" @click.prevent.stop.self="showAppstore">
                    AppStore
                </a>
            </li>
            <li role="presentation">
                <a href="#" @click.prevent.stop.self="showSettings">
                    {{ this.$t('modules.settings.name') }}
                </a>
            </li>
            <li role="presentation" class="divider"></li>
            <li
                role="presentation"
                v-for="(item, index) in menuItems"
                :key="index"
                v-child="item"
            ></li>
            <li
                role="presentation"
                class="divider"
                :class="{ hidden: !menuItems.length }"
            ></li>
            <li role="presentation">
                <a :href="discord" target="_blank">
                    Discord
                </a>
            </li>
            <li role="presentation">
                <a class="lightbox-open" :href="wiki">
                    Wiki
                </a>
            </li>
            <li role="presentation">
                <a href="#" @click.prevent.stop.self="showLibraries">
                    Open-Source Libraries
                </a>
            </li>
            <li role="presentation" v-if="!labelInMenu">
                <label>
                    Icon
                    <input
                        type="color"
                        v-model="iconBg"
                        @change="storeIconBg"
                    />
                </label>
            </li>
        </ul>
    </li>
</template>

<script lang="ts">
import Vue from 'vue';
import lssmLogo from './img/lssm_logo';
import LibraryOverview from './components/libraryOverview.vue';
import Appstore from './components/appstore.vue';
import Settings from './components/settings.vue';
import { LSSM } from './core';
import { mapState } from 'vuex';
import {
    lssmMenuComputed,
    lssmMenuData,
    lssmMenuMethods,
} from '../typings/LSSM-Menu';
import { DefaultProps } from 'vue/types/options';

const defaultIconBg = '#C9302C';

export default Vue.extend<
    lssmMenuData,
    lssmMenuMethods,
    lssmMenuComputed,
    DefaultProps
>({
    name: 'lssm-menu',
    components: {},
    data() {
        return {
            id: this.$store.getters.nodeAttribute('indicator'),
            menuId: this.$store.getters.nodeAttribute('indicator_menu'),
            iconBg: defaultIconBg,
            labelInMenu: false,
            lssmLogo,
            discord: this.$store.state.discord,
            wiki: this.$store.getters.wiki,
            version: this.$store.state.version,
            mode: this.$store.state.mode,
        };
    },
    computed: {
        ...mapState(['menuItems']),
    },
    directives: {
        child: {
            inserted(el, dir) {
                el.appendChild(dir.value);
            },
        },
    },
    methods: {
        showAppstore() {
            this.$modal.show(
                Appstore,
                {},
                {
                    name: 'appstore',
                    height: '96%',
                    width: '96%',
                },
                {
                    'before-close'(event: { cancel: () => void }) {
                        if (!LSSM.$store.state.appstore.changes) {
                            if (LSSM.$store.state.appstore.reload) {
                                event.cancel();
                                return window.location.reload(true);
                            }
                            return;
                        }
                        event.cancel();
                        LSSM.$modal.show('dialog', {
                            title: LSSM.$t(
                                'modules.appstore.closeWarning.title'
                            ),
                            text: LSSM.$t('modules.appstore.closeWarning.text'),
                            buttons: [
                                {
                                    title: LSSM.$t(
                                        'modules.appstore.closeWarning.close'
                                    ),
                                    default: true,
                                },
                            ],
                        });
                    },
                }
            );
        },
        showSettings() {
            LSSM.$modal.show(
                Settings,
                {},
                {
                    name: 'settings',
                    height: '96%',
                    width: '96%',
                },
                {
                    'before-close'(event: { cancel: () => void }) {
                        // TODO: close settings
                    },
                }
            );
        },
        showLibraries() {
            this.$modal.show(
                LibraryOverview,
                {},
                {
                    name: 'libraryOverview',
                    height: '96%',
                    width: '96%',
                }
            );
        },
        storeIconBg() {
            this.$store.dispatch('storage/set', {
                key: 'iconBG',
                value: this.iconBg,
            });
        },
    },
    beforeMount() {
        this.iconBg = null;
        this.labelInMenu = false;
        this.$store
            .dispatch('storage/get', {
                key: 'iconBG',
                defaultValue: defaultIconBg,
            })
            .then(iconBG => (this.iconBg = iconBG));
        // TODO: Load labelInMenu-Setting
        // this.$store
        //     .dispatch('settings/getSetting', {
        //         moduleId: 'global',
        //         settingId: 'labelInMenu',
        //     })
        //     .then(labelInMenu => (this.labelInMenu = labelInMenu));
    },
});
</script>

<style lang="sass">
#main_navbar
    .navbar-right
        display: flex
        align-items: center

        .navbar-form,
        .navbar-form input
            margin: 0
</style>
<style scoped lang="sass">
#main_navbar .navbar-right #lssmv4-indicator
    #lssmv4-indicator_menu
        padding: 10px

        img
            height: 30.5px !important
            width: unset

    .dropdown-menu label
        padding: 3px 20px
        font-weight: unset
</style>
