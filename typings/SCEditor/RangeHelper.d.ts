export default class RangeHelper {
    constructor(win: unknown, d: unknown, sanitize: unknown);
    insertHTML: (html: string, endHTML?: string) => boolean;
    insertNode: (node: Node, endNode: Node) => false | undefined;
    cloneSelected: () => Range;
    selectedRange: () => Range;
    hasSelection: () => boolean;
    selectedHtml: () => string;
    parentNode: () => HTMLElement;
    getFirstBlockParent: (node: unknown) => HTMLElement;
    insertNodeAt: (start: unknown, node: Node) => boolean;
    insertMarkers: () => void;
    getMarker: (id: string) => Node;
    removeMarker: (id: string) => void;
    removeMarkers: () => void;
    saveRange: () => void;
    selectRange: (range: Range) => void;
    restoreRange: () => boolean;
    selectOuterText: (left: number, right: number) => boolean;
    getOuterText: (before: boolean, length: number) => string;
    replaceKeyword: (
        keywords: unknown[],
        includeAfter: boolean,
        keywordsSorted: boolean,
        longestKeyword: number,
        requireWhitespace: boolean,
        keypressChar: string
    ) => boolean;
    compare: (rngA: Range, rngB?: Range) => boolean;
    clear: () => void;
}
