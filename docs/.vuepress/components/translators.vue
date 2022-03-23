<template>
    <div id="translators">
        <details v-for="(users, language) in translators" :key="language">
            <summary>{{ flags[language] }}</summary>
            <ul>
                <li v-for="user in users" :key="`${language}_${user.login}`">
                    <img :src="user.avatar_url" :alt="user.name" />
                    <template v-if="user.login !== user.name">
                        {{ user.name }} (
                    </template>
                    <a :href="user.profile" target="_blank">{{ user.login }}</a>
                    <template v-if="user.login !== user.name">)</template>
                </li>
            </ul>
        </details>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'translators-list',
    data() {
        return {};
    },
    computed: {
        translators() {
            const languages = {};
            this.$theme.variables.contributors.forEach(contributor => {
                const langContributions = contributor.contributions.filter(
                    contribution => contribution.match(/^[a-z]{2}_[A-Z]{2}$/u)
                );
                langContributions.forEach(language => {
                    if (!languages.hasOwnProperty(language))
                        languages[language] = [];
                    languages[language].push({
                        ...contributor,
                        contributions: langContributions,
                    });
                });
            });
            return languages;
        },
        flags() {
            return Object.fromEntries(
                Object.entries(this.$theme.variables.contributionTypes).map(
                    ([language, { symbol }]) => [language, symbol]
                )
            );
        },
    },
    methods: {},
    props: {},
});
</script>

<style scoped>
img {
    width: 1em;
    margin-right: 5px;
}
</style>
