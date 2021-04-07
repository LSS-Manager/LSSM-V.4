<template>
    <div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <form>
            <div class="form-group">
                <label :for="textId">{{ lightbox.$sm('text') }}</label>
                <textarea
                    class="form-control"
                    :id="textId"
                    :value="alliance.text"
                    :rows="Math.max(5, alliance.text.split(/\n/).length + 1)"
                    name="alliance_text[content]"
                ></textarea>
            </div>
            <div class="form-group">
                <label :for="rulesId">{{ lightbox.$sm('rules') }}</label>
                <textarea
                    class="form-control"
                    :id="rulesId"
                    :value="alliance.rules"
                    :rows="Math.max(5, alliance.rules.split(/\n/).length + 1)"
                    name="alliance_text[rules]"
                ></textarea>
            </div>
            <div class="form-group">
                <label :for="headerId">{{ lightbox.$sm('header') }}</label>
                <input
                    class="form-control"
                    ref="header"
                    :id="headerId"
                    :value="alliance.header"
                    type="text"
                />
                <p class="help-block">{{ lightbox.$sm('header_help') }}</p>
            </div>
            <div class="form-group">
                <label :for="webhookId">{{ lightbox.$sm('webhook') }}</label>
                <input
                    class="form-control"
                    ref="webhook"
                    :id="webhookId"
                    :value="alliance.webhook"
                    type="text"
                />
                <p class="help-block">
                    {{ lightbox.$sm('webhook_help') }}
                    <a :href="alliance.faq" target="_blank">{{
                        lightbox.$sm('faq')
                    }}</a>
                </p>
            </div>
        </form>
        <button @click="submit" class="btn btn-success">
            {{ lightbox.$sm('save') }}
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { VerbandEditTextWindow } from '../../parsers/verband/edit_text';
import { RedesignSubComponent } from 'typings/modules/Redesign';
import { SCEditor } from 'typings/SCEditor/SCEditor';

type Component = RedesignSubComponent<
    'alliance',
    'verband/edit_text',
    VerbandEditTextWindow,
    {
        textId: string;
        rulesId: string;
        headerId: string;
        webhookId: string;
        textEditor: SCEditor | null;
        rulesEditor: SCEditor | null;
    },
    { submit(): void }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'verband-edit-text',
    data() {
        return {
            textId: this.$store.getters.nodeAttribute(
                'verband-edit-text',
                true
            ),
            rulesId: this.$store.getters.nodeAttribute(
                'verband-edit-rules',
                true
            ),
            headerId: this.$store.getters.nodeAttribute(
                'verband-edit-header',
                true
            ),
            webhookId: this.$store.getters.nodeAttribute(
                'verband-edit-webhook',
                true
            ),
            textEditor: null,
            rulesEditor: null,
        };
    },
    methods: {
        submit() {
            if (!this.textEditor || !this.rulesEditor) return;
            const url = new URL(
                '/veband/text/speichern',
                window.location.origin
            );
            url.searchParams.append('utf8', '✓');
            url.searchParams.append('_method', 'put');
            url.searchParams.append(
                'authenticity_token',
                this.alliance.authenticity_token
            );
            const content = this.textEditor.getWysiwygEditorValue(true);
            url.searchParams.append('alliance_text[content]', content);
            const rules = this.rulesEditor.getWysiwygEditorValue(true);
            url.searchParams.append('alliance_text[rules]', rules);
            const header =
                (this.$refs.header as HTMLInputElement | null)?.value ?? '';
            url.searchParams.append('alliance_text[chat_header]', header);
            const webhook =
                (this.$refs.webhook as HTMLInputElement | null)?.value ?? '';
            url.searchParams.append('discord_webhook', webhook);
            this.$store
                .dispatch('api/request', {
                    url: `/veband/text/speichern`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: new URL(
                            `alliances/veband/text/edit`,
                            window.location.origin
                        ),
                        body: url.searchParams.toString(),
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
                    if (this.textEditor) {
                        this.$store
                            .dispatch('event/createEvent', {
                                name: 'redesign-edit-alliance-text-submitted',
                                detail: {
                                    content: this.textEditor
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
        document.title = this.lightbox.$sm('title').toString();
        const textArea = document.getElementById(
            this.textId
        ) as HTMLTextAreaElement | null;
        if (textArea) {
            window.sceditor.create(textArea, {
                format: 'bbcode',
                toolbar:
                    'bold,italic,underline,strike|size|left,center,right|color|source',
                style: '/sceditor/default.css',
                emoticonsEnabled: false,
            });
            this.textEditor = window.sceditor.instance(textArea);
        }
        const rulesArea = document.getElementById(
            this.rulesId
        ) as HTMLTextAreaElement | null;
        if (rulesArea) {
            window.sceditor.create(rulesArea, {
                format: 'bbcode',
                toolbar:
                    'bold,italic,underline,strike|size|left,center,right|color|source',
                style: '/sceditor/default.css',
                emoticonsEnabled: false,
            });
            this.rulesEditor = window.sceditor.instance(rulesArea);
        }

        this.lightbox.finishLoading('verband/edit_name-mounted');
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical
</style>
