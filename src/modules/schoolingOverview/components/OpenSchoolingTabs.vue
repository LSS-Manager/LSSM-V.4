<template>
    <SchoolingTabs
        :title="title"
        collapsed-setting="hide_openschooling"
        :columns="['name', 'seats', 'price', 'end', 'owner']"
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
            <td>{{ schooling.seats }}</td>
            <td>{{ schooling.price }}</td>
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

import type { OpenSchoolings } from 'typings/modules/SchoolingOverview/main';

const { $m } = useI18nModule('schoolingOverview');

const title = $m('open').toString();

defineProps<{
    tabs: OpenSchoolings['tabs'];
}>();
</script>
