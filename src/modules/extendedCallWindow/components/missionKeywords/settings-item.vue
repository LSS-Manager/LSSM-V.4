<template>
    <div class="mission-keywords-setting">
        <label>
            <input type="text" v-model="updateName" placeholder="name" />
        </label>
        <label>
            <input
                type="color"
                :value="updateColor"
                @change="e => (updateColor = e.target.value)"
                placeholder="color"
            />
        </label>
        <span
            class="preview label"
            :style="`background-color: ${updateColor};`"
        >
            <span>
                {{ updateName }}
            </span>
        </span>
        <v-select
            placeholder="types"
            :multiple="true"
            v-model="updateMissions"
            :options="selectableMissions"
            :clearable="true"
        ></v-select>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VSelect from 'vue-select';
import { DefaultMethods } from 'vue/types/options';
import {
    SettingsItem,
    SettingsItemComputed,
    SettingsItemProps,
} from 'typings/modules/ExtendedCallWindow/missionKeywords/SettingsItem';
import { Mission } from 'typings/Mission';

export default Vue.extend<
    SettingsItem,
    DefaultMethods<Vue>,
    SettingsItemComputed,
    SettingsItemProps
>({
    name: 'mission-keywords-settings-item',
    components: { VSelect },
    data() {
        return {
            missions: [],
        };
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    computed: {
        updateName: {
            get(): SettingsItemComputed['updateName'] {
                return this.value.keyword;
            },
            set(keyword) {
                this.$emit('input', { ...this.value, keyword });
            },
        },
        updateColor: {
            get(): SettingsItemComputed['updateColor'] {
                return this.value.color;
            },
            set(color) {
                this.$emit('input', { ...this.value, color });
            },
        },
        updateMissions: {
            get(): SettingsItemComputed['updateMissions'] {
                return (this.value.missions
                    .map(v =>
                        this.missions.find(
                            o => o.value.toString() === v.toString()
                        )
                    )
                    .filter(
                        v => !!v
                    ) as SettingsItemComputed['updateMissions']).sort((a, b) =>
                    a.value > b.value ? 1 : a.value < b.value ? -1 : 0
                );
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set(missions: ({ label: string; value: number } | number)[]) {
                this.$emit('input', {
                    ...this.value,
                    missions: missions.map(v =>
                        typeof v === 'number' ? v : v.value
                    ),
                });
            },
        },
        selectableMissions() {
            return this.missions.filter(
                t => !this.updateMissions.find(v => v.value === t.value)
            );
        },
    },
    beforeMount() {
        this.$store.dispatch('api/getMissions', false).then(
            (missions: Mission[]) =>
                (this.missions = missions.map(({ id, name }) => ({
                    value: id,
                    label: `${name} (ID: ${id})`,
                })))
        );
    },
});
</script>

<style scoped lang="sass">
.mission-keywords-setting
    display: flex
    justify-content: space-between

    > *
        margin-bottom: 0
        margin-left: 0.5rem
        margin-right: 0.5rem

        &:not(label):not(span)
            width: 100%

    .preview span
        background: inherit
        // noinspection CssInvalidPropertyValue
        background-clip: text
        color: transparent
        filter: invert(1) grayscale(1) contrast(9)
</style>
