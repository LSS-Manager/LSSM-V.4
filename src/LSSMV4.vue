<template>
    <div :id="id">
        <modals-container></modals-container>
        <v-dialog></v-dialog>
    </div>
</template>

<script>
export default {
    name: 'LSSMV4',
    components: {},
    data() {
        return {
            id: this.$store.getters.nodeId('app'),
        };
    },
    beforeMount() {
        let fa = document.createElement('script');
        fa.src = 'https://use.fontawesome.com/releases/v5.11.2/js/all.js';
        document.head.appendChild(fa);
    },
};
</script>

<style lang="sass">
body.dark
    .v--modal-box
        background-color: #505050
        color: #fff

.v--modal-overlay
    z-index: 5001 !important

    .v--modal-background-click
        background-color: rgba(0, 0, 0, 0.7)

        .v--modal-box
            padding: 1rem
            overflow: auto !important

.lssm_notice_bg
    background-color: #77dc81
</style>
