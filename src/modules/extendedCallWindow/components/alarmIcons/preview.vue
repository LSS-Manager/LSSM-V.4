<template>
    <a href="#" class="btn btn-success navbar-btn btn-sm">
        <font-awesome-icon
            :icon="[setting.type, setting.icon]"
            class="type-icon"
        ></font-awesome-icon>
        Alarm
        <span id="vehicle_amount" class="badge vehicle_amount_selected">
            0
        </span>
    </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ai-preview',
    props: {
        setting: {
            type: Object,
            required: true,
        },
    },
});
</script>
