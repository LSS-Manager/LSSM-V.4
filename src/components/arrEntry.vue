<template>
    <div class="btn-group arr" :data-custom-style="!!props.bg_color">
        <button
            :title="title"
            class="btn btn-xs btn-default"
            :accesskey="accesskey"
            :type="type"
            :vehicle_group_id="type === 'vehicle_group' ? id : null"
            :arr_id="type === 'arr' ? id : null"
            :vehicles="vehicles"
            @click="$listeners.click"
        >
            <!-- availability-->
            {{ title }}
        </button>
        <button
            v-if="editable"
            class="btn btn-default btn-xs dropdown-toggle"
            data-toggle="dropdown"
        >
            <span class="caret"></span>
        </button>
        <ul v-if="editable" class="dropdown-menu pull-right">
            <li>
                <button class="btn btn-success btn-xs" @click="$listeners.edit">
                    <font-awesome-icon
                        :icon="faEdit"
                        fixed-width
                    ></font-awesome-icon>
                </button>
            </li>
            <li v-if="type !== 'vehicle_group'">
                <button class="btn btn-default btn-xs" @click="$listeners.copy">
                    <font-awesome-icon
                        :icon="faCopy"
                        fixed-width
                    ></font-awesome-icon>
                </button>
            </li>
            <li>
                <button
                    class="btn btn-danger btn-xs"
                    @click="$listeners.delete"
                >
                    <font-awesome-icon
                        :icon="faTrash"
                        fixed-width
                    ></font-awesome-icon>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

const props = defineProps<{
    id: number;
    title: string;
    color: string;
    bg_color: string;
    type: 'arr' | 'vehicle_group';
    editable: boolean;
    accesskey?: string;
    vehicles?: [number, string][];
}>();
</script>

<style scoped lang="sass">
.btn
  text-shadow: none

.dropdown-menu
    min-width: unset
    padding: .5ch

    .btn
        border: 0

.arr[data-custom-style]
    > button
        color: v-bind('props.color')
        background-color: v-bind('props.bg_color')
        background-image: none
</style>
