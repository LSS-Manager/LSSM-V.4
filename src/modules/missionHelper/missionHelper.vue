<template>
    <div class="alert alert-warning">
        <font-awesome-icon
            class="pull-right"
            :icon="faSyncAlt"
            :spin="isReloading"
            @click="reloadSpecs(true)"
        ></font-awesome-icon>
        <span v-if="isDiyMission">{{
            $t('modules.missionHelper.diyMission')
        }}</span>
        <div v-else>
            <h3 v-if="settings.title">
                {{ missionSpecs.name }}
                <small v-if="settings.place && missionSpecs.place">{{
                    missionSpecs.place
                }}</small>
            </h3>
            <h4 v-if="settings.vehicles.title">
                {{ $t('modules.missionHelper.vehicles.title') }}
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
                    <span
                        v-if="
                            (missionSpecs.chances[vehicle] === 100 ||
                                !missionSpecs.chances.hasOwnProperty(
                                    vehicle
                                )) &&
                                settings.chances['100']
                        "
                    >
                        (100%)
                    </span>
                    <span v-else-if="settings.chances.normal">
                        ({{ missionSpecs.chances[vehicle] }}%)
                    </span>
                </li>
            </ul>
            <span v-if="settings.generatedBy">
                {{ $t('modules.missionHelper.generated_by') }}:&nbsp;
                {{ missionSpecs.generated_by }}
            </span>
            <span
                v-if="settings.credits && missionSpecs.average_credits"
                class="badge badge-default"
            >
                ~{{ missionSpecs.average_credits.toLocaleString() }}&nbsp;
                {{ $t('credits') }}
            </span>
        </div>
    </div>
</template>

<script>
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons/faSyncAlt';

export default {
    name: 'missionHelper',
    data() {
        return {
            faSyncAlt,
            isReloading: true,
            isDiyMission: false,
            missionSpecs: {},
            settings: {
                title: true,
                place: true,
                vehicles: {
                    title: true,
                    content: true,
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
                generated_by: true,
                credits: true,
            },
            noVehicleRequirements: Object.values(
                this.$t('modules.missionHelper.noVehicleRequirements')
            ),
        };
    },
    computed: {
        vehicles() {
            const vehicles = {};
            Object.keys(this.missionSpecs.requirements || {})
                .filter(req => !this.noVehicleRequirements.includes(req))
                .forEach(
                    vehicle =>
                        (vehicles[vehicle] = {
                            caption: this.$tc(
                                `modules.missionHelper.vehicles.captions.${vehicle}`,
                                this.missionSpecs.requirements[vehicle]
                            ),
                            amount: this.missionSpecs.requirements[vehicle],
                        })
                );
            if (this.missionSpecs.additional) {
                const optionalAlternatives = this.$t(
                    'modules.missionHelper.vehicles.optional_alternatives'
                );
                Object.keys(optionalAlternatives).forEach(
                    alt =>
                        this.missionSpecs.additional.hasOwnProperty(alt) &&
                        this.missionSpecs.additional[alt] &&
                        Object.keys(optionalAlternatives[alt]).forEach(
                            rep =>
                                (vehicles[rep].caption = this.$tc(
                                    `modules.missionHelper.vehicles.optional_alternatives.${alt}.${rep}`,
                                    vehicles[rep].amount
                                ))
                        )
                );
            }
            const multifunctionals = this.$t(
                'modules.missionHelper.vehicles.multifunctionals'
            );
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
                    ].additionalText = this.$tc(
                        `modules.missionHelper.vehicles.multifunctionals.${vehicle}.additional_text`,
                        vehicles[vehicle].old
                    );
                }
            });
            const vehiclesFiltered = {};
            Object.keys(vehicles)
                .filter(vehicle => vehicles[vehicle].amount > 0)
                .forEach(
                    vehicle => (vehiclesFiltered[vehicle] = vehicles[vehicle])
                );
            return vehiclesFiltered;
        },
    },
    methods: {
        async reloadSpecs(force = false) {
            this.isReloading = true;

            const missionHelpBtn = document.getElementById('mission_help');
            this.isDiyMission = !missionHelpBtn;

            this.missionSpecs = {};

            if (
                force ||
                !sessionStorage.hasOwnProperty('mission_specs_cache')
            ) {
                sessionStorage.setItem(
                    'mission_specs_cache',
                    JSON.stringify(
                        Object.values(
                            await window.lssmv4.$store
                                .dispatch('api/request', {
                                    url: `${window.lssmv4.$store.state.server}missions/${BUILD_LANG}.json`,
                                    init: {
                                        method: 'GET',
                                    },
                                })
                                .then(res => res.json())
                                .catch(() => {})
                        )
                    )
                );
            }

            if (!this.isDiyMission)
                this.missionSpecs = this.getMission(
                    parseInt(
                        missionHelpBtn
                            .getAttribute('href')
                            .match(/(?!^\/einsaetze\/)\d+/)[0]
                    )
                );

            this.isReloading = false;
        },
        getMission(id) {
            return JSON.parse(
                sessionStorage.getItem('mission_specs_cache')
            ).find(spec => spec.id === id);
        },
    },
    mounted() {
        this.reloadSpecs();
    },
};
</script>

<style scoped lang="sass">
h3
    margin-top: 0 !important

.svg-inline--fa
    cursor: pointer

ul li
    &::before
        content: " "
        white-space: pre
    &::marker
        content: attr(data-amount)
</style>
