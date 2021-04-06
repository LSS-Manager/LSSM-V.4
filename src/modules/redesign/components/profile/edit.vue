<template>
    <div>
        <h1>{{ $sm('title') }}</h1>
        <label>
            <textarea
                class="form-control"
                :value="profile.text"
                rows="20"
                ref="content"
            />
        </label>
        <button @click="submit" class="btn btn-success">
            {{ $sm('save') }}
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { ProfileEditWindow } from '../../parsers/profile/edit';
import { RedesignLightboxVue } from 'typings/modules/Redesign';
import { DefaultComputed, DefaultData } from 'vue/types/options';

export default Vue.extend<
    DefaultData<Vue>,
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
    },
    DefaultComputed,
    {
        profile: ProfileEditWindow;
        url: string;
        lightbox: RedesignLightboxVue<'profile/edit', ProfileEditWindow>;
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
    name: 'profile-edit',
    data() {
        return {};
    },
    methods: {
        $sm(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$m(`profile/edit.${key}`, args);
        },
        $smc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ) {
            return this.$mc(`profile/edit.${key}`, amount, args);
        },
        submit() {
            const url = new URL(`/profile`, window.location.href);
            url.searchParams.append('utf8', '✓');
            url.searchParams.append('_method', 'put');
            url.searchParams.append(
                'authenticity_token',
                this.profile.authenticity_token
            );
            url.searchParams.append(
                'profile[content]',
                this.$refs.content?.value ?? ''
            );
            this.$store
                .dispatch('api/request', {
                    url: `/profile`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: `https://www.leitstellenspiel.de/profile/edit`,
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
                            window.location.href
                        ).searchParams.has('close-after-submit') ||
                        this.lightbox.noModal
                    )
                        return this.$set(this.lightbox, 'src', url);
                    this.$store
                        .dispatch('event/createEvent', {
                            name: 'redesign-edit-profile-submitted',
                            detail: {
                                content: this.$refs.content?.value ?? '',
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
            this.lightbox.finishLoading('profile-edit-updated');
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
        document.title = this.$sm('title');
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
