<template>
    <div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <div class="well pull-right" v-if="alliance.image">
            <b>{{ lightbox.$sm('current') }}</b>
            <button class="btn btn-danger pull-right" @click="deleteAvatar">
                <font-awesome-icon :icon="faTrash"></font-awesome-icon>
            </button>
            <br />
            <img :src="alliance.image" alt="" loading="lazy" />
        </div>
        <button @click="select" class="btn btn-success">
            {{ lightbox.$sm('select') }}
        </button>
        <button @click="submit" class="btn btn-success" :disabled="!imageFile">
            {{ lightbox.$sm('save') }}
        </button>
        <br />
        <b v-if="image">{{ lightbox.$sm('preview') }}:</b>
        <br />
        <img :src="image" alt="" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

import { AllianceAvatarWindow } from '../parsers/alliance_avatar';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'alliance',
    'alliance_avatar',
    AllianceAvatarWindow,
    {
        faTrash: IconDefinition;
        image: string;
        imageFile: File | null;
        input: HTMLInputElement;
    },
    {
        submit(): void;
        deleteAvatar(): void;
        select(): void;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'alliance-avatar-edit',
    data() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        return {
            faTrash,
            image: '',
            imageFile: null,
            input,
        };
    },
    methods: {
        submit() {
            if (!this.imageFile) return;
            const formData = new FormData();
            formData.append('utf8', '✓');
            formData.append('_method', 'put');
            formData.append(
                'authenticity_token',
                this.alliance.authenticity_token
            );
            formData.append(
                'alliance_avatar[image]',
                this.imageFile,
                this.imageFile.name
            );
            formData.append('commit', 'save');
            this.$store
                .dispatch('api/request', {
                    url: `/verband/avatar/upload`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Accept':
                                'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: new URL(
                            `verband/avatar`,
                            window.location.origin
                        ),
                        body: formData,
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: `redesign-alliance-avatar-edit`,
                })
                .then(({ url }) => {
                    const img = this.image;
                    this.image = '';
                    this.imageFile = null;
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
                            name: 'redesign-edit-alliance-avatar-submitted',
                            detail: {
                                img,
                            },
                        })
                        .then(event =>
                            this.$store.dispatch('event/dispatchEvent', event)
                        );
                    window.lightboxClose(this.lightbox.creation);
                });
        },
        deleteAvatar() {
            this.$set(this.lightbox, 'loading', true);
            this.$store
                .dispatch('api/request', {
                    url: `/verband/avatar/delete`,
                    init: {
                        credentials: 'include',
                        referrer: new URL(
                            `verband/avatar`,
                            window.location.origin
                        ),
                        method: 'GET',
                        mode: 'cors',
                    },
                    feature: `redesign-alliance-avatar-delete`,
                })
                .then(() => {
                    this.$set(this.lightbox.data, 'image', '');
                    this.lightbox.finishLoading('avatar-deleted');
                    this.$store
                        .dispatch('event/createEvent', {
                            name: 'redesign-edit-alliance-avatar-submitted',
                            detail: {
                                img: '',
                            },
                        })
                        .then(event =>
                            this.$store.dispatch('event/dispatchEvent', event)
                        );
                });
        },
        select() {
            this.input.click();
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
            this.lightbox.finishLoading('alliance-avatar-edit-updated');
        },
    },
    mounted() {
        this.$el.addEventListener('click', e => {
            const target = (e.target as HTMLElement)?.closest<
                HTMLAnchorElement | HTMLButtonElement
            >('a, button');
            const href = target?.getAttribute('href');
            if (!target || !href) return;
            e.preventDefault();
            if (target.hasAttribute('lightbox-open'))
                return window.lightboxOpen(href);
            else this.$set(this.lightbox, 'src', href);
        });
        this.input.onchange = () => {
            if (!this.input.files?.length) return;
            const reader = new FileReader();
            reader.onload = () => {
                this.image = reader.result?.toString() ?? '';
                this.imageFile = this.input.files?.[0] ?? null;
            };
            reader.onerror = () => {
                this.image = '';
                this.imageFile = null;
            };
            reader.readAsDataURL(this.input.files[0]);
        };
        this.lightbox.finishLoading('alliance-avatar-edit-mounted');
    },
});
</script>

<style scoped lang="sass">
.well
    text-align: center
</style>
