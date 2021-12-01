<template>
    <a :href="$themeConfig.variables.discord.channels[channel]" target="_blank">
        <code>#{{ channel }}</code>
    </a>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'discord-channel',
    props: {
        channel: {
            type: String,
            required: true,
        },
    },
});
</script>
