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
            <button
                class="btn btn-xs collapse-button"
                :class="collapseAll ? 'btn-danger' : 'btn-success'"
                @click="toggleCollapseAll"
            >
                <font-awesome-icon
                    :icon="collapseAll ? faExpandAlt : faCompressAlt"
                ></font-awesome-icon>
            </button>
        </h1>
        <tabs>
            <tab
                v-for="(category, title) in categories"
                :key="title"
                :title="title"
            >
                <tabs>
                    <tab :title="`[${lightbox.$sm('all')}]`">
                        <lssmv4-redesign-task
                            v-for="task in category.all"
                            :key="task.id"
                            :task="task"
                            :$sm="lightbox.$sm"
                            @claim="
                                checkConfirmation(
                                    task.claimConfirmation,
                                    claimReward,
                                    task.progressId
                                )
                            "
                        ></lssmv4-redesign-task>
                    </tab>
                    <tab
                        v-for="(group, countdown) in category.times"
                        :key="`${title}_${countdown}`"
                        :title="countdown"
                    >
                        <lssmv4-redesign-task
                            v-for="task in group"
                            :key="task.id"
                            :task="task"
                            :$sm="lightbox.$sm"
                            @claim="
                                checkConfirmation(
                                    task.claimConfirmation,
                                    claimReward,
                                    task.progressId
                                )
                            "
                        ></lssmv4-redesign-task>
                    </tab>
                    <tab
                        v-if="category.collection.length"
                        :title="lightbox.$sm('collectionTasks.title')"
                    >
                        <lssmv4-redesign-task
                            v-for="task in category.collection"
                            :key="task.id"
                            :task="task"
                            :$sm="lightbox.$sm"
                            @claim="
                                checkConfirmation(
                                    task.claimConfirmation,
                                    claimReward,
                                    task.progressId
                                )
                            "
                        ></lssmv4-redesign-task>
                    </tab>
                </tabs>
            </tab>
        </tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faCompressAlt } from '@fortawesome/free-solid-svg-icons/faCompressAlt';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import moment from 'moment';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { RedesignComponent } from 'typings/modules/Redesign';
import type { TasksWindow } from '../parsers/tasks';

export const collapsedLocalStorageKey = `${PREFIX}_redesign_tasks_collapsed`;

type Task = TasksWindow['tasks'][0];

export type ModifiedTask = Task & {
    endString: string;
    countdownId: string;
    triggerCountdownInit(): void;
};

type Category = Record<string, ModifiedTask[]>;
type Categories = Record<
    string,
    { all: ModifiedTask[]; times: Category; collection: ModifiedTask[] }
>;

type Component = RedesignComponent<
    'tasks',
    'tasks',
    {
        moment: typeof moment;
        activeCountdowns: number[];
        faCompressAlt: IconDefinition;
        faExpandAlt: IconDefinition;
        collapseAll: boolean;
    },
    {
        getTaskId(id: number, extra: string): string;
        checkConfirmation(
            confirmation: string | false,
            callback: (id: number) => void,
            id: number
        ): void;
        claimReward(id: number): void;
        claimAll(): void;
        cleanUpCollapsedTasks(): void;
        toggleCollapseAll(): void;
    },
    {
        categories: Categories;
        claimableTasks: Task[];
        amountOfClaimableTasks: number;
    }
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
        const collapsedTasks: number[] = JSON.parse(
            localStorage.getItem(collapsedLocalStorageKey) || '[]'
        );
        return {
            moment,
            activeCountdowns: [],
            faCompressAlt,
            faExpandAlt,
            collapseAll: collapsedTasks.includes(-1),
        };
    },
    methods: {
        getTaskId(id, extra) {
            return this.$store.getters.nodeAttribute(
                `redesign-tasks-${id}-${extra}`
            );
        },
        checkConfirmation(confirmation, callback, id) {
            if (!confirmation) return callback(id);
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
            this.$modal.show('dialog', {
                title: this.lightbox.$sm(`confirmation.title`),
                text: confirmation,
                buttons: [
                    {
                        title: this.lightbox.$sm('confirmation.cancel'),
                        default: true,
                        handler() {
                            LSSM.$modal.hide('dialog');
                        },
                    },
                    {
                        title: this.lightbox.$sm('confirmation.confirm'),
                        handler() {
                            callback(id);
                            LSSM.$modal.hide('dialog');
                        },
                    },
                ],
            });
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
                        this.cleanUpCollapsedTasks();
                        this.lightbox.finishLoading('tasks-updated-tasks');
                    });
                });
        },
        claimAll() {
            const confirmations = [
                ...new Set(
                    this.claimableTasks
                        .map(({ claimConfirmation }) => claimConfirmation)
                        .filter(Boolean)
                ),
            ].join('<br>');

            const claimAll = () => {
                this.$set(this.lightbox, 'loading', true);
                this.$store
                    .dispatch('api/request', {
                        url: `/tasks/claim_all_rewards`,
                        init: {
                            credentials: 'include',
                            headers: {
                                'Content-Type':
                                    'application/x-www-form-urlencoded',
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
                            this.$set(
                                this.lightbox.data,
                                'tasks',
                                result.tasks
                            );
                            this.cleanUpCollapsedTasks();
                            this.lightbox.finishLoading('tasks-updated-tasks');
                        });
                    });
            };

            if (!confirmations) return claimAll();

            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const LSSM = this;
            this.$modal.show('dialog', {
                title: this.lightbox.$sm(`confirmation.title`),
                text: confirmations,
                buttons: [
                    {
                        title: this.lightbox.$sm('confirmation.cancel'),
                        default: true,
                        handler() {
                            LSSM.$modal.hide('dialog');
                        },
                    },
                    {
                        title: this.lightbox.$sm('confirmation.confirm'),
                        handler() {
                            claimAll();
                            LSSM.$modal.hide('dialog');
                        },
                    },
                ],
            });
        },
        cleanUpCollapsedTasks() {
            localStorage.setItem(
                collapsedLocalStorageKey,
                JSON.stringify(
                    (
                        JSON.parse(
                            localStorage.getItem(collapsedLocalStorageKey) ||
                                '[]'
                        ) as number[]
                    ).filter(
                        task =>
                            this.tasks.tasks.find(({ id }) => task === id) ||
                            task === -1
                    )
                )
            );
        },
        toggleCollapseAll() {
            this.collapseAll = !this.collapseAll;
            this.$el
                .querySelectorAll<HTMLButtonElement>(
                    `.task_panel .collapse-button.btn-${
                        this.collapseAll ? 'success' : 'danger'
                    }`
                )
                .forEach(btn => btn.click());
            localStorage.setItem(
                collapsedLocalStorageKey,
                this.collapseAll ? '[-1]' : '[]'
            );
        },
    },
    computed: {
        categories() {
            const categories: Categories = {};

            const allCategory = `[${this.lightbox.$sm('all')}]`;

            const addToCategory = (category: string, task: ModifiedTask) => {
                if (!categories.hasOwnProperty(category)) {
                    categories[category] = {
                        all: [],
                        times: {},
                        collection: [],
                    };
                }

                categories[category].all.push(task);

                if (task.isCollectionTask)
                    return categories[category].collection.push(task);

                if (!categories[category].times.hasOwnProperty(task.endString))
                    categories[category].times[task.endString] = [];
                categories[category].times[task.endString].push(task);
            };

            const tasks = this.tasks.tasks;

            tasks
                .sort((a, b) => a.countdown - b.countdown)
                .forEach(task => {
                    const endString = moment()
                        .add(task.countdown, 'seconds')
                        .format('llll');
                    const countdownId = this.getTaskId(task.id, 'countdown');
                    const triggerCountdownInit = () => {
                        if (!this.activeCountdowns.includes(task.progressId)) {
                            this.$utils.countdown(countdownId, task.countdown);
                            this.activeCountdowns.push(task.progress);
                        }
                    };

                    const modifiedTask = {
                        ...task,
                        endString,
                        countdownId,
                        triggerCountdownInit,
                    };

                    addToCategory(allCategory, modifiedTask);
                    addToCategory(task.category, modifiedTask);
                });
            return categories;
        },
        claimableTasks() {
            return this.tasks.tasks.filter(
                ({ progress, total }) => progress === total
            );
        },
        amountOfClaimableTasks() {
            return this.claimableTasks.length;
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
        this.cleanUpCollapsedTasks();
    },
});
</script>
