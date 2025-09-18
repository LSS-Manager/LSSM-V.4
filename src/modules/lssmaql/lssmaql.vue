<template>
    <lightbox name='lssmaql' no-title-hide>
        <h1>
            <font-awesome-icon :icon='faTerminal'></font-awesome-icon>
            LSSMAQL Console
        </h1>
        <form @submit='getResult'>
            <div class='input-group'>
                <label>
                    your LSSMAQL Query
                    <input
                        type='text'
                        class='form-control'
                        v-model='query'
                        @keydown.enter='getResult'
                    />
                </label>
            </div>
            <a class='btn btn-success' @click='getResult'> Execute </a>
        </form>
        <div class='row'>
            <div class='col-sm-8'>
                <b>Result ({{ resultLength }}):</b>
                <pre>{{ resultString }}</pre>
            </div>
        </div>
    </lightbox>
</template>
<script lang='ts'>
import { computed, ref } from 'vue';

import jsonata from 'jsonata';
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
        const query = ref('');
        const result = ref(JSON);
        const resultString = ref('');
        const resultLength = computed(() => {
            if (Array.isArray(result.value)) return result.value;
            else if (typeof result.value == 'object')
                return Object.keys(result.value);
            else return 0;
        });

        /**
         * Executes the jsonata query.
         * @returns Stringified result JSON object.
         */
        async function getResult(): Promise<void> {
            const expression = jsonata(query.value);
            resultString.value = JSON.stringify(
                await expression.evaluate(getAPIData()),
                null,
                2,
            );
        }

        /**
         * Helperfunction to get and modify the API data.
         * @returns Which contains the missions, vehicles and buildings as children.
         */
        function getAPIData() {
            const apiStore = useAPIStore();
            apiStore.getBuildings('lssmaql-beforeMount', true);
            apiStore.getVehicles('lssmaql-beforeMount', true);
            apiStore.getMissionTypesArray('lssmaql-beforeMount');
            return {
                missions: apiStore.getMissionTypesArray('lssmaql'),
                buildings: apiStore.buildingsArray,
                vehicles: apiStore.vehiclesArray,
            };
        }

        return { getResult, resultLength, result, resultString, query };
    },
    beforeMount() {
        const apiStore = useAPIStore();
        apiStore.getBuildings('lssmaql-beforeMount', true);
        apiStore.getVehicles('lssmaql-beforeMount', true);
        apiStore.getMissionTypesArray('lssmaql-beforeMount');
    },
};
</script>

<style scoped lang='sass'>
form :not(.btn),
.row
    width: 100%
</style>
