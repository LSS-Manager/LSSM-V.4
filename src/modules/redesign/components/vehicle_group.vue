<template>
    <div>
        <div class="btn-group pull-right" v-if="vehicle_group.id > 0">
            <button
                disabled
                class="btn btn-danger btn-xs"
                :title="lightbox.$sm('delete')"
                @click="deleteGroup"
            >
                <font-awesome-icon :icon="faTrash"></font-awesome-icon>
            </button>
        </div>
        <h1>
            {{ lightbox.$sm(`title.${0 > vehicle_group.id ? 'new' : 'edit'}`) }}
        </h1>
        <form>
            <div class="form-group">
                <label :for="captionId">{{ lightbox.$sm('caption') }}</label>
                <input
                    class="form-control"
                    :id="captionId"
                    type="text"
                    ref="caption"
                    :value="vehicle_group.caption"
                />
            </div>
            <div class="form-group">
                <label :for="colorId">{{ lightbox.$sm('color') }}</label>
                <br />
                <input
                    :id="colorId"
                    type="color"
                    ref="color"
                    :value="`#${vehicle_group.color}`"
                />
            </div>
            <div class="form-group">
                <label :for="columnId">{{ lightbox.$sm('column') }}</label>
                <select class="form-control" :id="columnId" ref="column">
                    <option
                        value=""
                        :selected="vehicle_group.column === ''"
                    ></option>
                    <option
                        v-for="n in 6"
                        :key="n"
                        :value="n"
                        :selected="vehicle_group.column === n.toString()"
                        >{{ n }}</option
                    >
                </select>
            </div>
        </form>
        <div class="floating alert alert-info">
            <button @click="submit" class="btn btn-success" disabled>
                {{ lightbox.$sm('save') }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { RedesignComponent } from 'typings/modules/Redesign';
import { VehicleGroupWindow } from '../parsers/vehicle_group';

type Component = RedesignComponent<
    'vehicle_group',
    'vehicle_group',
    VehicleGroupWindow,
    {
        faTrash: IconDefinition;
        captionId: string;
        colorId: string;
        columnId: string;
    },
    {
        submit(): void;
        deleteGroup(): void;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'vehicle_group-edit',
    data() {
        return {
            faTrash,
            captionId: this.$store.getters.nodeAttribute(
                'vehicle_group-edit-caption',
                true
            ),
            colorId: this.$store.getters.nodeAttribute(
                'vehicle_group-edit-color',
                true
            ),
            columnId: this.$store.getters.nodeAttribute(
                'vehicle_group-edit-column',
                true
            ),
        };
    },
    methods: {
        submit() {
            //
        },
        deleteGroup() {
            //
        },
    },
    props: {
        vehicle_group: {
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
        vehicle_group() {
            this.lightbox.finishLoading('vehicle_group-updated-data');
        },
    },
    mounted() {
        this.lightbox.finishLoading('vehicle_group-mounted');
    },
});
</script>

<style scoped lang="sass">
.floating.alert
    position: fixed
    bottom: 0
    right: 0
    font-size: 15px
</style>
