<template>
    <div>
        <h1>
            {{ lightbox.$sm('title') }}
            <span class="reward_button">
                <button
                    class="btn btn-block"
                    :disabled="!amountOfClaimableTasks"
                    @click="claimAll"
                >
                    {{
                        lightbox.$sm('claimAll', {
                            amount: amountOfClaimableTasks,
                        })
                    }}
                </button>
            </span>
        </h1>
        <tabs>
            <tab
                v-for="(category, title) in categories"
                :key="title"
                :title="title"
            >
                <tabs>
                    <tab
                        v-for="(group, countdown) in category.times"
                        :key="`${title}_${countdown}`"
                        :title="countdown"
                    >
                        <lssmv4-redesign-task
                            v-for="task in group"
                            :key="task.id"
                            :task="task"
                            :countdown-id="getTaskId(task.id, 'countdown')"
                            :$sm="lightbox.$sm"
                            @claim="claimReward(task.progressId)"
                        ></lssmv4-redesign-task>
                    </tab>
                    <tab :title="lightbox.$sm('collectionTasks.title')">
                        <lssmv4-redesign-task
                            v-for="task in category.collection"
                            :key="task.id"
                            :task="task"
                            :countdown-id="getTaskId(task.id, 'countdown')"
                            :$sm="lightbox.$sm"
                            @claim="claimReward(task.progressId)"
                        ></lssmv4-redesign-task>
                    </tab>
                </tabs>
            </tab>
        </tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import moment from 'moment';

import { RedesignComponent } from 'typings/modules/Redesign';
import { TasksWindow } from '../parsers/tasks';

export type ModifiedTask = TasksWindow['tasks'][0] & { endString: string };

type Category = Record<string, ModifiedTask[]>;
type Categories = Record<
    string,
    { times: Category; collection: ModifiedTask[] }
>;

type Component = RedesignComponent<
    'tasks',
    'tasks',
    { moment: typeof moment },
    {
        getTaskId: (id: number, extra: string) => string;
        claimReward: (id: number) => void;
        claimAll: () => void;
    },
    { categories: Categories; amountOfClaimableTasks: number }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-tasks',
    components: {
        Lssmv4RedesignTask: () =>
            import(
                /*webpackChunkName: "modules/redesign/components/task"*/ './assets/task.vue'
            ),
    },
    data() {
        moment.locale(this.$store.state.lang);
        return {
            moment,
        };
    },
    methods: {
        getTaskId(id, extra) {
            return this.$store.getters.nodeAttribute(
                `redesign-tasks-${id}-${extra}`
            );
        },
        claimReward(id) {
            this.$set(this.lightbox, 'loading', true);
            this.$store
                .dispatch('api/request', {
                    url: `/tasks/claim_reward?task_progress_id=${id}`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: new URL(
                            'tasks/index',
                            window.location.origin
                        ),
                        body: `authenticity_token=${encodeURIComponent(
                            this.tasks.authenticity_token
                        )}`,
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: `redesign-tasks-claim-${id}`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../parsers/tasks').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: new URL(
                                'tasks/index',
                                window.location.origin
                            ).toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        this.$set(this.lightbox.data, 'tasks', result.tasks);
                        this.lightbox.finishLoading('tasks-updated-tasks');
                    });
                });
        },
        claimAll() {
            this.$set(this.lightbox, 'loading', true);
            this.$store
                .dispatch('api/request', {
                    url: `/tasks/claim_all_rewards`,
                    init: {
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        referrer: new URL(
                            'tasks/index',
                            window.location.origin
                        ),
                        body: `authenticity_token=${encodeURIComponent(
                            this.tasks.authenticity_token
                        )}`,
                        method: 'POST',
                        mode: 'cors',
                    },
                    feature: `redesign-tasks-claim-all`,
                })
                .then((res: Response) => res.text())
                .then(async html => {
                    import('../parsers/tasks').then(async parser => {
                        const result = await parser.default({
                            doc: new DOMParser().parseFromString(
                                html,
                                'text/html'
                            ),
                            href: new URL(
                                'tasks/index',
                                window.location.origin
                            ).toString(),
                            getIdFromEl: this.lightbox.getIdFromEl,
                            LSSM: this,
                            $m: this.lightbox.$m,
                            $sm: this.lightbox.$sm,
                            $mc: this.lightbox.$mc,
                            $smc: this.lightbox.$smc,
                        });
                        this.$set(this.lightbox.data, 'tasks', result.tasks);
                        this.lightbox.finishLoading('tasks-updated-tasks');
                    });
                });
        },
    },
    computed: {
        categories() {
            const categories: Categories = {};
            this.tasks.tasks.forEach(task => {
                const endString = moment()
                    .add(task.countdown, 'seconds')
                    .format('llll');

                if (!categories.hasOwnProperty(task.category))
                    categories[task.category] = { times: {}, collection: [] };

                if (task.isCollectionTask) {
                    return categories[task.category].collection.push({
                        ...task,
                        endString,
                    });
                }

                if (!categories[task.category].times.hasOwnProperty(endString))
                    categories[task.category].times[endString] = [];
                categories[task.category].times[endString].push({
                    ...task,
                    endString,
                });
            });
            return categories;
        },
        amountOfClaimableTasks() {
            return this.tasks.tasks.filter(
                ({ progress, total }) => progress === total
            ).length;
        },
    },
    props: {
        tasks: {
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
        tasks() {
            this.lightbox.finishLoading('tasks-updated');
        },
    },
    mounted() {
        this.lightbox.finishLoading('tasks-mounted');
    },
});
</script>

<style scoped lang="sass">
textarea
    resize: vertical

.form-control[disabled]
    background-color: inherit

body.dark .form-control[disabled]
    background-color: #323232

pre
    white-space: pre-wrap
    overflow-wrap: break-word
</style>
