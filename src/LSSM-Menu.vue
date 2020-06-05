<template>
    <li class="dropdown" :id="id">
        <a
            href="#"
            class="dropdown-toggle"
            :id="this.menuId"
            role="button"
            data-toggle="dropdown"
            :style="`background-color: ${this.iconBg}`"
        >
            <span v-if="this.labelInMenu" class="label label-success">
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
        <ul class="dropdown-menu" role="menu" :aria-labelledby="this.menuId">
            <li role="presentation" style="text-align: center;">
                <span class="label label-default">
                    {{ this.version }} [{{ this.mode }}]
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
                class="divider"
                :id="$store.getters.nodeAttribute('indicator_menu-modules')"
                style="display: none;"
            ></li>
            <li role="presentation">
                <a :href="this.discord" target="_blank">
                    Discord
                </a>
            </li>
            <li role="presentation">
                <a class="lightbox-open" :href="this.wiki">
                    Wiki
                </a>
            </li>
            <li role="presentation">
                <a href="#" @click.prevent.stop.self="this.showLibraries">
                    Open-Source Libraries
                </a>
            </li>
            <li role="presentation" v-if="!this.labelInMenu">
                <label>
                    Icon
                    <input
                        type="color"
                        v-model="this.iconBg"
                        @change="this.storeIconBg"
                    />
                </label>
            </li>
        </ul>
    </li>
</template>

<script lang="ts">
import Vue from 'vue';
import lssmLogo from './img/lssm_logo';
import { lssmMenuData, lssmMenuMethods } from '../typings/LSSM-Menu';

export default Vue.extend({
    name: 'lssm-menu',
    components: {},
    data() {
        return {
            id: this.$store.getters.nodeAttribute('indicator'),
            menuId: this.$store.getters.nodeAttribute('indicator_menu'),
            iconBg: null,
            labelInMenu: false,
            lssmLogo,
            discord: this.$store.state.discord,
            wiki: this.$store.getters.wiki,
            version: this.$store.state.version,
            mode: this.$store.state.mode,
        } as lssmMenuData;
    },
    methods: {
        showAppstore() {
            // TODO: Open Appstore
        },
        showSettings() {
            // TODO: Open Settings
        },
        showLibraries() {
            // TODO: Open Libraries
        },
        storeIconBg() {
            // TODO: Save Icon Bg
        },
    } as lssmMenuMethods,
    mounted() {
        this.iconBg = null;
        this.labelInMenu = false;
        // this.$store
        //     .dispatch('storage/get', { key: 'iconBG', defaultValue: '#C9302C' })
        //     .then(value => (this.iconBg = value));
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
