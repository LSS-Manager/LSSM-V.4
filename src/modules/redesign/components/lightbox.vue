<template>
    <lightbox
        name="redesign-lightbox"
        :full-height="!type"
        :no-title-hide="true"
        :no-modal="noModal"
    >
        <div
            v-show="type && type !== 'default'"
            class="redesign-wrapper"
            :type="type"
        >
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
                v-else-if="type.startsWith('credits/') || type === 'coins/list'"
                :data="data"
                :url="urlProp"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Credits>
            <Toplist
                v-else-if="type === 'toplist'"
                :toplist="data"
                :url="urlProp"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Toplist>
            <div
                v-else-if="type === 'vehicle/nextfms'"
                class="alert alert-success"
            >
                {{ $m('vehicle.nextfms.finished') }}
            </div>
        </div>
        <iframe
            v-show="!type || type === 'default'"
            ref="iframe"
            :src="type || type === 'default' ? 'about:blank' : url"
            :id="$store.getters.nodeAttribute('redesign-lightbox-iframe')"
            :name="$store.getters.nodeAttribute('redesign-lightbox-iframe')"
        ></iframe>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import { RedesignLightbox } from 'typings/modules/Redesign';

export default Vue.extend<
    RedesignLightbox['Data'],
    RedesignLightbox['Methods'],
    RedesignLightbox['Computed'],
    RedesignLightbox['Props']
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
        Toplist: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/toplist"*/ './toplist.vue'
            ),
    },
    data() {
        return {
            type: 'default',
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
                if (this.noModal) window.history.pushState({}, url, url);
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

                let redirected = false;

                this.$store
                    .dispatch('api/request', {
                        url,
                        feature: `redesign-${type}`,
                    })
                    .then((res: Response) => {
                        if (res.redirected) {
                            redirected = true;
                            return (this.src = res.url);
                        }
                        return res.text();
                    })
                    .then(async html => {
                        if (redirected) return;
                        const types = type.split('/');
                        const addLocas = async (typePath: string) =>
                            this.$i18n.mergeLocaleMessage(
                                this.$store.state.lang,
                                {
                                    modules: {
                                        redesign: {
                                            [typePath]: await import(
                                                /* webpackChunkName: "modules/i18n/redesign/[request]" */ `../i18n/${this.$store.state.lang}/${typePath}.json`
                                            ),
                                        },
                                    },
                                }
                            );
                        for (let i = 1; i <= types.length; i++) {
                            try {
                                const typePath = types.slice(0, i).join('/');
                                await addLocas(typePath);
                            } catch (e) {
                                // Do nothing
                            }
                        }
                        if (type === 'coins/list') await addLocas('credits');
                        import(
                            /*webpackChunkName: "modules/redesign/parsers/[request]"*/ `../parsers/${type}`
                        ).then(parser => {
                            this.data = parser.default(
                                html,
                                url,
                                this.getIdFromEl
                            );
                            if (type === 'vehicle/nextfms' && this.data)
                                this.src = `/vehicles/${this.data}`;
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
        getIdFromEl(el) {
            return parseInt(
                new URL(el?.href ?? '', window.location.href).pathname?.match(
                    /\d+\/?$/
                )?.[0] ?? '-1'
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
