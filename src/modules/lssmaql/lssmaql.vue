<template>
    <lightbox name='lssmaql' no-title-hide>
        <h1>
            <font-awesome-icon :icon='faTerminal'></font-awesome-icon>
            LSSMAQL Console
        </h1>
        <form>
            <div class='input-group'>
                <label>
                    your LSSMAQL Query
                    <input
                        type='text'
                        class='form-control'
                        v-model='query'
                        @keypress.enter='$refs.execute.click()'
                    />
                </label>
            </div>
            <a class='btn btn-success' @click='getResult' ref='execute'>
                Execute
            </a>
        </form>
        <div class='row'>
            <div class='col-sm-8'>
                <b>Result ({{ resultLength.toLocaleString() }}):</b>
                <pre>{{ result }}</pre>
            </div>
        </div>
    </lightbox>
</template>
<script lang='ts'>
import jsonata from 'jsonata';
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import { useAPIStore } from '@stores/api';

export default {
    name: 'lssmv4-lssmaql-console',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../components/LightboxWrapper.vue'
                ),
    },
    setup() {
        function getResult(query: string): any {
            const expression = jsonata(query);
            return JSON.stringify(expression.evaluate(getAPIData()));
        }

        function getAPIData() {
            const apiStore = useAPIStore();
            apiStore.getBuildings('lssmaql-beforeMount');
            apiStore.getVehicles('lssmaql-beforeMount');
            apiStore.getMissions('lssmaql-beforeMount');
            return {
                'missions': apiStore.missions,
                'buildings': apiStore.buildings,
                'vehicles': apiStore.buildings,
            };
        }

        return {};
    },
};
</script>

<style scoped lang='sass'>
form :not(.btn),
.row
    width: 100%
</style>
