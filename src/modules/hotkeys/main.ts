import type Vue from 'vue';

import getCommandName from './assets/getCommandName';
import HotkeyUtility, {
    type CallbackFunction,
    type RedesignParameter,
} from './assets/HotkeyUtility';

import type { ModuleMainFunction } from 'typings/Module';
import type { Empty, Scope } from 'typings/modules/Hotkeys';

type RootScope = typeof rootCommandScopes[number];
export type RootScopeWithoutAll = Exclude<RootScope, '*'>;

type Commands = Scope<Empty, RootScope[], [], true>;

type HotkeySetting = {
    command: string;
    hotkey: string;
}[];

const rootCommandScopes: ['*', 'main', 'mission', 'building', 'vehicles'] = [
    '*',
    'main',
    'mission',
    'building',
    'vehicles',
];

export const hotkeyUtility = new HotkeyUtility();

export const readSetting = (
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting'] = (
        settingId,
        defaultValue
    ) =>
        (window[PREFIX] as Vue).$stores.settings.getSetting({
            moduleId: 'hotkeys',
            settingId,
            defaultValue,
        })
) =>
    getSetting<{ value: HotkeySetting; enabled: boolean }>('hotkeys').then(
        setting => setting.value
    );

export const resolveCommands = async (rootScopes: RootScopeWithoutAll[]) => {
    const commands: Commands = {
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

export const registerHotkeys = async (
    hotkeys: HotkeySetting,
    commands: Commands,
    redesignParam?: RedesignParameter,
    LSSM: Vue = window[PREFIX] as Vue
) => {
    hotkeyLoop: for (const { command, hotkey } of hotkeys) {
        if (HotkeyUtility.activeCommands[command]) continue;

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
            if (redesignParam)
                HotkeyUtility.activeCommands[command][3] = redesignParam;
        } else {
            LSSM.$stores.console.error(
                `Hotkeys: ${command} is not a function! Cannot add it with hotkey »${hotkey}«`
            );
        }
    }
};

export default (async ({ LSSM, $m, getSetting }) => {
    const hotkeys = await readSetting(getSetting);

    const rootScopes: RootScopeWithoutAll[] = [];
    if (
        hotkeys.some(({ command }) => command.startsWith('main.')) &&
        window.location.pathname.length <= 1
    )
        rootScopes.push('main');
    if (
        hotkeys.some(({ command }) => command.startsWith('mission.')) &&
        window.location.pathname.match(/^\/missions\/\d+\/?/u)
    )
        rootScopes.push('mission');
    if (
        hotkeys.some(({ command }) => command.startsWith('buildings.')) &&
        window.location.pathname.match(/^\/buildings\/\d+\/?/u)
    )
        rootScopes.push('building');
    if (
        hotkeys.some(({ command }) => command.startsWith('vehicles.')) &&
        window.location.pathname.match(/^\/vehicles\/\d+\/?/u)
    )
        rootScopes.push('vehicles');

    const commands = await resolveCommands(rootScopes);

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

    registerHotkeys(hotkeys, commands, undefined, LSSM).then();
}) as ModuleMainFunction;
