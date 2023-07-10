import type { CallbackFunction } from '../../src/modules/hotkeys/assets/HotkeyUtility';
import type { RedesignKey } from 'typings/modules/Redesign';

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type Empty = Record<never, never>;
export type Scope<
    This extends Record<string, unknown> = Empty,
    Scopes extends string[] = [],
    Commands extends string[] = [],
    Root extends boolean = false,
    RedesignType extends RedesignKey | undefined = undefined,
> = Id<
    Partial<{ [scope in Scopes[number]]: Scope<This> }> &
        (Root extends false
            ? {
                  validatorFunction(this: This): Promise<boolean> | boolean;
              }
            : Empty) & {
            [command in Commands[number]]: (
                this: This,
                ...args: Parameters<CallbackFunction<RedesignType>>
            ) => ReturnType<CallbackFunction<RedesignType>>;
        }
>;
