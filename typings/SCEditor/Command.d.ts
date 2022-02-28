export interface Command {
    exec:
        | string
        | (() => void)
        | ((caller: unknown, html: unknown, author: unknown) => void)
        | ((caller: unknown) => void);
    tooltip: string;
    shortcut?: string;
    state?:
        | (() => -1 | 0)
        | ((node: Node) => boolean | void)
        | ((parent: Node, firstBlock: Node) => -1 | 0);
    _dropDown?:
        | ((
              editor: unknown,
              caller: unknown,
              selected: unknown,
              cb: unknown
          ) => void)
        | ((editor: unknown, caller: unknown, callback: unknown) => void);
    errorMessage?: string;
    txtExec?: (() => void) | ((caller: unknown) => void);
    _date?(editor: unknown): unknown;
    _time?(): string;
}
