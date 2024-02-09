import { ref } from 'vue';
// well, we cannot set default type import + non-default non-type import
// eslint-disable-next-line no-duplicate-imports
import type Vue from 'vue';

import { defineStore } from 'pinia';
import FetchWorker from '@workers/stores/api/fetch.worker';

// TODO: Rename to defineAPIStore and id to api
export const defineNewAPIStore = defineStore('newApi', () => {
    // TODO: fetch secretKey from according endpoint
    const secretKey = ref<string>('');

    const getRequestInit = (
        init: RequestInit,
        feature: string,
        isRequestToLSSMServer = false
    ) => {
        init.mode ||= 'cors';
        init.cache ||= 'no-cache';

        // convert headers to be a Headers object for easier manipulation
        init.headers = new Headers(init.headers);

        init.headers.set('X-LSS-Manager', VERSION);
        init.headers.set('X-LSS-Manager-Branch', BRANCH);
        init.headers.set('X-LSS-Manager-Feature', feature);

        if (isRequestToLSSMServer) {
            init.headers.set(
                'X-LSSM-User',
                btoa(`${secretKey.value}:${VERSION}-${MODE}`)
            );
        }

        // convert headers back to a plain object, otherwise it's not cloneable
        init.headers = Object.fromEntries(init.headers);

        return init;
    };

    const request = (
        inputOrUrl: Request | URL | string,
        feature: string,
        init: RequestInit = {},
        dialogOnError = false
    ): Promise<Response> =>
        FetchWorker.run(inputOrUrl, getRequestInit(init, feature)).then(
            response => {
                if (response.ok) return response;

                // if it has been a request to the LSSM server, and it reported to have detected and outdated version
                if (
                    response.url.startsWith(SERVER) &&
                    response.headers
                        .get('content-type')
                        ?.startsWith('application/json')
                ) {
                    return response.json().then(data => {
                        if (data?.error !== 'outdated version')
                            return Promise.reject(response);
                        // show a dialog
                        return Promise.reject(response);
                    });
                }

                // if showDialogOnError is set, show a dialog
                if (dialogOnError) {
                    // show a dialog
                }
                return Promise.reject(response);
            }
        );

    return {
        request,
    };
});

// TODO: Rename to useAPIStore
export const useNewAPIStore: () => ReturnType<typeof defineNewAPIStore> = () =>
    (window[PREFIX] as Vue)?.$stores?.newApi ?? defineNewAPIStore();
