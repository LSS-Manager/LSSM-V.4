<template>
    <div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <label>
            <textarea
                class="form-control"
                :value="profile.text"
                :rows="Math.max(5, profile.text.split(/\n/).length + 1)"
                ref="content"
            />
        </label>
        <button @click="submit" class="btn btn-success">
            {{ lightbox.$sm('save') }}
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ProfileEditWindow } from '../../parsers/profile/edit';
import { RedesignComponent } from 'typings/modules/Redesign';
import { DefaultData } from 'vue/types/options';

type Component = RedesignComponent<
    'profile',
    'profile/edit',
    ProfileEditWindow,
    DefaultData<Vue>,
    { submit(): void }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'profile-edit',
    data() {
        return {};
    },
    methods: {
        submit() {
            const url = new URL(`/profile`, window.location.origin);
            url.searchParams.append('utf8', '✓');
            url.searchParams.append('_method', 'put');
            url.searchParams.append(
                'authenticity_token',
                this.profile.authenticity_token
            );
            const content =
                (this.$refs.content as HTMLTextAreaElement | null)?.value ?? '';
            url.searchParams.append('profile[content]', content);
            this.$store
                .dispatch('api/request', {
                    url: `/profile`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: new URL(
                            `profile/edit`,
                            window.location.origin
                        ),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: `redesign-profile-edit`,
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
                            name: 'redesign-edit-profile-submitted',
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
        profile: {
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
        profile() {
            this.lightbox.finishLoading('profile-edit-updated');
        },
    },
    mounted() {
        this.$el.addEventListener('click', e => {
            e.preventDefault();
            const target = (e.target as HTMLElement)?.closest<
                HTMLAnchorElement | HTMLButtonElement
            >('a, button');
            const href = target?.getAttribute('href');
            if (!target || !href) return;
            if (target.hasAttribute('lightbox-open'))
                return window.lightboxOpen(href);
            else this.$set(this.lightbox, 'src', href);
        });
        document.title = this.lightbox.$sm('title').toString();
        this.lightbox.finishLoading('profile-edit-mounted');
    },
});
</script>

<style scoped lang="sass">
label
    width: 100%

    textarea
        resize: vertical
        font-weight: 400
</style>
