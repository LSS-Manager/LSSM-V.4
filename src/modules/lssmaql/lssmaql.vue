<template>
    <lightbox name="lssmaql" no-title-hide>
        <h1>
            <font-awesome-icon :icon="faTerminal"></font-awesome-icon>
            LSSMAQL Console
        </h1>
        <form>
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
        </form>
        <div class="row">
            <div class="col-sm-8">
                <b>Result ({{ resultLength.toLocaleString() }}):</b>
                <pre>{{ result }}</pre>
            </div>
            <div class="col-sm-2">
                <b>Tree:</b>
                <pre>{{ querytree }}</pre>
            </div>
            <div class="col-sm-2">
                <b>Tokens:</b>
                <pre>{{ token_list }}</pre>
            </div>
        </div>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import { Parser, Grammar } from 'nearley';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import lssmaqlGrammar from '../../../lssmaql/specs/grammar.ne';
import {
    LSSMAQL,
    LSSMAQLMethods,
    LSSMAQLComputed,
} from 'typings/modules/LSSMAQL/LSSMAQL';
import { DefaultProps } from 'vue/types/options';

const grammar = Grammar.fromCompiled(lssmaqlGrammar);

export default Vue.extend<
    LSSMAQL,
    LSSMAQLMethods,
    LSSMAQLComputed,
    DefaultProps
>({
    name: 'lssmaql',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../components/lightbox.vue'
            ),
    },
    data: function() {
        return {
            faTerminal,
            query: '',
            token_list: [],
            querytree: [],
        } as LSSMAQL;
    },
    computed: {
        result() {
            if (!this.querytree) return null;
            return null;
        },
        resultLength() {
            return Array.isArray(this.result)
                ? this.result.length
                : this.result
                ? 1
                : 0;
        },
    },
    methods: {
        execute() {
            this.parse();
        },
        parse() {
            const parser = new Parser(grammar);
            parser.feed(this.query);
            this.querytree = parser.results;
        },
    },
    beforeMount() {
        this.$store.dispatch('api/registerAllianceinfoUsage');
        this.$store.dispatch('api/registerBuildingsUsage');
        this.$store.dispatch('api/registerVehiclesUsage');
        this.$store.dispatch('api/getMissions', false);
    },
});
</script>

<style scoped lang="sass">
form :not(.btn),
.row
  width: 100%
</style>
