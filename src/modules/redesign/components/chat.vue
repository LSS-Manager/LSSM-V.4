<template>
    <div>
        <h1>
            {{ lightbox.$sm('title') }}
            <br />
            <small>
                {{ subtitle }}
            </small>
        </h1>
        <button
            class="btn btn-success"
            :disabled="startPage <= 1"
            @click="loadPrev"
        >
            {{ lightbox.$sm('load.prev') }}
        </button>
        <button
            class="btn btn-success"
            :disabled="
                endPage >= chat.lastPage ||
                chat.lastPage === Number.MAX_SAFE_INTEGER
            "
            @click="loadNext"
        >
            {{ lightbox.$sm('load.next') }}
        </button>
        <div
            v-for="(message, index) in chat.messages"
            :key="index"
            class="well"
        >
            <strong>
                <a
                    class="lightbox-open"
                    :href="`/profile/${message.author.id}`"
                >
                    {{ message.author.name }}
                </a>
            </strong>
            <span class="pull-right">{{ message.datetime }}</span>
            <p>{{ message.content }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import type { RedesignComponent } from 'typings/modules/Redesign';

type Component = RedesignComponent<
    'chat',
    'chat',
    {
        search: string;
        startPage: number;
        endPage: number;
    },
    {
        loadPrev(): void;
        loadNext(): void;
    },
    {
        page: number;
        subtitle: string;
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-chatlog',
    data() {
        return {
            search: '',
            startPage: 0,
            endPage: 0,
        };
    },
    methods: {
        loadPrev() {
            this.$set(this.lightbox, 'loading', true);
            this.startPage--;
            const url = new URL('/alliance_chats', window.location.origin);
            url.searchParams.set('page', this.startPage.toString());
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-chatlog-load-prev-${this.startPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../parsers/chat').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: url.toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'messages', [
                            ...result.messages,
                            ...this.lightbox.data.messages,
                        ]);
                        this.lightbox.finishLoading('chatlog-loadprev');
                    });
                });
        },
        loadNext() {
            this.$set(this.lightbox, 'loading', true);
            this.endPage++;
            const url = new URL('/alliance_chats', window.location.origin);
            url.searchParams.set('page', this.endPage.toString());
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-chatlog-load-next-${this.endPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../parsers/chat').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: url.toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'messages', [
                            ...this.lightbox.data.messages,
                            ...result.messages,
                        ]);
                        this.lightbox.finishLoading('chatlog-loadnext');
                    });
                });
        },
    },
    computed: {
        page() {
            return parseInt(
                new URL(this.url, window.location.origin).searchParams.get(
                    'page'
                ) ?? '1'
            );
        },
        subtitle() {
            return this.lightbox
                .$smc('subtitle', this.chat.messages.length, {
                    startPage: this.startPage,
                    endPage: this.endPage,
                    firstDate: this.chat.messages[0]?.datetime ?? '',
                    lastDate:
                        this.chat.messages[this.chat.messages.length - 1]
                            ?.datetime ?? '',
                    totalPages: this.chat.lastPage.toLocaleString(),
                })
                .toString();
        },
    },
    props: {
        chat: {
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
        chat() {
            this.lightbox.finishLoading('chatlog-updated-data');
        },
    },
    mounted() {
        this.startPage = this.page;
        this.endPage = this.page;
        this.lightbox.finishLoading('chatlog-mounted');
    },
});
</script>

<style lang="sass" scoped>
.url-search
    font-family: monospace
</style>
