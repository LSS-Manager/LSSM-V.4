import { Games } from '../Game';
import { returnTypeFunction } from 'typings/helpers';

export interface RootState {
    readonly prefix: string;
    readonly version: string;
    readonly mode: string;
    readonly lang: string;
    readonly discord: string;
    readonly games: Games;
    readonly hooks: {
        [event: string]: returnTypeFunction;
    };
    readonly mapkit: boolean;
}
