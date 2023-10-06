<template>
    <SchoolingTabs
        :title="title"
        collapsed-setting="hide_ownschooling"
        :columns="['name', 'end', 'owner']"
        :tabs="tabs"
    >
        <template v-slot="{ schooling, countdownId }">
            <td>
                <a
                    class="btn btn-success"
                    :href="`/schoolings/${schooling.id}`"
                >
                    {{ schooling.name }}
                </a>
            </td>
            <td :id="countdownId(schooling)">
                {{ schooling.end }}
            </td>
            <td v-html="schooling.owner"></td>
        </template>
    </SchoolingTabs>
</template>

<script setup lang="ts">
import SchoolingTabs from './SchoolingTabs.vue';
import { useI18nModule } from '../../../i18n';

import type { OwnSchoolings } from 'typings/modules/SchoolingOverview/main';

const { $m } = useI18nModule('schoolingOverview');

const title = $m('own').toString();

defineProps<{
    tabs: OwnSchoolings['tabs'];
}>();
</script>
