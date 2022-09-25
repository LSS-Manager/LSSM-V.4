<template>
    <li class="dropdown" :id="id">
        <a
            href="#"
            class="dropdown-toggle"
            :id="menuId"
            role="button"
            data-toggle="dropdown"
            :style="`background-color: ${
                iconBgAsNavBg ? 'transparent' : iconBg
            }`"
        >
            <span v-if="labelInMenu" class="label label-success">
                LSSM V.4
            </span>
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
            <li
                role="presentation"
                style="text-align: center"
                :id="versionWrapperId"
            >
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
                <a :href="rootStore.discordUrl" target="_blank">Discord</a>
            </li>
            <li role="presentation">
                <a class="lightbox-open" :href="rootStore.wiki">Wiki</a>
            </li>
            <li role="presentation">
                <a :href="rootStore.githubUrl" target="_blank">GitHub</a>
            </li>
            <li role="presentation">
                <a href="https://status.lss-manager.de/">
                    LSSM-Server Status
                </a>
            </li>
            <li role="presentation">
                <a href="#" @click.prevent.stop.self="showLibraries">
                    Open-Source Libraries
                </a>
            </li>
            <li role="presentation">
                <label>
                    <button
                        @click="resetIconBg"
                        class="pull-right btn btn-xs btn-default"
                    >
                        Reset
                    </button>
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

import { mapState } from 'pinia';
import svgToMiniDataURI from 'mini-svg-data-uri';
import { useModulesStore } from '@stores/modules';
import { useSettingsStore } from '@stores/settings';
import { defineRootStore, useRootStore } from '@stores/index';

import type { DefaultProps } from 'vue/types/options';
import type {
    lssmMenuComputed,
    lssmMenuData,
    lssmMenuMethods,
} from 'typings/LSSM-Menu';

const draw = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const c = canvas.getContext('2d');
    if (!c) return c;
    canvas.width = img.width;
    canvas.height = img.height;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(img, 0, 0);
    return c;
};

const rgbToHex = (r: number, g: number, b: number): string =>
    ((r << 16) | (g << 8) | b).toString(16);

const getColors = (c: CanvasRenderingContext2D) => {
    const colors: Record<string, number> = {};
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0;
    const pixels = c.getImageData(0, 0, c.canvas.width, c.canvas.height);
    for (let i = 0, data = pixels.data; i < data.length; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3]; // alpha
        // skip pixels >50% transparent
        if (a < 255 / 2) continue;
        const col = rgbToHex(r, g, b);
        if (!colors.hasOwnProperty(col)) colors[col] = 0;
        colors[col]++;
    }
    return colors;
};

const rgbToHsl = (
    r: number,
    g: number,
    b: number
): [number, number, number] => {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    let h = 0;
    let s: number;
    const l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case red:
                h = (green - blue) / d + (green < blue ? 6 : 0);
                break;
            case green:
                h = (blue - red) / d + 2;
                break;
            case blue:
                h = (red - green) / d + 4;
                break;
        }
        h /= 6;
    }

    return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
};

export default Vue.extend<
    lssmMenuData,
    lssmMenuMethods,
    lssmMenuComputed,
    DefaultProps
>({
    name: 'lssm-menu',
    components: {},
    data() {
        const rootStore = useRootStore();
        return {
            id: rootStore.nodeAttribute('indicator', true),
            menuId: rootStore.nodeAttribute('indicator_menu', true),
            iconBg: rootStore.isPoliceChief ? '#004997' : '#C9302C',
            iconBgAsNavBg: false,
            labelInMenu: false,
            lssmLogo: rootStore.lssmLogoUrl,
            navbg: {
                svg: document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'svg'
                ),
                hsl: [0, 0, 0],
                navbar: null,
                aborted: false,
            },
            versionWrapperId: rootStore.nodeAttribute(
                'menu_version-wrapper',
                true
            ),
            settingsStore: useSettingsStore(),
            rootStore: useRootStore(),
            umzugDate: new Date('2022-09-15T12:00:00.000Z'),
        };
    },
    computed: {
        ...mapState(defineRootStore, ['menuItems']),
        mode() {
            return MODE;
        },
        version() {
            return VERSION;
        },
        localUmzugTimeString() {
            return new Intl.DateTimeFormat(navigator.language, {
                dateStyle: 'medium',
                timeStyle: 'short',
            }).format(this.umzugDate);
        },
    },
    directives: {
        child: {
            inserted(el, dir) {
                el.append(dir.value);
            },
        },
    },
    methods: {
        showAppstore() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
            const closeWarningText = this.$t(
                'modules.appstore.closeWarning.text'
            ).toString();
            const modulesStore = useModulesStore();
            const unloadListener = (event: BeforeUnloadEvent) => {
                if (!modulesStore.appstore.changes) return;
                event.preventDefault();
                event.returnValue = closeWarningText;
                return closeWarningText;
            };
            window.addEventListener('beforeunload', unloadListener);
            this.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "components/appstore" */ './components/appstore.vue'
                    ),
                {},
                {
                    name: 'appstore',
                    height: '96%',
                    width: '96%',
                },
                {
                    'before-close': function (event: { cancel(): void }) {
                        if (!modulesStore.appstore.changes) {
                            if (modulesStore.appstore.reload) {
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
                            text: closeWarningText,
                            buttons: [
                                {
                                    title: LSSM.$t(
                                        'modules.appstore.closeWarning.saveAndExit'
                                    ),
                                    handler() {
                                        (
                                            window[PREFIX] as Vue
                                        ).$appstore.save();
                                        window.removeEventListener(
                                            'beforeunload',
                                            unloadListener
                                        );
                                        LSSM.$modal.hide('appstore');
                                    },
                                },
                                {
                                    title: LSSM.$t(
                                        'modules.appstore.closeWarning.exit'
                                    ),
                                    handler() {
                                        (
                                            window[PREFIX] as Vue
                                        ).$appstore.reset();
                                        window.removeEventListener(
                                            'beforeunload',
                                            unloadListener
                                        );
                                        LSSM.$modal.hide('appstore');
                                        LSSM.$modal.hide('dialog');
                                    },
                                },
                                {
                                    title: LSSM.$t(
                                        'modules.appstore.closeWarning.abort'
                                    ),
                                    default: true,
                                    handler() {
                                        LSSM.$modal.hide('dialog');
                                    },
                                },
                            ],
                        });
                    },
                }
            );
        },
        showSettings() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
            const closeWarningText = this.$t(
                'modules.settings.closeWarning.text'
            ).toString();
            const unloadListener = (event: BeforeUnloadEvent) => {
                if (!this.settingsStore.changes) return;
                event.preventDefault();
                event.returnValue = closeWarningText;
                return closeWarningText;
            };
            window.addEventListener('beforeunload', unloadListener);
            LSSM.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "components/settings" */ './components/settings.vue'
                    ),
                {},
                {
                    name: 'settings',
                    height: '96%',
                    width: '96%',
                },
                {
                    'before-close': (event: { cancel(): void }) => {
                        if (!this.settingsStore.changes) {
                            if (this.settingsStore.reload) {
                                event.cancel();
                                return window.location.reload(true);
                            }
                            return;
                        }
                        event.cancel();
                        LSSM.$modal.show('dialog', {
                            title: LSSM.$t(
                                'modules.settings.closeWarning.title'
                            ),
                            text: closeWarningText,
                            buttons: [
                                {
                                    title: LSSM.$t(
                                        'modules.settings.closeWarning.saveAndExit'
                                    ),
                                    handler() {
                                        (window[PREFIX] as Vue).$settings
                                            .save()
                                            .then(() => {
                                                window.removeEventListener(
                                                    'beforeunload',
                                                    unloadListener
                                                );
                                                LSSM.$modal.hide('settings');
                                            });
                                    },
                                },
                                {
                                    title: LSSM.$t(
                                        'modules.settings.closeWarning.exit'
                                    ),
                                    handler() {
                                        (
                                            window[PREFIX] as Vue
                                        ).$settings.discard();
                                        window.removeEventListener(
                                            'beforeunload',
                                            unloadListener
                                        );
                                        LSSM.$modal.hide('dialog');
                                        LSSM.$modal.hide('settings');
                                    },
                                },
                                {
                                    title: LSSM.$t(
                                        'modules.settings.closeWarning.abort'
                                    ),
                                    default: true,
                                    handler() {
                                        LSSM.$modal.hide('dialog');
                                    },
                                },
                            ],
                        });
                    },
                }
            );
        },
        showLibraries() {
            this.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "components/libraryOverview" */ './components/libraryOverview.vue'
                    ),
                {},
                {
                    name: 'libraryOverview',
                    height: '96%',
                    width: '96%',
                }
            );
        },
        storeIconBg() {
            if (this.iconBgAsNavBg) {
                this.rootStore.addStyle({
                    selectorText:
                        '.navbar-default, .navbar-default .dropdown-menu',
                    style: {
                        'background-color': `${this.iconBg} !important`,
                    },
                });
                this.setNavbarBG(
                    this.iconBg?.toString() ??
                        (this.rootStore.isPoliceChief ? '#004997' : '#C9302C')
                );
            }
            this.settingsStore.setSetting({
                moduleId: 'global',
                settingId: 'iconBg',
                value: this.iconBg,
            });
        },
        setNavbarBG(color) {
            if (this.navbg.aborted) return;
            const navr = parseInt(color.slice(1, 3), 16);
            const navg = parseInt(color.slice(3, 5), 16);
            const navb = parseInt(color.slice(5, 7), 16);
            const target = rgbToHsl(navr, navg, navb);
            const hue = target[0] - this.navbg.hsl[0];
            const sat = 100 + (target[1] - this.navbg.hsl[1]);
            const lig = 100 + (target[2] - this.navbg.hsl[2]);

            this.navbg.svg.style.setProperty(
                'filter',
                `hue-rotate(${hue}deg) saturate(${sat}%) brightness(${lig}%)`
            );
            const dataURL = svgToMiniDataURI(this.navbg.svg.outerHTML);
            this.navbg.navbar?.style.setProperty(
                'background-image',
                `url("${dataURL}")`
            );
        },
        resetIconBg() {
            this.iconBg = this.rootStore.isPoliceChief ? '#004997' : '#C9302C';
            this.storeIconBg();
        },
    },
    beforeMount() {
        this.iconBg = null;
        this.labelInMenu = false;
        this.settingsStore
            .getModule<{
                labelInMenu: boolean;
                iconBgAsNavBg: boolean;
                iconBg: string;
            }>('global')
            .then(({ labelInMenu, iconBg, iconBgAsNavBg }) => {
                this.labelInMenu = labelInMenu;
                this.iconBg = iconBg;
                this.iconBgAsNavBg = iconBgAsNavBg;

                if (iconBgAsNavBg) {
                    this.navbg.navbar =
                        document.querySelector<HTMLElement>('#main_navbar');
                    const bgImg = this.navbg.navbar
                        ? window.getComputedStyle(this.navbg.navbar)
                              .backgroundImage
                        : false;
                    if (!this.navbg.navbar || !bgImg || bgImg === 'none')
                        return;

                    const img = new Image(4000, 120);
                    img.addEventListener('load', () => {
                        const context = draw(img);
                        if (!context) return;
                        const colors = getColors(context);
                        const mainColor = Object.entries(colors).sort(
                            ([, a], [, b]) => (a < b ? 1 : a > b ? -1 : 0)
                        )?.[0]?.[0];
                        if (!mainColor) return (this.navbg.aborted = true);
                        const r = parseInt(mainColor.slice(0, 2), 16);
                        const g = parseInt(mainColor.slice(2, 4), 16);
                        const b = parseInt(mainColor.slice(4, 6), 16);
                        this.navbg.hsl = rgbToHsl(r, g, b);

                        const width = `${4000 / (120 / 50)}px`;
                        const height = `50px`;
                        this.navbg.svg.setAttribute(
                            'xmlns',
                            'http://www.w3.org/2000/svg'
                        );
                        this.navbg.svg.setAttribute('height', height);
                        this.navbg.svg.setAttribute('width', width);
                        const image = document.createElementNS(
                            'http://www.w3.org/2000/svg',
                            'image'
                        );
                        image.setAttribute('height', height);
                        image.setAttribute('width', width);
                        image.setAttribute('href', context.canvas.toDataURL());
                        this.navbg.svg.append(image);
                        this.setNavbarBG(iconBg);
                    });
                    img.src = bgImg.replace(/^url\("|"\)$/gu, '');
                }
            });
    },
    mounted() {
        this.settingsStore
            .getSetting({
                moduleId: 'global',
                settingId: 'v3MenuAsSubmenu',
                defaultValue: false,
            })
            .then(v3MenuAsSubmenu => {
                if (!v3MenuAsSubmenu) return;

                const v3Dropdown =
                    document.querySelector<HTMLLIElement>('#lssm_dropdown');
                const versionWrapper = this.$el.querySelector<HTMLLIElement>(
                    `#${this.versionWrapperId}`
                );
                if (!v3Dropdown || !versionWrapper) return;

                const divider = document.createElement('li');
                divider.classList.add('divider');
                divider.setAttribute('role', 'presentation');

                versionWrapper.after(divider, v3Dropdown);

                const v3MenuSwitch =
                    v3Dropdown.querySelector<HTMLAnchorElement>(
                        '#lssm_menu_switch'
                    );
                if (v3MenuSwitch) {
                    v3MenuSwitch.querySelector('b.caret')?.remove();
                    const v3Label = v3MenuSwitch.querySelector(
                        '.label.label-success'
                    );
                    if (v3Label) v3Label.textContent = 'LSS-Manager V.3';
                    const submenuIcon = document.createElement('i');
                    submenuIcon.classList.add('fas', 'fa-angle-double-left');
                    submenuIcon.style.setProperty('margin-right', '1rem');
                    v3MenuSwitch.prepend(submenuIcon);
                }
                const v3Menu =
                    v3Dropdown.querySelector<HTMLUListElement>('#lssm_menu');
                if (!v3Menu) return;
                v3Menu.classList.add(
                    'dropdown-submenu',
                    'dropdown-submenu-left'
                );
            });
    },
});
</script>

<style lang="sass">
@media (min-width: 768px)
    #main_navbar
        .navbar-right
            display: flex
            align-items: center

            .navbar-form,
            .navbar-form input
                margin: 0
@media (max-width: 768px)
    #main_navbar #map_adress_search_form
        margin-right: 0
</style>

<style scoped lang="sass">
#main_navbar .navbar-right #lssmv4-indicator
    #lssmv4-indicator_menu
        padding: 10px

        img
            height: 30px !important
            width: unset

    .dropdown-menu[aria-labelledby="lssmv4-indicator_menu"]
        label
            padding: 3px 20px
            font-weight: unset

        a:focus
            background-color: rgba(0, 0, 0, 0.3)
            outline: none

        :deep(li)
            position: relative

            .dropdown-submenu
                display: none
                position: absolute
                left: 100%
                top: -7px

                &.dropdown-submenu-left
                    right: 100%
                    left: auto

            &:hover > .dropdown-submenu
                display: block
</style>
