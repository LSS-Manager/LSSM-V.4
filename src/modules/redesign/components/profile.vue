<template>
    <div>
        <h1 class="redesign-profile-title" :id="profile.id">
            <img
                :src="`/images/user_${profile.online ? 'green' : 'gray'}.png`"
                alt=""
            />
            {{ profile.name }}
        </h1>
        <div class="profile-content">
            <div class="pull-left profile-sidebar">
                <div class="btn-toolbar pull-right profile-btns">
                    <div class="btn-group" v-if="profile.self">
                        <a
                            class="btn btn-default btn-xs"
                            href="/profile/edit"
                            :title="$sm('buttons.edit')"
                        >
                            <font-awesome-icon
                                :icon="faEdit"
                            ></font-awesome-icon>
                        </a>
                        <a
                            class="btn btn-default btn-xs"
                            href="/avatar"
                            :title="$sm('buttons.avatar')"
                        >
                            <font-awesome-icon
                                :icon="faImage"
                            ></font-awesome-icon>
                        </a>
                    </div>
                    <div class="btn-group" v-if="profile.can_alliance_ignore">
                        <button
                            class="btn btn-xs"
                            :class="
                                `btn-${
                                    profile.alliance_ignored
                                        ? 'warning'
                                        : 'danger'
                                }`
                            "
                            :title="
                                $sm(
                                    `buttons.alliance_ignore.${
                                        !profile.alliance_ignored
                                            ? 'add'
                                            : 'destroy'
                                    }`
                                )
                            "
                            @click="allianceIgnore"
                        >
                            alliance ignore {{ !profile.alliance_ignored }}
                        </button>
                    </div>
                    <div class="btn-group" v-if="profile.ban.length">
                        <div v-if="profile.ban[0] !== 0">
                            <button
                                class="btn btn-danger dropdown-toggle btn-xs"
                                data-toggle="dropdown"
                                :title="$sm(`buttons.chat.ban`)"
                            >
                                ban chat <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li v-for="time in profile.ban" :key="time">
                                    <a
                                        :href="
                                            `/profile/${profile.id}/chatban/${time}`
                                        "
                                    >
                                        {{
                                            moment
                                                .duration(time, 'seconds')
                                                .humanize()
                                        }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <a
                            v-else
                            :href="`/profile/${profile.id}/chatban/0`"
                            class="btn btn-warning btn-xs"
                            :title="$sm(`buttons.chat.unban`)"
                        >
                            unban chat
                        </a>
                    </div>
                    <div class="btn-group" v-if="!profile.self">
                        <a
                            class="btn btn-xs"
                            :class="
                                `btn-${profile.ignored ? 'warning' : 'danger'}`
                            "
                            :href="
                                `/ignoriert/${
                                    profile.ignored
                                        ? 'entfernen'
                                        : 'hinzufuegen'
                                }/${profile.id}?user=${encodeURIComponent(
                                    profile.id
                                )}`
                            "
                            :title="
                                $sm(
                                    `buttons.ignore.${
                                        profile.ignored ? 'undo' : 'do'
                                    }`
                                )
                            "
                        >
                            Ignore {{ !profile.ignored }}
                        </a>
                        <a
                            v-if="!profile.ignored"
                            class="btn btn-xs"
                            :class="
                                `btn-${profile.friend ? 'danger' : 'success'}`
                            "
                            :href="
                                `/freunde/${
                                    profile.friend ? 'entfernen' : 'hinzufuegen'
                                }/${profile.id}?user=${encodeURIComponent(
                                    profile.id
                                )}`
                            "
                            :title="
                                $sm(
                                    `buttons.friend.${
                                        profile.friend ? 'undo' : 'do'
                                    }`
                                )
                            "
                        >
                            Friend {{ !profile.friend }}
                        </a>
                    </div>
                    <div
                        class="btn-group"
                        v-if="!profile.self && !profile.ignored"
                    >
                        <a
                            class="btn btn-success btn-xs"
                            :href="
                                `/messages/new?target=${encodeURIComponent(
                                    profile.name
                                )}`
                            "
                            :title="$sm('buttons.message')"
                        >
                            <font-awesome-icon
                                :icon="faEnvelope"
                            ></font-awesome-icon>
                        </a>
                        <a
                            class="btn btn-success btn-xs"
                            :href="
                                `/coins?gift_for_user=${encodeURIComponent(
                                    profile.id
                                )}`
                            "
                            :title="$sm('buttons.gift')"
                        >
                            <font-awesome-icon
                                :icon="faGift"
                            ></font-awesome-icon>
                        </a>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div v-if="profile.friend" class="alert alert-success">
                    {{ $sm('alerts.friend', { name: profile.name }) }}
                </div>
                <div v-if="profile.ignored" class="alert alert-danger">
                    {{ $sm('alerts.ignored', { name: profile.name }) }}
                </div>
                <div v-if="profile.alliance_ignored" class="alert alert-danger">
                    {{ $sm('alerts.alliance_ignored', { name: profile.name }) }}
                </div>
                <div class="well">
                    <div>
                        <b>{{ $sm('rank') }}</b>
                        : {{ rank }}
                    </div>
                    <div v-if="profile.registration">
                        <b>{{ $sm('registration') }}</b>
                        : {{ moment(profile.registration).format('LLLL') }}
                    </div>
                    <div>
                        {{
                            $sm('credits', {
                                credits: profile.credits.toLocaleString(),
                            })
                        }}
                    </div>
                    <div v-if="profile.alliance">
                        {{ $sm('alliance') }}:
                        <a :href="`/alliances/${profile.alliance.id}`">
                            {{ profile.alliance.name }}
                        </a>
                    </div>
                </div>
                <img
                    v-if="profile.image"
                    :src="profile.image"
                    alt=""
                    class="profile-image"
                />
                <div :id="awardsChartId"></div>
            </div>
            <div class="profile-tabs">
                <tabs
                    ref="tabs"
                    :on-select="
                        (_, i) => {
                            show_map = profile.has_map && i === 1;
                            if (
                                show_map &&
                                Object.values($refs.map.map.getSize()).includes(
                                    0
                                )
                            )
                                $nextTick($refs.map.redraw);
                        }
                    "
                >
                    <tab :title="$sm('text')">
                        <div v-html="profile.text.replace(/\n/g, '<br>')"></div>
                    </tab>
                    <tab v-if="profile.has_map" :title="$sm('map')">
                        <div class="dispatchcenter-summary">
                            <span
                                v-for="type in buildingTypesSorted"
                                :key="type"
                            >
                                <span
                                    class="label"
                                    :class="
                                        `label-${
                                            hiddenFilters.includes(type)
                                                ? 'danger'
                                                : 'success'
                                        }`
                                    "
                                    v-if="buildings[0].buildingTypes.sum[type]"
                                    @click="toggleFilter(type)"
                                    @dblclick="onlyFilter(type)"
                                >
                                    {{ buildingTypes[type].caption }}:
                                    {{
                                        buildings[0].buildingTypes.sum[
                                            type
                                        ].toLocaleString()
                                    }}
                                </span>
                            </span>
                        </div>
                    </tab>
                    <tab
                        v-if="profile.has_map"
                        :title="
                            $smc('buildings.amount', profile.buildings.length, {
                                n: profile.buildings.length.toLocaleString(),
                            })
                        "
                    >
                        <label class="pull-right">
                            <input
                                type="search"
                                class="search_input_field"
                                v-model="search"
                            />
                        </label>
                        <div class="dispatchcenter-summary">
                            <span
                                v-for="type in buildingTypesSorted"
                                :key="type"
                            >
                                <span
                                    class="label"
                                    :class="
                                        `label-${
                                            hiddenFilters.includes(type)
                                                ? 'danger'
                                                : 'success'
                                        }`
                                    "
                                    v-if="buildings[0].buildingTypes.sum[type]"
                                    @click="toggleFilter(type)"
                                    @dblclick="onlyFilter(type)"
                                >
                                    {{ buildingTypes[type].caption }}:
                                    {{
                                        buildings[0].buildingTypes.sum[
                                            type
                                        ].toLocaleString()
                                    }}
                                </span>
                            </span>
                        </div>
                        <div
                            class="panel panel-default profile-dispatchcenter"
                            v-for="dc in buildings"
                            :key="dc.id"
                        >
                            <div
                                class="panel-heading"
                                @click="
                                    expandedDispatches.includes(dc.id)
                                        ? expandedDispatches.splice(
                                              expandedDispatches.findIndex(
                                                  n => n === dc.id
                                              ),
                                              1
                                          )
                                        : expandedDispatches.push(dc.id)
                                "
                            >
                                <span class="pull-right">{{
                                    $smc(
                                        'buildings.amount',
                                        (dc.buildings || []).length,
                                        {
                                            n: (
                                                dc.buildings || []
                                            ).length.toLocaleString(),
                                        }
                                    )
                                }}</span>
                                <h3 class="panel-title">
                                    <font-awesome-icon
                                        class="map-locator"
                                        v-if="dc.id"
                                        :icon="faMapMarkedAlt"
                                        @click.stop="
                                            () => {
                                                $refs.tabs.onSelect(
                                                    undefined,
                                                    1
                                                );
                                                $set(
                                                    $refs.tabs,
                                                    'selectedIndex',
                                                    1
                                                );
                                                $refs.map.setView(
                                                    dc.latitude,
                                                    dc.longitude,
                                                    15
                                                );
                                            }
                                        "
                                    ></font-awesome-icon>
                                    <img
                                        loading="lazy"
                                        :src="
                                            dc.id
                                                ? dc.icon
                                                : '/images/building_leitstelle.png'
                                        "
                                        :alt="dc.name"
                                    />
                                    <a
                                        :href="`/buildings/${dc.id}`"
                                        v-if="dc.id"
                                    >
                                        {{ he.decode(dc.name) }}
                                    </a>
                                </h3>
                            </div>
                            <div
                                class="panel-body"
                                v-if="
                                    expandedDispatches.includes(dc.id) &&
                                        dc.buildingTypes
                                "
                            >
                                <div class="dispatchcenter-summary">
                                    <span
                                        v-for="type in buildingTypesSorted"
                                        :key="type"
                                    >
                                        <span
                                            class="label label-default"
                                            v-if="dc.buildingTypes[type]"
                                        >
                                            {{ buildingTypes[type].caption }}:
                                            {{
                                                dc.buildingTypes[
                                                    type
                                                ].toLocaleString()
                                            }}
                                        </span>
                                    </span>
                                </div>
                                <div class="profile-grid">
                                    <div
                                        class="panel panel-default"
                                        v-for="building in dc.buildings"
                                        :key="building.id"
                                        :class="{
                                            hidden:
                                                (search &&
                                                    !building.name
                                                        .toLowerCase()
                                                        .trim()
                                                        .match(
                                                            search
                                                                .toLowerCase()
                                                                .trim()
                                                        )) ||
                                                hiddenFilters.includes(
                                                    building.building_type
                                                ),
                                        }"
                                    >
                                        <div class="panel-heading">
                                            <span
                                                class="pull-right label label-default"
                                            >
                                                {{
                                                    buildingTypes[
                                                        building.building_type
                                                    ].caption
                                                }}
                                            </span>
                                            <h3 class="panel-title">
                                                <font-awesome-icon
                                                    class="map-locator"
                                                    :icon="faMapMarkedAlt"
                                                    @click="
                                                        () => {
                                                            $refs.tabs.onSelect(
                                                                undefined,
                                                                1
                                                            );
                                                            $set(
                                                                $refs.tabs,
                                                                'selectedIndex',
                                                                1
                                                            );
                                                            $refs.map.setView(
                                                                building.latitude,
                                                                building.longitude,
                                                                15
                                                            );
                                                        }
                                                    "
                                                ></font-awesome-icon>
                                                <img
                                                    loading="lazy"
                                                    :src="building.icon"
                                                    :alt="building.name"
                                                />
                                                <a
                                                    :href="
                                                        `/buildings/${building.id}`
                                                    "
                                                >
                                                    {{
                                                        he.decode(building.name)
                                                    }}
                                                </a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tab>
                    <tab
                        v-if="profile.awards.length"
                        :title="$sm('awards.title')"
                    >
                        <div class="profile-awards profile-grid">
                            <div
                                class="panel panel-default"
                                v-for="award in profile.awards"
                                :key="award.caption"
                            >
                                <div class="panel-heading">
                                    <h3 class="panel-title">
                                        {{ award.caption }}
                                    </h3>
                                </div>
                                <div class="panel-body">
                                    <img
                                        loading="lazy"
                                        :alt="award.caption"
                                        :src="award.image"
                                    />
                                    <p>{{ award.desc }}</p>
                                </div>
                            </div>
                        </div>
                    </tab>
                </tabs>
                <leaflet-map
                    v-if="profile.has_map"
                    v-show="show_map"
                    ref="map"
                    :id="`profile-${profile.id}-map`"
                    :layers="
                        Object.entries(mapLayerGroups)
                            .filter(
                                ([t]) => !hiddenFilters.includes(parseInt(t))
                            )
                            .map(([, l]) => l)
                    "
                ></leaflet-map>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import he from 'he';
import Highcharts, { PlotGaugeOptions } from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faGift } from '@fortawesome/free-solid-svg-icons/faGift';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt';
import VueI18n, { TranslateResult } from 'vue-i18n';
import { ProfileWindow } from '../parsers/profile';
import { RedesignLightboxVue } from 'typings/modules/Redesign';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { InternalBuilding } from 'typings/Building';
import { LayerGroup } from 'leaflet';
import { MapVue } from 'typings/components/LeafletMap';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

type DispatchCenter = {
    [id: number]: Partial<ProfileWindow['buildings'][0]> & {
        buildings: ProfileWindow['buildings'];
        buildingTypes: {
            [type: number]: number;
            sum?: { [type: number]: number };
        };
    };
};

export default Vue.extend<
    {
        moment: typeof moment;
        he: typeof he;
        faEdit: IconDefinition;
        faImage: IconDefinition;
        faEnvelope: IconDefinition;
        faGift: IconDefinition;
        faMapMarkedAlt: IconDefinition;
        awardsChartId: string;
        maxAwards: number;
        buildingTypes: {
            [type: number]: InternalBuilding;
        };
        buildingTypesSorted: number[];
        mapLayerGroups: { [id: number]: LayerGroup };
        buildingMarkerIds: number[];
        expandedDispatches: number[];
        search: string;
        hiddenFilters: number[];
        show_map: boolean;
    },
    {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        allianceIgnore(): void;
        toggleFilter(type: number): void;
        onlyFilter(type: number): void;
    },
    {
        rank: string;
        awardColors: {
            bronze: number;
            silver: number;
            gold: number;
        };
        buildings: DispatchCenter;
    },
    {
        profile: ProfileWindow;
        url: string;
        lightbox: RedesignLightboxVue<'profile', ProfileWindow>;
        $m(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        $mc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        getSetting: <T>(setting: string, defaultValue: T) => Promise<T>;
        setSetting: <T>(settingId: string, value: T) => Promise<void>;
    }
>({
    name: 'profile',
    components: {
        LeafletMap: () =>
            import(
                /* webpackChunkName: "components/leaflet-map" */ '../../../components/leaflet-map.vue'
            ),
    },
    data() {
        moment.locale(this.$store.state.lang);
        const buildingTypes = this.$t('buildings') as {
            [type: number]: InternalBuilding;
        };
        return {
            moment,
            he,
            faEdit,
            faImage,
            faEnvelope,
            faGift,
            faMapMarkedAlt,
            awardsChartId: this.$store.getters.nodeAttribute(
                'redesign-profile-awards-gauge-chart',
                true
            ),
            maxAwards: 0,
            buildingTypes,
            buildingTypesSorted: Object.keys(buildingTypes)
                .map(t => parseInt(t))
                .sort((a, b) =>
                    buildingTypes[a].caption < buildingTypes[b].caption
                        ? -1
                        : buildingTypes[a].caption > buildingTypes[b].caption
                        ? 1
                        : 0
                ),
            mapLayerGroups: Object.fromEntries(
                Object.keys(buildingTypes).map(type => [
                    parseInt(type),
                    window.L.layerGroup(),
                ])
            ),
            buildingMarkerIds: [],
            expandedDispatches: [],
            search: '',
            hiddenFilters: [],
            show_map: false,
        };
    },
    methods: {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$m(`profile.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`profile.${key}`, amount, args);
        },
        allianceIgnore() {
            const url = new URL(window.location.href);
            url.searchParams.append('_method', 'post');
            url.searchParams.append(
                'authenticity_token',
                this.profile.authenticity_token
            );
            this.$store
                .dispatch('api/request', {
                    url: `/allianceIgnore/${this.profile.id}/${
                        this.profile.alliance_ignored ? 'destroy' : 'add'
                    }`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: `https://www.leitstellenspiel.de/profile/${this.profile.id}`,
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: `redesign-profile-allianceignore-${
                        this.profile.id
                    }-to-${!this.profile.alliance_ignored}`,
                })
                .then(() =>
                    this.$set(
                        this.lightbox,
                        'src',
                        `/profile/${this.profile.id}`
                    )
                );
        },
        toggleFilter(type) {
            if (this.hiddenFilters.includes(type)) {
                this.hiddenFilters.splice(
                    this.hiddenFilters.findIndex(t => t === type),
                    1
                );
                (this.$refs.map as MapVue)?.map?.addLayer(
                    this.mapLayerGroups[type]
                );
            } else {
                this.hiddenFilters.push(type);
                (this.$refs.map as MapVue)?.map?.removeLayer(
                    this.mapLayerGroups[type]
                );
            }
            this.setSetting('hiddenFilters', this.hiddenFilters).then();
        },
        onlyFilter(type) {
            this.hiddenFilters = this.buildingTypesSorted.filter(t => {
                (this.$refs.map as MapVue)?.map?.[
                    t === type ? 'addLayer' : 'removeLayer'
                ](this.mapLayerGroups[t]);
                return t !== type;
            });
            this.setSetting('hiddenFilters', this.hiddenFilters).then();
        },
    },
    computed: {
        rank() {
            const ranks = this.$t(
                `ranks.${
                    this.$store.state.policechief
                        ? 'policechief'
                        : 'missionchief'
                }`
            ) as { [credits: number]: string };
            return (
                Object.entries(ranks)
                    .reverse()
                    .find(
                        ([credits]) => parseInt(credits) <= this.profile.credits
                    )?.[1] ?? ''
            );
        },
        awardColors() {
            const colors = {
                bronze: 0,
                silver: 0,
                gold: 0,
            };
            this.profile.awards.forEach(({ image }) => {
                if (image.match(/award_bronze/)) colors.bronze++;
                else if (image.match(/award_silver/)) colors.silver++;
                else if (image.match(/award_gold/)) colors.gold++;
            });
            return colors;
        },
        buildings() {
            const dispatchCenters: DispatchCenter = {
                0: { buildings: [], id: 0, buildingTypes: { sum: {} } },
            };
            this.profile.buildings.forEach(
                (building: ProfileWindow['buildings'][0]) => {
                    if (!this.buildingMarkerIds.includes(building.id)) {
                        const img = document.createElement('img');
                        img.src = building.icon;
                        img.onload = () =>
                            this.mapLayerGroups[
                                building.building_type
                            ].addLayer(
                                window.L.marker(
                                    [building.latitude, building.longitude],
                                    {
                                        icon: window.L.icon({
                                            iconUrl: building.icon,
                                            iconSize: [
                                                img.naturalWidth,
                                                img.naturalHeight,
                                            ],
                                        }),
                                        title: building.name,
                                    }
                                ).bindTooltip(building.name)
                            );
                        this.buildingMarkerIds.push(building.id);
                    }
                    if (dispatchCenters[0].buildingTypes.sum) {
                        if (
                            !dispatchCenters[0].buildingTypes.sum.hasOwnProperty(
                                building.building_type
                            )
                        ) {
                            dispatchCenters[0].buildingTypes.sum[
                                building.building_type
                            ] = 0;
                        }
                        dispatchCenters[0].buildingTypes.sum[
                            building.building_type
                        ]++;
                    }
                    if (building.filter_id === 'dispatch_center') {
                        return (dispatchCenters[building.id] = {
                            ...dispatchCenters[building.id],
                            ...building,
                        });
                    }
                    if (!dispatchCenters.hasOwnProperty(building.lbid)) {
                        dispatchCenters[building.lbid] = {
                            buildings: [],
                            buildingTypes: {},
                        };
                    }
                    if (
                        !dispatchCenters[building.lbid].hasOwnProperty(
                            'buildings'
                        )
                    )
                        dispatchCenters[building.lbid].buildings = [];
                    if (
                        !dispatchCenters[building.lbid].hasOwnProperty(
                            'buildingTypes'
                        )
                    )
                        dispatchCenters[building.lbid].buildingTypes = {};
                    dispatchCenters[building.lbid].buildings.push(building);
                    if (
                        !dispatchCenters[
                            building.lbid
                        ].buildingTypes.hasOwnProperty(building.building_type)
                    ) {
                        dispatchCenters[building.lbid].buildingTypes[
                            building.building_type
                        ] = 0;
                    }
                    dispatchCenters[building.lbid].buildingTypes[
                        building.building_type
                    ]++;
                }
            );
            return dispatchCenters;
        },
    },
    props: {
        profile: {
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
        $m: {
            type: Function,
            required: true,
        },
        $mc: {
            type: Function,
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
        profile() {
            this.lightbox.finishLoading('profile-updated');
        },
    },
    mounted() {
        this.$el.addEventListener('click', e => {
            e.preventDefault();
            const target = (e.target as HTMLElement)?.closest<
                HTMLAnchorElement | HTMLButtonElement
            >('a, button');
            if (!target || !target.hasAttribute('href')) return;
            this.$set(this.lightbox, 'src', target.getAttribute('href'));
        });
        this.getSetting('hiddenFilters', []).then(
            f => (this.hiddenFilters = f)
        );
        this.maxAwards = parseInt(this.$sm('awards.max').toString());
        if (this.$store.state.darkmode)
            Highcharts.setOptions(this.$utils.highChartsDarkMode);
        Highcharts.setOptions({
            lang: {
                ...(this.$t('highcharts') as {
                    [key: string]: TranslateResult;
                }),
            },
        });
        Highcharts.chart(this.awardsChartId, {
            chart: {
                type: 'solidgauge',
                height: 200,
            },
            title: {
                text: this.$sm('awards.title_amounts', {
                    sum: this.profile.awards.length,
                    max: this.maxAwards,
                }),
                margin: 0,
                style: {
                    fontWeight: 'bold',
                },
            },
            tooltip: {
                borderWidth: 0,
                backgroundColor: 'none',
                shadow: false,
                style: {
                    fontSize: '16px',
                },
                valueSuffix: '',
                pointFormat:
                    '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
                positioner(labelWidth: number) {
                    return {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        x: (this.chart.chartWidth - labelWidth) / 2,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        y: this.chart.plotHeight / 2 + 15,
                    };
                },
            },
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [
                    {
                        // Track for Gold
                        outerRadius: '112%',
                        innerRadius: '88%',
                        backgroundColor: Highcharts.color('#f6cd4f')
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0,
                    },
                    {
                        // Track for Silver
                        outerRadius: '87%',
                        innerRadius: '63%',
                        backgroundColor: Highcharts.color('#b6b6b6')
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0,
                    },
                    {
                        // Track for Bronze
                        outerRadius: '62%',
                        innerRadius: '38%',
                        backgroundColor: Highcharts.color('#cd7f32')
                            .setOpacity(0.3)
                            .get(),
                        borderWidth: 0,
                    },
                ],
            },
            yAxis: {
                min: 0,
                max: this.maxAwards,
                lineWidth: 0,
                tickPositions: [],
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false,
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true,
                },
            },
            series: [
                {
                    name: this.$sm('awards.gold').toString(),
                    data: [
                        {
                            color: '#f6cd4f',
                            radius: '112%',
                            innerRadius: '88%',
                            y: this.awardColors.gold,
                        },
                    ],
                },
                {
                    name: this.$sm('awards.silver').toString(),
                    data: [
                        {
                            color: '#b6b6b6',
                            radius: '87%',
                            innerRadius: '63%',
                            y: this.awardColors.silver,
                        },
                    ],
                },
                {
                    name: this.$sm('awards.bronze').toString(),
                    data: [
                        {
                            color: '#cd7f32',
                            radius: '62%',
                            innerRadius: '38%',
                            y: this.awardColors.bronze,
                        },
                    ],
                },
            ],
        } as PlotGaugeOptions);
        document.title = this.profile.name;
        this.lightbox.finishLoading('profile-mounted');
    },
});
</script>

<style lang="sass" scoped>
.profile-content
    display: flex

    .profile-sidebar
        margin-right: 1rem

        .profile-btns
            margin-bottom: 1rem

        .profile-image
            min-width: 90%
            display: block
            margin: auto

    .profile-tabs
        width: 100%

        .profile-dispatchcenter

            > .panel-heading
                cursor: pointer

                .panel-title img
                    max-height: calc(16px + 1em)

            .profile-grid::before,
            .profile-grid::after
                content: unset

        .dispatchcenter-summary
            display: flex
            flex-flow: wrap
            margin-bottom: 1rem
            user-select: none

            span.label
                margin: 0 .5em

                &.label-success,
                &.label-danger
                    cursor: pointer

        .profile-awards .panel-body
            display: flex
            flex-flow: row

            img
                max-width: 50%

            p
                margin-left: 10px


        .profile-grid
            display: grid
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
            grid-gap: 1em

.map-locator
    cursor: pointer
</style>
