export interface DOM {
    createElement(
        tag: string,
        attributes?: {
            [x: string]: string;
        },
        context?: Document
    ): HTMLElement;
    parents(node: HTMLElement, selector?: string): Array<HTMLElement>;
    parent(node: HTMLElement, selector?: string): HTMLElement | undefined;
    closest(node: HTMLElement, selector: string): HTMLElement | undefined;
    remove(node: HTMLElement): void;
    appendChild(node: HTMLElement, child: HTMLElement): void;
    find(node: HTMLElement, selector: string): NodeList;
    on(
        node: Node,
        events: string,
        selector: string | undefined,
        fn: (arg0: unknown) => unknown,
        capture?: boolean
    ): void;
    off(
        node: Node,
        events: string,
        selector: string | undefined,
        fn: (arg0: unknown) => unknown,
        capture?: boolean
    ): void;
    attr(
        node: HTMLElement,
        attr: string,
        value?: string | null,
        ...args: unknown[]
    ): string;
    removeAttr(node: HTMLElement, attr: string): void;
    hide(node: HTMLElement): void;
    show(node: HTMLElement): void;
    toggle(node: HTMLElement): void;
    css(
        node: HTMLElement,
        rule: unknown | string,
        value?: string | number,
        ...args: unknown[]
    ): string | number | undefined;
    data(
        node: Node,
        key?: string,
        value?: string,
        ...args: unknown[]
    ): unknown | undefined;
    is(node: HTMLElement | null, selector: string): boolean;
    contains(node: Node, child: HTMLElement): boolean;
    previousElementSibling(node: Node, selector?: string): HTMLElement | null;
    insertBefore(node: Node, refNode: Node): Node;
    hasClass(node: HTMLElement | null, className: string): boolean;
    addClass(node: HTMLElement, className: string): void;
    removeClass(node: HTMLElement, className: string): void;
    toggleClass(node: HTMLElement, className: string, state?: boolean): void;
    width(node: HTMLElement, value?: number | string): number | undefined;
    height(node: HTMLElement, value?: number | string): number | undefined;
    trigger(node: HTMLElement, eventName: string, data?: unknown): void;
    isVisible(node: unknown): boolean;
    traverse(
        node: HTMLElement,
        func: (...args: unknown[]) => unknown,
        innermostFirst: boolean,
        siblingsOnly: boolean,
        reverse?: boolean
    ): boolean;
    rTraverse(
        node: unknown,
        func: unknown,
        innermostFirst: unknown,
        siblingsOnly: unknown
    ): void;
    parseHTML(html: string, context?: Document): DocumentFragment;
    hasStyling(node: unknown): boolean;
    convertElement(element: HTMLElement, toTagName: string): HTMLElement;
    canHaveChildren(node: Node): boolean;
    isInline(elm: HTMLElement, includeCodeAsBlock?: boolean): boolean;
    copyCSS(from: HTMLElement, to: HTMLElement): void;
    fixNesting(node: HTMLElement): void;
    findCommonAncestor(
        node1: HTMLElement,
        node2: HTMLElement
    ): HTMLElement | null;
    getSibling(node: unknown, previous?: boolean): Node | null;
    removeWhiteSpace(root: HTMLElement): void;
    extractContents(
        startNode: HTMLElement,
        endNode: HTMLElement
    ): DocumentFragment;
    getOffset(node: HTMLElement): unknown;
    getStyle(elm: HTMLElement, property: string): string;
    hasStyle(
        elm: HTMLElement,
        property: string,
        values?: string | unknown[]
    ): boolean;
    ELEMENT_NODE: number;
    TEXT_NODE: number;
    COMMENT_NODE: number;
    DOCUMENT_NODE: number;
    DOCUMENT_FRAGMENT_NODE: number;
    EVENT_CAPTURE: boolean;
    EVENT_BUBBLE: boolean;
    blockLevelList: string;
}
