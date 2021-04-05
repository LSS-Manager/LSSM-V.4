import { RootState } from './RootState';
import { ActionContext } from 'vuex';

export type ActionStoreParams = ActionContext<RootState, RootState>;

export interface Hook {
    post: boolean;
    event: string;
    abortOnFalse: boolean;
    callback(...args: unknown[]): void | unknown;
}

export interface ProxyParams {
    post: boolean;
    name: string;
    trap: keyof ProxyHandler<never>;
    callback(...args: unknown[]): void | unknown;
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
