<template>
    <table>
        <thead>
            <tr>
                <th>{{ $theme.variables.tables[$lang].browser }}</th>
                <th>{{ $theme.variables.tables[$lang].minVersion }}</th>
                <th>{{ $theme.variables.tables[$lang].download }}</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="({ supported, download }, browser) in $theme.variables
                    .browsers"
                :key="browser"
            >
                <td>{{ browser.replace(/^./, $1 => $1.toUpperCase()) }}</td>
                <td>{{ supported }}</td>
                <td>
                    <a :href="download" target="_blank">
                        {{ $theme.variables.tables[$lang].download }}
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'browser-support-table',
});
</script>
