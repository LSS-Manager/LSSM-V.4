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
                <a class="lightbox-open" href="https://status.lss-manager.de/">
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

import { mapState } from 'vuex';
import svgToMiniDataURI from 'mini-svg-data-uri';

import LibraryOverview from './components/libraryOverview.vue';
import lssmLogo from './img/lssm_logo';

import { DefaultProps } from 'vue/types/options';
import {
    lssmMenuComputed,
    lssmMenuData,
    lssmMenuMethods,
} from '../typings/LSSM-Menu';

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
        return {
            id: this.$store.getters.nodeAttribute('indicator', true),
            menuId: this.$store.getters.nodeAttribute('indicator_menu', true),
            iconBg: this.$store.state.policechief ? '#004997' : '#C9302C',
            iconBgAsNavBg: false,
            labelInMenu: false,
            lssmLogo,
            discord: this.$store.state.discord,
            wiki: this.$store.getters.wiki,
            version: this.$store.state.version,
            mode: this.$store.state.mode,
            navbg: {
                svg: document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'svg'
                ),
                hsl: [0, 0, 0],
                navbar: null,
                aborted: false,
            },
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
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
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
                    'before-close': function(event: { cancel: () => void }) {
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
                                        'modules.appstore.closeWarning.saveAndExit'
                                    ),
                                    handler() {
                                        (window[
                                            PREFIX
                                        ] as Vue).$appstore.save();
                                        LSSM.$modal.hide('appstore');
                                    },
                                },
                                {
                                    title: LSSM.$t(
                                        'modules.appstore.closeWarning.exit'
                                    ),
                                    handler() {
                                        (window[
                                            PREFIX
                                        ] as Vue).$appstore.reset();
                                        LSSM.$modal.hide('appstore');
                                        LSSM.$modal.hide('dialog');
                                    },
                                },
                                {
                                    title: LSSM.$t(
                                        'modules.appstore.closeWarning.abort'
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
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
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
                    'before-close': function(event: { cancel: () => void }) {
                        if (!LSSM.$store.state.settings.changes) {
                            if (LSSM.$store.state.settings.reload) {
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
                            text: LSSM.$t('modules.settings.closeWarning.text'),
                            buttons: [
                                {
                                    title: LSSM.$t(
                                        'modules.settings.closeWarning.saveAndExit'
                                    ),
                                    handler() {
                                        (window[PREFIX] as Vue).$settings
                                            .save()
                                            .then(() =>
                                                LSSM.$modal.hide('settings')
                                            );
                                    },
                                },
                                {
                                    title: LSSM.$t(
                                        'modules.settings.closeWarning.exit'
                                    ),
                                    handler() {
                                        (window[
                                            PREFIX
                                        ] as Vue).$settings.discard();
                                        LSSM.$modal.hide('dialog');
                                        LSSM.$modal.hide('settings');
                                    },
                                },
                                {
                                    title: LSSM.$t(
                                        'modules.settings.closeWarning.abort'
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
        storeIconBg() {
            if (this.iconBgAsNavBg) {
                this.$store.dispatch('addStyle', {
                    selectorText:
                        '.navbar-default, .navbar-default .dropdown-menu',
                    style: {
                        'background-color': `${this.iconBg} !important`,
                    },
                });
                this.setNavbarBG(
                    this.iconBg?.toString() ??
                        (this.$store.state.policechief ? '#004997' : '#C9302C')
                );
            }
            this.$store.dispatch('settings/setSetting', {
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
    },
    beforeMount() {
        this.iconBg = null;
        this.labelInMenu = false;
        this.$store
            .dispatch('settings/getModule', 'global')
            .then(({ labelInMenu, iconBg, iconBgAsNavBg }) => {
                this.labelInMenu = labelInMenu;
                this.iconBg = iconBg;
                this.iconBgAsNavBg = iconBgAsNavBg;

                if (iconBgAsNavBg) {
                    this.navbg.navbar = document.getElementById('main_navbar');
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
                        const mainColor = Object.entries(
                            colors
                        ).sort(([, a], [, b]) =>
                            a < b ? 1 : a > b ? -1 : 0
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
                    img.src = bgImg.replace(/^url\("|"\)$/g, '');
                }
            });
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
