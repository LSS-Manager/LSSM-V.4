<template>
    <a :href="$themeConfig.variables.discord.invite" target="_blank">
        <slot>Discord Server</slot>
    </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'discord',
});
</script>
