<template>
    <li class="dropdown" :id="id">
        <a
            href="#"
            class="dropdown-toggle"
            :id="menuId"
            role="button"
            data-toggle="dropdown"
        >
            <span class="label label-success">LSSM V.4</span>
            <span
                class="badge"
                :class="{
                    lssm_notice_bg: !!$store.getters.badge,
                    highlight: !!$store.getters.badge,
                }"
            >
                {{ $store.getters.badge }}
            </span>
            <b class="caret"></b>
        </a>
        <ul class="dropdown-menu" role="menu" :aria-labelledby="menuId">
            <li role="presentation" style="text-align: center;">
                <span class="label label-default">{{ version }}</span>
            </li>
            <li role="presentation" class="divider"></li>
            <li role="presentation">
                <a href="#" @click.prevent.stop.self="showAppstore">
                    AppStore
                </a>
            </li>
            <li role="presentation">
                <a href="#" @click.prevent.stop.self="showSettings">
                    {{ $t('modules.settings.name') }}
                </a>
            </li>
            <li role="presentation" class="divider"></li>
            <li
                role="presentation"
                class="divider"
                :id="$store.getters.nodeId('indicator_menu-modules')"
                style="display: none;"
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
            <li role="presentation">
                <a href="#" @click.prevent.stop.self="createExternalLSSM">
                    Beta-Test: externalWindowLSSM
                </a>
            </li>
        </ul>
    </li>
</template>

<script>
import Appstore from './components/appstore.vue';
import Settings from './components/settings.vue';
import LibraryOverview from './components/libraryOverview.vue';

export default {
    name: 'main-window',
    data() {
        return {
            id: this.$store.getters.nodeId('indicator'),
            menuId: this.$store.getters.nodeId('indicator_menu'),
            version: this.$store.state.version,
            discord: this.$store.state.discord,
            wiki: this.$store.getters.wiki,
        };
    },
    methods: {
        showAppstore() {
            const vm = this;
            this.$modal.show(
                Appstore,
                {},
                {
                    name: 'appstore',
                    height: '96%',
                    width: '96%',
                },
                {
                    'before-close'(event) {
                        if (!vm.$store.state.appstoreUpdate) {
                            if (vm.$store.state.appstoreReload) {
                                event.stop();
                                return window.location.reload(true);
                            }
                            return;
                        }
                        event.stop();
                        vm.$modal.show('dialog', {
                            title: vm.$t('modules.appstore.closeWarning.title'),
                            text: vm.$t('modules.appstore.closeWarning.text'),
                            buttons: [
                                {
                                    title: vm.$t(
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
            const vm = this;
            this.$modal.show(
                Settings,
                {},
                {
                    name: 'settings',
                    height: '96%',
                    width: '96%',
                },
                {
                    'before-close'(event) {
                        if (!vm.$store.state.settings.settingsUpdated) {
                            if (vm.$store.state.settings.settingsReload) {
                                event.stop();
                                return window.location.reload(true);
                            }
                            return;
                        }
                        event.stop();
                        vm.$modal.show('dialog', {
                            title: vm.$t('modules.settings.closeWarning.title'),
                            text: vm.$t('modules.settings.closeWarning.text'),
                            buttons: [
                                {
                                    title: vm.$t(
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
        createExternalLSSM() {
            this.$store.dispatch('external/getExternalLSSM', {});
        },
    },
};
</script>

<style lang="sass">
.vue-tablist
    list-style: none
    display: flex
    padding-left: 0
    border-bottom: 1px solid #e2e2e2


    .vue-tab
        padding: 5px 10px
        cursor: pointer
        user-select: none
        border: 1px solid transparent
        border-bottom-color: #e2e2e2
        border-radius: 3px 3px 0 0
        position: relative
        bottom: -1px
        font-weight: bold
        font-size: 120%


        &[aria-selected='true']
            border-color: #e2e2e2
            border-bottom-color: transparent


        &[aria-disabled='true']
            cursor: not-allowed
            color: #999
</style>
