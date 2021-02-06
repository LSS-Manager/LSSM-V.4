import { RootState } from './RootState';
import { Commit, Dispatch, GetterTree } from 'vuex';

export interface ActionStoreParams {
    state: RootState;
    commit: Commit;
    dispatch: Dispatch;
    getters: GetterTree<RootState, RootState>;
}

export interface Hook {
    post: boolean;
    event: string;
    abortOnFalse: boolean;
    callback(...args: unknown[]): void | unknown;
}

export interface HookPrototype {
    post: boolean;
    base: string;
    event: string;
    callback(...args: unknown[]): void;
}

export interface addStyle {
    selectorText: string;
    style: { [index: string]: string };
}

export interface premodifyParams {
    event: string;
    callback?(...args: unknown[]): unknown;
}
export interface ObserveAsyncTab {
    tabSelector: string;
    callback(): unknown;
}
