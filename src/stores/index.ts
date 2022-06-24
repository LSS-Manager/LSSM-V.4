import { defineStore } from 'pinia';
import { useAPIStore } from '@stores/api';
import { useBroadcastStore } from '@stores/broadcast';
import { useEventStore } from '@stores/event';

import config from '../config';

import type { RootState } from 'typings/store/RootState';
import type {
    addStyle,
    Hook,
    ObserveAsyncTab,
    premodifyParams,
    ProxyParams,
} from 'typings/store/Actions';
import type { GameFlavour, LSSMEvent } from 'typings/helpers';

export const useRootStore = defineStore('root', {
    state: () =>
        <RootState>{
            credits: 0,
            coins: 0,
            hooks: {},
            menuItems: [],
            osmBars: {},
            styleSheet: null,
        },
    getters: {
        locale: (): string => window.I18n.locale,
        mapkit: (): boolean => typeof window.mapkit !== 'undefined',
        discordUrl: (): string => `https://discord.gg/${config.discord.invite}`,
        githubUrl: (): string => `https://github.com/${config.github.repo}`,
        fontAwesomeIconSearch: (): string => config.fontAwesomeIconSearch,
        gameFlavour: (): GameFlavour => window.gameFlavour,
        isPoliceChief(): boolean {
            return this.gameFlavour === 'policechief';
        },
        isDarkMode: (): boolean => document.body.classList.contains('dark'),
        lssmUrl(): (
            path: string,
            appendUserId?: boolean,
            parameters?: Record<string, string>
        ) => string {
            return (path, appendUserId = false, parameters = {}) => {
                const basePath = new URL(SERVER).pathname;
                const url = new URL(
                    `${basePath}${path.replace(SERVER, '')}`.replace(
                        /\/+/gu,
                        '/'
                    ),
                    SERVER
                );
                if (appendUserId) {
                    url.searchParams.set(
                        'uid',
                        `${this.locale}-${window.user_id}`
                    );
                }
                Object.entries(parameters).forEach(([key, value]) =>
                    url.searchParams.set(key, value)
                );
                return url.toString();
            };
        },
        wiki(): string {
            return `${config.docs}${this.locale}`;
        },
        moduleWiki(): (moduleId: string) => string {
            return moduleId => `${this.wiki}/modules/${moduleId}/`;
        },
        nodeAttribute:
            (): ((attr: string, id?: boolean) => string) =>
            (attr: string, id = false): string => {
                const res = `${PREFIX}-${attr}`;
                if (id) {
                    return res
                        .replace(/ /gu, '_')
                        .replace(/["']/gu, '')
                        .replace(/[^\w-]/gu, '-');
                }
                return res;
            },
    },
    actions: {
        updateCredits(credits: number) {
            const old = this.credits;
            this.credits = credits;
            const apiStore = useAPIStore();
            if (apiStore.credits) {
                apiStore.credits.credits_user_current = credits;
                const diff = credits - old;
                window.dispatchEvent(
                    new CustomEvent(`${PREFIX}_credits_update`, {
                        detail: { old, new: credits, diff },
                    })
                );
                if (diff > 0) apiStore.credits.credits_user_total += diff;
                useBroadcastStore()
                    .apiBroadcast('credits', {
                        value: apiStore.credits,
                        lastUpdate: apiStore.lastUpdates.credits ?? Date.now(),
                    })
                    .then();
            }
        },
        updateCoins(coins: number) {
            this.coins = coins;
        },
        hook<Arguments extends unknown[]>({
            post = true,
            event,
            callback = () => null,
            abortOnFalse = false,
        }: Hook<Arguments>) {
            const eventStore = useEventStore();
            const internalEventNamePrefix = `hook_${event}`;
            const internalEventName = `${internalEventNamePrefix}_${
                post ? 'after' : 'before'
            }`;
            if (!this.hooks.hasOwnProperty(event)) {
                const split = event.split('.');
                const eventName = split.pop();
                if (!eventName) return;
                const eventParentObject = split.reduce(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (previousValue: any, currentValue) =>
                        (previousValue || window)[currentValue],
                    window
                ) as Record<string, (...args: Arguments) => unknown>;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.hooks[event] = eventParentObject[eventName];
                eventParentObject[eventName] = (...args: Arguments) => {
                    if (!abortOnFalse) {
                        eventStore.createAndDispatchEvent({
                            name: `${internalEventNamePrefix}_before`,
                            detail: args,
                        });
                    } else if (!callback(...args)) {
                        return;
                    }

                    const result = this.hooks[event](...args);
                    eventStore.createAndDispatchEvent({
                        name: `${internalEventNamePrefix}_after`,
                        detail: args,
                    });
                    return result;
                };
            }
            eventStore.addListener({
                name: internalEventName,
                listener(event: LSSMEvent<Arguments>) {
                    callback(...event.detail);
                },
            });
        },
        proxyMethod({ post = true, name, callback, trap }: ProxyParams) {
            const split = name.split('.');
            const trueProp = split.pop();
            const trueBase = split.reduce(
                (previousValue, currentValue) =>
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (previousValue || window)[currentValue],
                window
            ) as unknown;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            trueBase[trueProp] = new Proxy(trueBase[trueProp], {
                [trap](...args: unknown[]) {
                    if (!post) callback(...args);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const result = Reflect[trap](...args);
                    if (post) callback(...args);
                    return result;
                },
            });
        },
        preModifyParams({ event, callback = undefined }: premodifyParams) {
            const split = event.split('.');
            const trueProp = split.pop();
            const trueBase = split.reduce(
                (previousValue, currentValue) =>
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (previousValue || window)[currentValue],
                window
            ) as unknown;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const originalEvent = trueBase[trueProp];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            trueBase[trueProp] = (...args) => {
                callback?.(...args);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                originalEvent(...args);
            };
        },
        addMenuItem(text: string) {
            const menuItem = document.createElement('a');
            menuItem.href = '#';
            menuItem.textContent = text;
            this.menuItems.push(menuItem);
            return new Promise<HTMLAnchorElement>(resolve => resolve(menuItem));
        },
        addStyle({ selectorText, style }: addStyle) {
            if (!this.styleSheet) {
                this.styleSheet = document.createElement('style');
                this.styleSheet.id = this.nodeAttribute('dynamic-styles', true);
                document.head.append(this.styleSheet);
            }
            this.styleSheet.innerHTML += `${selectorText} {\n${Object.entries(
                style
            )
                .map(([rule, value]) => `\t${rule}: ${value};\n`)
                .join('')}\n}`;
        },
        addStyles(styles: addStyle[]) {
            styles.forEach(this.addStyle);
        },
        addOSMControl({
            position,
            mapId = 'map',
        }: {
            position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
            mapId?: string;
        }) {
            const positionSelector = `#${mapId} .leaflet-control-container ${position
                .split('-')
                .map(p => `.leaflet-${p}`)
                .join('')}`;
            if (
                !this.osmBars.hasOwnProperty(mapId) ||
                !this.osmBars[mapId].hasOwnProperty(position) ||
                !document.querySelector(
                    `${positionSelector} .leaflet-bar.leaflet-control`
                )
            ) {
                const bar = document.createElement('div');
                bar.classList.add('leaflet-bar', 'leaflet-control');
                document
                    .querySelector(positionSelector)
                    ?.[position.match(/bottom/u) ? 'prepend' : 'append'](bar);
                if (!this.osmBars.hasOwnProperty(mapId))
                    this.osmBars[mapId] = {};
                this.osmBars[mapId][position] = bar;
            }
            const control = document.createElement('a');
            this.osmBars[mapId][position][
                position.match(/bottom/u) ? 'prepend' : 'append'
            ](control);
            return new Promise<HTMLAnchorElement>(resolve => resolve(control));
        },
        observeAsyncTab({ tabSelector, callback }: ObserveAsyncTab) {
            const tab = document.querySelector(tabSelector);
            if (!tab) return;
            const observer = new MutationObserver(mutations => {
                mutations.forEach(record => {
                    if (
                        Array.from(record.addedNodes).some(
                            node => node.nodeName === 'SCRIPT'
                        )
                    )
                        callback();
                });
            });
            observer.observe(tab, {
                childList: true,
            });
        },
    },
});
