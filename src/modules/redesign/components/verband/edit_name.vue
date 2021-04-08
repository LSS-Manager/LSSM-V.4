<template>
    <div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <label>
            <input
                class="form-control"
                :value="alliance.meta.name"
                type="text"
                ref="content"
            />
        </label>
        <button @click="submit" class="btn btn-success">
            {{ lightbox.$sm('save') }}
        </button>
        <div class="alert alert-info">
            {{ lightbox.$sm('coins_note') }}
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { VerbandEditNameWindow } from '../../parsers/verband/edit_name';
import { RedesignSubComponent } from 'typings/modules/Redesign';
import { DefaultData } from 'vue/types/options';

type Component = RedesignSubComponent<
    'alliance',
    'verband/edit_name',
    VerbandEditNameWindow,
    DefaultData<Vue>,
    { submit(): void }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'verband-edit-name',
    data() {
        return {};
    },
    methods: {
        submit() {
            const formData = new FormData();
            formData.append('utf8', '✓');
            formData.append('_method', 'put');
            formData.append(
                'authenticity_token',
                this.alliance.authenticity_token
            );
            const content =
                (this.$refs.content as HTMLTextAreaElement | null)?.value ?? '';
            formData.append('alliance[caption]', content);
            formData.append('commit', 'save');
            this.$store
                .dispatch('api/request', {
                    url: `/alliances/${this.alliance.meta.id}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: `https://www.leitstellenspiel.de/alliances/${this.alliance.meta.id}/edit`,
                        body: formData,
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: `redesign-edit-alliance-name`,
                })
                .then(({ url }) => {
                    if (
                        !new URL(
                            this.url,
                            window.location.origin
                        ).searchParams.has('close-after-submit') ||
                        this.lightbox.noModal
                    )
                        return this.$set(this.lightbox, 'src', url);
                    this.$store
                        .dispatch('event/createEvent', {
                            name: 'redesign-edit-alliance-name-submitted',
                            detail: {
                                content,
                            },
                        })
                        .then(event =>
                            this.$store.dispatch('event/dispatchEvent', event)
                        );
                    window.lightboxClose(this.lightbox.creation);
                });
        },
    },
    props: {
        alliance: {
            type: Object,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        lightbox: {
            type: Object,
            required: true,
        },
        $m: {
            type: Function,
            required: true,
        },
        $mc: {
            type: Function,
            required: true,
        },
        getSetting: {
            type: Function,
            required: true,
        },
        setSetting: {
            type: Function,
            required: true,
        },
    },
    watch: {
        alliance() {
            this.lightbox.finishLoading('verband/edit_name-updated-data');
        },
    },
    mounted() {
        this.lightbox.finishLoading('verband/edit_name-mounted');
    },
});
</script>

<style scoped lang="sass">
.alert.alert-info
    margin-top: 1rem
</style>
