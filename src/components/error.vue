<template>
    <lightbox name="error" :no-x-btn="true">
        <h4>
            <b>{{ $t('error.title') }}</b>
        </h4>
        <span>{{ $t('error.msg') }}</span>
        <br />
        <pre>{{ err }}</pre>
    </lightbox>
</template>

<script>
import Lightbox from './lightbox.vue';

export default {
    name: 'error',
    components: { Lightbox },
    props: {
        err: {
            required: true,
        },
    },
};
</script>

<style scoped></style>
