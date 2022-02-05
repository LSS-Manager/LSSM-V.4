<template>
    <div class="panel panel-default mission_panel_green task_panel">
        <div class="panel-heading">
            <div>
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
            </div>
            <div>{{ task.reward }}</div>
        </div>
        <div class="task_body">
            <div class="progress-info">
                <div>
                    <span>{{ $sm('end') }}:</span>
                    <span :id="countdownId"></span>
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

import { $m } from 'typings/Module';
import { ModifiedTask } from '../tasks.vue';
import {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
} from 'vue/types/options';

export default Vue.extend<
    DefaultData<Vue>,
    DefaultMethods<Vue>,
    DefaultComputed,
    {
        task: ModifiedTask;
        countdownId: string;
        $sm: $m;
    }
>({
    name: 'lssmv4-redesign-task',
    data() {
        return {};
    },
    props: {
        task: {
            type: Object,
            required: true,
        },
        countdownId: {
            type: String,
            required: true,
        },
        $sm: {
            type: Function,
            required: true,
        },
    },
});
</script>
