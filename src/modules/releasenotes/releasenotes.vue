<template>
    <lightbox name="releasenotes">
        <h1>LSSM V.4: {{ $t('modules.releasenotes.name') }}</h1>
        <div v-for="note in notes" :key="note.version" class="note">
            <h4>
                <b>{{ note.version }}</b
                >:
                {{ note.title }}
            </h4>
            <div v-html="note.description"></div>
        </div>
    </lightbox>
</template>

<script>
import Lightbox from '../../components/lightbox.vue';
export default {
    name: 'releasenotes',
    components: { Lightbox },
    props: {
        notes: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped lang="sass">
.note
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
    transition: 0.3s
    border-radius: 5px
    padding: 1rem
    &:hover
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)
</style>
