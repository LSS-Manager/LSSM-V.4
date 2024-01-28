import type Vue from 'vue';

import { defineStore } from 'pinia';

export interface CreateEvent {
    name: string;
    detail?: unknown;
    init?: EventInit;
}

export interface AddListener {
    name: string;
    listener(event: Event): void;
}

const defineEventStore = defineStore('event', () => {
    const getEventName = (name: string) =>
        `${PREFIX}-event-${name
            .replace(/ /gu, '_')
            .replace(/["']/gu, '')
            .replace(/[^\w\-.]/gu, '-')}`;

    const createEvent = ({ name, detail, init }: CreateEvent) =>
        new CustomEvent(getEventName(name), { ...init, detail });

    const dispatchEvent = (event: CustomEvent) => document.dispatchEvent(event);
    const createAndDispatchEvent = (event: CreateEvent) =>
        dispatchEvent(createEvent(event));

    const addListener = ({ name, listener }: AddListener) =>
        document.addEventListener(getEventName(name), listener);

    return {
        createEvent,
        dispatchEvent,
        createAndDispatchEvent,
        addListener,
    };
});

export const useEventStore: () => ReturnType<typeof defineEventStore> = () =>
    (window[PREFIX] as Vue)?.$stores?.event ?? defineEventStore();
