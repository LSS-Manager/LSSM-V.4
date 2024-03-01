import TypedWorker from '../../TypedWorker';

import type { Mission } from 'typings/Mission';

export type MissionsById = Record<Mission['id'], Mission>;
export type MissionsArray = Mission[];

interface MissionTypes {
    missions: MissionsById;
    missionArray: MissionsArray;
}

export default new TypedWorker<
    MissionTypes,
    [locale: string, init: RequestInit],
    Promise<MissionTypes>,
    ['checkRequestInit', 'LSSMStorage']
>(
    'api/missionTypes.worker',
    async (self, locale: string, init: RequestInit) => {
        self.checkRequestInit(init);

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
    ['checkRequestInit', 'LSSMStorage']
);
