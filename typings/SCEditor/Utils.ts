export interface Utils {
    isEmptyObject(obj: unknown): boolean;
    extend(
        targetArg: unknown | boolean,
        sourceArg: unknown,
        ...args: unknown[]
    ): unknown;
    arrayRemove(arr: unknown[], item: unknown): void;
    each(
        obj: unknown | unknown[],
        fn: (arg0: unknown, arg1: unknown) => unknown
    ): void;
    isString: (arg0: unknown) => boolean;
    isUndefined: (arg0: unknown) => boolean;
    isFunction: (arg0: unknown) => boolean;
    isNumber: (arg0: unknown) => boolean;
}
