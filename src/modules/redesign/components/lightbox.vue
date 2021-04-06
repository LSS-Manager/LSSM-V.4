<template>
    <lightbox
        :name="`redesign-lightbox-${creation}`"
        :full-height="!type"
        :no-title-hide="true"
        :no-modal="noModal"
    >
        <div
            v-show="type && type !== 'default'"
            class="redesign-wrapper"
            :type="type"
        >
            <Alliances
                v-if="type === 'alliances'"
                :alliances="data"
                :url="urlProp"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Alliances>
            <Avatar
                v-else-if="type === 'avatar'"
                :profile="data"
                :url="urlProp"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Avatar>
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
            <Profile
                v-else-if="type === 'profile'"
                :profile="data"
                :url="urlProp"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Profile>
            <ProfileEdit
                v-else-if="type === 'profile/edit'"
                :profile="data"
                :url="urlProp"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></ProfileEdit>
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
            <Vehicle
                v-else-if="type === 'vehicle'"
                :vehicle="data"
                :url="urlProp"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></Vehicle>
            <Verband
                v-else-if="type.startsWith('verband/')"
                :data="data"
                :url="urlProp"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Verband>
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
            src="about:blank"
            :id="$store.getters.nodeAttribute('redesign-lightbox-iframe')"
            :name="$store.getters.nodeAttribute('redesign-lightbox-iframe')"
        ></iframe>
        <div id="redesign-loader" v-show="loading">
            <font-awesome-icon
                :icon="faSyncAlt"
                spin
                size="10x"
            ></font-awesome-icon>
            <div class="error-list well" v-show="errors.length">
                <div v-for="(error, id) in errors" :key="id">
                    <b>{{ error.toString() }}</b>
                    <pre class="bg-danger">{{ error.stack }}</pre>
                </div>
            </div>
        </div>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons/faSyncAlt';
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
        Alliances: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/alliances"*/ './alliances.vue'
            ),
        Avatar: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/avatar"*/ './avatar.vue'
            ),
        Credits: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/credits"*/ './credits.vue'
            ),
        Profile: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/profile"*/ './profile.vue'
            ),
        ProfileEdit: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/profile/edit"*/ './profile/edit.vue'
            ),
        Toplist: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/toplist"*/ './toplist.vue'
            ),
        Vehicle: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/vehicle"*/ './vehicle.vue'
            ),
        Verband: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/verband"*/ './verband.vue'
            ),
    },
    data() {
        return {
            faSyncAlt,
            type: 'default',
            data: null,
            html: '',
            urlProp: '',
            loading: true,
            errors: [],
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
        creation: {
            type: String,
            required: true,
        },
    },
    computed: {
        src: {
            get() {
                return this.src ?? this.url;
            },
            set(url) {
                this.loading = true;
                this.errors = [];
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
                    this.finishLoading();
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
                        if (type === 'vehicle/nextfms') {
                            const nextVehicle = document
                                .querySelector<HTMLAnchorElement>(
                                    'a.btn.btn-success[href^="/vehicles/"]'
                                )
                                ?.href?.match(/\d+$/)?.[0];
                            if (nextVehicle)
                                return (this.src = `/vehicles/${nextVehicle}`);
                        }
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
                            try {
                                this.data = parser.default(
                                    html,
                                    url,
                                    this.getIdFromEl
                                );
                                if (type === 'vehicle/nextfms' && this.data)
                                    this.src = `/vehicles/${this.data}`;
                                this.type = type;
                                this.urlProp = url;
                                document.documentElement.style.removeProperty(
                                    'height'
                                );
                                document.body.style.removeProperty('height');
                            } catch (e) {
                                this.errors.push(e);
                            }
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
        finishLoading(text) {
            this.loading = false;
            this.$store
                .dispatch('event/createEvent', {
                    name: 'redesign-finished-loading',
                    detail: {
                        extra: text,
                        type: this.type,
                        data: this.data,
                    },
                })
                .then(event =>
                    this.$store.dispatch('event/dispatchEvent', event)
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

#redesign-loader
    position: fixed
    top: 0
    left: 0
    background: rgba(255, 255, 255, 0.5)
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    color: black

    .error-list
        position: absolute
        right: 0
        max-height: 100%
        max-width: calc(50% - 7em)
        overflow: auto

        *
            overflow: auto
</style>
