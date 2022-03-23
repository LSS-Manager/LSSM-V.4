<template>
    <a
        :href="`https://discord.gg/${$theme.variables.discord.invite}`"
        target="_blank"
    >
        <slot>Discord Server</slot>
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'discord-link',
});
</script>
