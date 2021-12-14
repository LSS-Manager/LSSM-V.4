<template>
    <div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <form>
            <details>
                <summary>{{ lightbox.$sm('text') }}</summary>
                <div class="form-group">
                    <textarea
                        class="form-control"
                        :id="textId"
                        :value="alliance.text"
                        :rows="
                            Math.max(5, alliance.text.split(/\n/).length + 1)
                        "
                        name="alliance_text[content]"
                    ></textarea>
                </div>
            </details>
            <details>
                <summary>{{ lightbox.$sm('rules') }}</summary>
                <div class="form-group">
                    <textarea
                        class="form-control"
                        :id="rulesId"
                        :value="alliance.rules"
                        :rows="
                            Math.max(5, alliance.rules.split(/\n/).length + 1)
                        "
                        name="alliance_text[rules]"
                    ></textarea>
                </div>
            </details>
            <details v-if="$store.state.lang !== 'de_DE'">
                <summary>{{ lightbox.$sm('automaticMessage.title') }}</summary>
                <div class="form-group">
                    <label :for="automaticMessage.subjectId">
                        {{ lightbox.$sm('automaticMessage.subject') }}
                    </label>
                    <input
                        class="form-control"
                        ref="automaticMessageSubject"
                        :id="automaticMessage.subjectId"
                        :value="alliance.automaticMessage.subject"
                        name="alliance_text[welcome_subject]"
                        type="text"
                    />
                </div>
                <div class="form-group">
                    <label :for="automaticMessage.contentId">
                        {{ lightbox.$sm('automaticMessage.content') }}
                    </label>
                    <textarea
                        class="form-control"
                        ref="automaticMessageContent"
                        :id="automaticMessage.contentId"
                        :value="alliance.automaticMessage.content"
                        :rows="
                            Math.max(
                                5,
                                alliance.automaticMessage.content.split(/\n/)
                                    .length + 1
                            )
                        "
                        name="alliance_text[welcome_text]"
                    ></textarea>
                </div>
            </details>
            <details>
                <summary>{{ lightbox.$sm('header') }}</summary>
                <div class="form-group">
                    <input
                        class="form-control"
                        ref="header"
                        :id="headerId"
                        :value="alliance.header"
                        type="text"
                    />
                    <p class="help-block">{{ lightbox.$sm('header_help') }}</p>
                </div>
            </details>
            <details>
                <summary>{{ lightbox.$sm('webhook') }}</summary>
                <div class="form-group">
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
            </details>
        </form>
        <button @click="submit" class="btn btn-success">
            {{ lightbox.$sm('save') }}
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { RedesignSubComponent } from 'typings/modules/Redesign';
import { SCEditor } from 'typings/SCEditor/SCEditor';
import { VerbandEditTextWindow } from '../../parsers/verband/edit_text';

type Component = RedesignSubComponent<
    'alliance',
    'verband/edit_text',
    VerbandEditTextWindow,
    {
        textId: string;
        rulesId: string;
        headerId: string;
        webhookId: string;
        automaticMessage: {
            subjectId: string;
            contentId: string;
        };
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
    name: 'lssmv4-redesign-verband-edit-text',
    data() {
        return {
            textId: this.$store.getters.nodeAttribute(
                'redesign-verband-edit-text',
                true
            ),
            rulesId: this.$store.getters.nodeAttribute(
                'redesign-verband-edit-rules',
                true
            ),
            headerId: this.$store.getters.nodeAttribute(
                'redesign-verband-edit-header',
                true
            ),
            webhookId: this.$store.getters.nodeAttribute(
                'redesign-verband-edit-webhook',
                true
            ),
            automaticMessage: {
                subjectId: this.$store.getters.nodeAttribute(
                    'redesign-verband-edit-automatic_message-subject',
                    true
                ),
                contentId: this.$store.getters.nodeAttribute(
                    'redesign-verband-edit-automatic_message-content',
                    true
                ),
            },
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
            if (this.$store.state.lang !== 'de_DE') {
                const autoMessageSubject =
                    (this.$refs
                        .automaticMessageSubject as HTMLInputElement | null)
                        ?.value ?? '';
                url.searchParams.append(
                    'alliance_text[welcome_subject]',
                    autoMessageSubject
                );
                const autoMessageContent =
                    (this.$refs
                        .automaticMessageContent as HTMLInputElement | null)
                        ?.value ?? '';
                url.searchParams.append(
                    'alliance_text[welcome_text]',
                    autoMessageContent
                );
            }
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
                    if (this.textEditor && this.rulesEditor) {
                        this.$store
                            .dispatch('event/createEvent', {
                                name: 'redesign-edit-alliance-text-submitted',
                                detail: {
                                    content: this.textEditor.getWysiwygEditorValue(
                                        false
                                    ),
                                    rules: this.rulesEditor.getWysiwygEditorValue(
                                        false
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

details
    margin-bottom: 15px

    summary
        font-weight: bold
        cursor: pointer
        display: block list-item
</style>
