const getKeyOrder = (keyA: string, keyB: string, top: string[]) => {
    if (top.includes(keyA) && !top.includes(keyB)) return -1;
    if (!top.includes(keyA) && top.includes(keyB)) return 1;
    return keyA.localeCompare(keyB);
};

const sortJSON = (
    object: unknown,
    arrays = false,
    top: string[] = []
): unknown => {
    if (typeof object !== 'object' || !object) return object;
    if (Array.isArray(object)) {
        const mapped = object.map(e => sortJSON(e, arrays, top));
        if (arrays) return mapped.sort();
        return mapped;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Object.fromEntries(
        Object.entries(object)
            .sort(([keyA], [keyB]) => getKeyOrder(keyA, keyB, top))
            .map(([key, value]) => [key, sortJSON(value, arrays, top)])
    );
};

export default sortJSON;
