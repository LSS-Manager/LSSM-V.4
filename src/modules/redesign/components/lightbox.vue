<template>
    <lightbox
        name="redesign-lightbox"
        :full-height="!type"
        :no-title-hide="true"
        :no-modal="noModal"
    >
        <div v-show="type" class="redesign-wrapper" :type="type">
            <Vehicle
                v-if="type === 'vehicle'"
                :vehicle="data"
                :url="urlProp"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></Vehicle>
            <Credits
                v-else-if="type.startsWith('credits/')"
                :data="data"
                :url="urlProp"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Credits>
        </div>
        <iframe
            v-show="!type"
            ref="iframe"
            :src="url"
            :id="$store.getters.nodeAttribute('redesign-lightbox-iframe')"
            :name="$store.getters.nodeAttribute('redesign-lightbox-iframe')"
        ></iframe>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import { VehicleWindow } from '../parsers/vehicle';
import { DefaultComputed } from 'vue/types/options';
import VueI18n from 'vue-i18n';
import { routeChecks } from 'typings/modules/Redesign';
import { CreditsDailyWindow } from '../parsers/credits/daily';

interface Data<T, D> {
    type: T;
    data: D;
    html: string;
    urlProp: string;
}

const getIdFromEl = (el: HTMLAnchorElement | null): number =>
    parseInt(
        new URL(el?.href ?? '', window.location.href).pathname?.match(
            /\d+\/?$/
        )?.[0] ?? '-1'
    );

export default Vue.extend<
    | Data<'', null>
    | Data<'vehicle', VehicleWindow>
    | Data<'credits.daily', CreditsDailyWindow>,
    {
        getSetting(): <T>(setting: string, defaultValue: T) => Promise<T>;
        setSetting(): <T>(settingId: string, value: T) => Promise<void>;
    },
    DefaultComputed,
    {
        url: string;
        $m(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        $mc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        routeChecks: routeChecks;
        noModal: boolean;
    }
>({
    name: 'redesign-lightbox',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../../components/lightbox.vue'
            ),
        Vehicle: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/vehicle"*/ './vehicle.vue'
            ),
        Credits: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/credits"*/ './credits.vue'
            ),
    },
    data() {
        return {
            type: '',
            data: null,
            html: '',
            urlProp: '',
        };
    },
    props: {
        url: {
            type: String,
            required: true,
        },
        $m: {
            type: Function,
            required: true,
        },
        $mc: {
            type: Function,
            required: true,
        },
        routeChecks: {
            type: Object,
            required: true,
        },
        noModal: {
            type: Boolean,
            required: false,
            default: () => false,
        },
    },
    computed: {
        src: {
            get() {
                return this.src ?? this.url;
            },
            set(url) {
                const link = new URL(url, window.location.href);
                const type = Object.entries(this.routeChecks).find(([regex]) =>
                    link.pathname.match(regex)
                )?.[1];
                window.history.pushState({}, url, url);
                if (!type) {
                    const iframe = this.$refs
                        .iframe as HTMLIFrameElement | null;
                    if (
                        iframe &&
                        new URL(
                            iframe.contentWindow?.location.href ?? '',
                            window.location.href
                        ).toString() !== link.toString()
                    ) {
                        iframe.src = url;
                    } else {
                        window.dispatchEvent(
                            new Event(
                                'lssmv4-redesign-iframe-trigger-lssm-load'
                            )
                        );
                    }
                    this.type = '';
                    return;
                }

                this.$store
                    .dispatch('api/request', {
                        url,
                        feature: `redesign-${type}`,
                    })
                    .then((res: Response) => res.text())
                    .then(async html => {
                        const types = type.split('/');
                        for (let i = 1; i <= types.length; i++) {
                            try {
                                const typePath = types.slice(0, i).join('/');
                                const t = await import(
                                    /* webpackChunkName: "modules/i18n/redesign/[request]" */ `../i18n/${this.$store.state.lang}/${typePath}.json`
                                );
                                this.$i18n.mergeLocaleMessage(
                                    this.$store.state.lang,
                                    {
                                        modules: {
                                            redesign: {
                                                [typePath]: t,
                                            },
                                        },
                                    }
                                );
                            } catch (e) {
                                // Do nothing
                            }
                        }
                        import(
                            /*webpackChunkName: "modules/redesign/parsers/[request]"*/ `../parsers/${type}`
                        ).then(parser => {
                            this.data = parser.default(html, url, getIdFromEl);
                            this.type = type;
                            this.urlProp = url;
                        });
                    });
            },
        },
    },
    methods: {
        getSetting() {
            return <T>(setting: string, defaultValue: T): Promise<T> =>
                new Promise(resolve =>
                    this.$store
                        .dispatch('settings/getSetting', {
                            moduleId: 'redesign',
                            settingId: this.type,
                        })
                        .then(settings =>
                            resolve(settings[setting] ?? defaultValue)
                        )
                );
        },
        setSetting() {
            return <T>(settingId: string, value: T): Promise<void> =>
                this.$store
                    .dispatch('settings/getSetting', {
                        moduleId: 'redesign',
                        settingId: this.type,
                    })
                    .then(settings =>
                        this.$store
                            .dispatch('settings/setSetting', {
                                moduleId: 'redesign',
                                settingId: this.type,
                                value: { ...settings, [settingId]: value },
                            })
                            .then()
                    );
        },
    },
    mounted() {
        this.src = this.url;
        window['lssmv4-redesign-lightbox'] = this;
    },
});
</script>

<style lang="sass" scoped>
.redesign-wrapper
    margin: 1rem

    &[type="credits.daily"]
        margin-top: 0

iframe
    width: 100%
    height: 100%
    display: block
    border: none
</style>
