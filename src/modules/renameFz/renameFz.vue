<template>
    <div>
        <span
            class="glyphicon"
            :class="[`glyphicon-eye-${isHidden ? 'open' : 'close'}`]"
            @click="toggleVisibility"
        ></span>
        <div v-show="!isHidden">
            <p>
                <strong>{{ $t('modules.renameFz.name') }}</strong>
            </p>
            <v-select
                class="template-selection"
                :options="Object.keys(templates)"
                :placeholder="$t('modules.renameFz.templates.selection')"
                :push-tags="true"
                :taggable="true"
                :key="templateSelection.key"
                :loading="templateSelection.loading"
                v-model="templateSelection.template"
                @option:created="checkSelection"
                @input="selectedTemplate"
            >
                <template #header>
                    <p class="text-muted">
                        {{ $t('modules.renameFz.templates.selectionHint') }}
                    </p>
                </template>
                <template #spinner="{ loading }">
                    <i v-if="loading" class="fas fa-sync fa-spin"></i>
                </template>
            </v-select>
            <p>
                Status:
                {{
                    $t('modules.renameFz.templates.status')[
                        templateSelection.status
                    ]
                }}
            </p>
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
            templateSelection: {
                key: 0,
                loading: false,
                template: null,
                status: 'template',
            },
            settings: {},
        };
    },
    computed: {
        templates() {
            return this.settings.templates || {};
        },
    },
    mounted() {
        this.$store
            .dispatch('settings/getModule', MODULE_ID)
            .then((settings) => (this.settings = settings));
    },
    methods: {
        toggleVisibility() {
            this.isHidden = !this.isHidden;
        },
        checkSelection(input) {
            if (input && !this.templates.hasOwnProperty(input)) {
                this.templates[input] = [];
                this.saveTemplates();
            }
        },
        selectedTemplate(input) {
            this.templateSelection.status = input ? 'waiting' : 'template';
        },
        saveTemplates() {
            this.templateSelection.loading = true;
            this.$store.dispatch('settings/setSetting', {
                moduleId: MODULE_ID,
                settingId: 'templates',
                value: this.templates,
            });
            this.templateSelection.key++;
            this.templateSelection.loading = false;
        },
    },
};
</script>

<style scoped lang="sass">
.template-selection
    display: flex
    align-items: center
    flex-wrap: wrap

    .text-muted
        margin: 0
        flex: 0 1 auto

    ::v-deep .vs__dropdown-toggle
        margin-left: 1rem
        flex: 2 0 calc(100% / 3)
</style>
