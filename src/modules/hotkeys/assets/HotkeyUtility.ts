import isEqual from 'lodash/isEqual';

import type { RedesignVehicleComponent } from '../../redesign/types/components/vehicle';
import type {
    RedesignKey,
    RedesignLightbox,
    RedesignLightboxVue,
} from 'typings/modules/Redesign';

type Sequence = string[][];
type NormalizedSequence = string[];
export type CallbackFunction<
    RedesignType extends RedesignKey | undefined = undefined,
> = (
    sequence: string[],
    redesign?: RedesignType extends RedesignKey
        ? RedesignParameter<RedesignType>
        : undefined
) => void;
type Listener =
    | [
          string,
          NormalizedSequence,
          CallbackFunction<RedesignKey>,
          RedesignParameter,
      ]
    | [string, NormalizedSequence, CallbackFunction];

type ModifierAttributes = 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey';
type Modifiers = 'alt' | 'control' | 'meta' | 'shift';

export interface RedesignParameter<
    RedesignType extends RedesignKey = RedesignKey,
> {
    element: Element;
    data: RedesignLightbox<RedesignType>['Data']['data'];
    lightbox: RedesignLightboxVue<RedesignType>;
    component: Omit<
        RedesignType extends 'vehicle'
            ? RedesignVehicleComponent['Computed']['hotkeysParam']
            : {
                  data: Record<string, unknown>;
                  methods: Record<string, (...args: unknown[]) => unknown>;
                  computed: Record<string, unknown>;
              },
        'component'
    >;
}

export default class HotkeyUtility {
    private static readonly modifiers: Record<ModifierAttributes, Modifiers> = {
        ctrlKey: 'control',
        metaKey: 'meta',
        shiftKey: 'shift',
        altKey: 'alt',
    };
    private static readonly nameReplacements: Record<string, string> = {
        ' ': 'space',
    };
    private static readonly defaultCallback = () => void 0;
    private static readonly timeoutLength = 500;

    public static activeCommands: Record<string, Listener> = {};

    public static createListener(
        command: string,
        sequence: string[],
        callback: CallbackFunction
    ): Listener {
        return [command, sequence, callback];
    }

    private readonly sequence: Sequence = [];
    private readonly currentKeys: string[] = [];
    private readonly executedListeners: NormalizedSequence[] = [];

    private get listeners() {
        return Object.values(HotkeyUtility.activeCommands);
    }

    private timer = 0;
    private recordedChar = false;
    private recording = false;

    private recordCallback: CallbackFunction = HotkeyUtility.defaultCallback;

    public record(inputField: HTMLElement, callback: CallbackFunction): void {
        this.reset();
        this.recording = true;

        const eventListener = (event: KeyboardEvent) => this.handleKey(event);

        this.recordCallback = sequence => {
            this.recordCallback = HotkeyUtility.defaultCallback;
            inputField.removeEventListener('keydown', eventListener);
            inputField.removeEventListener('keyup', eventListener);
            this.recording = false;
            callback(sequence);
        };

        inputField.addEventListener('keydown', eventListener);
        inputField.addEventListener('keyup', eventListener);
    }

    private eventListener = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement | null;
        if (
            this.recording ||
            ['INPUT', 'SELECT', 'TEXTAREA'].includes(target?.tagName ?? '') ||
            target?.isContentEditable
        )
            return;
        this.handleKey(event);
        const normalized = this.normalizeSequence();
        if (event.type === 'keyup' && !this.currentKeys.length) {
            this.listeners.forEach(([, sequence, callback, ...args]) => {
                if (
                    isEqual(sequence, normalized) &&
                    !this.executedListeners.includes(sequence)
                ) {
                    this.executedListeners.push(sequence);
                    // for some reason, TS does not understand some stuff here
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    callback(sequence, ...args);
                    window.setTimeout(() => {
                        if (this.executedListeners.includes(sequence)) {
                            this.executedListeners.splice(
                                this.executedListeners.indexOf(sequence),
                                1
                            );
                        }
                    }, HotkeyUtility.timeoutLength);
                }
            });
        }
        this.restartTimer();
    };

    public listen(listeners: Listener[]): void {
        listeners.forEach(listener => this.addListener(listener));

        window.addEventListener('keydown', this.eventListener);
        window.addEventListener('keyup', this.eventListener);
    }

    public addListener(listener: Listener): void {
        HotkeyUtility.activeCommands[listener[0]] = listener;
    }

    public removeListener(listener: Listener): void {
        delete HotkeyUtility.activeCommands[listener[0]];
        if (this.listeners.length) return;
        window.removeEventListener('keydown', this.eventListener);
        window.removeEventListener('keyup', this.eventListener);
    }

    private handleKey(event: KeyboardEvent) {
        const [key, modifiers] = this.getKeyAndModifiers(event);
        if (this.recording) event.preventDefault();
        switch (event.type) {
            case 'keydown':
                if (key.length === 1 && this.recordedChar)
                    this.recordCurrentCombo();
                modifiers.forEach(modifier => this.recordKey(modifier));
                this.recordKey(key);
                if (key.length === 1) this.recordedChar = true;
                break;
            case 'keyup':
                if (this.currentKeys.length) this.recordCurrentCombo();
                break;
        }
    }

    private getKeyAndModifiers(event: KeyboardEvent): [string, Modifiers[]] {
        const key = event.key.toLowerCase();
        return [
            HotkeyUtility.nameReplacements[key] ?? key,
            Object.entries(HotkeyUtility.modifiers)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore because I cannot tell TS that modifier is of type ModifierAttributes
                .filter(([modifier]) => event[modifier])
                .map(([, key]) => key),
        ];
    }

    private recordKey(key: string) {
        if (!this.currentKeys.includes(key)) this.currentKeys.push(key);
    }

    private recordCurrentCombo() {
        this.sequence.push([...this.currentKeys]);
        this.currentKeys.splice(0);
        this.recordedChar = false;
        this.restartTimer();
    }

    private restartTimer() {
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(
            () => this.finishRecording(),
            HotkeyUtility.timeoutLength
        );
    }

    private finishRecording() {
        const normalized = this.normalizeSequence();

        this.reset();

        this.recordCallback(normalized);
    }

    private reset() {
        window.clearTimeout(this.timer);

        this.sequence.splice(0);
        this.currentKeys.splice(0);
        this.recordedChar = false;
    }

    private normalizeSequence(): NormalizedSequence {
        return [
            ...new Set([
                ...this.sequence.map(combo =>
                    combo
                        .sort((a, b) =>
                            a.length > b.length
                                ? -1
                                : a.length < b.length
                                ? 1
                                : a > b
                                ? 1
                                : -1
                        )
                        .join('+')
                ),
            ]),
        ];
    }
}
