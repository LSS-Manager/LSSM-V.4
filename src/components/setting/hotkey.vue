<template>
    <div class="form-horizontal">
        <label>
            <input
                ref="input"
                :name="name"
                :placeholder="placeholder"
                type="text"
                class="form-control"
                :value="updateValue"
                :readonly="readonly"
                @focus="startRecording"
                @blur="readonly = true"
            />
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
    Hotkey,
    HotkeyComputed,
    HotkeyMethods,
    HotkeyProps,
} from 'typings/components/setting/Hotkey';

import Combokeys from 'combokeys';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CombokeysRecord from 'combokeys/plugins/record';

const hotkeyMap = {
    left: '←',
} as {
    [key: string]: string;
};

export default Vue.extend<Hotkey, HotkeyMethods, HotkeyComputed, HotkeyProps>({
    name: 'settings-hotkey',
    data() {
        return {
            readonly: true,
        } as Hotkey;
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
    },
    computed: {
        updateValue: {
            get(): string {
                const hotkey = this.value;
                Object.entries(hotkeyMap).forEach(([key, name]) =>
                    this.value.replaceAll(key, name)
                );
                return hotkey;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
    methods: {
        startRecording() {
            this.readonly = false;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.combokeys.record((sequence: string[]) => {
                this.updateValue = sequence.join(' ');
            });
        },
    },
    mounted() {
        this.combokeys = new Combokeys(this.$refs.input as HTMLInputElement);
        CombokeysRecord(this.combokeys);
    },
});
</script>

<style scoped lang="sass">
label
    width: 100%

    input
        background-color: #ddd !important

        &:focus
            background-color: #eee !important
</style>
