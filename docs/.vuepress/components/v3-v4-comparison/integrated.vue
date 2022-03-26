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
            <tr v-for="module in $modules" :key="module.id">
                <td>
                    {{ module.v3Name }}
                </td>
                <td>
                    <router-link
                        :to="`modules/${module.v4Id}/`"
                        v-if="module.id !== 'releaseNotes'"
                    >
                        {{ module.v4Name }}
                    </router-link>
                </td>
                <td>
                    <template v-if="module.setting">
                        {{ module.setting }}
                    </template>
                </td>
                <td>
                    {{ module.annotation }}
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
        lang() {
            return this.$lang.replace(/-/u, '_');
        },
        $t() {
            return this.comparison.translations[this.lang];
        },
        $modules() {
            return Object.entries(this.updated)
                .map(([module, details]) => {
                    return {
                        id: module,
                        v4Id: details.module,
                        v3Name: this.$t.modules[module]?.v3Name ?? module,
                        annotation: this.$t.modules[module]?.annotation ?? '',
                        v4Name:
                            this.$theme.variables.modules[details.module]
                                ?.translations?.[this.lang]?.name ?? module,
                        setting:
                            this.$theme.variables.modules[details.module]?.translations?.[this.lang]?.settings?.[
                                details.setting
                            ]?.title ?? details.setting,
                    };
                })
                .sort((a, b) => a.v3Name.localeCompare(b.v3Name));
        },
    },
});
</script>

<style scoped>
table {
    text-align: center;
}
</style>
