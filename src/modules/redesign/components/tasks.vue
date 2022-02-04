<template>
    <div>
        <h1>
            {{ lightbox.$sm('title') }}
            <!-- collect all button -->
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
                        <div
                            class="panel panel-default mission_panel_green task_panel"
                            v-for="task in group"
                            :key="task.id"
                        >
                            <div class="panel-heading">
                                <div>
                                    <span class="reward_button">
                                        <button>Btn</button>
                                    </span>
                                    <span class="task_name">
                                        {{ task.name }}
                                    </span>
                                </div>
                                <div>{{ task.reward }}</div>
                            </div>
                            <div class="task_body">
                                <pre>{{ task }}</pre>
                            </div>
                        </div>
                    </tab>
                    <tab :title="lightbox.$sm('collectionTasks.title')">
                        <pre>{{ category.collection }}</pre>
                    </tab>
                </tabs>
            </tab>
        </tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import moment from 'moment';

import { DefaultMethods } from 'vue/types/options';
import { RedesignComponent } from 'typings/modules/Redesign';
import { TasksWindow } from '../parsers/tasks';

type ModifiedTask = TasksWindow['tasks'][0] & { endString: string };

type Category = Record<string, ModifiedTask[]>;
type Categories = Record<
    string,
    { times: Category; collection: ModifiedTask[] }
>;

type Component = RedesignComponent<
    'tasks',
    'tasks',
    { moment: typeof moment },
    DefaultMethods<Vue>,
    { categories: Categories }
>;

export default Vue.extend<
    Component['Data'],
    Component['Methods'],
    Component['Computed'],
    Component['Props']
>({
    name: 'lssmv4-redesign-tasks',
    components: {},
    data() {
        moment.locale(this.$store.state.lang);
        return {
            moment,
        };
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
