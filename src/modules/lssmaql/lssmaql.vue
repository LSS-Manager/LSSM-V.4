<template>
    <lightbox name="lssmaql">
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
            <div class="col-sm-7">
                <b>Result:</b>
                <pre>{{ result }}</pre>
            </div>
            <div class="col-sm-2">
                <b>Tree:</b>
                <pre>{{ tree }}</pre>
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
import Lightbox from '../../components/lightbox.vue';
import tokenizer from './assets/tokenizer';
import parser from './assets/parser';
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import {
    LSSMAQL,
    LSSMAQLMethods,
    LSSMAQLComputed,
} from 'typings/modules/LSSMAQL/LSSMAQL';
import { DefaultProps } from 'vue/types/options';

export default Vue.extend<
    LSSMAQL,
    LSSMAQLMethods,
    LSSMAQLComputed,
    DefaultProps
>({
    name: 'lssmaql',
    components: { Lightbox },
    data: function() {
        return {
            faTerminal,
            query: '',
            token_list: [],
            tree: null,
        } as LSSMAQL;
    },
    computed: {
        result() {
            if (!this.tree) return;
            if (this.tree.type === 'object') {
                let object = this.$store.state.api[this.tree.base];
                this.tree.attributes.forEach(attr => {
                    if (Array.isArray(object) && typeof attr !== 'number')
                        object = object.map(e => e[attr]);
                    else object = object[attr];
                });
                return object;
            }
            return null;
        },
    },
    methods: {
        execute() {
            this.tokenize();
            this.parse();
        },
        tokenize() {
            this.token_list = tokenizer(this.query);
        },
        parse() {
            this.tree = parser(this.token_list);
        },
    },
    beforeMount() {
        this.$store.dispatch('api/registerAllianceinfoUsage');
        this.$store.dispatch('api/registerBuildingsUsage');
        this.$store.dispatch('api/registerVehiclesUsage');
    },
});
</script>

<style scoped lang="sass">
form :not(.btn),
.row
  width: 100%
</style>
