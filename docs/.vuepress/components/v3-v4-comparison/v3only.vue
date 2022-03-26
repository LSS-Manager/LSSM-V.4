<template>
    <table>
        <thead>
            <tr>
                <th>{{ $t.tables.module }}</th>
                <th>{{ $t.tables.annotations }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="module in modules" :key="module.name">
                <td>
                    {{ module.name }}
                </td>
                <td>{{ module.annotation }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'v3-v4-comparison-v3only',
    data() {
        return {
            comparison: this.$theme.variables.v3Comparison,
        };
    },
    computed: {
        $t() {
            return this.comparison.translations[this.$lang.replace(/-/u, '_')];
        },
        modules() {
            return this.comparison.v3only
                .map(module => ({
                    name: this.$t.modules[module]?.v3Name ?? module,
                    annotation: this.$t.modules[module]?.annotation ?? '',
                }))
                .sort((a, b) => a.name.localeCompare(b.name));
        },
    },
});
</script>

<style scoped>
table {
    text-align: center;
}
</style>
