/* eslint-disable no-console */
import type Vue from 'vue';

import { defineStore } from 'pinia';

interface ComplexMessage {
    messages: object[];
}
type MessageParameter =
    | ComplexMessage
    | unknown[]
    | boolean
    | number
    | object
    | string;

const isComplexMessage = (
    message: MessageParameter
): message is ComplexMessage => message.hasOwnProperty('messages');

export const defineConsoleStore = defineStore('console', {
    state: () => ({}),
    getters: {
        prefixed: () => (messages: unknown[]) => [
            `%cLSSM V${VERSION}%c: ${messages
                .map(message => {
                    switch (typeof message) {
                        case 'string':
                            return '%s';
                        case 'number':
                        case 'bigint':
                            return Number.isInteger(message) ? '%i' : '%f';
                        default:
                            return '%o';
                    }
                })
                .join(' ')}`,
            'font-weight: bold;',
            'font-weight: normal;',
            ...messages,
        ],
    },
    actions: {
        _writeToConsole(
            level: 'debug' | 'error' | 'info' | 'log' | 'warn',
            message: MessageParameter
        ) {
            if (isComplexMessage(message))
                return console[level](...this.prefixed(message.messages));
            console[level](...this.prefixed([message]));
        },
        debug(message: MessageParameter) {
            this._writeToConsole('debug', message);
        },
        error(message: MessageParameter) {
            this._writeToConsole('error', message);
        },
        info(message: MessageParameter) {
            this._writeToConsole('info', message);
        },
        log(message: MessageParameter) {
            this._writeToConsole('log', message);
        },
        warn(message: MessageParameter) {
            this._writeToConsole('warn', message);
        },
    },
});

export const useConsoleStore: () => ReturnType<
    typeof defineConsoleStore
> = () => (window[PREFIX] as Vue)?.$stores?.console ?? defineConsoleStore();
