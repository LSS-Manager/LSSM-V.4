<template>
    <a
        :href="`https://discordapp.com/channels/${$theme.variables.discord.id}/${$theme.variables.discord.channels[channel]}`"
        target="_blank"
    >
        <code>#{{ channel }}</code>
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'discord-channel',
    props: {
        channel: {
            type: String,
            required: true,
        },
    },
});
</script>
