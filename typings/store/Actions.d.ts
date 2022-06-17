export interface Hook<Arguments extends unknown[]> {
    event: string;
    post?: boolean;
    abortOnFalse?: boolean;
    callback(...args: Arguments): unknown | void;
}

export interface ProxyParams {
    post: boolean;
    name: string;
    trap: keyof ProxyHandler<never>;
    callback(...args: unknown[]): unknown | void;
}

export interface addStyle {
    selectorText: string;
    style: Record<string, number | string>;
}

export interface premodifyParams {
    event: string;
    callback?(...args: unknown[]): unknown;
}
export interface ObserveAsyncTab {
    tabSelector: string;
    callback(): unknown;
}
