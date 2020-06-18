<template>
    <lightbox name="overview">
        <h1>{{ $m('name') }}</h1>
        <tabs>
            <tab :title="$m('tabs.vehicles')"></tab>
            <tab :title="$m('tabs.buildings')">
                <enhanced-table
                    :head="buildingsTab.head"
                    :table-attrs="{ class: 'table table-striped' }"
                >
                    <tr v-for="building in buildings" :key="building.caption">
                        <td v-for="(_, attr) in buildingsTab.head" :key="attr">
                            <span v-if="attr === 'cost'">
                                {{
                                    building.hasOwnProperty('credits')
                                        ? building.credits.toLocaleString()
                                        : NaN
                                }}
                                Credits /
                                {{
                                    building.hasOwnProperty('coins')
                                        ? building.coins.toLocaleString()
                                        : NaN
                                }}
                                Coins
                            </span>
                            <span
                                v-else-if="typeof building[attr] === 'object'"
                                v-html="
                                    Object.values(building[attr]).join(',<br>')
                                "
                            >
                            </span>
                            <span v-else v-html="building[attr]"></span>
                        </td>
                    </tr>
                </enhanced-table>
            </tab>
        </tabs>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import EnhancedTable from '../../components/enhanced-table.vue';
import Lightbox from '../../components/lightbox.vue';
import { DefaultComputed, DefaultProps } from 'vue/types/options';
import { Overview, OverviewMethods } from '../../../typings/modules/Overview';
import { InternalBuilding } from '../../../typings/Building';

export default Vue.extend<
    Overview,
    OverviewMethods,
    DefaultComputed,
    DefaultProps
>({
    name: 'overview',
    components: { EnhancedTable, Lightbox },
    data() {
        return {
            buildings: Object.values(
                this.$t('buildings')
            ) as InternalBuilding[],
            buildingsTab: {
                head: {
                    caption: { title: this.$m('titles.buildings.caption') },
                    cost: { title: this.$m('titles.buildings.cost') },
                    maxLevel: { title: this.$m('titles.buildings.maxLevel') },
                    levelcost: { title: this.$m('titles.buildings.levelcost') },
                    startPersonnel: {
                        title: this.$m('titles.buildings.startPersonnel'),
                    },
                    startVehicles: {
                        title: this.$m('titles.buildings.startVehicles'),
                    },
                    maxBuildings: {
                        title: this.$m('titles.buildings.maxBuildings'),
                    },
                    extensions: {
                        title: this.$m('titles.buildings.extensions'),
                    },
                    special: { title: this.$m('titles.buildings.special') },
                },
            },
        } as Overview;
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.overview.${key}`, args);
        },
    },
});
</script>

<style scoped></style>
