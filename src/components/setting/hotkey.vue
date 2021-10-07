<template>
    <div class="form-horizontal">
        <label>
            <input
                ref="input"
                :name="name"
                type="text"
                class="form-control"
                :value="updateValue"
                :readonly="readonly"
                :style="`--length: ${updateValue.length}ch`"
                @focus="startRecording"
                @blur="readonly = true"
            />
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import HotkeyUtility from '../../modules/hotkeys/assets/HotkeyUtility';

import {
    Hotkey,
    HotkeyComputed,
    HotkeyMethods,
    HotkeyProps,
} from 'typings/components/setting/Hotkey';

export default Vue.extend<Hotkey, HotkeyMethods, HotkeyComputed, HotkeyProps>({
    name: 'settings-hotkey',
    data() {
        return {
            readonly: true,
            utility: new HotkeyUtility(),
        } as Hotkey;
    },
    props: {
        name: {
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
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
    methods: {
        startRecording() {
            this.readonly = false;
            const input = this.$refs.input as HTMLInputElement;
            let esc = false;
            const escEvent = (event: KeyboardEvent) => {
                if (event.key.toLowerCase() === 'escape') {
                    event.cancelBubble = true;
                    esc = true;
                }
            };
            input.addEventListener('keyup', escEvent);
            this.utility.record(input, sequence => {
                if (
                    esc ||
                    sequence.find(combination =>
                        combination.split('+').includes('f1')
                    )
                )
                    this.updateValue = '';
                else this.updateValue = sequence.join(' ');
                input.removeEventListener('keyup', escEvent);
                input.blur();
            });
        },
    },
    mounted() {
        (this.$refs.input as HTMLElement | undefined)?.style.setProperty(
            '--length',
            `${this.value.length}ch`
        );
    },
});
</script>

<style scoped lang="sass">
label
    width: 100%
    max-width: 100%
    overflow: auto

    input
        --length: 10ch
        background-color: #ddd !important
        font-family: Monospace, sans-serif
        width: calc(var(--length) + 2*12px + 10px)
        text-align: center
        margin: 0 auto

        &:focus
            background-color: #eee !important
</style>
