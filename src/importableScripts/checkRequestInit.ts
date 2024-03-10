/**
 * Checks if the RequestInit has the LSSM-Header set and throws an error if not.
 * @param init - The RequestInit to check against.
 * @throws Error If the LSSM-Header is not set.
 */
export default (init: RequestInit) => {
    const headers = new Headers(init.headers);

    // CAVEAT: headers are stored lowercase
    // if the LSSM-Header is not set, abort the request!
    if (!headers.has('x-lss-manager')) {
        throw new Error(
            'No X-LSS-Manager Header has been set. Aborting the request!'
        );
    }
};
