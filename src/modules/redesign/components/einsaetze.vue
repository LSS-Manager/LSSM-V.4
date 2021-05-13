<template>
    <div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <enhanced-table
            :head="head"
            :table-attrs="{ class: 'table' }"
            no-search
        >
            <tr v-for="mission in missions" :key="mission.id">
                <td
                    v-for="(col, index) in cols"
                    :key="`${mission.id}_${index}_${col}`"
                >
                    <img
                        v-if="col === 'icon'"
                        :src="mission.icons[2]"
                        alt=""
                        loading="lazy"
                    />
                    <span v-else-if="['name', 'generated_by'].includes(col)">
                        {{ mission[col].toLocaleString() }}
                    </span>
                    <span v-else-if="col === 'credits'">
                        ~
                        {{
                            mission.average_credits
                                ? mission.average_credits.toLocaleString()
                                : '–'
                        }}
                    </span>
                    <ul v-else-if="col === 'place'">
                        <li
                            v-for="(place, pindex) in mission.place_array"
                            :key="
                                `${mission.id}_${index}_${col}_${pindex}_${place}`
                            "
                        >
                            {{ place }}
                        </li>
                    </ul>
                    <span v-else-if="col === 'duration'">
                        {{ mission.additional.duration_text }}
                    </span>
                    <pre v-else>{{ col }}{{ '\n' }}{{ mission }}</pre>
                </td>
            </tr>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { DefaultMethods } from 'vue/types/options';
import { EinsaetzeWindow } from '../parsers/einsaetze';
import { Mission } from 'typings/Mission';
import { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'window',
    'einsaetze',
    EinsaetzeWindow,
    {
        cols: (
            | 'icon'
            | 'name'
            | 'place'
            | 'credits'
            | 'generated_by'
            | 'prerequisites'
            | 'duration'
        )[];
    },
    DefaultMethods<Vue>,
    {
        missions: Mission[];
        head: Record<string, { title: string; noSort?: boolean }>;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'einsaetze',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            cols: [
                'icon',
                'name',
                'place',
                'credits',
                'generated_by',
                'prerequisites',
                'duration',
            ],
        };
    },
    computed: {
        missions() {
            return this.$store.state.api.missions;
        },
        head() {
            return Object.fromEntries(
                [...this.cols, 'details'].map(col => [
                    col,
                    { title: col, noSort: true },
                ])
            );
        },
    },
    props: {
        window: {
            type: Object,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        lightbox: {
            type: Object,
            required: true,
        },
        getSetting: {
            type: Function,
            required: true,
        },
        setSetting: {
            type: Function,
            required: true,
        },
    },
    watch: {
        window() {
            this.lightbox.finishLoading('einsaetze-updated');
        },
    },
    mounted() {
        this.$el.addEventListener('click', e => {
            const target = (e.target as HTMLElement)?.closest<
                HTMLAnchorElement | HTMLButtonElement
            >('a, button');
            const href = target?.getAttribute('href');
            if (!target || !href) return;
            e.preventDefault();
            if (target.hasAttribute('lightbox-open'))
                return window.lightboxOpen(href);
            else this.$set(this.lightbox, 'src', href);
        });
        this.lightbox.finishLoading('einsaetze-mounted');
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical
</style>
