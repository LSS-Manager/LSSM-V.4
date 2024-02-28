import TypedWorker from '../../TypedWorker';

import type LSSMStorage from '../../../importableScripts/indexedDB';
import type { Mission } from 'typings/Mission';

export type MissionsById = Record<Mission['id'], Mission>;
export type MissionsArray = Mission[];

declare const self: WindowOrWorkerGlobalScope & {
    missions: MissionsById;
    missionArray: MissionsArray;
    LSSMStorage: typeof LSSMStorage;
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

        return fetch(`${SERVER}missions/${locale}.json`, init)
            .then(res => res.json())
            .then((missions: MissionsById) => {
                self.missions = missions;
                self.missionArray = Object.values(missions);
                const storage = new self.LSSMStorage();
                storage.storeMissionTypes(missions).then();
                return { missions, missionArray: self.missionArray };
            })
            .catch(async () => {
                // if the fetch fails, try to get the missionTypes from indexedDB
                const storage = new self.LSSMStorage();
                const missionTypes = await storage.getMissionTypes();
                self.missions = missionTypes;
                self.missionArray = Object.values(missionTypes);
                return {
                    missions: missionTypes,
                    missionArray: self.missionArray,
                };
            });
    },
    new Set(['LSSMStorage'])
);
