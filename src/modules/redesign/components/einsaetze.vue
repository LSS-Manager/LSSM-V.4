<template>
    <div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <pre>{{ prerequisites }}</pre>
        <enhanced-table
            :head="head"
            :table-attrs="{ class: 'table table-striped' }"
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
                                `${mission.id}_${index}_${col}_places_${pindex}_${place}`
                            "
                        >
                            {{ place }}
                        </li>
                    </ul>
                    <ul v-else-if="col === 'prerequisites'">
                        <li
                            v-for="(amount, req) in mission.prerequisites"
                            :key="
                                `${mission.id}_${index}_${col}_prerequisites_${req}`
                            "
                        >
                            {{ amount.toLocaleString() }}x {{ req }}
                        </li>
                    </ul>
                    <span v-else-if="col === 'duration'">
                        {{ mission.additional.duration_text }}
                    </span>
                    <pre v-else-if="col === 'green'">
                        {{ mission.green }}
                    </pre>
                    <pre v-else>{{ col }}{{ '\n' }}{{ mission }}</pre>
                </td>
                <td>
                    <button
                        lightbox-open
                        :href="`/einsaetze/${mission.id}`"
                        class="btn btn-default"
                    >
                        Details
                    </button>
                </td>
            </tr>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { Building } from 'typings/Building';
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
        prerequisites: Mission['prerequisites'];
        missions: (Mission & {
            green: boolean;
        })[];
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
                'green',
            ],
        };
    },
    computed: {
        prerequisites() {
            const calcs = (this.lightbox.$sm(
                'prerequisite_calculations'
            ) as unknown) as Record<string, Record<number, number | string>>;
            const buildings: Record<string, Building[]> = this.$store.getters[
                'api/buildingsByType'
            ];
            console.log(calcs);
            return Object.fromEntries(
                Object.entries(calcs).map(([req, stations]) => [
                    req,
                    Object.values(stations)
                        .map(station => {
                            if (typeof station === 'number') {
                                return (buildings[station] ?? []).filter(
                                    ({ enabled }) => enabled
                                ).length;
                            } else {
                                const [type, extension] = station.split('.');
                                const buildingsOfType =
                                    buildings[parseInt(type)] ?? [];
                                if (extension === 'level') {
                                    return buildingsOfType
                                        .filter(({ enabled }) => enabled)
                                        .map(({ level }) => level + 1)
                                        .reduce((a, b) => a + b, 0);
                                }
                                return buildingsOfType
                                    .map(
                                        building =>
                                            building.extensions?.[
                                                parseInt(extension)
                                            ] ?? { enabled: false }
                                    )
                                    .filter(({ enabled }) => enabled).length;
                            }
                        })
                        .reduce((a, b) => a + b, 0),
                ])
            );
        },
        missions() {
            return (this.$store.state.api.missions as Mission[]).map(
                mission => ({
                    ...mission,
                    green: Object.entries(mission.prerequisites).filter(
                        ([req, amount]) =>
                            (this.prerequisites[req] ?? 0) < (amount ?? 0)
                    ),
                })
            );
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
