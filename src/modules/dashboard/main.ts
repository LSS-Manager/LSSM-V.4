import dashboard from './dashboard.vue';
import { IndexedExtendedWindow } from '../../../typings/helpers';

((LSSM: Vue) => {
    const $m = (key: string, args?: { [key: string]: unknown }) =>
        LSSM.$t(`modules.dashboard.${key}`, args);

    LSSM.$store.dispatch('addMenuItem', $m('name').toString()).then(
        element =>
            (element.onclick = async () => {
                await LSSM.$store.dispatch('api/registerBuildingsUsage', true);
                await LSSM.$store.dispatch('api/registerVehiclesUsage', true);
                LSSM.$modal.show(
                    dashboard,
                    {},
                    { name: 'dashboard', height: '96%', width: '96%' }
                );
            })
    );
})(((window as unknown) as IndexedExtendedWindow)[PREFIX]);
