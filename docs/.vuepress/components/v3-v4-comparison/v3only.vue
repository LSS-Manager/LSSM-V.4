<template>
    <table>
        <thead>
            <tr>
                <th>{{ $t.tables.module }}</th>
                <th>{{ $t.tables.annotations }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="module in modules" :key="module">
                <td>
                    {{ $t.modules[module]?.v3Name ?? module }}
                </td>
                <td>{{ $t.modules[module]?.annotation ?? '' }}</td>
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
            modules: this.$theme.variables.v3Comparison.v3only,
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
