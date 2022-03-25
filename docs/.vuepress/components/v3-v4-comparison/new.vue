<template>
    <table>
        <thead>
            <tr>
                <th>{{ $t.tables.module }}</th>
                <th>{{ $t.tables.annotations }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="module in newModules" :key="module">
                <td>
                    <router-link :to="`modules/${module}`">
                        {{ module }}
                    </router-link>
                </td>
                <td>{{ $t.v4annotations[module] }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'v3-v4-comparison-new',
    data() {
        return {
            comparison: this.$theme.variables.v3Comparison,
            newModules: this.$theme.variables.v3Comparison.v4only,
        };
    },
    computed: {
        $t() {
            return this.comparison.translations[this.$lang];
        },
    },
});
</script>

<style scoped>
table {
    text-align: center;
}
</style>
