<template>
    <div class="notification-setting">
        <v-select
            :options="events"
            :value="eventTypes"
            :clearable="false"
            :multiple="true"
            :placeholder="$t('modules.notificationAlert.settings.eventTypes')"
            :reduce="option => option.event"
            v-model="newValues.eventTypes"
            @input="changeValue"
        ></v-select>
        <v-select
            :options="styles"
            :value="alertStyle"
            :clearable="false"
            :placeholder="$t('modules.notificationAlert.settings.alertStyle')"
            :reduce="option => option.alertStyle"
            v-model="newValues.alertStyle"
            @input="changeValue"
        ></v-select>
        <settings-number
            name="duration"
            :value="duration"
            :min="0"
            :placeholder="$t('modules.notificationAlert.settings.duration')"
            @input="setDuration($event.currentTarget.value)"
        ></settings-number>
        <div>
            <settings-toggle
                name="ingame"
                :value="ingame"
                :pull-right="false"
                @change="setIngame($event.value)"
            ></settings-toggle>
        </div>
        <div>
            <settings-toggle
                name="desktop"
                :value="desktop"
                :pull-right="false"
                @change="setDesktop($event.value)"
            ></settings-toggle>
        </div>
    </div>
</template>

<script>
import VSelect from 'vue-select';
import SettingsToggle from '../../../components/setting/toggle.vue';
import SettingsNumber from '../../../components/setting/number.vue';

import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'settings-item',
    components: { VSelect, SettingsNumber, SettingsToggle },
    data() {
        const events = this.$t('modules.notificationAlert.events');
        const alertStyles = this.$t('modules.notificationAlert.alertStyles');
        return {
            newValues: {
                eventTypes: null,
                alertStyle: null,
                duration: null,
                desktop: null,
            },
            events: Object.keys(events).map(event => ({
                event,
                label: events[event],
            })),
            styles: Object.keys(alertStyles).map(alertStyle => ({
                alertStyle,
                label: alertStyles[alertStyle],
            })),
        };
    },
    props: {
        eventTypes: {
            required: true,
            type: Array,
        },
        alertStyle: {
            required: true,
            validator: function(val) {
                return val === null || typeof val === 'string';
            },
        },
        duration: {
            required: true,
            type: Number,
        },
        ingame: {
            required: true,
            type: Boolean,
        },
        desktop: {
            required: true,
            type: Boolean,
        },
    },
    methods: {
        setDuration(value) {
            this.newValues.duration = parseInt(value);
            this.changeValue();
        },
        setIngame(value) {
            this.newValues.ingame = value;
            this.changeValue();
        },
        setDesktop(value) {
            this.newValues.desktop = value;
            this.changeValue();
        },
        changeValue() {
            this.$emit('change', this.newValues);
        },
    },
    mounted() {
        this.newValues = {
            eventTypes: cloneDeep(this.eventTypes),
            alertStyle: cloneDeep(this.alertStyle),
            duration: cloneDeep(this.duration),
            ingame: cloneDeep(this.ingame),
            desktop: cloneDeep(this.desktop),
        };
    },
};
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
