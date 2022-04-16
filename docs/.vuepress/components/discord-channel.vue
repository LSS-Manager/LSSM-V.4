<template>
    <a
        :href="`https://discordapp.com/channels/${themeData.variables.discord.id}/${themeData.variables.discord.channels[channel]}`"
        target="_blank"
    >
        <code>#{{ channel }}</code>
    </a>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

import { useThemeData } from '@vuepress/theme-default/lib/client';

import type { ThemeData } from '../types/ThemeData';

const themeData = useThemeData<ThemeData>();

const props = defineProps({
    channel: {
        type: String,
        required: true,
    },
});

const { channel } = toRefs(props);
</script>
