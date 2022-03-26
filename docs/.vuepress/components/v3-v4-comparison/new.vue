<template>
    <table>
        <thead>
            <tr>
                <th>{{ $t.tables.module }}</th>
                <th>{{ $t.tables.annotations }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="module in $modules" :key="module.id">
                <td>
                    <router-link :to="`modules/${module.id}/`">
                        {{ module.name }}
                    </router-link>
                </td>
                <td>{{ module.annotation }}</td>
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
        lang() {
            return this.$lang.replace(/-/u, '_');
        },
        $t() {
            return this.comparison.translations[this.lang];
        },
        $modules() {
            return this.newModules
                .map(module => {
                    return {
                        id: module,
                        name: this.$theme.variables.modules[module]
                            .translations[this.lang].name,
                        annotation: this.$t.v4annotations[module],
                    };
                })
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
