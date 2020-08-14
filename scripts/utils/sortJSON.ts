const sortJSON = (object: unknown, arrays = false): unknown => {
    if (typeof object !== 'object' || !object) return object;
    if (Array.isArray(object)) {
        const mapped = object.map(e => sortJSON(e));
        if (arrays) return mapped.sort();
        return mapped;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Object.fromEntries(
        Object.entries(object).sort(([keyA], [keyB]) =>
            keyA < keyB ? -1 : keyA > keyB ? 1 : 0
        )
    );
};

export default sortJSON;
