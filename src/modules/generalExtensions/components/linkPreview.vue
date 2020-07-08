<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <font-awesome-icon :icon="icon"></font-awesome-icon>
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
            </small>
        </div>
        <div class="panel-body">
            <span v-if="type === 'vehicles'">
                <a
                    class="lightbox-open"
                    :class="previewLinkClass"
                    :href="`/buildings/${vehicle.building_id}`"
                >
                    {{ vehicle.building_id }}
                </a>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    LinkPreviewMethods,
    LinkPreview,
    LinkPreviewComputed,
    LinkPreviewProps,
} from 'typings/modules/GeneralExtensions/LinkPreview';
import { InternalVehicle } from 'typings/Vehicle';
import { InternalBuilding } from 'typings/Building';

export default Vue.extend<
    LinkPreview,
    LinkPreviewMethods,
    LinkPreviewComputed,
    LinkPreviewProps
>({
    name: 'linkPreview',
    data() {
        return {
            icon: '',
            type: '',
            id: 0,
            title: '',
            additional: '',
            mouse: {
                x: 0,
                y: 0,
            },
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
        show() {
            this.$nextTick().then(() => {
                if (!this.parent) return;
                this.parent.classList.remove('hidden');
                const infoBoxBCR = this.parent.getBoundingClientRect();
                let top = this.mouse.y - infoBoxBCR.height;
                if (top < 0) top = this.mouse.y;
                this.parent.style.top = `${top}px`;
                this.parent.style.left = `${this.mouse.x -
                    infoBoxBCR.width / 2}px`;
            });
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

            this.show();
        },
        setVehicle(vehicle) {
            this._resetAll();
            this.vehicle = vehicle;
            this._setId(vehicle.id);
            this._setType('vehicles');
            this._setTitle(vehicle.caption);
            this._setIcon('ambulance');
            let additional = ((this.$t(
                'vehicles'
            ) as unknown) as InternalVehicle[])[vehicle.vehicle_type].caption;
            if (vehicle.vehicle_type_caption)
                additional += ` | ${vehicle.vehicle_type_caption}`;
            this._setAdditional(additional);

            this.show();
        },
        setUser(id) {
            this._resetAll();
            this._setId(id);
            this._setType('profile');
            this._setTitle(`User: ${id}`);
            this._setIcon('user');

            this.show();
        },
        setMission(id) {
            this._resetAll();
            this._setId(id);
            this._setType('mission');
            this._setTitle(`Mission: ${id}`);
            this._setIcon('phone-alt');

            this.show();
        },
    },
});
</script>

<style scoped lang="sass">
.panel-default
    position: fixed
    z-index: 2000

    .svg-inline--fa
        margin-right: 1rem
</style>
