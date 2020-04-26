<template>
    <div class="notification-setting">
        <b>{{ $t('modules.notificationAlert.settings.eventTypes') }}</b>
        <b>{{ $t('modules.notificationAlert.settings.alertStyle') }}</b>
        <b>{{ $t('modules.notificationAlert.settings.duration') }}</b>
        <b>{{ $t('modules.notificationAlert.settings.ingame') }}</b>
        <b>{{ $t('modules.notificationAlert.settings.desktop') }}</b>
    </div>
</template>

<script>
export default {
    name: 'settings-titles',
};
</script>

<style scoped lang="sass">
.notification-setting
    display: flex
    justify-content: space-between

    > *
        margin-bottom: 0
        margin-left: 0.5rem
        margin-right: 0.5rem
        width: 100%
</style>
