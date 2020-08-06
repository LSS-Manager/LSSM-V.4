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
            <a class="btn btn-success" @click.prevent="tokenize" ref="execute">
                Execute
            </a>
        </form>
        <b>Tokens:</b>
        <pre>{{ token_list }}</pre>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import Lightbox from '../../components/lightbox.vue';
import tokenizer from './assets/tokenizer';
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import { LSSMAQL, LSSMAQLMethods } from 'typings/modules/LSSMAQL/LSSMAQL';
import { DefaultComputed, DefaultProps } from 'vue/types/options';

export default Vue.extend<
    LSSMAQL,
    LSSMAQLMethods,
    DefaultComputed,
    DefaultProps
>({
    name: 'lssmaql',
    components: { Lightbox },
    data: function() {
        return {
            faTerminal,
            query: '',
            token_list: [],
        } as LSSMAQL;
    },
    methods: {
        tokenize() {
            this.token_list = tokenizer(this.query);
        },
    },
});
</script>

<style scoped lang="sass">
form :not(.btn)
  width: 100%
</style>
