import { RootState } from '../../typings/store/RootState';
import { ActionTree, Module } from 'vuex';
import {
    CreateEvent,
    EventActionStoreParams,
} from 'typings/store/event/Actions';

export default {
    namespaced: true,
    getters: {
        eventName: (_s, _g, rootState) => (name: string) =>
            `${rootState.prefix}-event-${name
                .replace(/ /g, '_')
                .replace(/["']/g, '')
                .replace(/[^a-zA-Z0-9_\-.]/g, '-')}`,
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
