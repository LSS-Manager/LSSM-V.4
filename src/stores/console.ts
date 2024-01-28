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

const defineConsoleStore = defineStore('console', () => {
    const prefixed = (messages: unknown[]) => [
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
    ];

    const writeToConsole = (
        level: 'debug' | 'error' | 'info' | 'log' | 'warn',
        message: MessageParameter
    ) => {
        if (isComplexMessage(message))
            return console[level](...prefixed(message.messages));
        console[level](...prefixed([message]));
    };

    const debug = (message: MessageParameter) =>
        writeToConsole('debug', message);
    const error = (message: MessageParameter) =>
        writeToConsole('error', message);
    const info = (message: MessageParameter) => writeToConsole('info', message);
    const log = (message: MessageParameter) => writeToConsole('log', message);
    const warn = (message: MessageParameter) => writeToConsole('warn', message);

    return {
        debug,
        error,
        info,
        log,
        warn,
    };
});

export const useConsoleStore: () => ReturnType<
    typeof defineConsoleStore
> = () => (window[PREFIX] as Vue)?.$stores?.console ?? defineConsoleStore();
