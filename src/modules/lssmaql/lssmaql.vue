<template>
    <lightbox name="lssmaql" no-title-hide>
        <h1>
            <font-awesome-icon :icon="faTerminal"></font-awesome-icon>
            LSSMAQL Console
        </h1>
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
        <div class="row">
            <div class="col-sm-9">
                <b>Result ({{ resultLength.toLocaleString() }}):</b>
                <pre>{{ result }}</pre>
            </div>
            <div class="col-sm-3">
                <b>Tree:</b>
                <pre>{{ querytree }}</pre>
            </div>
        </div>
    </lightbox>
</template>

<script lang="ts">
// TODO: Remove eslint disable no-console ^^
/* eslint-disable no-console */
import Vue from 'vue';
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import { Parser, Grammar } from 'nearley';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import lssmaqlGrammar from '../../../lssmaql/specs/grammar.ne';
import cloneDeep from 'lodash/cloneDeep';
import {
    LSSMAQL,
    LSSMAQLMethods,
    LSSMAQLComputed,
    LSSMAQLResult,
    LSSMAQLQuery,
    LSSMAQLComparison,
    LSSMAQLResultIsMapped,
} from 'typings/modules/LSSMAQL/LSSMAQL';
import { DefaultProps } from 'vue/types/options';

const grammar = Grammar.fromCompiled(lssmaqlGrammar);

const get_from_base = (
    base: string,
    selector: (string | number)[],
    LSSM: Vue
): LSSMAQLResultIsMapped => {
    let result = cloneDeep(
        LSSM.$store.state.api[base.toLowerCase()]
    ) as LSSMAQLResult;
    let mapped = false;
    selector.forEach(param => {
        if (Array.isArray(result)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            result = result.map(r => r?.[param]);
            mapped = true;
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            result = result?.[param];
            mapped = false;
        }
    });
    return [result, mapped];
};

const get_filter_side = (
    side: 'left' | 'right',
    filter: LSSMAQLComparison,
    base_tree: (string | number)[],
    LSSM: Vue
): LSSMAQLResultIsMapped => {
    let filterSide = filter[side];
    if (!(typeof filterSide === 'string' || typeof filterSide === 'number')) {
        if (filterSide.type === 'selector') {
            if (filterSide.base.match(/^\.*$/)) {
                const base = base_tree;
                for (let i = 0; i < filterSide.base.length; i++) {
                    base.pop();
                }
                return get_from_base(
                    base.shift()?.toString() ?? '',
                    [...base, ...filterSide.selector],
                    LSSM
                );
            } else
                return get_from_base(
                    filterSide.base,
                    filterSide.selector,
                    LSSM
                );
        } else {
            return ['function', false];
        }
    } else return [filterSide, false];
};

const apply_filter = (
    result: LSSMAQLResultIsMapped,
    filter: LSSMAQLQuery['filter'],
    base_tree: (string | number)[],
    LSSM: Vue
): LSSMAQLResultIsMapped => {
    result = cloneDeep(result);
    if (!filter) return result;
    if (filter.type === 'comparison') {
        const leftSide = get_filter_side('left', filter, base_tree, LSSM);
        const rightSide = get_filter_side('right', filter, base_tree, LSSM);
        console.log(
            'filtering',
            result,
            'with filter',
            filter,
            'which has on left side',
            leftSide,
            'and on right side',
            rightSide
        );
        switch (filter.operator) {
            case 'in':
                if (rightSide[1])
                    return [
                        (result[0] as LSSMAQLResult[]).filter(
                            (_, index) =>
                                Array.isArray(rightSide[0][index]) &&
                                (rightSide[0][
                                    index
                                ] as LSSMAQLResult[]).includes(leftSide[0])
                        ) ?? [],
                        true,
                    ];
                else
                    return [
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        Array.isArray(rightSide[0]) &&
                        rightSide[0].includes(leftSide[0])
                            ? result
                            : null,
                        false,
                    ];
            case 'not in':
                if (rightSide[1])
                    return [
                        (result[0] as LSSMAQLResult[]).filter(
                            (_, index) =>
                                !(
                                    Array.isArray(rightSide[0][index]) &&
                                    (rightSide[0][
                                        index
                                    ] as LSSMAQLResult[]).includes(leftSide[0])
                                )
                        ) ?? [],
                        true,
                    ];
                else
                    return [
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        Array.isArray(rightSide[0]) &&
                        rightSide[0].includes(leftSide[0])
                            ? null
                            : result,
                        false,
                    ];
        }
    }
    return result;
};

const execute_query = (query: LSSMAQLQuery, LSSM: Vue): LSSMAQLResult => {
    let result = null as LSSMAQLResult;
    if (!query.hasOwnProperty('type')) return result;
    if (query.type === 'query') {
        let temp_result = get_from_base(
            query.base.toLowerCase(),
            query.selector,
            LSSM
        );
        if (query.filter)
            temp_result = apply_filter(
                temp_result,
                query.filter,
                [query.base.toLowerCase(), ...query.selector],
                LSSM
            );
        result = temp_result[0];
    }
    return result;
};

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
            querytree: null,
            result: {},
        } as LSSMAQL;
    },
    computed: {
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
            this.querytree = null;
            try {
                const parser = new Parser(grammar);
                parser.feed(this.query);
                this.querytree = parser.results[0] as LSSMAQLQuery;
                this.result = execute_query(this.querytree, this);
            } catch (e) {
                this.result = e;
                console.log(e);
            }
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
.input-group,
.input-group *,
.row
  width: 100%
</style>
