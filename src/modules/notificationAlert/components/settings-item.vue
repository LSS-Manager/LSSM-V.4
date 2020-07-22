<template>
    <div class="notification-setting form-horizontal">
        <v-select
            :options="selectableEvents"
            :clearable="false"
            :multiple="true"
            :placeholder="$t('modules.notificationAlert.settings.eventTypes')"
            v-model="updateEvents"
        ></v-select>
        <v-select
            :options="styleOptions"
            :clearable="false"
            :placeholder="$t('modules.notificationAlert.settings.alertStyle')"
            v-model="updateStyle"
        ></v-select>
        <label>
            <input
                :placeholder="$t('modules.notificationAlert.settings.duration')"
                v-model.number="updateDuration"
                type="number"
                class="form-control"
                min="0"
            />
        </label>
        <toggle-button
            labels
            v-model="updateIngame"
            class="pull-right"
        ></toggle-button>
        <toggle-button
            labels
            v-model="updateDesktop"
            class="pull-right"
        ></toggle-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VSelect from 'vue-select';
import {
    SettingsItem,
    SettingsItemComputed,
    SettingsItemProps,
} from 'typings/modules/NotificationAlert/SettingsItem';
import { DefaultMethods } from 'vue/types/options';

export default Vue.extend<
    SettingsItem,
    DefaultMethods<Vue>,
    SettingsItemComputed,
    SettingsItemProps
>({
    name: 'settings-item',
    components: { VSelect },
    data() {
        const events = (this.$t(
            'modules.notificationAlert.events'
        ) as unknown) as {
            [event: string]: string;
        };
        const alertStyles = (this.$t(
            'modules.notificationAlert.alertStyles'
        ) as unknown) as {
            [style: string]: string;
        };
        return {
            eventOptions: Object.keys(events).map(event => ({
                value: event,
                label: events[event],
            })),
            styleOptions: Object.keys(alertStyles).map(alertStyle => ({
                value: alertStyle,
                label: alertStyles[alertStyle],
            })),
        };
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    computed: {
        updateEvents: {
            get(): SettingsItemComputed['updateEvents'] {
                return (this.value.events
                    .map(v =>
                        this.eventOptions.find(
                            o => o.value.toString() === v.toString()
                        )
                    )
                    .filter(
                        v => !!v
                    ) as SettingsItemComputed['updateEvents']).sort((a, b) =>
                    a.value > b.value ? 1 : a.value < b.value ? -1 : 0
                );
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            set(events: SettingsItemComputed['updateEvents']) {
                this.$emit('input', {
                    ...this.value,
                    events: events.map(v => v.value),
                });
            },
        },
        selectableEvents() {
            return this.eventOptions.filter(
                e => !this.updateEvents.find(u => u.value === e.value)
            );
        },
        updateStyle: {
            get(): SettingsItemComputed['updateStyle'] {
                return (
                    this.styleOptions.find(
                        o => o.value === this.value.alertStyle
                    ) || this.styleOptions[0]
                );
            },
            set(alertStyle: SettingsItemComputed['updateStyle']) {
                this.$emit('input', {
                    ...this.value,
                    alertStyle: alertStyle.value,
                });
            },
        },
        updateDuration: {
            get(): SettingsItemComputed['updateDuration'] {
                return this.value.duration;
            },
            set(duration: SettingsItemComputed['updateDuration']) {
                this.$emit('input', { ...this.value, duration });
            },
        },
        updateIngame: {
            get(): SettingsItemComputed['updateIngame'] {
                return this.value.ingame;
            },
            set(ingame: SettingsItemComputed['updateIngame']) {
                this.$emit('input', { ...this.value, ingame });
            },
        },
        updateDesktop: {
            get(): SettingsItemComputed['updateDesktop'] {
                return this.value.desktop;
            },
            set(desktop: SettingsItemComputed['updateDesktop']) {
                this.$emit('input', { ...this.value, desktop });
            },
        },
    },
});
</script>

<style scoped lang="sass">
.notification-setting
    display: flex
    justify-content: space-between

    > *
        margin-bottom: 0
        margin-left: 0.5rem
        margin-right: 0.5rem
        width: 100%
</style>
