<template>
    <div>
        <h1>title #{{ type }}</h1>
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
        mission: Mission;
    },
    {
        type: number;
        missionId: number;
    }
>({
    name: 'einsatz-component',
    computed: {
        mission() {
            return this.$store.state.api.missions[this.type];
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
