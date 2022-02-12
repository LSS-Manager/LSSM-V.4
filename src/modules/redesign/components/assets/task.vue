<template>
    <div
        class="panel panel-default mission_panel_green task_panel"
        :class="{ collapsed }"
    >
        <div class="panel-heading">
            <div>
                <button
                    class="btn btn-xs collapse-button"
                    :class="collapsed ? 'btn-danger' : 'btn-success'"
                    @click="toggleCollapsedState"
                >
                    <font-awesome-icon
                        :icon="collapsed ? faExpandAlt : faCompressAlt"
                    ></font-awesome-icon>
                </button>
                <span class="reward_button">
                    <button
                        class="btn btn-block"
                        :disabled="task.progress !== task.total"
                        @click="$emit('claim')"
                    >
                        {{ $sm('claim') }}
                    </button>
                </span>
                <span class="task_name">
                    {{ task.name }}
                </span>
                <div v-if="collapsed">
                    <span>{{ $sm('end') }}:</span>
                    <span :id="task.countdownId"></span>
                    <span>({{ task.endString }})</span>
                </div>
            </div>
            <div>
                {{ task.reward }}
                <div v-if="collapsed" class="progress_value">
                    {{ task.progress.toLocaleString() }} /
                    {{ task.total.toLocaleString() }}
                </div>
            </div>
        </div>
        <div class="task_body" v-if="!collapsed">
            <div class="progress-info">
                <div>
                    <span>{{ $sm('end') }}:</span>
                    <span :id="task.countdownId"></span>
                    <span>({{ task.endString }})</span>
                </div>
                <span class="progress_value">
                    {{ task.progress.toLocaleString() }} /
                    {{ task.total.toLocaleString() }}
                </span>
            </div>
            <div>
                <div class="progress_bar">
                    <div class="progress">
                        <div
                            class="progress-bar progress-bar-success"
                            :style="`width: ${
                                (task.progress / task.total) * 100
                            }%`"
                            role="progressbar"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="next_task" v-if="task.hasNextTask">
                {{ $sm('nextTask') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { faCompressAlt } from '@fortawesome/free-solid-svg-icons/faCompressAlt';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';

import { collapsedLocalStorageKey, type ModifiedTask } from '../tasks.vue';

import type { $m } from 'typings/Module';
import type { DefaultComputed } from 'vue/types/options';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export default Vue.extend<
    {
        faCompressAlt: IconDefinition;
        faExpandAlt: IconDefinition;
        collapsed: boolean;
    },
    { toggleCollapsedState(): void },
    DefaultComputed,
    {
        task: ModifiedTask;
        $sm: $m;
    }
>({
    name: 'lssmv4-redesign-task',
    data() {
        const collapsedTasks: number[] = JSON.parse(
            localStorage.getItem(collapsedLocalStorageKey) || '[]'
        );
        return {
            faCompressAlt,
            faExpandAlt,
            collapsed:
                collapsedTasks.includes(this.task.id) ||
                collapsedTasks.includes(-1),
        };
    },
    methods: {
        toggleCollapsedState() {
            this.collapsed = !this.collapsed;
            const collapsedTasks: number[] = JSON.parse(
                localStorage.getItem(collapsedLocalStorageKey) || '[]'
            );
            if (this.collapsed) {
                collapsedTasks.push(this.task.id);
            } else if (collapsedTasks.includes(this.task.id)) {
                collapsedTasks.splice(
                    collapsedTasks.findIndex(task => task === this.task.id),
                    1
                );
            }
            localStorage.setItem(
                collapsedLocalStorageKey,
                JSON.stringify(collapsedTasks)
            );
        },
    },
    props: {
        task: {
            type: Object,
            required: true,
        },
        $sm: {
            type: Function,
            required: true,
        },
    },
    mounted() {
        this.task.triggerCountdownInit();
    },
});
</script>

<style scoped lang="sass">
.collapse-button
    margin-right: 1rem

.task_panel.collapsed
    width: max-content
    display: inline-block
    margin-right: 2rem

    .panel-heading
        min-height: unset

        > *:not(:last-child)
            margin-right: 1rem
</style>
