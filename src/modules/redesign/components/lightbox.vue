<template>
    <lightbox
        :name="modalName"
        :full-height="!type"
        no-title-hide
        :no-modal="noModal"
    >
        <template v-slot:control-buttons v-if="!noModal">
            <span
                class="toggle-title"
                @click="copyUrl()"
                :title="$m('copy_url', { url: fullUrl })"
            >
                <i :id="clipboardIconId" class="fas fa-clipboard"></i>
            </span>
        </template>
        <div
            v-show="type && type !== 'default'"
            class="redesign-wrapper"
            :type="type"
        >
            <Credits
                v-if="type.startsWith('credits/') || type === 'coins/list'"
                :data="data"
                :url="urlProp"
                :lightbox="lightbox"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                :type="type"
            ></Credits>
            <Verband
                v-else-if="type.startsWith('verband/') || type === 'schoolings'"
                :data="data"
                :url="urlProp"
                :lightbox="lightbox"
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
            <component
                v-else-if="windows[type]"
                :is="windows[type].component"
                :url="urlProp"
                :lightbox="lightbox"
                :get-setting="getSetting()"
                :set-setting="setSetting()"
                v-bind="{ [windows[type].data]: data }"
            ></component>
        </div>
        <iframe
            v-show="!type || type === 'default'"
            ref="iframe"
            src="about:blank"
            :id="rootStore.nodeAttribute('redesign-lightbox-iframe')"
            :name="rootStore.nodeAttribute('redesign-lightbox-iframe')"
        ></iframe>
        <div
            id="redesign-loader"
            v-show="loading"
            :style="`width: ${size}%; height: ${size}%; top: ${loaderOffset}%; left: ${loaderOffset}%`"
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
import { useAPIStore } from '@stores/api';
import { useBroadcastStore } from '@stores/broadcast';
import { useConsoleStore } from '@stores/console';
import { useEventStore } from '@stores/event';
import { useModulesStore } from '@stores/modules';
import { useNotificationStore } from '@stores/notifications';
import { useRootStore } from '@stores/index';
import { useSettingsStore } from '@stores/settings';
import { useStorageStore } from '@stores/storage';
import { useTranslationStore } from '@stores/translationUtilities';

import HotkeyUtility from '../../hotkeys/assets/HotkeyUtility';
import {
    readSetting,
    registerHotkeys,
    resolveCommands,
    type RootScopeWithoutAll,
} from '../../hotkeys/main';

import type {
    RedesignLightbox,
    RedesignLightboxVue,
    RedesignParser,
    Redesigns,
} from 'typings/modules/Redesign';

const windows: RedesignLightbox['Data']['windows'] = {
    'aaos': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/aaos"*/ './aaos.vue'
            ),
        data: 'aaos',
    },
    'alliance_avatar': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/allianceAvatar"*/ './alliance_avatar.vue'
            ),
        data: 'alliance',
    },
    'alliances': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/alliances"*/ './alliances.vue'
            ),
        data: 'alliances',
    },
    'avatar': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/avatar"*/ './avatar.vue'
            ),
        data: 'profile',
    },
    'awards': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/awards"*/ './awards.vue'
            ),
        data: 'awards',
    },
    'bewerbungen': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/bewerbungen"*/ './bewerbungen.vue'
            ),
        data: 'bewerbungen',
    },
    'chat': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/chat"*/ './chat.vue'
            ),
        data: 'chat',
    },
    'einsaetze': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/einsaetze"*/ './einsaetze.vue'
            ),
        data: 'window',
    },
    'einsatz': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/einsatz"*/ './einsatz.vue'
            ),
        data: 'mission',
    },
    'fahrzeugfarbe': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/fahrzeugfarbe"*/ './fahrzeugfarbe.vue'
            ),
        data: 'fahrzeugfarbe',
    },
    'freunde': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/freunde"*/ './freunde.vue'
            ),
        data: 'friends',
    },
    'messages/conversation': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/messages/conversation"*/ './messages/conversation.vue'
            ),
        data: 'conversation',
    },
    'messages/new': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/messages/new"*/ './messages/new.vue'
            ),
        data: 'message',
    },
    'messages/system_message': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/messages/system_message"*/ './messages/system_message.vue'
            ),
        data: 'message',
    },
    'note': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/note"*/ './note.vue'
            ),
        data: 'note',
    },
    'profile': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/profile"*/ './profile.vue'
            ),
        data: 'profile',
    },
    'profile/edit': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/profile/edit"*/ './profile/edit.vue'
            ),
        data: 'profile',
    },
    'schoolings': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/schoolings"*/ './schoolings.vue'
            ),
        data: '',
    },
    'tasks': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/tasks"*/ './tasks.vue'
            ),
        data: 'tasks',
    },
    'toplist': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/toplist"*/ './toplist.vue'
            ),
        data: 'toplist',
    },
    'vehicle_group': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/vehicleGroup"*/ './vehicle_group.vue'
            ),
        data: 'vehicle_group',
    },
    'vehicle': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/vehicle"*/ './vehicle.vue'
            ),
        data: 'vehicle',
    },
    'vehicle/stats': {
        component: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/vehicle/stats"*/ './vehicle/stats.vue'
            ),
        data: 'stats',
    },
};

export default Vue.extend<
    RedesignLightbox['Data'],
    RedesignLightbox['Methods'],
    RedesignLightbox['Computed'],
    RedesignLightbox['Props']
>({
    name: 'lssmv4-redesign-lightbox',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../../components/lightbox.vue'
            ),
        Credits: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/credits"*/ './credits.vue'
            ),
        Verband: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/verband"*/ './verband.vue'
            ),
    },
    data() {
        const rootStore = useRootStore();
        return {
            faSyncAlt,
            clipboardIconId: rootStore.nodeAttribute(
                'redesign-clipboard-icon',
                true
            ),
            type: 'default',
            data: { authenticity_token: '' },
            html: '',
            urlProp: '',
            loading: true,
            errors: [],
            clickableLinks: {
                enabled: false,
                pictures: false,
            },
            existingHotkeys: [],
            apiStore: useAPIStore(),
            broadcastStore: useBroadcastStore(),
            consoleStore: useConsoleStore(),
            eventStore: useEventStore(),
            modulesStore: useModulesStore(),
            notificationsStore: useNotificationStore(),
            rootStore,
            settingsStore: useSettingsStore(),
            storageStore: useStorageStore(),
            translationStore: useTranslationStore(),
            windows,
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

                this.apiStore
                    .request({
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
                                ?.href?.match(/\d+$/u)?.[0];
                            if (nextVehicle)
                                return (this.src = `/vehicles/${nextVehicle}`);
                        }
                        const types = type.split('/');
                        const addLocas = async (typePath: string) =>
                            this.$i18n.mergeLocaleMessage(
                                this.rootStore.locale,
                                {
                                    modules: {
                                        redesign: {
                                            [typePath]: await import(
                                                /* webpackChunkName: "modules/i18n/redesign/[request]" */ `../i18n/${this.rootStore.locale}/${typePath}.json`
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
                                this.rootStore.locale,
                                {
                                    modules: {
                                        dailyCreditsSummary: (
                                            await import(
                                                /* webpackChunkName: "modules/i18n/dailyCreditsSummary/[request]" */ `../../dailyCreditsSummary/i18n/${this.rootStore.locale}.ts`
                                            )
                                        ).default,
                                    },
                                }
                            );
                        }
                        if (type === 'schoolings') {
                            await addLocas('verband');
                            this.$i18n.mergeLocaleMessage(
                                this.rootStore.locale,
                                {
                                    modules: {
                                        schoolingOverview: await import(
                                            /* webpackChunkName: "modules/i18n/schoolingOverview/[request]" */ `../../schoolingOverview/i18n/${this.rootStore.locale}.json`
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
                                        .map(
                                            ({ textContent }) =>
                                                textContent?.trim() ?? ''
                                        )
                                        .join('\n');
                                    window.coinsUpdate(
                                        parseInt(
                                            script.match(
                                                /(?<=coinsUpdate\()\d+(?=\))/u
                                            )?.[0] ?? '-1'
                                        )
                                    );
                                    window.creditsUpdate(
                                        parseInt(
                                            script.match(
                                                /(?<=creditsUpdate\()\d+(?=\))/u
                                            )?.[0] ?? '-1'
                                        )
                                    );
                                    this.data = {
                                        ...(await parser({
                                            href: url,
                                            getIdFromEl: this.getIdFromEl,
                                            doc,
                                            LSSM: this,
                                            $m: this.$m,
                                            $mc: this.$mc,
                                            $sm: (key, args) =>
                                                this.$m(`${type}.${key}`, args),
                                            $smc: (key, amount, args) =>
                                                this.$mc(
                                                    `${type}.${key}`,
                                                    amount,
                                                    args
                                                ),
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
                                    if (e instanceof Error) {
                                        this.errors.push(e);
                                        this.consoleStore.error(e);
                                    }
                                }
                            }
                        );
                    });
            },
        },
        modalName() {
            return `redesign-lightbox-${this.creation}`;
        },
        lightbox(): typeof this.type extends keyof Redesigns
            ? RedesignLightboxVue<typeof this.type>
            : null {
            if (this.type === '' || this.type === 'default') return null;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return this;
        },
    },
    methods: {
        $sm(key: string, args?: Record<string, unknown>) {
            return this.$m(`${this.type}.${key}`, args);
        },
        $smc(key: string, amount: number, args?: Record<string, unknown>) {
            return this.$mc(`${this.type}.${key}`, amount, args);
        },
        getSetting() {
            return <S extends string, T>(
                setting: S,
                defaultValue: T
            ): Promise<T> =>
                this.settingsStore
                    .getSetting<Record<S, T>>({
                        moduleId: 'redesign',
                        settingId: this.type,
                    })
                    .then(settings => settings[setting] ?? defaultValue);
        },
        setSetting() {
            return <S extends string, T>(settingId: S, value: T) =>
                this.settingsStore
                    .getSetting<Record<S, T>>({
                        moduleId: 'redesign',
                        settingId: this.type,
                    })
                    .then(settings => {
                        this.settingsStore.setSetting({
                            moduleId: 'redesign',
                            settingId: this.type,
                            value: { ...settings, [settingId]: value },
                        });
                    });
        },
        getIdFromEl(el) {
            return parseInt(
                new URL(el?.href ?? '', window.location.origin).pathname?.match(
                    /\d+\/?$/u
                )?.[0] ?? '-1'
            );
        },
        finishLoading(text) {
            this.loading = false;
            this.eventStore.createAndDispatchEvent({
                name: 'redesign-finished-loading',
                detail: {
                    extra: text,
                    type: this.type,
                    data: this.data,
                    modalName: this.modalName,
                },
            });
            if (this.clickableLinks.enabled) {
                import(
                    /* webpackChunkName: "utils/clickableLinks" */ '../../generalExtensions/assets/clickableLinks/util'
                ).then(({ default: clickableLinks }) =>
                    clickableLinks(this, this.$el, this.clickableLinks.pictures)
                );
            }
        },
        copyUrl() {
            navigator.clipboard.writeText(this.fullUrl).then(() => {
                this.$el
                    .querySelector(`#${this.clipboardIconId}`)
                    ?.setAttribute('data-icon', 'check');
                window.setTimeout(
                    () =>
                        this.$el
                            .querySelector(`#${this.clipboardIconId}`)
                            ?.setAttribute('data-icon', 'clipboard'),
                    1000
                );
            });
        },
        setHotkeyRedesignParam(
            scope,
            { component, data = {}, methods = {}, computed = {} }
        ) {
            if (!this.type || this.type === 'default') return;
            const param = {
                element: this.$el,
                data: this.data,
                lightbox: this as RedesignLightboxVue<typeof this.type>,
                component: {
                    data,
                    methods: Object.fromEntries(
                        Object.entries(methods).map(([name, fn]) => [
                            name,
                            fn.bind(component),
                        ])
                    ),
                    computed,
                },
            };
            for (const command in HotkeyUtility.activeCommands) {
                if (command.startsWith(`${scope}.`)) {
                    this.existingHotkeys.push(command);
                    HotkeyUtility.activeCommands[command][3] = param;
                }
            }
            readSetting()
                .then(hotkeys =>
                    hotkeys.filter(
                        ({ command }) =>
                            command.startsWith(`${scope}.`) &&
                            !this.existingHotkeys.includes(command)
                    )
                )
                .then(hotkeys => {
                    if (hotkeys.length) return hotkeys;
                    else throw new Error('No hotkeys to add. Leaving promise.');
                })
                .then(hotkeys =>
                    resolveCommands([
                        (
                            scope.split('.') as [
                                RootScopeWithoutAll,
                                ...string[],
                            ]
                        )[0],
                    ]).then(commands => ({
                        hotkeys,
                        commands,
                    }))
                )
                .then(({ hotkeys, commands }) =>
                    registerHotkeys(hotkeys, commands, param)
                )
                .catch(() => void 0); // catch the "error" if no hotkeys to add
        },
        unsetHotkeyRedesignParam(scope) {
            for (const command in HotkeyUtility.activeCommands) {
                if (HotkeyUtility.activeCommands.hasOwnProperty(command)) {
                    if (!command.startsWith(`${scope}.`)) continue;
                    if (this.existingHotkeys.includes(command)) {
                        delete HotkeyUtility.activeCommands[command][3];
                        this.existingHotkeys.splice(
                            this.existingHotkeys.indexOf(command),
                            1
                        );
                    } else {
                        delete HotkeyUtility.activeCommands[command];
                    }
                }
            }
        },
    },
    beforeMount() {
        const mountFeature = 'redesign-lightbox-mount';
        this.apiStore.getAllianceInfo(mountFeature).then();
        this.apiStore.getBuildings(mountFeature).then();
        this.apiStore.getCredits(mountFeature).then();
        this.apiStore.getMissions(mountFeature).then();
        this.apiStore.getVehicles(mountFeature).then();
    },
    mounted() {
        this.settingsStore
            .getModule<{ clickableLinks: boolean; showImg: boolean }>(
                'generalExtensions'
            )
            .then(({ clickableLinks, showImg }) => {
                this.clickableLinks.enabled = clickableLinks;
                this.clickableLinks.pictures = showImg;
            });
        window['lssmv4-redesign-lightbox'] = this;
        const trySetIframe = (): number | void =>
            this.$refs.iframe
                ? this.$nextTick(() => {
                      this.$set(this, 'src', this.url);
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore // Yes, Typescript does not understand that a 'mouseup' event results in a MouseEvent…
                      this.$el.addEventListener('mouseup', (e: MouseEvent) => {
                          const target = (e.target as HTMLElement)?.closest<
                              HTMLAnchorElement | HTMLButtonElement
                          >('a, button');
                          const href = target?.getAttribute('href');
                          if (
                              !target ||
                              !href ||
                              ![0, 1].includes(e.button) ||
                              target.hasAttribute('download')
                          )
                              return;
                          e.preventDefault();

                          const targetUrl = new URL(href, window.location.href);
                          const here = new URL(window.location.toString());

                          if (e.ctrlKey || e.button === 1)
                              return window.open(href, '_blank', 'noopener');
                          if (
                              e.button === 0 &&
                              target.hasAttribute('lightbox-open')
                          )
                              return window.lightboxOpen(href);
                          if (target.hasAttribute('target')) {
                              if (targetUrl.origin === window.location.origin)
                                  return window.lightboxOpen(href);
                              return window.open(
                                  href,
                                  target.getAttribute('target') ?? '_blank',
                                  'noopener'
                              );
                          }

                          if (
                              targetUrl.origin === here.origin &&
                              targetUrl.pathname === here.pathname &&
                              targetUrl.search === here.search
                          ) {
                              if (!here.hash) here.hash = '#';
                              if (targetUrl.hash !== here.hash) {
                                  return (window.location.hash =
                                      targetUrl.hash);
                              }
                              if (targetUrl.href === here.href) return;
                          }

                          this.$set(this, 'src', href);
                      });
                      this.$el.addEventListener('click', e => {
                          const target = (e.target as HTMLElement)?.closest<
                              HTMLAnchorElement | HTMLButtonElement
                          >('a, button');
                          const href = target?.getAttribute('href');
                          if (
                              !target ||
                              !href ||
                              target.hasAttribute('download')
                          )
                              return;
                          e.preventDefault();
                      });
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore // Yes, Typescript does not understand that a 'auxclick' event results in a MouseEvent…
                      this.$el.addEventListener('auxclick', (e: MouseEvent) => {
                          const target = (e.target as HTMLElement)?.closest<
                              HTMLAnchorElement | HTMLButtonElement
                          >('a, button');
                          const href = target?.getAttribute('href');
                          if (
                              !target ||
                              !href ||
                              target.hasAttribute('download') ||
                              e.button !== 1
                          )
                              return;
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
                : window.setTimeout(trySetIframe, 100);
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
    cursor: wait

    body.dark &
        background: rgba(0, 0, 0, 0.5)
        color: rgb(100, 100, 100)

    .error-list
        position: absolute
        right: 0
        max-height: 100%
        max-width: calc(50% - 7em)
        overflow: auto

        *
            overflow: auto
</style>
