<template>
    <a href="#" class="btn btn-success btn-xs">
        <font-awesome-icon
            v-if="setting.contentType === 'icon'"
            :icon="[setting.icon_style, setting.title]"
            fixed-width
            class="type-icon"
        ></font-awesome-icon>
        <span v-else>{{ setting.title }}</span>
    </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'blf-preview',
    props: {
        setting: {
            type: Object,
            required: true,
        },
    },
});
</script>
