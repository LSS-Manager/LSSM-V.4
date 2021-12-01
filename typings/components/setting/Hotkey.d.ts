import HotkeyUtility from '../../../src/modules/hotkeys/assets/HotkeyUtility';

export interface Hotkey {
    readonly: boolean;
    utility: HotkeyUtility;
}

export interface HotkeyMethods {
    startRecording(): void;
}

export interface HotkeyProps {
    name: string;
    value: string;
}

export interface HotkeyComputed {
    updateValue: string;
}
