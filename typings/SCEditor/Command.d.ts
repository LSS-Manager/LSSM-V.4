export interface Command {
    exec:
        | string
        | (() => void)
        | ((caller: unknown) => void)
        | ((caller: unknown, html: unknown, author: unknown) => void);
    tooltip: string;
    shortcut?: string;
    state?:
        | (() => 0 | -1)
        | ((node: Node) => boolean | void)
        | ((parent: Node, firstBlock: Node) => 0 | -1);
    _dropDown?:
        | ((editor: unknown, caller: unknown, callback: unknown) => void)
        | ((
              editor: unknown,
              caller: unknown,
              selected: unknown,
              cb: unknown
          ) => void);
    errorMessage?: string;
    txtExec?: (() => void) | ((caller: unknown) => void);
    _date?: (editor: unknown) => unknown;
    _time?: () => string;
}
