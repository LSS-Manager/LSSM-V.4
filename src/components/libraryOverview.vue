<template>
    <lightbox name="libraryOverview">
        <h1>
            Open-Source Libraries
        </h1>
        <label class="search_label">
            <input
                type="search"
                class="search_input_field"
                v-model="librarySearch"
                placeholder="search"
            />
        </label>
        <ul class="auto-sized-grid">
            <li
                v-for="libraryName in librariesFiltered"
                :key="libraryName"
                :library="(library = libraries[libraryName])"
                class="card"
            >
                <a :href="library.url" class="lightbox-open">
                    <img
                        :src="
                            library.icon ||
                                'https://github.githubassets.com/pinned-octocat.svg'
                        "
                        :alt="libraryName"
                    />
                </a>
                <div class="linebreak"></div>
                <a :href="library.url" class="lightbox-open">
                    <h4>
                        <b>{{ libraryName }}</b>
                    </h4>
                </a>
                <div class="linebreak"></div>
                <small>
                    Version:
                    <code> {{ library.version }}</code>
                </small>
            </li>
        </ul>
    </lightbox>
</template>

<script>
import Lightbox from './lightbox.vue';

const libraries = require('../libraries');

export default {
    name: 'libraryOverview',
    components: { Lightbox },
    data() {
        return {
            librarySearch: '',
            libraries,
        };
    },
    computed: {
        librariesFiltered() {
            return Object.keys(libraries)
                .sort()
                .filter(m =>
                    this.librarySearch.length > 0
                        ? m
                              .toLowerCase()
                              .match(this.librarySearch.toLowerCase())
                        : true
                );
        },
    },
};
</script>

<style scoped lang="sass">
.search_label
    position: absolute
    right: 1em
    top: calc(1em + 32px)

.auto-sized-grid
    display: grid
    grid-gap: 16px
    grid-template-columns: repeat(auto-fit, 250px)
    list-style: none
    padding-left: 0
    margin-top: 10px
    margin-bottom: 10px

    .card
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
        transition: 0.3s
        border-radius: 5px
        padding: 1rem
        display: flex
        align-items: center
        justify-content: center
        flex-flow: row wrap

        img
            width: 60px
            height: 60px

        .linebreak
            width: 100%

        &:hover
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)
</style>
