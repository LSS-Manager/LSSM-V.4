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

import cloneDeep from 'lodash/cloneDeep';
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import { useAPIStore } from '@stores/api';

import parser from './assets/parser';
import tokenizer from './assets/tokenizer';

import type { DefaultProps } from 'vue/types/options';
import type { Condition, ObjectTree, QueryTree } from 'typings/modules/LSSMAQL';
import type {
    LSSMAQL,
    LSSMAQLComputed,
    LSSMAQLMethods,
    LSSMAQLVue,
} from 'typings/modules/LSSMAQL/LSSMAQL';

const comparison = (
    left: unknown,
    comparison: Condition['comparison'],
    right: unknown
): boolean => {
    switch (comparison) {
        case 'IN':
            return Array.isArray(right) && right.includes(left);
        case 'NOT IN':
            return Array.isArray(right) && !right.includes(left);
        case '<':
            return (left as number) < (right as number);
        case '>':
            return (left as number) > (right as number);
        case '<=':
            return (left as number) <= (right as number);
        case '>=':
            return (left as number) >= (right as number);
        case '=':
            return left == right;
        case '!=':
            return left != right;
        default:
            return false;
    }
};

const parse_filter = (
    filter: Condition['left'] | Condition['right'],
    tree: ObjectTree,
    vm: LSSMAQLVue
) => {
    const [side] = filter;
    const oneside =
        side.type === 'string'
            ? side.value
            : side.type === 'number'
            ? parseInt(side.value)
            : side.type === 'boolean'
            ? !!side.value
            : (parser(
                  cloneDeep(filter),
                  [tree.base, ...tree.attributes].join('.')
              ) as ObjectTree);
    let sideObject = (
        typeof oneside === 'string' ||
        typeof oneside === 'number' ||
        typeof oneside === 'boolean'
            ? oneside
            : [...oneside.base.split('.'), ...oneside.attributes]
    ) as (number | string)[] | Record<string, unknown> | number | string;
    if (!sideObject) return;
    if (Array.isArray(sideObject)) {
        while (sideObject.includes('..')) {
            sideObject.splice(
                sideObject.findIndex(attr => attr === '..') - 1,
                2
            );
        }
        const baseAttr = sideObject.shift();
        if (!baseAttr) return;
        let newObject =
            vm.apiStore[baseAttr as 'allianceinfo' | 'buildings' | 'vehicles'];
        sideObject.forEach(attr => {
            if (Array.isArray(newObject) && typeof attr !== 'number') {
                newObject = (newObject as never[]).map(e => e[attr]);
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                newObject = (newObject as Record<string, unknown>)[attr] as
                    | never[]
                    | Record<string, unknown>
                    | number
                    | string;
            }
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sideObject = newObject;
    }
    return sideObject;
};

const resolve_object = (tree: QueryTree, vm: LSSMAQLVue): unknown => {
    if (!tree) return null;
    if (tree.type === 'object') {
        let object =
            vm.apiStore[tree.base as 'allianceinfo' | 'buildings' | 'vehicles'];
        tree.attributes.forEach(attr => {
            if (Array.isArray(object) && typeof attr !== 'number')
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                object = object.map(e => e[attr]);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            else object = object[attr];
        });
        if (Array.isArray(object) && tree.filter.length) {
            const filter = tree.filter[0] as Condition;
            const leftObject = parse_filter(filter.left, tree, vm);
            const rightObject = parse_filter(filter.right, tree, vm);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            object = object.filter((_, index) => {
                const leftParam = Array.isArray(leftObject)
                    ? (leftObject as never[])[index]
                    : leftObject;
                const rightParam = Array.isArray(rightObject)
                    ? (rightObject as never[])[index]
                    : rightObject;
                return (
                    leftParam !== null &&
                    typeof leftParam !== 'undefined' &&
                    rightParam !== null &&
                    typeof rightParam !== 'undefined' &&
                    comparison(leftParam, filter.comparison, rightParam)
                );
            });
        }
        return object;
    }
    return null;
};

export default Vue.extend<
    LSSMAQL,
    LSSMAQLMethods,
    LSSMAQLComputed,
    DefaultProps
>({
    name: 'lssmv4-lssmaql-console',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../components/lightbox.vue'
            ),
    },
    data() {
        const apiStore = useAPIStore();
        return {
            faTerminal,
            query: '',
            token_list: [],
            querytree: null,
            apiStore,
        } as LSSMAQL;
    },
    computed: {
        result() {
            if (!this.querytree) return null;
            return resolve_object(
                this.querytree,
                this
            ) as LSSMAQLComputed['result'];
        },
        resultLength() {
            return Array.isArray(this.result) ? this.result.length : 1;
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
            this.querytree = parser(this.token_list);
        },
    },
    beforeMount() {
        this.apiStore.getAllianceInfo('lssmaql-beforeMount');
        this.apiStore.getBuildings('lssmaql-beforeMount');
        this.apiStore.getVehicles('lssmaql-beforeMount');
        this.apiStore.getMissions('lssmaql-beforeMount');
    },
});
</script>

<style scoped lang="sass">
form :not(.btn),
.row
  width: 100%
</style>
