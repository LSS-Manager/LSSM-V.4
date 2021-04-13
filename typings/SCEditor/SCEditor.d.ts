import { Options } from 'typings/SCEditor/Options';
import RangeHelper from './RangeHelper';

export class SCEditor {
    constructor(original: HTMLTextAreaElement, userOptions: Options);
    commands: unknown;
    opts: unknown;
    readOnly: (readOnly: boolean) => this;
    rtl: (rtl: boolean) => this;
    width: (width: number, saveWidth?: boolean) => this;
    dimensions: (width: number, height: number, save?: boolean) => this;
    height: (height: number, saveHeight?: boolean) => this;
    maximize: (maximize: boolean) => this;
    expandToContent: (ignoreMaxHeight?: boolean) => void;
    destroy: () => void;
    createDropDown: (
        menuItem: HTMLElement,
        name: string,
        content: HTMLElement
    ) => void;
    closeDropDown: (focus?: boolean) => void;
    wysiwygEditorInsertHtml: (
        html: string,
        endHtml?: string,
        overrideCodeBlocking?: boolean
    ) => void;
    wysiwygEditorInsertText: (text: string, endText?: string) => void;
    insertText: (text: string, endText?: string) => SCEditor;
    sourceEditorInsertText: (text: string, endText?: string) => void;
    getRangeHelper: () => RangeHelper;
    sourceEditorCaret: (position?: unknown) => this;
    val: (val: string, filter?: boolean) => this;
    insert: (
        start: string,
        end?: string,
        filter?: boolean,
        convertEmoticons?: boolean,
        allowMixed?: boolean
    ) => this;
    getWysiwygEditorValue: (filter?: boolean) => string;
    getBody: () => HTMLElement;
    getContentAreaContainer: () => HTMLElement;
    getSourceEditorValue: (filter?: boolean) => string;
    setWysiwygEditorValue: (value: string) => void;
    setSourceEditorValue: (value: string) => void;
    updateOriginal: () => void;
    inSourceMode: () => boolean;
    sourceMode: (enable: boolean) => this;
    toggleSourceMode: () => void;
    execCommand: (command: string, param?: string | boolean) => void;
    currentNode: () => Node | null;
    currentBlockNode: () => Node | null;
    _: (...args: string[]) => string;
    bind: (
        events: string,
        handler: (...args: unknown[]) => unknown,
        excludeWysiwyg: boolean,
        excludeSource: boolean
    ) => this;
    unbind: (
        events: string,
        handler: (...args: unknown[]) => unknown,
        excludeWysiwyg: boolean,
        excludeSource: boolean
    ) => this;
    blur: (
        handler: (...args: unknown[]) => unknown,
        excludeWysiwyg: boolean,
        excludeSource: boolean
    ) => this;
    focus: (
        handler: (...args: unknown[]) => unknown,
        excludeWysiwyg: boolean,
        excludeSource: boolean
    ) => this;
    keyDown: (
        handler: (...args: unknown[]) => unknown,
        excludeWysiwyg: boolean,
        excludeSource: boolean
    ) => this;
    keyPress: (
        handler: (...args: unknown[]) => unknown,
        excludeWysiwyg: boolean,
        excludeSource: boolean
    ) => this;
    keyUp: (
        handler: (...args: unknown[]) => unknown,
        excludeWysiwyg: boolean,
        excludeSource: boolean
    ) => this;
    nodeChanged: (handler: (...args: unknown[]) => unknown) => this;
    selectionChanged: (handler: (...args: unknown[]) => unknown) => this;
    valueChanged: (
        handler: (...args: unknown[]) => unknown,
        excludeWysiwyg: boolean,
        excludeSource: boolean
    ) => this;
    emoticons: (enable: boolean) => this;
    css: (css: string) => this;
    addShortcut: (
        shortcut: string,
        cmd: string | ((...args: unknown[]) => unknown)
    ) => unknown;
    removeShortcut: (shortcut: string) => unknown;
    clearBlockFormatting: (block: HTMLElement) => SCEditor;
}
