import { ModuleMainFunction } from 'typings/Module';

import HotkeyUtility, { CallbackFunction } from './assets/HotkeyUtility';

type Scope = Record<string, CallbackFunction | ValidatedScope>;
interface ValidatedScope extends Scope {
    validatorFunction: () => boolean;
}

const commands: Scope = {
    '*': {
        validatorFunction: () => true,
        alert,
    },
    'main': {
        validatorFunction: () => window.location.pathname.length <= 1,
        chat: {
            validatorFunction: () =>
                !!document.getElementById('alliance_chat_message'),
            focus() {
                console.log('heyya, focusing the unfocused chat!');
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
        let base = commands;
        let callback: CallbackFunction | null = null;
        const path = command.split('.');
        const walkedPath: string[] = [];
        for (const scope of path) {
            if (!base.hasOwnProperty(scope)) {
                return LSSM.$store.dispatch('console/error', [
                    `Hotkeys: scope ${scope} does not exist on ${walkedPath.join(
                        '.'
                    )}! Cannot add command ${command} with hotkey »${hotkey}«`,
                ]);
            }
            const result = base[scope];
            if (typeof result === 'function') {
                callback = result;
            } else {
                if (!result.validatorFunction()) return;
                base = result;
            }
            walkedPath.push(scope);
        }
        if (callback) {
            hotkeyUtility.addListener(
                HotkeyUtility.createListener(hotkey.split(' '), callback)
            );
            console.log(hotkeyUtility.currentListeners);
        } else {
            return LSSM.$store.dispatch('console/error', [
                `Hotkeys: ${command} is not a function! Cannot add it with hotkey »${hotkey}«`,
            ]);
        }
    });
}) as ModuleMainFunction;
