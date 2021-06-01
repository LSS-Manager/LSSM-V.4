<template>
    <div>
        <h1>title #{{ type }}</h1>
        <div class="alert alert-danger" v-if="!mission">
            Aiaiai, da konnt ich doch tatsächlich keinen Einsatz des Typs
            {{ type }} aufspüren. Da muss ich vielleicht mal einen Rettungshund
            losschicken?
        </div>
        <pre>{{ mission }}</pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { Mission } from 'typings/Mission';
import { DefaultData, DefaultMethods } from 'vue/types/options';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    {
        mission: Mission | undefined;
    },
    {
        type: number;
        missionId: number;
    }
>({
    name: 'einsatz-component',
    computed: {
        mission() {
            return (this.$store.state.api.missions as Mission[]).find(
                ({ id }) => id === this.type
            );
        },
    },
    props: {
        type: {
            type: Number,
            required: true,
        },
        missionId: {
            type: Number,
            required: false,
            default: 0,
        },
    },
});
</script>

<style scoped></style>
