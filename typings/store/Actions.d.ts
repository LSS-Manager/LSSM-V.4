/**
 * @file - Types for the actions of root store.
 */

export interface Hook<Arguments extends unknown[]> {
    event: string;
    post?: boolean;
    abortOnFalse?: boolean;
    callback(...args: Arguments): unknown | void;
}

export interface ProxyParams {
    post?: boolean;
    name: string;
    trap: keyof ProxyHandler<never>;
    callback(...args: unknown[]): unknown | void;
}

export interface addStyle {
    selectorText: string;
    style: Record<string, number | string>;
}

export type premodifyParams<Args extends unknown[] = []> =
    | {
          event: string;
          callback?(...args: Args): Args;
          returnModification: true;
      }
    | {
          event: string;
          callback?(...args: unknown[]): void;
          returnModification?: false;
      };
export interface ObserveAsyncTab {
    tabSelector: string;
    callback(): unknown;
}
