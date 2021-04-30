<template>
    <div class="btn-group arr">
        <button
            :title="title"
            class="btn btn-xs btn-default"
            :style="style"
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
            :style="style"
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

<script lang="ts">
import Vue from 'vue';

import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { DefaultMethods, PropType } from 'vue/types/options';

export default Vue.extend<
    {
        faCopy: IconDefinition;
        faEdit: IconDefinition;
        faTrash: IconDefinition;
    },
    DefaultMethods<Vue>,
    {
        style: string;
    },
    {
        id: number;
        title: string;
        color: string;
        bg_color: string;
        type: 'arr' | 'vehicle_group';
        editable: boolean;
        accesskey?: string;
        vehicles?: [number, string][];
    }
>({
    name: 'arr',
    computed: {
        style() {
            return this.bg_color
                ? `color:${this.color};background-color:${this.bg_color};background-image: none;`
                : '';
        },
    },
    data() {
        return {
            faCopy,
            faEdit,
            faTrash,
        };
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        bg_color: {
            type: String,
            required: true,
        },
        type: {
            type: String as PropType<'arr' | 'vehicle_group'>,
            required: true,
            validator: t => ['arr', 'vehicle_group'].includes(t),
        },
        editable: {
            type: Boolean,
            required: true,
        },
        accesskey: {
            type: String,
            required: false,
        },
        vehicles: {
            type: Array as PropType<[number, string][]>,
            required: false,
        },
    },
});
</script>

<style scoped lang="sass">
.btn
  text-shadow: none

.dropdown-menu
    min-width: unset
    padding: .5ch

    .btn
        border: 0
</style>
