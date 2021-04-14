import { Command } from './Command';
import { DOM } from './DOM';
import { Escape } from './Escape';
import { Options } from './Options';
import { SCEditor } from './SCEditor';
import { Utils } from './Utils';

export interface sceditor {
    command: {
        get: (name: string) => unknown;
        set: (name: string, cmd: unknown) => unknown;
        remove: (name: string) => unknown;
    };
    commands: Record<string, Command>;
    defaultOptions: Options;
    ios: boolean;
    isWysiwygSupported: boolean;
    regexEscape: Escape['regex'];
    escapeEntities: Escape['entities'];
    escapeUriScheme: Escape['uriScheme'];
    dom: {
        css: DOM['css'];
        attr: DOM['attr'];
        removeAttr: DOM['removeAttr'];
        is: DOM['is'];
        closest: DOM['closest'];
        width: DOM['width'];
        height: DOM['height'];
        traverse: DOM['traverse'];
        rTraverse: DOM['rTraverse'];
        parseHTML: DOM['parseHTML'];
        hasStyling: DOM['hasStyling'];
        convertElement: DOM['convertElement'];
        blockLevelList: string;
        canHaveChildren: DOM['canHaveChildren'];
        isInline: DOM['isInline'];
        copyCSS: DOM['copyCSS'];
        fixNesting: DOM['fixNesting'];
        findCommonAncestor: DOM['findCommonAncestor'];
        getSibling: DOM['getSibling'];
        removeWhiteSpace: DOM['removeWhiteSpace'];
        extractContents: DOM['extractContents'];
        getOffset: DOM['getOffset'];
        getStyle: DOM['getStyle'];
        hasStyle: DOM['hasStyle'];
    };
    locale: string;
    icons: unknown;
    utils: {
        each: Utils['each'];
        isEmptyObject: Utils['isEmptyObject'];
        extend: Utils['extend'];
    };
    plugins: unknown;
    formats: unknown;
    create(textarea: HTMLTextAreaElement, options: Options): void;
    instance(textarea: HTMLTextAreaElement): SCEditor | null;
}
