import type { GroupTranslation } from '../../../src/modules/extendedCallWindow/assets/emv/getVehicleListObserveHandler';

export type MissionRequirement<Req extends string = string> = {
    requirement: Req;
    missing: number;
    driving: number;
} & (
    | {
          // progress bar requirements (foam, water, pump)
          selected: number;
          bar: 'foam' | 'pump' | 'water';
      }
    | {
          selected:
              | number // vehicle requirement
              | { min: number; max: number }; // staff requirement
          additional: GroupTranslation[number];
      }
);
