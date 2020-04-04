<template>
    <div>
        <span
            class="glyphicon"
            :class="[`glyphicon-eye-${isHidden ? 'open' : 'close'}`]"
            @click="isHidden = !isHidden"
        ></span>
        <div v-show="!isHidden">
            <p>
                <strong>{{ $t('modules.renameFz.name') }}</strong>
            </p>
            <v-select
                :options="Object.keys(templates)"
                @input="checkSelection"
                :placeholder="$t('modules.renameFz.templates.selection')"
                :push-tags="true"
                :taggable="true"
            ></v-select>
        </div>
    </div>
</template>

<script>
import VSelect from 'vue-select';

export default {
    name: 'renameFz',
    components: { VSelect },
    data() {
        return {
            isHidden: true,
            templates: {
                test1: [
                    {
                        type: 'terminal',
                        content: 'Florian',
                    },
                    {
                        type: 'variable',
                        content: 'vehicleType',
                    },
                    {
                        type: 'function',
                        content: 'counter',
                        params: {
                            prepend: {
                                content: '-',
                                condition: 'not 0',
                            },
                        },
                    },
                ],
            },
        };
    },
    methods: {
        checkSelection(input) {
            if (input && !this.templates.hasOwnProperty(input))
                this.templates[input] = [];
        },
    },
};
</script>

<style scoped lang="sass">
.v-select
    max-width: (100 / 3)%
</style>
