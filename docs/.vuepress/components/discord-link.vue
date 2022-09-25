<template>
    <a :href="`https://discord.gg/${variables.discord.invite}`" target="_blank">
        <slot>Discord Server</slot>
    </a>
</template>

<script setup lang="ts">
const variables = __VAR__;
</script>
