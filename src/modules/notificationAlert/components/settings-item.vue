<template>
    <div class="notification-setting">
        <pre>{{ eventType }}</pre>
        <pre>{{ alertStyle }}</pre>
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
                :disabled="true"
                @change="setDesktop($event.value)"
            ></settings-toggle>
        </div>
    </div>
</template>

<script>
import SettingsToggle from '../../../components/setting/toggle.vue';
import SettingsNumber from '../../../components/setting/number.vue';

import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'settings-item',
    components: { SettingsNumber, SettingsToggle },
    data() {
        return {
            newValues: {
                eventType: null,
                alertStyle: null,
                duration: null,
                desktop: null,
            },
        };
    },
    props: {
        eventType: {
            required: true,
            type: String,
        },
        alertStyle: {
            required: true,
            type: String,
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
            eventType: cloneDeep(this.eventType),
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
