import { ModuleMainFunction } from 'typings/Module';
import { Empty, Scope } from 'typings/modules/Hotkeys';

import getCommandName from './assets/getCommandName';
import HotkeyUtility, { CallbackFunction } from './assets/HotkeyUtility';

const rootCommandScopes: ['*', 'main'] = ['*', 'main'];

export default (async (LSSM, MODULE_ID, $m) => {
    const getSetting = (settingId: string) => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    const isMainWindow = window.location.pathname.length <= 1;

    const commands: Scope<Empty, typeof rootCommandScopes, [], true> = {
        '*': (
            await import(
                /* webpackChunkName: "modules/hotkeys/commands/general" */ './assets/commands/general'
            )
        ).default,
        ...(isMainWindow
            ? {
                  main: {
                      validatorFunction: () => isMainWindow,
                      ...(
                          await import(
                              /* webpackChunkName: "modules/hotkeys/commands/main" */ './assets/commands/main'
                          )
                      ).default,
                  },
              }
            : {}),
    };

    const hotkeyUtility = new HotkeyUtility();

    const hotkeys = (await getSetting('hotkeys')).value as {
        command: string;
        hotkey: string;
    }[];

    if (hotkeys.length) {
        window.addEventListener('keydown', event => {
            if (event.key.toLowerCase() === 'f1') event.preventDefault();
        });
        hotkeyUtility.listen([
            HotkeyUtility.createListener(['f1'], () => {
                LSSM.$modal.show(
                    () =>
                        import(
                            /* webpackChunkName: "modules/hotkeys/help" */ './components/help.vue'
                        ),
                    {
                        hotkeys,
                        getCommandName: (command: string) =>
                            getCommandName(command, $m),
                    },
                    { name: 'hotkeysHelp', height: 'auto' }
                );
            }),
        ]);
    }

    hotkeys.forEach(({ command, hotkey }) => {
        let base: Scope<Empty, [], [], true> = commands;
        let callback: CallbackFunction | null = null;
        const path = command.split('.');
        const walkedPath: string[] = [];

        const validationResult: Record<string, unknown> = {};

        for (const scope of path) {
            if (!base.hasOwnProperty(scope)) {
                if (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore because TypeScript sometimes :)
                    rootCommandScopes.includes(scope) &&
                    !walkedPath.length
                )
                    return;
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
        } else {
            return LSSM.$store.dispatch('console/error', [
                `Hotkeys: ${command} is not a function! Cannot add it with hotkey »${hotkey}«`,
            ]);
        }
    });
}) as ModuleMainFunction;
