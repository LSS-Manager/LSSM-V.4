<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <font-awesome-icon
                v-if="icon"
                :icon="icon"
                class="type-icon"
            ></font-awesome-icon>
            <span
                v-if="type === 'vehicles'"
                class="building_list_fms"
                :class="`building_list_fms_${vehicle.fms_real}`"
                >{{ vehicle.fms_show }}</span
            >
            <a :href="link" class="lightbox-open" :class="previewLinkClass">
                {{ title }}
            </a>
            <br v-if="additional" />
            <small v-if="additional">
                {{ additional }}
                <span
                    v-if="
                        type === 'buildings' &&
                            vehicleBuildings.includes(building.building_type)
                    "
                >
                    |
                    <font-awesome-icon :icon="faParking"></font-awesome-icon>
                    {{ building.level + 1 }}
                    |
                    <font-awesome-icon :icon="faCar"></font-awesome-icon>
                    {{ buildingVehicles.length }}
                    |
                    <font-awesome-icon :icon="faUsers"></font-awesome-icon>
                    {{ building.personal_count }}
                </span>
                <span
                    v-if="
                        type === 'buildings' &&
                            cellBuildings.includes(building.building_type)
                    "
                >
                    |
                    <font-awesome-icon :icon="faBorderAll"></font-awesome-icon>
                    {{
                        building.extensions.filter(
                            e =>
                                e.available && buildingCells.includes(e.type_id)
                        ).length
                    }}
                    ({{
                        building.extensions.filter(e =>
                            buildingCells.includes(e.type_id)
                        ).length
                    }})
                </span>
                <span
                    v-if="
                        type === 'buildings' &&
                            bedBuildings.includes(building.building_type)
                    "
                >
                    |
                    <font-awesome-icon :icon="faProcedures"></font-awesome-icon>
                    {{ building.level }}
                </span>
                <span
                    v-if="
                        type === 'buildings' &&
                            schoolBuildings.includes(building.building_type)
                    "
                >
                    |
                    <font-awesome-icon
                        :icon="faChalkboardTeacher"
                    ></font-awesome-icon>
                    {{ building.extensions.length + 1 }}
                </span>
            </small>
        </div>
        <div class="panel-body">
            <span v-if="type === 'vehicles'">
                <a
                    class="lightbox-open pull-right"
                    :class="previewLinkClass"
                    :href="`/buildings/${vehicle.building_id}`"
                >
                    {{
                        buildings.find(b => b.id === vehicle.building_id)
                            .caption
                    }}
                </a>
            </span>
            <table
                v-else-if="
                    type === 'buildings' &&
                        vehicleBuildings.includes(building.building_type)
                "
            >
                <tr v-for="vehicle in buildingVehicles" :key="vehicle.id">
                    <td>
                        <span
                            class="building_list_fms"
                            :class="`building_list_fms_${vehicle.fms_real}`"
                            >{{ vehicle.fms_show }}</span
                        >
                    </td>
                    <td>
                        <a
                            class="lightbox-open"
                            :class="previewLinkClass"
                            :href="`/vehicles/${vehicle.id}`"
                        >
                            {{ vehicle.caption }}
                        </a>
                    </td>
                    <td>
                        ({{ vehicleTypes[vehicle.vehicle_type].caption }}
                        <small v-if="vehicle.vehicle_type_caption"
                            >[{{ vehicle.vehicle_type_caption }}]</small
                        >)
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faParking } from '@fortawesome/free-solid-svg-icons/faParking';
import { faCar } from '@fortawesome/free-solid-svg-icons/faCar';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faProcedures } from '@fortawesome/free-solid-svg-icons/faProcedures';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons/faChalkboardTeacher';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons/faBorderAll';
import {
    LinkPreview,
    LinkPreviewMethods,
    LinkPreviewComputed,
    LinkPreviewProps,
} from 'typings/modules/GeneralExtensions/LinkPreview';
import { InternalVehicle } from 'typings/Vehicle';
import { InternalBuilding } from 'typings/Building';
import cloneDeep from 'lodash/cloneDeep';

export default Vue.extend<
    LinkPreview,
    LinkPreviewMethods,
    LinkPreviewComputed,
    LinkPreviewProps
>({
    name: 'linkPreview',
    data() {
        return {
            faParking,
            faCar,
            faUsers,
            faProcedures,
            faChalkboardTeacher,
            faBorderAll,
            icon: '',
            type: '',
            id: 0,
            title: '',
            additional: '',
            mouse: {
                x: 0,
                y: 0,
            },
            vehicleTypes: (this.$t('vehicles') as unknown) as InternalVehicle[],
            vehicleBuildings: Object.values(
                this.$t('vehicleBuildings')
            ) as number[],
            cellBuildings: Object.values(this.$t('cellBuildings')) as number[],
            cellExtensions: Object.values(
                this.$t('cellExtensions')
            ) as string[],
            bedBuildings: Object.values(this.$t('bedBuildings')) as number[],
            schoolBuildings: Object.values(
                this.$t('schoolBuildings')
            ) as number[],
            building: null,
            vehicle: null,
        } as LinkPreview;
    },
    props: {
        previewLinkClass: {
            type: String,
            required: true,
        },
    },
    computed: {
        link() {
            return `/${this.type}/${this.id}`;
        },
        parent() {
            return this.$el.parentElement;
        },
        buildings() {
            return this.$store.state.api.buildings;
        },
        vehicles() {
            return this.$store.getters['api/vehiclesByBuilding'];
        },
        buildingVehicles() {
            return (
                cloneDeep(this.vehicles[this.id])?.sort((a, b) =>
                    a.caption > b.caption ? 1 : b.caption > a.caption ? -1 : 0
                ) || []
            );
        },
        buildingCells() {
            return this.cellExtensions
                .filter(e =>
                    e.startsWith(this.building?.building_type.toString() || 'ǜ')
                )
                .map(e =>
                    parseInt(e.replace(`${this.building?.building_type}_`, ''))
                )
                .filter(e =>
                    this.building?.extensions.find(be => be.type_id === e)
                );
        },
    },
    methods: {
        _resetAll() {
            this._setIcon();
            this._setType('');
            this._setTitle('');
            this._setId(0);
            this._setAdditional('');
            this.building = null;
            this.vehicle = null;
        },
        _setIcon(icon) {
            if (!icon) icon = '';
            this.icon = icon;
        },
        _setType(type) {
            this.type = type;
        },
        _setTitle(title) {
            this.title = title;
        },
        _setId(id) {
            this.id = id;
        },
        _setAdditional(additional) {
            this.additional = additional;
        },
        setMousePosition(x: number, y: number) {
            this.mouse = { x, y };
        },
        setBuilding(building, icon) {
            this._resetAll();
            this.building = building;
            this._setId(building.id);
            this._setType('buildings');
            this._setTitle(building.caption);
            this._setIcon(icon);
            this._setAdditional(
                ((this.$t('buildings') as unknown) as InternalBuilding[])[
                    building.building_type
                ].caption
            );
        },
        setVehicle(vehicle) {
            this._resetAll();
            this.vehicle = vehicle;
            this._setId(vehicle.id);
            this._setType('vehicles');
            this._setTitle(vehicle.caption);
            this._setIcon('ambulance');
            let additional = this.vehicleTypes[vehicle.vehicle_type].caption;
            if (vehicle.vehicle_type_caption)
                additional += ` | ${vehicle.vehicle_type_caption}`;
            this._setAdditional(additional);
        },
        setUser(id) {
            this._resetAll();
            this._setId(id);
            this._setType('profile');
            this._setTitle(`User: ${id}`);
            this._setIcon('user');
        },
        setMission(id) {
            this._resetAll();
            this._setId(id);
            this._setType('mission');
            this._setTitle(`Mission: ${id}`);
            this._setIcon('phone-alt');
        },
    },
    updated() {
        if (!this.parent) return;
        const infoBoxBCR = this.$el.getBoundingClientRect();
        let top = this.mouse.y - infoBoxBCR.height;
        if (top < 0) top = this.mouse.y;
        if (top + infoBoxBCR.height > window.innerHeight)
            top -= top + infoBoxBCR.height - window.innerHeight;
        let left = this.mouse.x - infoBoxBCR.width / 2;
        if (left < 0) left = 0;
        if (left + infoBoxBCR.width > window.innerWidth)
            left -= left + infoBoxBCR.width - window.innerWidth;
        this.parent.style.top = `${top}px`;
        this.parent.style.left = `${left}px`;
    },
});
</script>

<style scoped lang="sass">
.panel-default
    position: fixed
    z-index: 2000

    .type-icon
        margin-right: 1rem

    table td
        padding: 0.1rem
</style>
