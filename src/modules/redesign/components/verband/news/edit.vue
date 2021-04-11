<template>
    <div>
        <h1>{{ lightbox.$sm(`title.${0 > news.id ? 'new' : 'edit'}`) }}</h1>
        <form>
            <div class="form-group">
                <label :for="captionId">{{ lightbox.$sm('caption') }}</label>
                <input
                    class="form-control"
                    :id="captionId"
                    type="text"
                    ref="caption"
                    :value="news.caption"
                />
            </div>
            <div class="form-group">
                <label :for="contentId">{{ lightbox.$sm('text') }}</label>
                <textarea
                    class="form-control"
                    :id="contentId"
                    :value="news.content"
                    :rows="Math.max(5, news.content.split(/\n/).length + 1)"
                    name="alliance_newse[content]"
                ></textarea>
            </div>
            <div class="checkbox">
                <label>
                    <input
                        type="checkbox"
                        :checked="news.is_public"
                        ref="public"
                    />
                    {{ lightbox.$sm('public') }}
                </label>
            </div>
        </form>
        <button @click="submit" class="btn btn-success">
            {{ lightbox.$sm('save') }}
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { VerbandNewsEditWindow } from '../../../parsers/verband/news/edit';
import { RedesignSubComponent } from 'typings/modules/Redesign';
import { SCEditor } from 'typings/SCEditor/SCEditor';

type Component = RedesignSubComponent<
    'news',
    'verband/news/edit',
    VerbandNewsEditWindow,
    {
        captionId: string;
        contentId: string;
        contentEditor: SCEditor | null;
    },
    { submit(): void }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'verband-news-edit',
    data() {
        return {
            captionId: this.$store.getters.nodeAttribute(
                'verband-news-edit-caption',
                true
            ),
            contentId: this.$store.getters.nodeAttribute(
                'verband-news-edit-content',
                true
            ),
            contentEditor: null,
        };
    },
    methods: {
        submit() {
            if (!this.contentEditor) return;
            const url = new URL('/alliance_newses', window.location.origin);
            url.searchParams.append('utf8', '✓');
            url.searchParams.append(
                'authenticity_token',
                this.news.authenticity_token
            );
            const content = this.contentEditor.getWysiwygEditorValue(true);
            url.searchParams.append('alliance_newse[content]', content);
            const caption =
                (this.$refs.caption as HTMLInputElement | null)?.value ?? '';
            url.searchParams.append('alliance_newse[caption]', caption);
            url.searchParams.append('alliance_newse[public]', '0');
            if ((this.$refs.public as HTMLInputElement | null)?.checked)
                url.searchParams.append('alliance_newse[public]', '1');
            if (this.news.id > 0) url.searchParams.append('_method', 'put');
            this.$store
                .dispatch('api/request', {
                    url: `/alliance_newses${
                        this.news.id < 0 ? '' : `/${this.news.id}`
                    }`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: new URL(
                            `/alliance_newses/${
                                this.news.id < 0
                                    ? 'new'
                                    : `${this.news.id}/edit`
                            }`,
                            window.location.origin
                        ),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: `redesign-alliance-news-new/edit`,
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
                    if (this.contentEditor) {
                        this.$store
                            .dispatch('event/createEvent', {
                                name: 'redesign-new/edit-alliance-news',
                                detail: {
                                    content: this.contentEditor
                                        .getWysiwygEditorValue(false)
                                        .split('\n')
                                        .map(l =>
                                            l.replace(
                                                /^<div>|(<br>)?<\/div>$/g,
                                                ''
                                            )
                                        ),
                                },
                            })
                            .then(event =>
                                this.$store.dispatch(
                                    'event/dispatchEvent',
                                    event
                                )
                            );
                    }
                    window.lightboxClose(this.lightbox.creation);
                });
        },
    },
    props: {
        news: {
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
            this.lightbox.finishLoading('verband/news/edit-updated-data');
        },
    },
    mounted() {
        const contentArea = document.getElementById(
            this.contentId
        ) as HTMLTextAreaElement | null;
        if (contentArea) {
            window.sceditor.create(contentArea, {
                format: 'bbcode',
                toolbar:
                    'bold,italic,underline,strike|size|left,center,right|color|source',
                style: '/sceditor/default.css',
                emoticonsEnabled: false,
            });
            this.contentEditor = window.sceditor.instance(contentArea);
        }

        this.lightbox.finishLoading('verband/news/edit-mounted');
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical
</style>
