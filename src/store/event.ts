import type { RootState } from 'typings/store/RootState';
import type { ActionTree, Module } from 'vuex';
import type {
    CreateEvent,
    EventActionStoreParams,
} from 'typings/store/event/Actions';

export default {
    namespaced: true,
    getters: {
        eventName: (_s, _g, rootState) => (name: string) =>
            `${rootState.prefix}-event-${name
                .replace(/ /gu, '_')
                .replace(/["']/gu, '')
                .replace(/[^\w\-.]/gu, '-')}`,
    },
    actions: {
        createEvent(
            { getters }: EventActionStoreParams,
            { name, detail, init }: CreateEvent
        ) {
            return new CustomEvent(getters.eventName(name), {
                ...init,
                detail,
            });
        },
        dispatchEvent(_: EventActionStoreParams, event: CustomEvent) {
            document.dispatchEvent(event);
        },
        addListener({ getters }: EventActionStoreParams, { name, listener }) {
            document.addEventListener(getters.eventName(name), listener);
        },
    } as ActionTree<RootState, RootState>,
} as Module<RootState, RootState>;
