<template>
    <div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <!-- <pre>{{ prerequisites }}</pre> -->
        <enhanced-table
            :head="head"
            :table-attrs="{ class: 'table table-striped' }"
            :search="search"
            @search="s => (search = s)"
        >
            <template v-slot:head>
                <span>{{
                    lightbox.$smc('amount', missionsFiltered.length)
                }}</span>
            </template>
            <tr
                v-for="mission in missionsFiltered"
                :key="mission.id"
                :class="{ success: !mission.unfullfilled_prerequisites.length }"
                :disabled="mission.date_not_fitting"
            >
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
                    <template
                        v-else-if="['name', 'generated_by'].includes(col)"
                    >
                        {{ mission[col].toLocaleString() }}
                    </template>
                    <template v-else-if="col === 'credits'">
                        ~
                        {{
                            mission.average_credits
                                ? mission.average_credits.toLocaleString()
                                : '–'
                        }}
                    </template>
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
                            {{ amount.toLocaleString() }}
                            {{
                                lightbox.$smc(
                                    `prerequisites_short.${req}`,
                                    amount
                                )
                            }}
                        </li>
                    </ul>
                    <template v-else-if="col === 'duration'">
                        {{ mission.additional.duration_text }}
                    </template>
                    <template v-else-if="col === 'missing'">
                        <b v-if="mission.date_not_fitting">
                            {{
                                lightbox.$sm('missing.date', {
                                    date_start: moment(
                                        mission.additional.date_start
                                    ).format('llll'),
                                    date_end: moment(
                                        mission.additional.date_end
                                    ).format('llll'),
                                })
                            }}
                        </b>
                        <table
                            v-if="mission.unfullfilled_prerequisites.length"
                            class="table table-striped"
                        >
                            <thead>
                                <tr>
                                    <th>{{ lightbox.$sm('missing.req') }}</th>
                                    <th>{{ lightbox.$sm('missing.have') }}</th>
                                    <th>{{ lightbox.$sm('missing.need') }}</th>
                                    <th>{{ lightbox.$sm('missing.diff') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="[
                                        req,
                                        { have, need, diff },
                                    ] in mission.unfullfilled_prerequisites"
                                    :key="
                                        `${mission.id}_${index}_${col}_unfullfilled_${req}`
                                    "
                                >
                                    <td>
                                        <b>
                                            {{
                                                lightbox.$smc(
                                                    `prerequisites_short.${req}`,
                                                    need
                                                )
                                            }}
                                        </b>
                                    </td>
                                    <td>{{ have.toLocaleString() }}</td>
                                    <td>{{ need.toLocaleString() }}</td>
                                    <td>
                                        <b>{{ diff.toLocaleString() }}</b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                    <pre v-else>{{ col }}{{ '\n' }}{{ mission }}</pre>
                </td>
                <td>
                    <button
                        lightbox-open
                        :href="`/einsaetze/${mission.id}`"
                        class="btn btn-default"
                        :disabled="mission.date_not_fitting"
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

import moment from 'moment';

import { Building } from 'typings/Building';
import { DefaultMethods } from 'vue/types/options';
import { EinsaetzeWindow } from '../parsers/einsaetze';
import { Mission } from 'typings/Mission';
import { RedesignComponent } from 'typings/modules/Redesign';

type MissionEntry = Mission & {
    unfullfilled_prerequisites: [
        string,
        Record<'have' | 'need' | 'diff', number>
    ][];
    date_not_fitting: boolean;
};

type Component = RedesignComponent<
    'window',
    'einsaetze',
    EinsaetzeWindow,
    {
        moment: typeof moment;
        cols: (
            | 'icon'
            | 'name'
            | 'place'
            | 'credits'
            | 'generated_by'
            | 'prerequisites'
            | 'duration'
            | 'missing'
        )[];
        search: string;
    },
    DefaultMethods<Vue>,
    {
        prerequisites: Mission['prerequisites'];
        missions: MissionEntry[];
        missionsFiltered: MissionEntry[];
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
        moment.locale(this.$store.state.lang);
        return {
            moment,
            cols: [
                'icon',
                'name',
                'place',
                'credits',
                'generated_by',
                'prerequisites',
                'duration',
                'missing',
            ],
            search: '',
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
                    unfullfilled_prerequisites: Object.entries(
                        (mission.prerequisites ?? {}) as Record<string, number>
                    )
                        .map<
                            [string, Record<'have' | 'need' | 'diff', number>]
                        >(([req, amount]) => {
                            const have =
                                this.prerequisites[req.replace(/^max_/, '')] ??
                                0;
                            return [
                                req,
                                {
                                    have,
                                    need: amount,
                                    diff: amount - have,
                                },
                            ];
                        })
                        .filter(([req, { diff }]) =>
                            req.startsWith('max_') ? diff < 0 : diff > 0
                        ),
                    date_not_fitting:
                        mission.additional.date_start &&
                        mission.additional.date_end &&
                        (new Date() < new Date(mission.additional.date_start) ||
                            new Date() > new Date(mission.additional.date_end)),
                })
            );
        },
        missionsFiltered() {
            return this.search.trim().length
                ? this.missions.filter(
                      ({
                          name,
                          place_array,
                          average_credits,
                          generated_by,
                          additional: { duration_text },
                          prerequisites,
                      }) =>
                          [
                              name,
                              ...place_array,
                              average_credits?.toString() ?? '',
                              generated_by,
                              duration_text ?? '',
                              ...Object.entries(prerequisites).map(
                                  ([req, amount]) =>
                                      `${amount} ${this.lightbox.$sm(
                                          `prerequisites_long.${req}`
                                      )}`
                              ),
                          ].filter(attr =>
                              attr
                                  .toLowerCase()
                                  .match(this.search.trim().toLowerCase())
                          ).length
                  )
                : this.missions;
        },
        head() {
            return Object.fromEntries(
                [...this.cols, 'details'].map(col => [
                    col,
                    {
                        title: this.lightbox.$sm(`columns.${col}`).toString(),
                        noSort: true,
                    },
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
tr[disabled]
    opacity: .65
</style>
