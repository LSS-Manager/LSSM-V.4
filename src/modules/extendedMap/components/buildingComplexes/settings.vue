<template>
    <lightbox :name="modalName" no-title-hide no-fullscreen no-x-btn>
        <h2>
            {{ $m('title') }}
            <span class="btn-group pull-right">
                <button
                    class="btn btn-success btn-sm"
                    :disabled="!canSave"
                    @click="save"
                >
                    <font-awesome-icon :icon="faSave" />
                    {{ $m('save') }}
                </button>
                <button class="btn btn-warning btn-sm" @click="close">
                    {{ $m('abort') }}
                </button>
            </span>
        </h2>

        <form>
            <!-- edit name -->
            <div class="form-group">
                <label for="name">{{ $m('name') }}</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    :placeholder="$m('name')"
                    v-model="name"
                />
            </div>
            <!-- edit buildings -->
            <!-- edit location -->
            <!-- edit icon -->
        </form>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';

import { faSave } from '@fortawesome/free-solid-svg-icons/faSave';

import type { $m } from 'typings/Module';
import type { Complex } from '../../assets/buildingComplexes';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export default Vue.extend<
    { faSave: IconDefinition; name: string },
    { save(): void },
    { canSave: boolean },
    {
        modalName: string;
        complex: Complex;
        $m: $m;
        close(): void;
        updateValues(complex: Complex): Promise<void>;
    }
>({
    name: 'lssm-building-complex-setting',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../../../components/lightbox.vue'
            ),
    },
    data() {
        return {
            faSave,
            name: '',
        };
    },
    computed: {
        canSave() {
            return (
                this.name.trim() !== this.complex.name &&
                this.name.trim().length > 0
            );
        },
    },
    methods: {
        save() {
            this.updateValues({ ...this.complex, name: this.name.trim() });
            this.close();
        },
    },
    props: {
        modalName: {
            type: String,
            required: true,
        },
        complex: {
            type: Object,
            required: true,
        },
        $m: {
            type: Function,
            required: true,
        },
        close: {
            type: Function,
            required: true,
        },
        updateValues: {
            type: Function,
            required: true,
        },
    },
    mounted() {
        this.name = this.complex.name;
    },
});
</script>

<style scoped lang="sass"></style>
