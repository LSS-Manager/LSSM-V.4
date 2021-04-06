<template>
    <div>
        <h1>{{ $sm('title') }}</h1>
        <div class="well pull-right" v-if="profile.image">
            <b>{{ $sm('current') }}</b>
            <button class="btn btn-danger pull-right" @click="deleteAvatar">
                <font-awesome-icon :icon="faTrash"></font-awesome-icon>
            </button>
            <br />
            <img :src="profile.image" alt="" loading="lazy" />
        </div>
        <button @click="select" class="btn btn-success">
            {{ $sm('select') }}
        </button>
        <button @click="submit" class="btn btn-success" :disabled="!imageFile">
            {{ $sm('save') }}
        </button>
        <br />
        <b v-if="image">{{ $sm('preview') }}:</b>
        <br />
        <img :src="image" alt="" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { AvatarWindow } from '../parsers/avatar';
import { RedesignLightboxVue } from 'typings/modules/Redesign';
import { DefaultComputed } from 'vue/types/options';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export default Vue.extend<
    {
        faTrash: IconDefinition;
        image: string;
        imageFile: File | null;
        input: HTMLInputElement;
    },
    {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        submit(): void;
        deleteAvatar(): void;
        select(): void;
    },
    DefaultComputed,
    {
        profile: AvatarWindow;
        url: string;
        lightbox: RedesignLightboxVue<'avatar', AvatarWindow>;
        $m(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        $mc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        getSetting: <T>(setting: string, defaultValue: T) => Promise<T>;
        setSetting: <T>(settingId: string, value: T) => Promise<void>;
    }
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
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$m(`avatar.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`avatar.${key}`, amount, args);
        },
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
                        referrer: `https://www.leitstellenspiel.de/avatar`,
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
                            window.location.href
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
                        referrer: `https://www.leitstellenspiel.de/avatar`,
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
            if (!target || !target.hasAttribute('href')) return;
            this.$set(this.lightbox, 'src', target.getAttribute('href'));
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
        document.title = this.$sm('title').toString();
        this.lightbox.finishLoading('avatar-edit-mounted');
    },
});
</script>

<style scoped lang="sass">
.well
    text-align: center
</style>
