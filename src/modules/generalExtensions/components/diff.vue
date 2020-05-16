<template>
    <lightbox name="diff" :no-title-hide="true" :no-fullscreen="true">
        <tabs>
            <tab title="char">
                <pre><span v-for="(char, index) in chars" :key="index" :class="char">{{ char.value }}</span></pre>
            </tab>
            <tab title="word">
                <pre><span v-for="(char, index) in words" :key="index" :class="char">{{ char.value }}</span></pre>
            </tab>
            <tab title="line">
                <pre><span v-for="(char, index) in lines" :key="index" :class="char">{{ char.value }}</span></pre>
            </tab>
            <tab title="sentences">
                <pre><span v-for="(char, index) in sentences" :key="index" :class="char">{{ char.value }}</span></pre>
            </tab>
        </tabs>
    </lightbox>
</template>

<script>
import Lightbox from '../../../components/lightbox.vue';
const Diff = require('diff');

export default {
    name: 'diff',
    components: { Lightbox },
    data() {
        return {
            Diff,
        };
    },
    props: {
        before: {
            type: String,
            required: true,
        },
        current: {
            type: String,
            required: true,
        },
    },
    computed: {
        chars() {
            return Diff.diffChars(this.before, this.current);
        },
        words() {
            return Diff.diffWordsWithSpace(this.before, this.current);
        },
        lines() {
            return Diff.diffLines(this.before, this.current);
        },
        sentences() {
            return Diff.diffSentences(this.before, this.current);
        },
    },
};
</script>

<style scoped lang="sass">
.removed
    background-color: red
.added
    background-color: green
</style>
