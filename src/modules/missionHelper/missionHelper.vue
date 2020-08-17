<template>
    <div
        class="alert alert-warning"
        :class="{ overlay, minified }"
        :style="`top: ${drag.top}px; right: ${drag.right}px`"
        :id="id"
    >
        <font-awesome-icon
            class="pull-right"
            :icon="minified ? faExpandAlt : faCompressAlt"
            :fixed-width="true"
            @click="toggleMinified"
        ></font-awesome-icon>
        <font-awesome-icon
            v-show="overlay"
            :icon="faArrowsAlt"
            class="pull-right dragging-field"
            :fixed-width="true"
            @mousedown="dragStart"
        ></font-awesome-icon>
        <font-awesome-icon
            class="pull-right"
            :icon="faSyncAlt"
            :spin="isReloading"
            :fixed-width="true"
            @click="reloadSpecs(true)"
        ></font-awesome-icon>
        <font-awesome-icon
            class="pull-right"
            :icon="overlay ? faAngleDoubleDown : faAngleDoubleUp"
            :fixed-width="true"
            @click="toggleOverlay"
        ></font-awesome-icon>
        <span v-if="isDiyMission">{{ $m('diyMission') }}</span>
        <div v-else-if="missionSpecs">
            <h3 v-if="settings.title">
                {{ missionSpecs.name }}
                <small v-if="settings.place && missionSpecs.place">{{
                    missionSpecs.place
                }}</small>
                <small v-if="settings.type">Type: {{ missionSpecs.id }}</small>
                <small v-if="settings.id">ID: {{ missionId }}</small>
            </h3>
            <span
                v-if="settings.patients.live && currentPatients"
                class="badge badge-default"
            >
                {{ $mc('patients.title', currentPatients) }}
            </span>
            <span
                v-if="settings.prisoners.live && currentPrisoners"
                class="badge badge-default"
            >
                {{ $mc('prisoners.title', currentPrisoners) }}
            </span>
            <h4 v-if="settings.vehicles.title">
                {{ $m('vehicles.title') }}
            </h4>
            <ul v-if="settings.vehicles.content">
                <li
                    v-for="(vehicle, req) in vehicles"
                    :key="req"
                    :data-amount="vehicle.amount"
                >
                    {{ vehicle.caption }}
                    <span v-if="vehicle.additionalText">
                        {{ vehicle.additionalText }}
                    </span>
                    <span v-if="vehicle.percentage">
                        ({{ vehicle.percentage }}%)
                    </span>
                </li>
            </ul>
            <h4 v-if="settings.patients.title && showPatients">
                {{ $mc('patients.title', 0) }}
            </h4>
            <ul v-if="settings.patients.content && showPatients">
                <li
                    v-if="
                        missionSpecs.additional.possible_patient_min &&
                            missionSpecs.additional.possible_patient_min !==
                                missionSpecs.additional.possible_patient
                    "
                    :data-amount="missionSpecs.additional.possible_patient_min"
                >
                    {{
                        $mc(
                            'patients.possible_patient_min',
                            missionSpecs.additional.possible_patient_min
                        )
                    }}
                </li>
                <li
                    v-if="missionSpecs.additional.possible_patient"
                    :min-is-max="
                        (min_is_max =
                            missionSpecs.additional.possible_patient ===
                            missionSpecs.additional.possible_patient_min)
                    "
                    :data-amount="
                        min_is_max
                            ? null
                            : missionSpecs.additional.possible_patient
                    "
                >
                    {{
                        $mc(
                            min_is_max
                                ? 'patients.possible_patient_exact'
                                : 'patients.possible_patient',
                            missionSpecs.additional.possible_patient
                        )
                    }}
                </li>
                <li
                    v-if="missionSpecs.chances.patient_transport"
                    :data-amount="`${missionSpecs.chances.patient_transport}%`"
                >
                    {{ $m('patients.patient_transport') }}
                    (
                    <span
                        v-if="missionSpecs.additional.patient_specializations"
                    >
                        {{ $m('patients.specializations') }}
                        <b>{{
                            missionSpecs.additional.patient_specializations
                        }}</b>
                    </span>
                    )
                </li>
                <li
                    v-if="missionSpecs.chances.nef"
                    :data-amount="`${missionSpecs.chances.nef}%`"
                >
                    {{ $m('patients.nef') }}
                </li>
                <li
                    v-if="missionSpecs.chances.helicopter"
                    :data-amount="`${missionSpecs.chances.helicopter}%`"
                >
                    {{ $m('patients.helicopter') }}
                </li>
                <li v-if="missionSpecs.additional.patient_at_end_of_mission">
                    <b>
                        {{
                            $mc(
                                'patients.patient_at_end_of_mission',
                                missionSpecs.additional.possible_patient
                            )
                        }}
                    </b>
                </li>
            </ul>
            <h4
                v-if="
                    settings.prisoners.title &&
                        missionSpecs.additional &&
                        missionSpecs.additional.max_possible_prisoners
                "
            >
                {{ $mc('prisoners.title', 0) }}
            </h4>
            <ul v-if="settings.prisoners.content && missionSpecs.additional">
                <li
                    v-if="missionSpecs.additional.max_possible_prisoners"
                    :data-amount="
                        missionSpecs.additional.max_possible_prisoners
                    "
                >
                    {{
                        $mc(
                            'prisoners.max_possible_prisoners',
                            missionSpecs.additional.max_possible_prisoners
                        )
                    }}
                </li>
            </ul>
            <h4 v-if="settings.prerequisites">
                {{
                    $mc(
                        'prerequisites.title',
                        Object.keys(missionSpecs.prerequisites).length
                    )
                }}
            </h4>
            <ul v-if="settings.prerequisites">
                <li
                    v-for="(amount, req) in missionSpecs.prerequisites"
                    :key="req"
                    :data-amount="amount"
                >
                    {{ $mc(`prerequisites.${req}`, amount) }}
                </li>
            </ul>
            <span v-if="settings.generatedBy">
                {{ $m('generated_by') }}:
                {{ missionSpecs.generated_by }}
                <br />
            </span>
            <span
                class="badge badge-default"
                v-for="req in specialRequirements"
                :key="req"
            >
                {{
                    $mc(`requirements.${req}`, missionSpecs.requirements[req])
                }}:
                {{ missionSpecs.requirements[req].toLocaleString() }}
            </span>
            <br />
            <span
                v-if="settings.credits && missionSpecs.average_credits"
                class="badge badge-default"
            >
                ~{{ missionSpecs.average_credits.toLocaleString() }}
                {{ $t('credits') }}
            </span>
            <div
                v-if="
                    settings.expansions &&
                        missionSpecs.additional &&
                        missionSpecs.additional.expansion_missions_ids
                "
            >
                {{
                    $tc(
                        'modules.missionHelper.expansions',
                        Object.values(
                            missionSpecs.additional.expansion_missions_ids
                        ).length
                    )
                }}:
                <a
                    :href="`/einsaetze/${expansion}`"
                    v-for="expansion in missionSpecs.additional
                        .expansion_missions_ids"
                    :key="expansion"
                    :mission="
                        (mission =
                            missionSpecs.additional.expansion_missions_names[
                                expansion
                            ])
                    "
                >
                    <span class="badge badge-default" v-if="mission">
                        {{ mission }}
                    </span>
                </a>
            </div>
            <div
                v-if="
                    settings.followup &&
                        missionSpecs.additional &&
                        missionSpecs.additional.followup_missions_ids
                "
            >
                {{
                    $tc(
                        'modules.missionHelper.followups',
                        Object.values(
                            missionSpecs.additional.followup_missions_ids
                        ).length
                    )
                }}:
                <a
                    :href="`/einsaetze/${followup}`"
                    v-for="followup in missionSpecs.additional
                        .followup_missions_ids"
                    :key="followup"
                    :mission="
                        (mission =
                            missionSpecs.additional.followup_missions_names[
                                followup
                            ])
                    "
                >
                    <span class="badge badge-default" v-if="mission">
                        {{ mission }}
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons/faSyncAlt';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons/faAngleDoubleUp';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons/faAngleDoubleDown';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons/faArrowsAlt';
import { faCompressAlt } from '@fortawesome/free-solid-svg-icons/faCompressAlt';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import {
    MissionHelper,
    MissionHelperMethods,
    MissionHelperComputed,
    VehicleRequirements,
} from 'typings/modules/MissionHelper';
import { Mission } from 'typings/Mission';
import { DefaultProps } from 'vue/types/options';

export default Vue.extend<
    MissionHelper,
    MissionHelperMethods,
    MissionHelperComputed,
    DefaultProps
>({
    name: 'missionHelper',
    data() {
        return {
            faSyncAlt,
            faAngleDoubleUp,
            faAngleDoubleDown,
            faArrowsAlt,
            faCompressAlt,
            faExpandAlt,
            id: this.$store.getters.nodeAttribute('missionHelper'),
            isReloading: true,
            isDiyMission: false,
            missionSpecs: undefined,
            overlay: undefined,
            minified: undefined,
            missionId: parseInt(
                window.location.pathname.match(/\d+\/?/)?.[0] || '0'
            ),
            settings: {
                title: true,
                id: true,
                type: true,
                place: true,
                prerequisites: true,
                vehicles: {
                    title: true,
                    content: true,
                    patient_additionals: true,
                    sort: 'caption',
                },
                chances: {
                    normal: true,
                    100: true,
                },
                multifunctionals: {
                    heavy_rescue_vehicles: true,
                    battalion_chief_vehicles: true,
                    platform_trucks: true,
                },
                optionalAlternatives: {
                    allow_rw_instead_of_lf: true,
                },
                patients: {
                    title: true,
                    content: true,
                    live: true,
                    hideWhenNoNeed: true,
                },
                prisoners: {
                    title: true,
                    content: true,
                    live: true,
                },
                generatedBy: true,
                credits: true,
                expansions: true,
                followup: true,
            },
            noVehicleRequirements: Object.values(
                this.$m('noVehicleRequirements')
            ),
            drag: {
                active: false,
                top: 60,
                right: window.innerWidth * 0.03,
                offset: {
                    x: 0,
                    y: 0,
                },
            },
        } as MissionHelper;
    },
    computed: {
        currentPatients() {
            return document.querySelectorAll('.mission_patient').length;
        },
        currentPrisoners() {
            return parseInt(
                document
                    .getElementById('h2_prisoners')
                    ?.textContent?.trim()
                    .match(/^\d+/)?.[0] || '0'
            );
        },
        showPatients() {
            if (this.settings.patients.hideWhenNoNeed) {
                return (
                    this.missionSpecs?.additional.patient_at_end_of_mission ||
                    !!this.currentPatients
                );
            } else {
                return !!this.missionSpecs?.additional?.possible_patient;
            }
        },
        vehicles() {
            const vehicles = {} as VehicleRequirements;
            Object.keys(this.missionSpecs?.requirements || {})
                .filter(req => !this.noVehicleRequirements.includes(req))
                .forEach(vehicle => {
                    let percentage = this.missionSpecs?.chances[vehicle] || 100;
                    if (
                        (percentage === 100 && !this.settings.chances['100']) ||
                        (percentage > 0 && !this.settings.chances.normal)
                    )
                        percentage = 0;
                    vehicles[vehicle] = {
                        caption: this.$mc(
                            `vehicles.captions.${vehicle}`,
                            this.missionSpecs?.requirements[vehicle] || 0
                        ).toString(),
                        amount: this.missionSpecs?.requirements[vehicle] || 0,
                        percentage,
                    };
                });

            if (this.settings.vehicles.patient_additionals) {
                const patientAdditionals = this.$m(
                    'vehicles.patient_additionals'
                ) as {
                    [amount: number]: string;
                };
                Object.keys(patientAdditionals).forEach(
                    patients =>
                        this.currentPatients >= parseInt(patients) &&
                        (vehicles[patients] = {
                            amount: 1,
                            caption: patientAdditionals[parseInt(patients)],
                        })
                );
            }
            if (this.missionSpecs?.additional) {
                const optionalAlternatives = this.$m(
                    'vehicles.optional_alternatives'
                ) as {
                    [alternative: string]: {
                        [vehicle: string]: string;
                    };
                };
                Object.keys(optionalAlternatives).forEach(alt => {
                    if (
                        !optionalAlternatives[alt].not_customizable &&
                        !this.settings.optionalAlternatives[alt]
                    )
                        return;
                    if (
                        this.missionSpecs?.additional.hasOwnProperty(alt) &&
                        this.missionSpecs.additional[alt]
                    )
                        return Object.keys(optionalAlternatives[alt]).forEach(
                            rep =>
                                (vehicles[rep].caption = this.$mc(
                                    `vehicles.optional_alternatives.${alt}.${rep}`,
                                    vehicles[rep].amount
                                ).toString())
                        );
                });
            }
            const multifunctionals = (this.$m(
                'vehicles.multifunctionals'
            ) as unknown) as {
                [multi: string]: {
                    additional_text: string;
                    reduce_from: string;
                    not_customizable?: boolean;
                };
            };
            Object.keys(multifunctionals).forEach(vehicle => {
                if (
                    !multifunctionals[vehicle].not_customizable &&
                    !this.settings.multifunctionals[vehicle]
                )
                    return;
                if (
                    vehicles.hasOwnProperty(vehicle) &&
                    vehicles.hasOwnProperty(
                        multifunctionals[vehicle].reduce_from
                    )
                ) {
                    vehicles[vehicle].old = vehicles[vehicle].amount;
                    vehicles[vehicle].amount =
                        vehicles[vehicle].amount -
                        vehicles[multifunctionals[vehicle].reduce_from].amount;
                    vehicles[
                        multifunctionals[vehicle].reduce_from
                    ].additionalText = this.$mc(
                        `vehicles.multifunctionals.${vehicle}.additional_text`,
                        vehicles[vehicle].old || 0
                    ).toString();
                }
            });
            const vehiclesFiltered = {} as VehicleRequirements;
            Object.entries(vehicles)
                .filter(([, vehicle]) => vehicle.amount > 0)
                .sort(([, aVehicle], [, bVehicle]) =>
                    (aVehicle[this.settings.vehicles.sort] || 0) <
                    (bVehicle[this.settings.vehicles.sort] || 0)
                        ? -1
                        : (aVehicle[this.settings.vehicles.sort] || 0) >
                          (bVehicle[this.settings.vehicles.sort] || 0)
                        ? 1
                        : 0
                )
                .forEach(
                    ([type, vehicle]) => (vehiclesFiltered[type] = vehicle)
                );
            return vehiclesFiltered;
        },
        specialRequirements() {
            return Object.keys(
                this.missionSpecs?.requirements || {}
            ).filter(req => this.noVehicleRequirements.includes(req));
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.missionHelper.${key}`, args);
        },
        $mc(key, amount, args) {
            return this.$tc(`modules.missionHelper.${key}`, amount, args);
        },
        async reloadSpecs(force = false) {
            this.isReloading = true;

            const missionHelpBtn = document.getElementById('mission_help');
            this.isDiyMission = !missionHelpBtn;

            this.missionSpecs = undefined;

            if (!this.isDiyMission)
                this.missionSpecs = await this.getMission(
                    parseInt(
                        missionHelpBtn
                            ?.getAttribute('href')
                            ?.match(/(?!^\/einsaetze\/)\d+/)?.[0] || '-1'
                    ),
                    force
                );

            this.isReloading = false;
        },
        async getMission(id, force) {
            const missions = (await this.$store.dispatch(
                'api/getMissions',
                force
            )) as Mission[];
            const mission = missions?.find(spec => spec.id === id);
            if (mission) {
                mission.additional.expansion_mission_names = Object.fromEntries(
                    mission.additional.expansion_missions_ids?.map(id => [
                        id,
                        missions.find(spec => spec.id === id)?.name || '',
                    ]) || []
                );
                mission.additional.followup_missions_names = Object.fromEntries(
                    mission.additional.followup_missions_ids?.map(id => [
                        id,
                        missions.find(spec => spec.id === id)?.name || '',
                    ]) || []
                );
            }
            return mission;
        },
        loadSetting(id, base, base_string = '') {
            if (typeof base[id] === 'object') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                Object.keys(base[id]).forEach(sid =>
                    this.loadSetting(
                        sid,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        base[id],
                        `${base_string ? `${base_string}.` : ''}${id}`
                    )
                );
            } else {
                this.$store
                    .dispatch('settings/getSetting', {
                        moduleId: MODULE_ID,
                        settingId: `${
                            base_string ? `${base_string}.` : ''
                        }${id}`,
                        defaultValue: base[id],
                    })
                    .then(setting => {
                        this.$set(base, id, setting);
                    });
            }
        },
        toggleOverlay() {
            this.$store
                .dispatch('settings/setSetting', {
                    moduleId: MODULE_ID,
                    settingId: `overlay`,
                    value: !this.overlay,
                })
                .then(() => (this.overlay = !this.overlay));
        },
        toggleMinified() {
            this.$store
                .dispatch('settings/setSetting', {
                    moduleId: MODULE_ID,
                    settingId: `minified`,
                    value: !this.minified,
                })
                .then(() => (this.minified = !this.minified));
        },
        dragStart(e) {
            const current = { x: e.clientX, y: e.clientY };
            const missionHelperOffset = this.$el.getBoundingClientRect();
            document.body.classList.add('lssm-is-dragging');
            const topRight = {
                x: missionHelperOffset.x + missionHelperOffset.width,
                y: missionHelperOffset.y,
            };
            this.drag.offset = {
                x: topRight.x - current.x,
                y: topRight.y - current.y,
            };
            this.drag.active = true;
            document.addEventListener('mouseup', this.dragEnd);
            document.addEventListener('mousemove', this.dragging);
        },
        async dragEnd() {
            this.drag.active = false;
            document.body.classList.remove('lssm-is-dragging');
            document.removeEventListener('mouseup', this.dragEnd);
            document.removeEventListener('mousemove', this.dragging);
        },
        async dragging(e) {
            if (!this.drag.active) return;
            e.preventDefault();
            const current = { x: e.clientX, y: e.clientY };
            this.drag.top = current.y + this.drag.offset.y;
            this.drag.right =
                window.innerWidth - current.x - this.drag.offset.x;
        },
    },
    beforeMount() {
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: MODULE_ID,
                settingId: 'overlay',
                defaultValue: false,
            })
            .then(overlay => (this.overlay = overlay));
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: MODULE_ID,
                settingId: 'minified',
                defaultValue: false,
            })
            .then(minified => (this.minified = minified));
    },
    mounted() {
        this.reloadSpecs();
        Object.keys(this.settings).forEach(id =>
            this.loadSetting(id, this.settings)
        );
    },
});
</script>

<style lang="sass">
.alert-missing-vehicles:hover ~ * .overlay
    opacity: 0.1
</style>

<style scoped lang="sass">
.alert

    &.overlay
        z-index: 2
        position: fixed
        top: 3%
        right: 3%
        min-width: 100px
        max-width: calc(100% / 3)
        height: auto
        max-height: calc((100vh - 51.5px - 3%) * 0.97)
        transition: 100ms linear
        margin-bottom: 0.625em

    &.minified
        max-height: 1rem
        min-width: auto

        > div
            display: none

    h3
        margin-top: 0 !important

    .svg-inline--fa
        cursor: pointer
        position: relative
        top: -6px

        &.dragging-field
            cursor: move

    ul li
        list-style: none

        &::before
            content: attr(data-amount) + " "

        @supports #{'selector(li::marker)'}
            &::before
                content: " "
                white-space: pre
            &::marker
                content: attr(data-amount)

    .badge
        margin-right: 0.3rem
</style>
