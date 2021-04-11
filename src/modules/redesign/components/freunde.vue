<template>
    <div>
        <h1>{{ lightbox.$sm('title') }}</h1>
        <enhanced-table
            :head="head"
            :table-attrs="{ class: 'table' }"
            :search="search"
            :search-placeholder="$t('search')"
            @search="s => (search = s)"
            :sort="sort"
            :sort-dir="sortDir"
            @sort="setSort"
        >
            <template v-slot:head>
                <span>{{
                    lightbox.$smc('amount', friendsFiltered.length)
                }}</span>
            </template>
            <tr v-for="friend in friendsSorted" :key="friend.friend_id">
                <td>
                    <img :src="friend.online_icon" alt="" />
                </td>
                <td>
                    <a :href="`/profile/${friend.user_id}`" lightbox-open>
                        {{ friend.name }}
                    </a>
                </td>
                <td>
                    <p
                        v-html="friend.note"
                        v-if="!notes_editing.includes(friend.friend_id)"
                    ></p>
                    <div v-else>
                        <textarea
                            class="form-control"
                            :value="friend.note.replace(/<br>/g, '')"
                            :ref="`notes_${friend.friend_id}`"
                        ></textarea>
                        <button
                            class="btn btn-success"
                            @click="saveNote(friend.friend_id)"
                        >
                            {{ lightbox.$sm('save') }}
                        </button>
                    </div>
                </td>
                <td>
                    <a
                        class="btn btn-default btn-xs"
                        v-if="!notes_editing.includes(friend.friend_id)"
                        @click="openNoteEditor(friend.friend_id)"
                    >
                        <font-awesome-icon :icon="faEdit"></font-awesome-icon>
                    </a>
                    <a
                        class="btn btn-danger btn-xs"
                        :title="lightbox.$sm('remove')"
                        @click="removeFriend(friend.user_id)"
                        ><font-awesome-icon
                            :icon="faUserSlash"
                        ></font-awesome-icon>
                    </a>
                </td>
            </tr>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons/faUserSlash';
import { FreundeWindow } from '../parsers/freunde';
import { RedesignComponent } from 'typings/modules/Redesign';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Component = RedesignComponent<
    'friends',
    'freunde',
    FreundeWindow,
    {
        faEdit: IconDefinition;
        faUserSlash: IconDefinition;
        notes_editing: number[];
        head: {
            [key: string]: {
                title: string;
                noSort?: boolean;
            };
        };
        search: string;
        sort: string;
        sortDir: 'asc' | 'desc';
    },
    {
        setSort(type: string): void;
        openNoteEditor(friend_id: number): void;
        saveNote(friend_id: number): void;
        removeFriend(friend_id: number): void;
    },
    {
        friendsFiltered: FreundeWindow['friends'];
        friendsSorted: FreundeWindow['friends'];
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'freunde',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            faEdit,
            faUserSlash,
            notes_editing: [],
            head: {},
            search: '',
            sort: 'name',
            sortDir: 'asc',
        };
    },
    methods: {
        setSort(type) {
            if (this.sort === type) {
                this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
            } else {
                this.sort = type;
                this.sortDir = 'asc';
            }
            this.setSetting('sort', type).then(() =>
                this.setSetting('sortDir', this.sortDir).then()
            );
        },
        openNoteEditor(friend_id) {
            this.notes_editing.push(friend_id);
        },
        saveNote(friend_id) {
            const url = new URL(
                `/friends/${friend_id}`,
                window.location.origin
            );
            url.searchParams.append('utf8', '✓');
            url.searchParams.append('_method', 'put');
            url.searchParams.append(
                'authenticity_token',
                this.friends.authenticity_token
            );
            const note = (this.$refs[
                `notes_${friend_id}`
            ][0] as HTMLTextAreaElement).value;
            url.searchParams.append('friend[comment]', note);
            this.$store
                .dispatch('api/request', {
                    url: `/friends/${friend_id}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Upgrade-Insecure-Requests': '1',
                        },
                        referrer: new URL(
                            `/friends/${friend_id}/edit`,
                            window.location.origin
                        ),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: 'redesign-freunde-edit-note',
                })
                .then(() => {
                    this.notes_editing.splice(
                        this.notes_editing.findIndex(f => f === friend_id),
                        1
                    );
                    this.$set(
                        this.lightbox.data.friends[
                            this.lightbox.data.friends.findIndex(
                                ({ friend_id: f }) => f === friend_id
                            )
                        ],
                        'note',
                        note.replace(/\n/g, '\n<br>')
                    );
                });
        },
        removeFriend(user_id) {
            this.$store
                .dispatch('api/request', {
                    url: `/freunde/entfernen/${user_id}?user=${user_id}`,
                    init: {
                        credentials: 'include',
                        referrer: new URL(`/freunde`, window.location.origin),
                        method: 'GET',
                        mode: 'cors',
                    },
                    feature: 'redesign-freunde-remove-friend',
                })
                .then(() => {
                    this.$set(
                        this.lightbox.data,
                        'friends',
                        this.friends.friends.filter(
                            ({ user_id: u }) => u !== user_id
                        )
                    );
                });
        },
    },
    computed: {
        friendsFiltered() {
            return this.search.trim().length
                ? this.friends.friends.filter(user =>
                      JSON.stringify(Object.values(user))
                          .toLowerCase()
                          .match(this.search.trim().toLowerCase())
                  )
                : this.friends.friends;
        },
        friendsSorted() {
            const modifier = this.sortDir === 'desc' ? -1 : 1;
            return [...this.friendsFiltered].sort((a, b) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let f = a[this.sort] ?? '';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                let s = b[this.sort] ?? '';
                return f < s ? -1 * modifier : f > s ? modifier : 0;
            });
        },
    },
    props: {
        friends: {
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
        friends() {
            this.lightbox.finishLoading('friends-updated');
        },
    },
    beforeMount() {
        this.head = {
            online_icon: { title: '' },
            name: { title: this.lightbox.$sm('name').toString() },
            note: { title: this.lightbox.$sm('note').toString() },
            edit: { title: '', noSort: true },
        };
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
        this.getSetting(`sort`, this.sort).then(sort => (this.sort = sort));
        this.getSetting(`sortDir`, this.sortDir).then(
            dir => (this.sortDir = dir)
        );
        this.lightbox.finishLoading('friends-mounted');
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical
</style>
