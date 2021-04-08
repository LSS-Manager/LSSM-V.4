<template>
    <div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <div class="well pull-right" v-if="profile.image">
            <b>{{ lightbox.$sm('current') }}</b>
            <button class="btn btn-danger pull-right" @click="deleteAvatar">
                <font-awesome-icon :icon="faTrash"></font-awesome-icon>
            </button>
            <br />
            <img :src="profile.image" alt="" loading="lazy" />
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
import { AvatarWindow } from '../parsers/avatar';
import { RedesignComponent } from 'typings/modules/Redesign';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Component = RedesignComponent<
    'profile',
    'avatar',
    AvatarWindow,
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
    name: 'avatar-edit',
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
                this.profile.authenticity_token
            );
            formData.append(
                'avatar[image]',
                this.imageFile,
                this.imageFile.name
            );
            formData.append('commit', 'save');
            this.$store
                .dispatch('api/request', {
                    url: `/avatar/upload`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Accept':
                                'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: new URL(`avatar`, window.location.origin),
                        body: formData,
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: `redesign-avatar-edit`,
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
                            name: 'redesign-edit-avatar-submitted',
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
                    url: `/avatar/delete`,
                    init: {
                        credentials: 'include',
                        referrer: new URL(`avatar`, window.location.origin),
                        method: 'GET',
                        mode: 'cors',
                    },
                    feature: `redesign-avatar-delete`,
                })
                .then(() => {
                    this.$set(this.lightbox.data, 'image', '');
                    this.lightbox.finishLoading('avatar-deleted');
                    this.$store
                        .dispatch('event/createEvent', {
                            name: 'redesign-edit-avatar-submitted',
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
            this.lightbox.finishLoading('avatar-edit-updated');
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
        this.lightbox.finishLoading('avatar-edit-mounted');
    },
});
</script>

<style scoped lang="sass">
.well
    text-align: center
</style>
