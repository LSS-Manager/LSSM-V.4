<template>
    <lightbox
        :name="`redesign-lightbox-${creation}`"
        :full-height="!type"
        :no-title-hide="true"
        :no-modal="noModal"
    >
        <template v-slot:control-buttons v-if="!noModal">
            <span
                class="toggle-title"
                @click="copyUrl()"
                :title="$m('copy_url', { url: fullUrl })"
            >
                <i :id="cliboardIconId" class="fas fa-clipboard"></i>
            </span>
        </template>
        <div
            v-show="type && type !== 'default'"
            class="redesign-wrapper"
            :type="type"
        >
            <AAOs
                v-if="type === 'aaos'"
                :aaos="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></AAOs>
            <AllianceAvatar
                v-else-if="type === 'alliance_avatar'"
                :alliance="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></AllianceAvatar>
            <Alliances
                v-else-if="type === 'alliances'"
                :alliances="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></Alliances>
            <Avatar
                v-else-if="type === 'avatar'"
                :profile="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></Avatar>
            <Awards
                v-else-if="type === 'awards'"
                :awards="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></Awards>
            <Bewerbungen
                v-if="type === 'bewerbungen'"
                :bewerbungen="data"
                :url="url"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
                :get-setting="getSetting"
                :set-setting="setSetting"
            ></Bewerbungen>
            <Credits
                v-else-if="type.startsWith('credits/') || type === 'coins/list'"
                :data="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Credits>
            <Einsaetze
                v-else-if="type === 'einsaetze'"
                :window="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Einsaetze>
            <Einsatz
                v-else-if="type === 'einsatz'"
                :mission="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Einsatz>
            <Freunde
                v-else-if="type === 'freunde'"
                :friends="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Freunde>
            <Profile
                v-else-if="type === 'profile'"
                :profile="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></Profile>
            <ProfileEdit
                v-else-if="type === 'profile/edit'"
                :profile="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></ProfileEdit>
            <Toplist
                v-else-if="type === 'toplist'"
                :toplist="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></Toplist>
            <VehicleGroup
                v-else-if="type === 'vehicle_group'"
                :vehicle_group="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></VehicleGroup>
            <Vehicle
                v-else-if="type === 'vehicle'"
                :vehicle="data"
                :url="urlProp"
                :lightbox="this"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
            ></Vehicle>
            <Verband
                v-else-if="type.startsWith('verband/') || type === 'schoolings'"
                :data="data"
                :url="urlProp"
                :lightbox="this"
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
        <div
            id="redesign-loader"
            v-show="loading"
            :style="
                `width: ${size}%; height: ${size}%; top: ${loaderOffset}%; left: ${loaderOffset}%`
            "
        >
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

import { RedesignLightbox, RedesignParser } from 'typings/modules/Redesign';

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
        AAOs: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/aaos"*/ './aaos.vue'
            ),
        AllianceAvatar: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/alliance_avatar"*/ './alliance_avatar.vue'
            ),
        Alliances: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/alliances"*/ './alliances.vue'
            ),
        Avatar: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/avatar"*/ './avatar.vue'
            ),
        Awards: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/awards"*/ './awards.vue'
            ),
        Bewerbungen: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/bewerbungen"*/ './bewerbungen.vue'
            ),
        Credits: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/credits"*/ './credits.vue'
            ),
        Einsaetze: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/einsaetze"*/ './einsaetze.vue'
            ),
        Einsatz: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/einsatz"*/ './einsatz.vue'
            ),
        Freunde: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/freunde"*/ './freunde.vue'
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
        VehicleGroup: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/vehicle_group"*/ './vehicle_group.vue'
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
            cliboardIconId: this.$store.getters.nodeAttribute(
                'redesign-clipboard-icon',
                true
            ),
            type: 'default',
            data: { authenticity_token: '' },
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
        size: {
            type: Number,
            required: false,
            default: 100,
        },
    },
    computed: {
        loaderOffset() {
            return (100 - this.size) / 2;
        },
        fullUrl() {
            return new URL(this.urlProp, window.location.origin).toString();
        },
        src: {
            get() {
                return this.src ?? this.url;
            },
            set(url) {
                this.loading = true;
                this.errors = [];
                const link = new URL(url, window.location.origin);
                const type = Object.entries(this.routeChecks).find(([regex]) =>
                    link.pathname.match(regex)
                )?.[1];
                if (this.noModal && !link.searchParams.has('ignore-history'))
                    window.history.pushState({}, url, url);
                if (!type) {
                    const iframe = this.$refs
                        .iframe as HTMLIFrameElement | null;
                    if (
                        iframe &&
                        new URL(
                            iframe.contentWindow?.location.href ?? '',
                            window.location.origin
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
                        if (res.redirected && type !== 'einsatz') {
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
                        if (type === 'credits/daily') {
                            this.$i18n.mergeLocaleMessage(
                                this.$store.state.lang,
                                {
                                    modules: {
                                        dailyCreditsSummary: (
                                            await import(
                                                /* webpackChunkName: "modules/i18n/dailyCreditsSummary/[request]" */ `../../dailyCreditsSummary/i18n/${this.$store.state.lang}.ts`
                                            )
                                        ).default,
                                    },
                                }
                            );
                        }
                        if (type === 'schoolings') {
                            await addLocas('verband');
                            this.$i18n.mergeLocaleMessage(
                                this.$store.state.lang,
                                {
                                    modules: {
                                        schoolingOverview: await import(
                                            /* webpackChunkName: "modules/i18n/schoolingOverview/[request]" */ `../../schoolingOverview/i18n/${this.$store.state.lang}.json`
                                        ),
                                    },
                                }
                            );
                        }
                        import(
                            /*webpackChunkName: "modules/redesign/parsers/[request]"*/ `../parsers/${type}`
                        ).then(
                            async ({
                                default: parser,
                            }: {
                                default: RedesignParser;
                            }) => {
                                try {
                                    const doc = new DOMParser().parseFromString(
                                        html,
                                        'text/html'
                                    );
                                    const script = Array.from(doc.scripts)
                                        .map(({ innerText }) =>
                                            innerText.trim()
                                        )
                                        .join('\n');
                                    window.coinsUpdate(
                                        parseInt(
                                            script.match(
                                                /(?<=coinsUpdate\()\d+(?=\))/
                                            )?.[0] ?? '-1'
                                        )
                                    );
                                    window.creditsUpdate(
                                        parseInt(
                                            script.match(
                                                /(?<=creditsUpdate\()\d+(?=\))/
                                            )?.[0] ?? '-1'
                                        )
                                    );
                                    this.data = {
                                        ...(await parser({
                                            href: url,
                                            getIdFromEl: this.getIdFromEl,
                                            doc,
                                            LSSM: this,
                                        })),
                                        authenticity_token:
                                            doc.querySelector<HTMLMetaElement>(
                                                'meta[name="csrf-token"]'
                                            )?.content ?? '',
                                    };
                                    if (type === 'vehicle/nextfms' && this.data)
                                        this.src = `/vehicles/${this.data}`;
                                    this.type = type;
                                    this.urlProp = url;
                                    document.documentElement.style.removeProperty(
                                        'height'
                                    );
                                    document.body.style.removeProperty(
                                        'height'
                                    );
                                } catch (e) {
                                    this.errors.push(e);
                                    this.$store.dispatch('console/error', [e]);
                                }
                            }
                        );
                    });
            },
        },
    },
    methods: {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$m(`${this.type}.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`${this.type}.${key}`, amount, args);
        },
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
                new URL(el?.href ?? '', window.location.origin).pathname?.match(
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
        copyUrl() {
            navigator.clipboard.writeText(this.fullUrl).then(() => {
                this.$el
                    .querySelector(`#${this.cliboardIconId}`)
                    ?.setAttribute('data-icon', 'check');
                window.setTimeout(
                    () =>
                        this.$el
                            .querySelector(`#${this.cliboardIconId}`)
                            ?.setAttribute('data-icon', 'clipboard'),
                    1000
                );
            });
        },
    },
    beforeMount() {
        this.$store
            .dispatch('api/getMissions', {
                force: false,
                feature: 'redesign-lightbox-mount',
            })
            .then();
        [
            'vehicles',
            'buildings',
            'allianceinfo',
            'settings',
            'credits',
        ].forEach(type =>
            this.$store.dispatch('api/initialUpdate', {
                type,
                feature: 'redesign-lightbox-mount',
            })
        );
    },
    mounted() {
        this.$store.commit('useFontAwesome');
        window['lssmv4-redesign-lightbox'] = this;
        const trySetIframe = () =>
            this.$refs.iframe
                ? this.$nextTick(() => {
                      this.$set(this, 'src', this.url);
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore // Yes, Typescript does not understand that a 'mouseup' eventListener results in a MouseEvent…
                      this.$el.addEventListener('mouseup', (e: MouseEvent) => {
                          const target = (e.target as HTMLElement)?.closest<
                              HTMLAnchorElement | HTMLButtonElement
                          >('a, button');
                          const href = target?.getAttribute('href');
                          if (!target || !href || ![0, 1].includes(e.button))
                              return;
                          e.preventDefault();
                          if (e.ctrlKey || e.button === 1)
                              return window.open(href, '_blank');
                          if (
                              e.button === 0 &&
                              target.hasAttribute('lightbox-open')
                          )
                              return window.lightboxOpen(href);
                          else this.$set(this, 'src', href);
                      });
                      this.$el.addEventListener('click', e => {
                          const target = (e.target as HTMLElement)?.closest<
                              HTMLAnchorElement | HTMLButtonElement
                          >('a, button');
                          const href = target?.getAttribute('href');
                          if (!target || !href) return;
                          e.preventDefault();
                      });
                      window.addEventListener('popstate', () => {
                          const url = new URL(
                              window.location.href,
                              window.location.origin
                          );
                          url.searchParams.append('ignore-history', 'true');
                          this.$set(this, 'src', url.toString());
                      });
                  })
                : setTimeout(trySetIframe, 100);
        trySetIframe();
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
    background: rgba(255, 255, 255, 0.5)
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
