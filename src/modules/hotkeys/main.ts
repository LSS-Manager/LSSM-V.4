import { ModuleMainFunction } from 'typings/Module';

import HotkeyUtility, { CallbackFunction } from './assets/HotkeyUtility';

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
// eslint-disable-next-line @typescript-eslint/ban-types
type Empty = {};
type Scope<
    This extends Record<string, unknown> = Empty,
    Scopes extends string[] = [],
    Commands extends string[] = [],
    Root extends boolean = false
> = Id<
    (Root extends false
        ? {
              validatorFunction(this: This): boolean;
          }
        : Empty) &
        { [scope in Scopes[number]]: Scope<This> } &
        {
            [command in Commands[number]]: (
                this: This,
                ...args: Parameters<CallbackFunction>
            ) => ReturnType<CallbackFunction>;
        }
>;

const commands: Scope<Empty, ['*', 'main'], [], true> = {
    '*': <Scope<Empty, [], ['alert']>>{
        validatorFunction: () => true,
        alert: sequence => window.alert(JSON.stringify(sequence)),
    },
    'main': <Scope<Empty, ['chat']>>{
        validatorFunction: () => window.location.pathname.length <= 1,
        chat: <Scope<{ chatInput: HTMLInputElement }, [], ['focus']>>{
            validatorFunction() {
                const chatInput = document.querySelector<HTMLInputElement>(
                    '#alliance_chat_message'
                );
                if (chatInput) this.chatInput = chatInput;
                return !!chatInput;
            },
            focus() {
                this.chatInput.focus();
            },
        },
    },
};

export default (async (LSSM, MODULE_ID) => {
    const getSetting = (settingId: string) => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    const hotkeyUtility = new HotkeyUtility();

    const hotkeys = (await getSetting('hotkeys')).value as {
        command: string;
        hotkey: string;
    }[];

    if (hotkeys.length) hotkeyUtility.listen([]);

    hotkeys.forEach(({ command, hotkey }) => {
        let base: Scope<Empty, [], [], true> = commands;
        let callback: CallbackFunction | null = null;
        const path = command.split('.');
        const walkedPath: string[] = [];

        const validationResult: Record<string, unknown> = {};

        for (const scope of path) {
            if (!base.hasOwnProperty(scope)) {
                return LSSM.$store.dispatch('console/error', [
                    `Hotkeys: scope ${scope} does not exist on ${walkedPath.join(
                        '.'
                    )}! Cannot add command ${command} with hotkey »${hotkey}«`,
                ]);
            }
            walkedPath.push(scope);
            const result = base[scope as keyof typeof base] as
                | CallbackFunction
                | Scope;
            if (typeof result === 'function') {
                callback = result as CallbackFunction;
            } else {
                if (!result.validatorFunction.bind(validationResult)()) return;
                base = result;
            }
        }
        if (callback) {
            hotkeyUtility.addListener(
                HotkeyUtility.createListener(
                    hotkey.split(' '),
                    callback.bind(validationResult)
                )
            );
            console.log(hotkeyUtility.currentListeners);
        } else {
            return LSSM.$store.dispatch('console/error', [
                `Hotkeys: ${command} is not a function! Cannot add it with hotkey »${hotkey}«`,
            ]);
        }
    });
}) as ModuleMainFunction;
