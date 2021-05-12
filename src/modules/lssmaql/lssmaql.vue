<!--suppress ExceptionCaughtLocallyJS -->
<template>
    <lightbox name="lssmaql" no-title-hide>
        <h1>
            <font-awesome-icon :icon="faTerminal"></font-awesome-icon>
            LSSMAQL Console
        </h1>
        <div>
            <div class="input-group">
                <label>
                    your LSSMAQL Query
                    <input
                        type="text"
                        class="form-control"
                        v-model="query"
                        @keypress.enter="$refs.execute.click()"
                    />
                </label>
            </div>
            <a class="btn btn-success" @click.prevent="execute" ref="execute">
                Execute
            </a>
        </div>
        <div class="row">
            <div class="col-sm-8">
                <b>Result:</b>
                <pre>{{ result }}</pre>
            </div>
            <div :class="error ? 'col-sm-2' : 'col-sm-4'">
                <b>Tree:</b>
                <pre>{{ tree }}</pre>
            </div>
            <div v-if="error" class="col-sm-2">
                <b>Error:</b>
                <pre class="bg-danger">{{ error }}</pre>
            </div>
        </div>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import cloneDeep from 'lodash/cloneDeep';
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import parser from './assets/parser';

import { DefaultProps } from 'vue/types/options';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { StorageAPIs } from 'typings/store/api/State';
import { SyntaxTree } from 'typings/LSSMAQL';
export default Vue.extend<
    {
        query: string;
        result: unknown;
        faTerminal: IconDefinition;
        tree: SyntaxTree;
        error: Error | null;
    },
    { execute(): void },
    {
        base: StorageAPIs;
    },
    DefaultProps
>({
    name: 'lssmaql',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../components/lightbox.vue'
            ),
    },
    data() {
        return {
            query: '',
            result: {},
            faTerminal,
            tree: {
                selector: {
                    base: '',
                    attributes: [],
                },
            },
            error: null,
        };
    },
    computed: {
        base() {
            const {
                vehicles,
                buildings,
                credits,
                allianceinfo,
                missions,
                settings,
            }: StorageAPIs = this.$store.state.api;
            return {
                vehicles,
                buildings,
                credits,
                allianceinfo,
                missions,
                settings,
            };
        },
    },
    methods: {
        execute() {
            try {
                const tree = parser(this.query);
                this.tree = cloneDeep(tree);
                this.result = this.base[tree.selector.base];
                while (tree.selector.attributes.length) {
                    const attribute = tree.selector.attributes.shift();
                    if (!attribute) break;
                    if (Array.isArray(this.result)) {
                        this.result = this.result.map(i => i[attribute]);
                    } else {
                        if (!this.result.hasOwnProperty(attribute)) {
                            throw new Error(
                                `Attribute "${attribute}" does not exist on current object!`
                            );
                        }
                        this.result = this.result[attribute];
                    }
                }
            } catch (e) {
                this.error = e;
                this.$store.dispatch('console/error', e);
            }
        },
    },
    beforeMount() {
        this.$store.dispatch('api/registerAllianceinfoUsage', {
            feature: 'lssmaql-beforeMount',
        });
        this.$store.dispatch('api/registerBuildingsUsage', {
            feature: 'lssmaql-beforeMount',
        });
        this.$store.dispatch('api/registerVehiclesUsage', {
            feature: 'lssmaql-beforeMount',
        });
        this.$store.dispatch('api/registerSettings', {
            feature: 'lssmaql-beforeMount',
        });
        this.$store.dispatch('api/fetchCreditsInfo', {
            feature: 'lssmaql-beforeMount',
        });
        this.$store.dispatch('api/getMissions', {
            force: false,
            feature: 'lssmaql-beforeMount',
        });
    },
});
</script>

<style scoped></style>
