import TypedWorker from '../../TypedWorker';

import type { Mission } from 'typings/Mission';

export type MissionsById = Record<Mission['id'], Mission>;
export type MissionsArray = Mission[];

declare const self: WindowOrWorkerGlobalScope & {
    missions: MissionsById;
    missionArray: MissionsArray;
};

export default new TypedWorker(
    'api/missionTypes.worker',
    async (locale: string, init: RequestInit) => {
        const headers = new Headers(init.headers);

        // CAVEAT: headers are stored lowercase
        // if the LSSM-Header is not set, abort the request!
        if (!headers.has('x-lss-manager')) {
            return Promise.reject(
                new Error(
                    'No X-LSS-Manager Header has been set. Aborting the request!'
                )
            );
        }

        if (self.missions)
            return { missions: self.missions, missionArray: self.missionArray };

        // TODO: Store in an indexedDB (independence of LSSM-server status)
        // do we want to replace self.missions with the indexedDB?

        return fetch(`${SERVER}missions/${locale}.json`, init)
            .then(res => res.json())
            .then((missions: MissionsById) => {
                self.missions = missions;
                self.missionArray = Object.values(missions);
                return { missions, missionArray: self.missionArray };
            });
    }
);
