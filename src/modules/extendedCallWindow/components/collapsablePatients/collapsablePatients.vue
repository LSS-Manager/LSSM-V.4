<template>
    <h1>Hello world!</h1>
</template>

<script lang="ts">
import Vue from 'vue';

import {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
    DefaultProps,
} from 'vue/types/options';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    DefaultComputed,
    DefaultProps
>({
    name: 'lssmv4-collapsablePatients',
});
</script>
