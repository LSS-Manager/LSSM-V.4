<template>
    <div
        class="alert alert-warning"
        :class="{ overlay, minified }"
        :style="`top: ${drag.top}px; right: ${drag.right}px`"
        :id="id"
    >
        <font-awesome-icon
            class="pull-right"
            :class="{ 'hover-tip': settings.hoverTip }"
            :icon="minified ? faExpandAlt : faCompressAlt"
            :fixed-width="true"
            @click="toggleMinified"
        ></font-awesome-icon>
        <div v-if="settings.hoverTip" class="alert alert-info">
            {{ $m('tip.minified') }}
        </div>
        <font-awesome-icon
            v-show="overlay"
            :icon="faArrowsAlt"
            class="pull-right dragging-field"
            :class="{ 'hover-tip': settings.hoverTip }"
            :fixed-width="true"
            @mousedown="dragStart"
        ></font-awesome-icon>
        <div v-if="settings.hoverTip" class="alert alert-info">
            {{ $m('tip.dragging') }}
        </div>
        <font-awesome-icon
            class="pull-right"
            :class="{ 'hover-tip': settings.hoverTip }"
            :icon="faSyncAlt"
            :spin="isReloading"
            :fixed-width="true"
            @click="reloadSpecs(true)"
        ></font-awesome-icon>
        <div v-if="settings.hoverTip" class="alert alert-info">
            {{ $m('tip.reload') }}
        </div>
        <font-awesome-icon
            class="pull-right"
            :class="{ 'hover-tip': settings.hoverTip }"
            :icon="overlay ? faAngleDoubleDown : faAngleDoubleUp"
            :fixed-width="true"
            @click="toggleOverlay"
        ></font-awesome-icon>
        <div v-if="settings.hoverTip" class="alert alert-info">
            {{ $m('tip.overlay') }}
        </div>
        <font-awesome-icon
            class="pull-right"
            :class="{ 'hover-tip': settings.hoverTip }"
            :icon="maxState ? faSubscript : faSuperscript"
            :fixed-width="true"
            @click="toggleMaximum"
        ></font-awesome-icon>
        <div v-if="settings.hoverTip" class="alert alert-info">
            {{ $m('tip.maxState') }}
        </div>
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
                    v-bind:class="{ 'class-x': settings.vehicles.xAfterNumber }"
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
                    <span
                        v-else-if="
                            missionSpecs.additional.all_patient_specializations
                        "
                    >
                        {{ $m('patients.specializations') }}
                        <b>{{
                            missionSpecs.additional.all_patient_specializations.join(
                                ', '
                            )
                        }}</b>
                    </span>
                    )
                </li>
                <li
                    v-if="missionSpecs.chances.critical_care"
                    :data-amount="`${missionSpecs.chances.critical_care}%`"
                >
                    {{ $m('patients.critical_care') }}
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
                <li
                    v-if="
                        missionSpecs.additional
                            .patient_allow_first_responder_chance &&
                            settings.patients
                                .patient_allow_first_responder_chance
                    "
                    :data-amount="
                        `${missionSpecs.additional.patient_allow_first_responder_chance}%`
                    "
                >
                    {{ $m('patients.patient_allow_first_responder_chance') }}
                </li>
                <li
                    v-if="
                        missionSpecs.additional.allow_ktw_instead_of_rtw &&
                            settings.optionalAlternatives
                                .allow_ktw_instead_of_rtw
                    "
                >
                    {{ $m('patients.allow_ktw_instead_of_rtw') }}
                </li>
                <li
                    v-if="
                        !maxState &&
                            missionSpecs.additional.patient_at_end_of_mission
                    "
                >
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
            <span v-if="!maxState && settings.generatedBy">
                {{ $m('generated_by') }}:
                {{ missionSpecs.generated_by }}
                <br />
            </span>
            <ul v-if="specialRequirements.nonbadge.length">
                <li
                    v-for="req in specialRequirements.nonbadge"
                    :key="req"
                    :amount="
                        (amount =
                            missionSpecs[$m(`noVehicleRequirements.${req}.in`)][
                                req
                            ])
                    "
                    :data-amount="amount"
                >
                    {{ $mc(`noVehicleRequirements.${req}.text`, amount) }}
                </li>
            </ul>
            <span
                class="badge badge-default"
                v-for="req in specialRequirements.badge"
                :key="req"
            >
                {{
                    $mc(
                        `noVehicleRequirements.${req}.text`,
                        missionSpecs[$m(`noVehicleRequirements.${req}.in`)][req]
                    )
                }}
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
                    !maxState &&
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
                    !maxState &&
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
            <div
                v-if="
                    !maxState &&
                        settings.subsequent &&
                        missionSpecs.additional &&
                        missionSpecs.additional.subsequent_missions_ids
                "
            >
                {{
                    $tc(
                        'modules.missionHelper.subsequent',
                        Object.values(
                            missionSpecs.additional.subsequent_missions_ids
                        ).length
                    )
                }}:
                <a
                    :href="`/einsaetze/${subsequent}`"
                    v-for="subsequent in missionSpecs.additional
                        .subsequent_missions_ids"
                    :key="subsequent"
                    :mission="
                        (mission =
                            missionSpecs.additional.subsequent_missions_names[
                                subsequent
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
import { faSuperscript } from '@fortawesome/free-solid-svg-icons/faSuperscript';
import { faSubscript } from '@fortawesome/free-solid-svg-icons/faSubscript';
import {
    MissionHelper,
    MissionHelperMethods,
    MissionHelperComputed,
    VehicleRequirements,
} from 'typings/modules/MissionHelper';
import { Mission } from 'typings/Mission';
import { DefaultProps } from 'vue/types/options';
import cloneDeep from 'lodash/cloneDeep';

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
            faSuperscript,
            faSubscript,
            id: this.$store.getters.nodeAttribute('missionHelper', true),
            isReloading: true,
            isDiyMission: false,
            missionSpecs: undefined,
            maxMissionSpecs: undefined,
            maxMissionToggleCache: undefined,
            maxState: false,
            overlay: undefined,
            minified: undefined,
            missionId: parseInt(
                window.location.pathname.match(/\d+\/?/)?.[0] || '0'
            ),
            settings: {
                title: false,
                id: false,
                type: false,
                place: false,
                prerequisites: false,
                vehicles: {
                    title: false,
                    content: false,
                    patient_additionals: false,
                    sort: 'caption',
                    sortDesc: false,
                    xAfterNumber: false,
                },
                chances: {
                    normal: false,
                    100: false,
                },
                multifunctionals: {
                    heavy_rescue_vehicles: false,
                    battalion_chief_vehicles: false,
                    platform_trucks: false,
                    police_cars: false,
                },
                optionalAlternatives: {
                    allow_rw_instead_of_lf: false,
                    allow_arff_instead_of_lf: false,
                    allow_ktw_instead_of_rtw: false,
                    allow_drone_instead_of_investigation: false,
                },
                patients: {
                    code_possible: false,
                    critical_care: false,
                    title: false,
                    content: false,
                    live: false,
                    hideWhenNoNeed: false,
                    patient_allow_first_responder_chance: false,
                },
                prisoners: {
                    title: false,
                    content: false,
                    live: false,
                },
                generatedBy: false,
                credits: false,
                expansions: false,
                followup: false,
                subsequent: false,
                k9_only_if_needed: false,
                bucket_only_if_needed: false,
                hide_battalion_chief_vehicles: false,
                bike_police_only_if_needed: false,
                noVehicleRequirements: [],
                hoverTip: false,
            },
            noVehicleRequirements: Object.keys(
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
            if (this.maxState) return true;
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
            return this.getVehicles(this.missionSpecs, false);
        },
        specialRequirements() {
            const reqi18n = (this.$m('noVehicleRequirements') as unknown) as {
                [key: string]: {
                    badge: boolean;
                    text: string;
                    in: 'additional' | 'prerequisites';
                };
            };
            const reqs = { badge: [], nonbadge: [] } as {
                badge: string[];
                nonbadge: string[];
            };
            this.settings.noVehicleRequirements?.forEach(req =>
                reqi18n.hasOwnProperty(req) &&
                this.missionSpecs?.[reqi18n[req].in][req]
                    ? reqs[reqi18n[req].badge ? 'badge' : 'nonbadge'].push(req)
                    : null
            );
            return reqs;
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

            if (!this.isDiyMission) {
                this.missionSpecs = await this.getMission(
                    parseInt(
                        missionHelpBtn
                            ?.getAttribute('href')
                            ?.match(/(?!^\/einsaetze\/)\d+/)?.[0] || '-1'
                    ),
                    force
                );
            }

            this.isReloading = false;
        },
        async getMission(id, force) {
            const missions = (await this.$store.dispatch('api/getMissions', {
                force,
                feature: 'missionHelper-getMission',
            })) as Mission[];
            const mission = missions?.find(spec => spec.id === id);
            if (mission) {
                if (this.settings.expansions && mission.additional) {
                    mission.additional.expansion_missions_names = Object.fromEntries(
                        mission.additional.expansion_missions_ids?.map(id => [
                            id,
                            missions.find(spec => spec.id === id)?.name || '',
                        ]) || []
                    );
                }
                if (this.settings.followup && mission.additional) {
                    mission.additional.followup_missions_names = Object.fromEntries(
                        mission.additional.followup_missions_ids?.map(id => [
                            id,
                            missions.find(spec => spec.id === id)?.name || '',
                        ]) || []
                    );
                }
                if (this.settings.subsequent && mission.additional) {
                    mission.additional.subsequent_missions_names = Object.fromEntries(
                        mission.additional.subsequent_missions_ids?.map(id => [
                            id,
                            missions.find(spec => spec.id === id)?.name || '',
                        ]) || []
                    );
                }
            }
            return mission;
        },
        loadSetting(id, base, base_string = '') {
            if (typeof base[id] === 'object' && !Array.isArray(base[id])) {
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
                        moduleId: 'missionHelper',
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
                    moduleId: 'missionHelper',
                    settingId: `overlay`,
                    value: !this.overlay,
                })
                .then(() => (this.overlay = !this.overlay));
        },
        toggleMinified() {
            this.$store
                .dispatch('settings/setSetting', {
                    moduleId: 'missionHelper',
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
            await this.$store.dispatch('settings/setSetting', {
                moduleId: 'missionHelper',
                settingId: `drag`,
                value: this.drag,
            });
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
        getVehicles(missionSpecs, isMaxReq = false) {
            const vehicles = {} as VehicleRequirements;
            Object.keys(missionSpecs?.requirements || {})
                .filter(req => !this.noVehicleRequirements.includes(req))
                .forEach(vehicle => {
                    let percentage = missionSpecs?.chances[vehicle] || 100;
                    if (
                        (percentage === 100 && !this.settings.chances['100']) ||
                        (percentage > 0 && !this.settings.chances.normal)
                    )
                        percentage = 0;
                    let vehicleName = vehicle;
                    if (
                        !isMaxReq &&
                        vehicle === 'k9' &&
                        missionSpecs?.additional
                            .need_k9_only_if_guard_dogs_present &&
                        this.settings.k9_only_if_needed
                    )
                        vehicleName = 'k9_only_if_needed';
                    if (
                        !isMaxReq &&
                        vehicle === 'helicopter_bucket' &&
                        missionSpecs?.additional
                            .need_helicopter_bucket_only_if_present &&
                        this.settings.bucket_only_if_needed
                    )
                        vehicleName = 'bucket_only_if_needed';
                    if (
                        !isMaxReq &&
                        vehicle === 'bike_police' &&
                        missionSpecs?.additional
                            .need_bike_police_only_if_present &&
                        this.settings.bike_police_only_if_needed
                    )
                        vehicleName = 'bike_police_only_if_needed';
                    if (
                        !isMaxReq &&
                        this.settings.hide_battalion_chief_vehicles &&
                        vehicle === 'battalion_chief_vehicles'
                    )
                        return;
                    vehicles[vehicle] = {
                        caption: this.$mc(
                            `vehicles.captions.${vehicleName}`,
                            missionSpecs?.requirements[vehicle] || 0
                        ).toString(),
                        amount: missionSpecs?.requirements[vehicle] || 0,
                        percentage,
                    };
                    if (
                        !isMaxReq &&
                        this.settings.hide_battalion_chief_vehicles &&
                        vehicle === 'mobile_command_vehicles'
                    ) {
                        vehicles[vehicle].amount = Math.max(
                            vehicles[vehicle].amount,
                            missionSpecs?.requirements[
                                'battalion_chief_vehicles'
                            ] ?? 0
                        );
                    }
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
                        (vehicles[`patients_${patients}`] = {
                            amount: 1,
                            caption: patientAdditionals[parseInt(patients)],
                        })
                );
            }
            if (missionSpecs?.additional) {
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
                        missionSpecs?.additional.hasOwnProperty(alt) &&
                        missionSpecs.additional[alt]
                    ) {
                        return Object.keys(optionalAlternatives[alt]).forEach(
                            rep => {
                                if (
                                    !missionSpecs?.requirements.hasOwnProperty(
                                        rep
                                    )
                                )
                                    return;
                                vehicles[rep].caption = this.$mc(
                                    `vehicles.optional_alternatives.${alt}.${rep}`,
                                    vehicles[rep].amount
                                ).toString();
                            }
                        );
                    }
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
                    ].additionalText =
                        this.$mc(
                            `vehicles.multifunctionals.${vehicle}.additional_text`,
                            vehicles[vehicle].old || 0
                        )?.toString() ?? '';
                }
            });
            const vehiclesFiltered = {} as VehicleRequirements;
            Object.entries(vehicles)
                .filter(([, vehicle]) => vehicle.amount > 0)
                .sort(([, aVehicle], [, bVehicle]) =>
                    (aVehicle[this.settings.vehicles.sort] || 0) <
                    (bVehicle[this.settings.vehicles.sort] || 0)
                        ? this.settings.vehicles.sortDesc
                            ? 1
                            : -1
                        : (aVehicle[this.settings.vehicles.sort] || 0) >
                          (bVehicle[this.settings.vehicles.sort] || 0)
                        ? this.settings.vehicles.sortDesc
                            ? -1
                            : 1
                        : 0
                )
                .forEach(
                    ([type, vehicle]) => (vehiclesFiltered[type] = vehicle)
                );
            return vehiclesFiltered;
        },
        async getMaxVehicles(currentSpecs) {
            if (!currentSpecs) return;
            this.maxMissionSpecs = cloneDeep(currentSpecs);
            while (
                this.maxMissionSpecs?.additional?.expansion_missions_ids?.length
            ) {
                const expansionId = this.maxMissionSpecs?.additional?.expansion_missions_ids.splice(
                    0,
                    1
                )?.[0];
                const specs = await this.getMission(expansionId, false);
                this.maxMissionSpecs.average_credits = Math.max(
                    this.maxMissionSpecs.average_credits ?? 0,
                    specs?.average_credits ?? 0
                );
                Object.entries(specs?.requirements ?? {}).forEach(
                    ([req, amount]) => {
                        if (this.maxMissionSpecs) {
                            this.maxMissionSpecs.requirements[req] = Math.max(
                                this.maxMissionSpecs.requirements[req] ?? 0,
                                amount ?? 0
                            );
                        }
                    }
                );
                Object.entries(specs?.prerequisites ?? {}).forEach(
                    ([req, amount]) => {
                        if (this.maxMissionSpecs) {
                            this.maxMissionSpecs.prerequisites[req] = Math.max(
                                this.maxMissionSpecs.prerequisites[req] ?? 0,
                                amount ?? 0
                            );
                        }
                    }
                );
                Object.entries(specs?.chances ?? {}).forEach(
                    ([req, amount]) => {
                        if (this.maxMissionSpecs) {
                            this.maxMissionSpecs.chances[req] = Math.max(
                                this.maxMissionSpecs.chances[req] ?? 100,
                                amount ?? 100
                            );
                        }
                    }
                );
                this.maxMissionSpecs?.additional?.expansion_missions_ids?.push(
                    ...(specs?.additional?.expansion_missions_ids ?? [])
                );
                this.maxMissionSpecs.additional.max_possible_prisoners = Math.max(
                    this.maxMissionSpecs.additional.max_possible_prisoners ?? 0,
                    specs?.additional.max_possible_prisoners ?? 0
                );
                this.maxMissionSpecs.additional.average_min_police_personnel = Math.max(
                    this.maxMissionSpecs.additional
                        .average_min_police_personnel ?? 0,
                    specs?.additional.average_min_police_personnel ?? 0
                );
                this.maxMissionSpecs.additional.average_min_fire_personnel = Math.max(
                    this.maxMissionSpecs.additional
                        .average_min_fire_personnel ?? 0,
                    specs?.additional.average_min_fire_personnel ?? 0
                );
                this.maxMissionSpecs.additional.swat_personnel = Math.max(
                    this.maxMissionSpecs.additional.swat_personnel ?? 0,
                    specs?.additional.swat_personnel ?? 0
                );
                this.maxMissionSpecs.additional.possible_patient_min = Math.min(
                    this.maxMissionSpecs.additional.possible_patient_min ?? 0,
                    specs?.additional.possible_patient_min ?? 0
                );
                this.maxMissionSpecs.additional.possible_patient = Math.max(
                    this.maxMissionSpecs.additional.possible_patient ?? 0,
                    specs?.additional.possible_patient ?? 0
                );
                Object.entries(
                    specs?.additional.personnel_educations ?? {}
                ).forEach(([req, amount]) => {
                    if (
                        this.maxMissionSpecs &&
                        this.maxMissionSpecs.additional.personnel_educations
                    ) {
                        this.maxMissionSpecs.additional.personnel_educations[
                            req
                        ] = Math.max(
                            this.maxMissionSpecs.additional
                                .personnel_educations[req] ?? 0,
                            amount ?? 0
                        );
                    }
                });
                if (
                    !this.maxMissionSpecs.additional.all_patient_specializations
                )
                    this.maxMissionSpecs.additional.all_patient_specializations = [];
                if (
                    specs?.additional.patient_specializations &&
                    !this.maxMissionSpecs.additional.all_patient_specializations.includes(
                        specs?.additional.patient_specializations
                    )
                ) {
                    this.maxMissionSpecs.additional.all_patient_specializations.push(
                        specs?.additional.patient_specializations
                    );
                }
            }
        },
        toggleMaximum() {
            this.maxState = !this.maxState;
            if (this.maxState) {
                this.maxMissionToggleCache = cloneDeep(this.missionSpecs);
                this.getMaxVehicles(this.missionSpecs);
                this.missionSpecs = this.maxMissionSpecs;
            } else {
                this.missionSpecs = this.maxMissionToggleCache;
            }
        },
    },
    beforeMount() {
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: 'missionHelper',
                settingId: 'overlay',
                defaultValue: false,
            })
            .then(overlay => (this.overlay = overlay));
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: 'missionHelper',
                settingId: 'minified',
                defaultValue: false,
            })
            .then(minified => (this.minified = minified));
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: 'missionHelper',
                settingId: 'drag',
                defaultValue: false,
            })
            .then(drag => (this.drag = drag));
    },
    mounted() {
        Object.keys(this.settings).forEach(id =>
            this.loadSetting(id, this.settings)
        );
        this.reloadSpecs();
    },
});
</script>

<style lang="sass">
.alert-missing-vehicles:not(.overlay):hover ~ * .overlay
    opacity: 0.1
</style>

<style scoped lang="sass">
.hover-tip
  cursor: pointer

  &:hover
    &+ .alert
      display: block

  &+ .alert
    display: none
    position: absolute
    z-index: 1

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

        > div,
        > span
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
            content: attr(data-amount)

        @supports #{'selector(li::marker)'}
            &::before
                content: " "
                white-space: pre
            &::marker
                content: attr(data-amount)

        &.class-x
            &::before
                content: attr(data-amount) "x " !important

            @supports #{'selector(li::marker)'}
                &::before
                    content: " " !important
                    white-space: pre !important
                &::marker
                    content: attr(data-amount) "x" !important

    .badge
        margin-right: 0.3rem
</style>
