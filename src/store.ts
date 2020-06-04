import Vuex, { GetterTree, Store, StoreOptions } from 'vuex';
import { RootState } from '../types/store/RootState';
import { VueConstructor } from 'vue/types/vue';

export default (Vue: VueConstructor): Store<RootState> => {
    Vue.use(Vuex);

    return new Vuex.Store<RootState>({
        state: {
            prefix: PREFIX,
        },
        getters: {
            nodeAttribute: (state: RootState) => (...values: string[]) =>
                values.map(attr => `${state.prefix}-${attr}`),
        } as GetterTree<RootState, RootState>,
    } as StoreOptions<RootState>);
};
