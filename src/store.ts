import Vuex, {
    ActionTree,
    GetterTree,
    ModuleTree,
    MutationTree,
    Store,
    StoreOptions,
} from 'vuex';
import { RootState } from '../typings/store/RootState';
import { VueConstructor } from 'vue/types/vue';
import config from './config';
import { ActionStoreParams, Hook } from '../typings/store/Actions';
import { ExtendedWindow, LSSMEvent } from '../typings/helpers';
import storage from './store/storage';

export default (Vue: VueConstructor): Store<RootState> => {
    Vue.use(Vuex);

    return new Vuex.Store<RootState>({
        modules: {
            storage,
        } as ModuleTree<RootState>,
        state: {
            prefix: PREFIX,
            version: VERSION,
            mode: MODE,
            lang: BUILD_LANG,
            discord: config.discord,
            games: config.games,
            hooks: {},
            mapkit:
                'undefined' ===
                typeof ((window as unknown) as ExtendedWindow).mapkit,
        },
        mutations: {
            addHook(state: RootState, event: string) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state.hooks[event] = window[event];
            },
        } as MutationTree<RootState>,
        getters: {
            nodeAttribute: (state: RootState) => (attr: string): string =>
                `${state.prefix}-${attr}`,
            wiki: (state: RootState): string =>
                `${config.server}docs/${state.lang}`,
        } as GetterTree<RootState, RootState>,
        actions: {
            hook(
                { state, commit }: ActionStoreParams,
                { post = true, event, callback = () => null }: Hook
            ) {
                if (!state.hooks.hasOwnProperty(event)) {
                    commit('addHook', event);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    window[event] = (...args: unknown[]) => {
                        document.dispatchEvent(
                            new CustomEvent(`lssm_${event}_before`, {
                                detail: args,
                            })
                        );
                        state.hooks[event](...args);
                        document.dispatchEvent(
                            new CustomEvent(`lssm_${event}_after`, {
                                detail: args,
                            })
                        );
                    };
                }
                document.addEventListener(
                    `lssm_${event}_${post ? 'after' : 'before'}`,
                    event =>
                        callback(...((event as unknown) as LSSMEvent).detail)
                );
            },
        } as ActionTree<RootState, RootState>,
    } as StoreOptions<RootState>);
};
