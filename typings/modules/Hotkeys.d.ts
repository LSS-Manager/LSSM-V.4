import type { CallbackFunction } from '../../src/modules/hotkeys/assets/HotkeyUtility';

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type Empty = Record<never, never>;
export type Scope<
    This extends Record<string, unknown> = Empty,
    Scopes extends string[] = [],
    Commands extends string[] = [],
    Root extends boolean = false
> = Id<
    Partial<{ [scope in Scopes[number]]: Scope<This> }> & Root extends false
        ? {
              validatorFunction(this: This): boolean;
          }
        : Empty & {
              [command in Commands[number]]: (
                  this: This,
                  ...args: Parameters<CallbackFunction>
              ) => ReturnType<CallbackFunction>;
          }
>;
