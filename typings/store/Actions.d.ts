import type { ActionContext } from 'vuex';
import type { RootState } from './RootState';

export type ActionStoreParams = ActionContext<RootState, RootState>;

export interface Hook {
    post: boolean;
    event: string;
    abortOnFalse: boolean;
    callback(...args: unknown[]): unknown | void;
}

export interface ProxyParams {
    post: boolean;
    name: string;
    trap: keyof ProxyHandler<never>;
    callback(...args: unknown[]): unknown | void;
}

export interface addStyle {
    selectorText: string;
    style: Record<string, string>;
}

export interface premodifyParams {
    event: string;
    callback?(...args: unknown[]): unknown;
}
export interface ObserveAsyncTab {
    tabSelector: string;
    callback(): unknown;
}
