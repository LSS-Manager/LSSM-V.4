<template>
    <div
        class="panel panel-default mission_panel_green task_panel"
        :class="{ collapsed, claimable: task.progress === task.total }"
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
                        class="btn btn-success"
                        :disabled="task.progress !== task.total"
                        @click="$emit('claim')"
                    >
                        {{ $sm('claim') }}
                    </button>
                </span>
                <span class="task_name">
                    {{ task.name }}
                </span>
                <span v-if="task.isPremiumTask">
                    <font-awesome-icon :icon="faGem"></font-awesome-icon>
                </span>
            </div>
            <div class="rewards">
                <div v-if="task.reward.credits" class="reward">
                    <img
                        class="navbar-icon"
                        src="/images/mc_credits_flat.png"
                        alt="Credits"
                    />
                    <span>
                        {{ task.reward.credits.toLocaleString() }}&nbsp;{{
                            $t('credits')
                        }}
                    </span>
                </div>
                <div v-if="task.reward.coins" class="reward">
                    <img
                        class="navbar-icon"
                        src="/images/mc_coins_flat.png"
                        alt="Coins"
                    />
                    <span>
                        {{ task.reward.coins.toLocaleString() }}&nbsp;{{
                            $t('coins')
                        }}
                    </span>
                </div>
            </div>
            <div v-if="collapsed" class="progress_value">
                <div>
                    <span>{{ $sm('end') }}:</span>
                    <span :id="task.countdownId"></span>
                    <span>({{ task.endString }})</span>
                </div>
                <span>
                    {{ task.progress.toLocaleString() }} /
                    {{ task.total.toLocaleString() }}
                </span>
                &nbsp;
                <font-awesome-icon
                    v-if="task.hasNextTask"
                    :icon="faCircleRight"
                    :title="$sm('nextTask')"
                ></font-awesome-icon>
            </div>
        </div>
        <div class="task_body panel-body" v-if="!collapsed">
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

import { faCircleRight } from '@fortawesome/free-solid-svg-icons/faCircleRight';
import { faCompressAlt } from '@fortawesome/free-solid-svg-icons/faCompressAlt';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import { faGem } from '@fortawesome/free-regular-svg-icons/faGem';

import { collapsedLocalStorageKey, type ModifiedTask } from '../tasks.vue';

import type { $m } from 'typings/Module';
import type { DefaultComputed } from 'vue/types/options';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export default Vue.extend<
    {
        faCircleRight: IconDefinition;
        faCompressAlt: IconDefinition;
        faExpandAlt: IconDefinition;
        faGem: IconDefinition;
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
            faCircleRight,
            faCompressAlt,
            faExpandAlt,
            faGem,
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
            if (this.collapsed) collapsedTasks.push(this.task.id);
            else if (collapsedTasks.includes(this.task.id))
                collapsedTasks.splice(collapsedTasks.indexOf(this.task.id), 1);

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

.task_panel
    width: 100%

    .reward
        display: inline-flex
        align-items: center
        gap: 3px
        margin-left: 1em

    &.claimable
        order: -1

    &:not(.collapsed)
        .panel-heading,
        .progress-info
            display: flex
            justify-content: space-between

    &.collapsed
        width: max-content
        display: inline-block
        margin-right: 2rem

        .panel-heading
            min-height: unset

            > .rewards,
            > :has(+ .rewards)
                display: inline

            > *:not(:last-child)
                margin-right: 1rem

            .progress_value
                display: flex
                justify-content: space-between

                > span
                    margin-left: auto
</style>
