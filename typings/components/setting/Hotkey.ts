import * as Combokeys from 'combokeys';

export interface Hotkey {
    readonly: boolean;
    combokeys: Combokeys.Combokeys;
}

export interface HotkeyMethods {
    startRecording(): void;
}

export interface HotkeyProps {
    name: string;
    placeholder: string;
    value: string;
}

export interface HotkeyComputed {
    updateValue: string;
}
