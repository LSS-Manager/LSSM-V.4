import { defineStore } from 'pinia';

import type { AddListener, CreateEvent } from 'typings/store/event/Actions';

export const useEventStore = defineStore('event', {
    state: () => ({}),
    getters: {
        eventName: () => (name: string) =>
            `${PREFIX}-event-${name
                .replace(/ /gu, '_')
                .replace(/["']/gu, '')
                .replace(/[^\w\-.]/gu, '-')}`,
    },
    actions: {
        createEvent({ name, detail, init }: CreateEvent) {
            return new CustomEvent(this.eventName(name), {
                ...init,
                detail,
            });
        },
        dispatchEvent(event: CustomEvent) {
            document.dispatchEvent(event);
        },
        createAndDispatchEvent(event: CreateEvent) {
            this.dispatchEvent(this.createEvent(event));
        },
        addListener({ name, listener }: AddListener) {
            document.addEventListener(this.eventName(name), listener);
        },
    },
});
