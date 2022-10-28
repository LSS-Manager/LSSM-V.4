import getCommandName from './assets/getCommandName';
import HotkeyUtility, { type CallbackFunction } from './assets/HotkeyUtility';

import type { ModuleMainFunction } from 'typings/Module';
import type { Empty, Scope } from 'typings/modules/Hotkeys';

const rootCommandScopes: ['*', 'main', 'mission', 'building', 'vehicles'] = [
    '*',
    'main',
    'mission',
    'building',
    'vehicles',
];

type RootScope = typeof rootCommandScopes[number];
type RootScopeWithoutAll = Exclude<RootScope, '*'>;

const resolveCommands = async (rootScopes: RootScopeWithoutAll[]) => {
    const commands: Scope<Empty, RootScope[], [], true> = {
        '*': (
            await import(
                /* webpackChunkName: "modules/hotkeys/commands/general" */ './assets/commands/general'
            )
        ).default,
    };
    for (const scope of rootScopes) {
        commands[scope] = {
            validatorFunction: () => true,
            ...(
                await import(
                    /* webpackChunkName: "modules/hotkeys/commands/[request]" */ `./assets/commands/${scope}`
                )
            ).default,
        };
    }
    return commands;
};

export default (async ({ LSSM, $m, getSetting }) => {
    const rootScopes: RootScopeWithoutAll[] = [];
    if (window.location.pathname.length <= 1) rootScopes.push('main');
    if (window.location.pathname.match(/^\/missions\/\d+\/?/u))
        rootScopes.push('mission');
    if (window.location.pathname.match(/^\/buildings\/\d+\/?/u))
        rootScopes.push('building');
    if (window.location.pathname.match(/^\/vehicles\/\d+\/?/u))
        rootScopes.push('vehicles');

    const commands = await resolveCommands(rootScopes);

    const hotkeyUtility = new HotkeyUtility();

    type HotkeySetting = {
        command: string;
        hotkey: string;
    }[];

    const hotkeys = (
        await getSetting<{ value: HotkeySetting; enabled: boolean }>('hotkeys')
    ).value;

    if (hotkeys.length) {
        window.addEventListener('keydown', event => {
            if (event.key.toLowerCase() === 'f1') event.preventDefault();
        });
        hotkeyUtility.listen([
            HotkeyUtility.createListener('f1', ['f1'], () => {
                if (!LSSM.$stores.root.hotkeysHelpOpen) {
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
                        { name: 'hotkeysHelp', height: 'auto' },
                        {
                            'before-open': () =>
                                LSSM.$stores.root.setHotkeysHelpOpen(true),
                            'closed': () =>
                                LSSM.$stores.root.setHotkeysHelpOpen(false),
                        }
                    );
                }
            }),
        ]);
    }

    hotkeyLoop: for (const { command, hotkey } of hotkeys) {
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
                    continue hotkeyLoop;

                LSSM.$stores.console.error(
                    `Hotkeys: scope ${scope} does not exist on ${walkedPath.join(
                        '.'
                    )}! Cannot add command ${command} with hotkey »${hotkey}«`
                );
                continue hotkeyLoop;
            }
            walkedPath.push(scope);
            const result = base[scope as keyof typeof base] as
                | CallbackFunction
                | Scope;
            if (typeof result === 'function') {
                callback = result as CallbackFunction;
            } else {
                const validatorFn =
                    result.validatorFunction.bind(validationResult);
                const validatorResult = await validatorFn();
                if (!validatorResult) continue hotkeyLoop;
                base = result;
            }
        }
        if (callback) {
            hotkeyUtility.addListener(
                HotkeyUtility.createListener(
                    command,
                    hotkey.split(' '),
                    callback.bind(validationResult)
                )
            );
        } else {
            LSSM.$stores.console.error(
                `Hotkeys: ${command} is not a function! Cannot add it with hotkey »${hotkey}«`
            );
        }
    }
}) as ModuleMainFunction;
