<template>
    <table>
        <thead>
            <tr>
                <th>{{ $t.tables.feature }} V.3</th>
                <th>{{ $t.tables.module }} V.4</th>
                <th>{{ $t.tables.setting }} V.4</th>
                <th>
                    {{ $t.tables.changes }} /
                    {{ $t.tables.annotations }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(details, module) in updated" :key="module">
                <td>
                    {{ $t.modules[module]?.v3Name ?? module }}
                </td>
                <td>
                    <router-link :to="`modules/${details.module}`">
                        {{ details.module }}
                    </router-link>
                </td>
                <td>
                    <template v-if="details.setting">
                        {{
                            $t.settings[details.module]?.[details.setting] ??
                            details.setting
                        }}
                    </template>
                </td>
                <td>
                    {{ $t.modules[module]?.annotation }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'v3-v4-comparison-integrated',
    data() {
        return {
            comparison: this.$theme.variables.v3Comparison,
            updated: this.$theme.variables.v3Comparison.updated,
        };
    },
    computed: {
        $t() {
            return this.comparison.translations[this.$lang.replace(/-/, '_')];
        },
    },
});
</script>

<style scoped>
table {
    text-align: center;
}
</style>
