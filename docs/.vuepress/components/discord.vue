<template>
    <a
        :href="`https://discord.gg/${themeData.variables.discord.invite}`"
        target="_blank"
    >
        <slot>Discord Server</slot>
    </a>
</template>

<script setup lang="ts">
import { useThemeData } from "@vuepress/theme-default/lib/client";

import { ThemeData } from "../types/ThemeData";

const themeData = useThemeData<ThemeData>();
</script>
