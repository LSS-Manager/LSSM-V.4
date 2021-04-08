<template>
    <div>
        <label class="pull-right">
            <input
                :placeholder="lightbox.$sm('search_global')"
                ref="urlSearch"
                :value="urlSearch"
                @keyup.enter="setUrlSearch"
            />
            <button class="btn btn-success" @click="setUrlSearch">
                {{ lightbox.$sm('search_global') }}
            </button>
        </label>
        <h1>
            {{ lightbox.$sm('title') }}
            <small v-if="urlSearch">
                {{ lightbox.$sm('search_global') }}:
                <span class="url-search">{{ urlSearch }}</span>
            </small>
            <br />
            <small>
                {{ subtitle }}
                <span v-if="mitglieder.online">
                    ({{ lightbox.$sm('online.subtitle') }})
                </span>
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
                endPage >= mitglieder.lastPage ||
                    mitglieder.lastPage === Number.MAX_SAFE_INTEGER
            "
            @click="loadNext"
        >
            {{ lightbox.$sm('load.next') }}
        </button>
        <br />
        <a
            class="btn btn-xs btn-default"
            :href="
                `/verband/mitglieder/${mitglieder.meta.id}${
                    mitglieder.online ? '' : '?online=true'
                }`
            "
        >
            {{ lightbox.$sm(`online.toggle.${mitglieder.online}`) }}
        </a>
        <enhanced-table
            :head="head"
            :table-attrs="{ class: 'table' }"
            :search="search"
            :search-placeholder="lightbox.$sm('search_local')"
            @search="s => (search = s)"
            :sort="sort"
            :sort-dir="sortDir"
            @sort="setSort"
        >
            <template v-slot:head>
                <span>{{ lightbox.$smc('amount', usersFiltered.length) }}</span>
            </template>
            <tr v-for="(user, id) in usersSorted" :key="id">
                <td>
                    <img
                        :src="user.icon_src"
                        alt=""
                        loading="lazy"
                        :title="
                            lightbox.$sm(
                                `online.titles.${user.icon_src.match(
                                    /(?<=user_)gray|green|blue|yellow|red(?=\.png)/
                                )[0] || 'gray'}`,
                                { user: user.name }
                            )
                        "
                    />
                    <a :href="`/profile/${user.id}`">{{ user.name }}</a>
                </td>
                <td>
                    <span>
                        <span :class="{ badge: user.caption }">
                            {{ user.caption }}
                        </span>
                        <a
                            v-if="mitglieder.edit_caption"
                            v-show="!caption_editing.includes(user.id)"
                            @click="loadCaptionHolder(user.id)"
                            class="btn btn-default btn-xs pull-right"
                        >
                            <font-awesome-icon
                                :icon="faEdit"
                            ></font-awesome-icon>
                        </a>
                    </span>
                    <div
                        v-if="mitglieder.edit_caption"
                        v-show="caption_editing.includes(user.id)"
                    >
                        <input
                            type="text"
                            maxlength="40"
                            :ref="`caption_form_${user.id}`"
                            :value="user.caption"
                        />
                        <button
                            class="btn btn-success btn-xs"
                            @click="saveCaption(user.id)"
                        >
                            {{ lightbox.$sm('edit_caption.save') }}
                        </button>
                    </div>
                    <br v-if="user.caption && user.roles" />
                    <small v-if="user.roles">
                        {{ user.roles.join(', ') }}
                    </small>
                </td>
                <td>{{ user.credits.toLocaleString() }} {{ $t('credits') }}</td>
                <td v-if="mitglieder.edit_discount">
                    <div class="btn-group">
                        <a
                            v-for="n in 11"
                            :key="n"
                            @click="applyDiscount(user.id, n - 1)"
                            class="btn btn-xs"
                            :class="
                                `btn-${
                                    n - 1 === user.discount
                                        ? 'success'
                                        : 'default'
                                }`
                            "
                        >
                            {{ (n - 1) * 10 }}%
                        </a>
                    </div>
                </td>
                <td
                    v-if="mitglieder.edit_discount"
                    :colspan="user.edit ? 1 : 2"
                >
                    {{ user.tax }}%
                </td>
                <td
                    v-if="mitglieder.edit_discount && user.edit"
                    style="text-align: right"
                >
                    <a
                        class="btn btn-default btn_edit_rights btn-xs"
                        :user_id="user.id"
                        @click="toggleEdit(user.id)"
                    >
                        {{
                            lightbox.$sm(
                                `rights.${
                                    rights_editing.includes(user.id)
                                        ? 'hide'
                                        : 'edit'
                                }`
                            )
                        }}
                    </a>
                    <div v-show="rights_editing.includes(user.id)">
                        <a
                            v-if="user.edit.kick"
                            @click="kick(user.id, user.name)"
                            class="btn btn-danger btn-xs"
                        >
                            {{ lightbox.$sm('rights.kick.btn') }}
                        </a>
                        <template
                            v-for="right in [
                                'admin',
                                'coadmin',
                                'sprechwunsch_admin',
                                'aufsichtsrat',
                                'finance',
                                'schooling',
                            ]"
                        >
                            <br :key="`${user.id}_${right}_br`" />
                            <a
                                @click="
                                    toggleRight(
                                        user.id,
                                        right,
                                        user.edit[right] ? 0 : 1
                                    )
                                "
                                class="btn btn-xs"
                                :class="
                                    `btn-${
                                        user.edit[right] ? 'danger' : 'success'
                                    }`
                                "
                                :key="`${user.id}_${right}_btn`"
                            >
                                {{
                                    lightbox.$sm(
                                        `rights.${
                                            user.edit[right] ? 'unset' : 'set'
                                        }`,
                                        {
                                            role: lightbox.$sm(
                                                `rights.${right}`
                                            ),
                                        }
                                    )
                                }}
                            </a>
                        </template>
                    </div>
                </td>
            </tr>
        </enhanced-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { RedesignSubComponent } from 'typings/modules/Redesign';
import { VerbandMitgliederWindow } from '../../parsers/verband/mitglieder';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Component = RedesignSubComponent<
    'mitglieder',
    'verband/mitglieder',
    VerbandMitgliederWindow,
    {
        faEdit: IconDefinition;
        search: string;
        sort: string;
        sortDir: 'asc' | 'desc';
        head: {
            [key: string]: {
                title: string;
                noSort?: boolean;
            };
        };
        startPage: number;
        endPage: number;
        caption_editing: number[];
        rights_editing: number[];
    },
    {
        setSort(type: string): void;
        loadPrev(): void;
        loadNext(): void;
        setUrlSearch(): void;
        loadCaptionHolder(user_id: number): void;
        saveCaption(user_id: number): void;
        applyDiscount(user_id: number, amount: number): void;
        toggleRight(
            user_id: number,
            right:
                | 'admin'
                | 'coadmin'
                | 'sprechwunsch_admin'
                | 'aufsichtsrat'
                | 'finance'
                | 'schooling',
            new_state: 0 | 1
        ): void;
        kick(user_id: number, username: string): void;
        toggleEdit(user_id: number): void;
    },
    {
        urlSearch: string;
        page: number;
        subtitle: string;
        usersFiltered: VerbandMitgliederWindow['users'];
        usersSorted: VerbandMitgliederWindow['users'];
    }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'verband-mitglieder',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../../../components/enhanced-table.vue'
            ),
    },
    data() {
        return {
            faEdit,
            search: '',
            sort: 'credits',
            sortDir: 'asc',
            head: {},
            startPage: 0,
            endPage: 0,
            caption_editing: [],
            rights_editing: [],
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
        loadPrev() {
            this.$set(this.lightbox, 'loading', true);
            this.startPage--;
            const url = new URL(
                `/verband/mitglieder/${this.mitglieder.meta.id}`,
                window.location.origin
            );
            url.searchParams.set('page', this.startPage.toString());
            if (this.mitglieder.online) url.searchParams.set('online', 'true');
            const search =
                (this.$refs.urlSearch as HTMLInputElement)?.value?.trim() ?? '';
            if (search) url.searchParams.set('username', search);
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-verband-mitgliederliste-load-prev-${this.startPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/verband/mitglieder').then(parser => {
                        const result = parser.default(
                            html,
                            url.toString(),
                            this.lightbox.getIdFromEl
                        );
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'users', [
                            ...result.users,
                            ...this.lightbox.data.users,
                        ]);
                        this.lightbox.finishLoading(
                            'verband-mitgliederliste-loadprev'
                        );
                    });
                });
        },
        loadNext() {
            this.$set(this.lightbox, 'loading', true);
            this.endPage++;
            const url = new URL(
                `/verband/mitglieder/${this.mitglieder.meta.id}`,
                window.location.origin
            );
            url.searchParams.set('page', this.endPage.toString());
            if (this.mitglieder.online) url.searchParams.set('online', 'true');
            const search =
                (this.$refs.urlSearch as HTMLInputElement)?.value?.trim() ?? '';
            if (search) url.searchParams.set('username', search);
            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-verband-mitgliederliste-load-next-${this.endPage}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../../parsers/verband/mitglieder').then(parser => {
                        const result = parser.default(
                            html,
                            url.toString(),
                            this.lightbox.getIdFromEl
                        );
                        this.$set(
                            this.lightbox.data,
                            'lastPage',
                            result.lastPage
                        );
                        this.$set(this.lightbox.data, 'users', [
                            ...this.lightbox.data.users,
                            ...result.users,
                        ]);
                        this.lightbox.finishLoading(
                            'verband-mitgliederliste-loadnext'
                        );
                    });
                });
        },
        setUrlSearch() {
            const url = new URL(this.url, window.location.origin);
            const search =
                (this.$refs.urlSearch as HTMLInputElement)?.value?.trim() ?? '';
            if (search) url.searchParams.set('username', search);
            else url.searchParams.delete('username');

            this.$set(this.lightbox, 'src', url.toString());
        },
        loadCaptionHolder(user_id) {
            this.caption_editing.push(user_id);
        },
        saveCaption(user_id) {
            if (this.caption_editing.includes(user_id)) {
                const url = new URL(
                    `/verband/rolecaptionForm/${user_id}`,
                    window.location.origin
                );
                url.searchParams.append('utf8', '✓');
                url.searchParams.append('_method', 'put');
                url.searchParams.append(
                    'authenticity_token',
                    this.mitglieder.authenticity_token
                );
                const caption =
                    (this.$refs[
                        `caption_form_${user_id}`
                    ] as (HTMLInputElement | null)[])[0]?.value ?? '';
                url.searchParams.append('user[caption]', caption);
                this.$store.dispatch('api/request', {
                    url: `/verband/rolecaptionForm/${user_id}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'X-CSRF-Token': this.mitglieder.authenticity_token,
                            'Content-Type':
                                'application/x-www-form-urlencoded; charset=UTF-8',
                        },
                        referrer: new URL(
                            '/verband/mitglieder',
                            window.location.origin
                        ),
                        body: url.searchParams.toString(),
                        method: 'POST',
                        mode: 'cors',
                    },
                });
                this.caption_editing.splice(
                    this.caption_editing.findIndex(id => id === user_id),
                    1
                );
                const userIndex = this.mitglieder.users.findIndex(
                    ({ id }) => id === user_id
                );
                this.$set(
                    this.lightbox.data.users[userIndex],
                    'caption',
                    caption
                );
            }
        },
        applyDiscount(user_id, amount) {
            this.$store
                .dispatch('api/request', {
                    url: `/verband/discount/${user_id}/${amount}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'X-CSRF-Token': this.mitglieder.authenticity_token,
                        },
                        referrer: new URL(
                            '/verband/mitglieder',
                            window.location.origin
                        ),
                        method: 'GET',
                        mode: 'cors',
                    },
                })
                .then(() => {
                    const userIndex = this.mitglieder.users.findIndex(
                        ({ id }) => id === user_id
                    );
                    this.$set(
                        this.lightbox.data.users[userIndex],
                        'discount',
                        amount
                    );
                });
        },
        toggleRight(user_id, right, new_state) {
            this.$store
                .dispatch('api/request', {
                    url: `/verband/${right}/${user_id}/${new_state}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'X-CSRF-Token': this.mitglieder.authenticity_token,
                        },
                        referrer: new URL(
                            '/verband/mitglieder',
                            window.location.origin
                        ),
                        method: 'GET',
                        mode: 'cors',
                    },
                })
                .then(() => {
                    const userIndex = this.mitglieder.users.findIndex(
                        ({ id }) => id === user_id
                    );
                    const roles = this.lightbox.data.users[userIndex].roles;
                    const right_t = this.lightbox
                        .$sm(`rights.${right}`)
                        .toString();
                    if (new_state) {
                        roles.push(right_t);
                    } else {
                        roles.splice(
                            roles.findIndex(r => r === right_t),
                            1
                        );
                    }
                    this.$set(
                        this.lightbox.data.users[userIndex].edit,
                        right,
                        !!new_state
                    );
                    this.$set(
                        this.lightbox.data.users[userIndex],
                        'roles',
                        roles.sort()
                    );
                });
        },
        kick(user_id, username) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
            LSSM.$modal.show('dialog', {
                title: LSSM.lightbox.$sm('rights.kickModal.title'),
                text: LSSM.lightbox.$sm('rights.kickModal.text', {
                    user: username,
                }),
                buttons: [
                    {
                        title: LSSM.lightbox.$sm('rights.kickModal.btnCancel'),
                        default: true,
                        handler() {
                            LSSM.$modal.hide('dialog');
                        },
                    },
                    {
                        title: LSSM.lightbox.$sm('rights.kickModal.btnConfirm'),
                        handler() {
                            LSSM.$store
                                .dispatch('api/request', {
                                    url: `/verband/kick/${user_id}/`,
                                    init: {
                                        credentials: 'include',
                                        headers: {
                                            'X-CSRF-Token':
                                                LSSM.mitglieder
                                                    .authenticity_token,
                                        },
                                        referrer: new URL(
                                            '/verband/mitglieder',
                                            window.location.origin
                                        ),
                                        method: 'GET',
                                        mode: 'cors',
                                    },
                                })
                                .then(() => {
                                    LSSM.$set(
                                        LSSM.lightbox.data,
                                        'users',
                                        LSSM.mitglieder.users.filter(
                                            ({ id }) => id !== user_id
                                        )
                                    );
                                    LSSM.$modal.hide('dialog');
                                });
                        },
                    },
                ],
            });
        },
        toggleEdit(user_id) {
            if (this.rights_editing.includes(user_id)) {
                this.rights_editing.splice(
                    this.rights_editing.findIndex(id => id === user_id),
                    1
                );
            } else {
                this.rights_editing.push(user_id);
            }
        },
    },
    computed: {
        urlSearch() {
            return (
                new URL(this.url, window.location.origin).searchParams.get(
                    'username'
                ) ?? ''
            );
        },
        page() {
            return parseInt(
                new URL(this.url, window.location.origin).searchParams.get(
                    'page'
                ) ?? '1'
            );
        },
        subtitle() {
            return this.lightbox
                .$smc(
                    this.urlSearch ? 'search_subtitle' : 'subtitle',
                    this.mitglieder.users.length,
                    {
                        startPage: this.startPage,
                        endPage: this.endPage,
                        firstCredits:
                            this.mitglieder.users[0]?.credits?.toLocaleString() ??
                            '',
                        lastCredits:
                            this.mitglieder.users[
                                this.mitglieder.users.length - 1
                            ]?.credits?.toLocaleString() ?? '',
                        totalPages: this.mitglieder.lastPage.toLocaleString(),
                    }
                )
                .toString();
        },
        usersFiltered() {
            return this.search.trim().length
                ? this.mitglieder.users.filter(user =>
                      JSON.stringify(Object.values(user))
                          .toLowerCase()
                          .match(this.search.trim().toLowerCase())
                  )
                : this.mitglieder.users;
        },
        usersSorted() {
            if (this.sort === 'credits' && !this.urlSearch) {
                if (this.sortDir === 'asc') return this.usersFiltered;
                return [...this.usersFiltered].reverse();
            }
            const modifier = this.sortDir === 'desc' ? -1 : 1;
            return [...this.usersFiltered].sort((a, b) => {
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
        mitglieder: {
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
        mitglieder() {
            this.lightbox.finishLoading('verband/mitglieder-updated-data');
        },
    },
    beforeMount() {
        // Object.entries(this.filter).forEach(([filter, props]) => {
        //     Object.entries(props).forEach(([prop, value]) => {
        //         this.getSetting(`${filter}.${prop}`, value).then(v =>
        //             this.$set(props, prop, v)
        //         );
        //     });
        // });
        this.head = {
            name: { title: this.lightbox.$sm('name').toString() },
            roles: { title: this.lightbox.$sm('roles').toString() },
            credits: { title: this.lightbox.$sm('credits').toString() },
            ...(this.mitglieder.edit_discount
                ? {
                      discount: {
                          title: this.lightbox.$sm('discount').toString(),
                      },
                      tax: { title: this.lightbox.$sm('tax').toString() },
                      edit: { title: '', noSort: true },
                  }
                : {}),
        };
    },
    mounted() {
        this.getSetting(`sort`, this.sort).then(sort => (this.sort = sort));
        this.getSetting(`sortDir`, this.sortDir).then(
            dir => (this.sortDir = dir)
        );
        this.startPage = this.page;
        this.endPage = this.page;
        this.lightbox.finishLoading('verband/mitglieder-mounted');
    },
});
</script>
