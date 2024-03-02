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
                <b>Result ({{ getResult }}):</b>
                <pre>{{ resultLength }}</pre>
            </div>
        </div>
    </lightbox>
</template>
<script lang='ts'>
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
        let resultLength: number = 0;

        /**
         * Executes the jsonata query.
         * @returns Stringified result JSON object.
         */
        function getResult(): string {
            const query: string = 'missions';
            const expression = jsonata(query);
            const result: Promise<object[]> = expression.evaluate(getAPIData());
            resultLength = getResultLength(result);
            return JSON.stringify(result);
        }

        /**
         * Returns the length of the result array. If the result is not an array the length is 0.
         * @param result - From getResult.
         * @returns Result length.
         */
        function getResultLength(result: Promise<object[]>): number {
            if (Array.isArray(result)) return result.length;
            return 0;
        }

        /**
         * Helperfunction to get and modify the API data.
         * @returns Which contains the missions, vehicles and buildings as children.
         */
        function getAPIData() {
            const apiStore = useAPIStore();
            apiStore.getBuildings('lssmaql-beforeMount');
            apiStore.getVehicles('lssmaql-beforeMount');
            apiStore.getMissions('lssmaql-beforeMount');
            return {
                missions: apiStore.missions,
                buildings: apiStore.buildings,
                vehicles: apiStore.buildings,
            };
        }

        return { getResult, resultLength };
    },
};
</script>

<style scoped lang='sass'>
form :not(.btn),
.row
    width: 100%
</style>
