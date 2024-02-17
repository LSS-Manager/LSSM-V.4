<template>
    <div :id="id">
        <v-dialog></v-dialog>
        <notifications
            v-for="group in notificationStore.groups"
            :key="group"
            :group="group"
            :position="group"
            :class="group"
        >
            <template slot="body" slot-scope="props">
                <div
                    class="lssm-notification"
                    :class="`alert-${props.item.type} notification-${props.item.type}`"
                    @click.capture="clickHandler(props, $event)"
                >
                    <img
                        v-if="props.item.data.icon"
                        :src="props.item.data.icon"
                        :alt="props.item.title"
                    />
                    <div v-else></div>
                    <div>
                        <button
                            class="close"
                            data-dismiss="alert"
                            type="button"
                            @click.prevent.stop="props.close()"
                        >
                            ×
                        </button>
                        <div
                            class="notification-title"
                            v-html="props.item.title"
                        ></div>
                        <div
                            class="notification-content"
                            v-html="props.item.text"
                        ></div>
                    </div>
                </div>
            </template>
        </notifications>
        <!-- TODO: Remove this when rewrite of API-Store is finished -->
        <!-- This is some debugging stuff for while rewriting the API-Store -->
        <!--<b>Array</b>
        <pre>{{ JSON.stringify(newApiStore.vehiclesArray) }}</pre>
        <b>Object</b>
        <pre>{{ JSON.stringify(newApiStore.vehicles) }}</pre>
        <b>vehicleStates</b>
        <pre>{{ JSON.stringify(newApiStore.vehicleStates) }}</pre>
        <b>vehiclesByBuilding</b>
        <pre>{{ JSON.stringify(newApiStore.vehiclesByBuilding) }}</pre>
        <b>vehiclesByTarget</b>
        <pre>{{ JSON.stringify(newApiStore.vehiclesByTarget) }}</pre>
        <b>vehiclesByType</b>
        <pre>{{ JSON.stringify(newApiStore.vehiclesByType) }}</pre>
        <b>vehiclesByDispatchCenter</b>
        <pre>{{ JSON.stringify(newApiStore.vehiclesByDispatchCenter) }}</pre>
        <hr />
        <b>Array</b>
        <pre>{{ JSON.stringify(newApiStore.buildingsArray) }}</pre>
        <b>Object</b>
        <pre>{{ JSON.stringify(newApiStore.buildings) }}</pre>
        <b>buildingsByType</b>
        <pre>{{ JSON.stringify(newApiStore.buildingsByType) }}</pre>
        <b>buildingsByDispatchCenter</b>
        <pre>{{ JSON.stringify(newApiStore.buildingsByDispatchCenter) }}</pre>
        <b>buildingsByCategory</b>
        <pre>{{ JSON.stringify(newApiStore.buildingsByCategory) }}</pre>-->
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';

// import { useNewAPIStore } from '@stores/newApi';
import { useNotificationStore } from '@stores/notifications';
import { useRootStore } from '@stores/index';
import { useSettingsStore } from '@stores/settings';

const rootStore = useRootStore();
const notificationStore = useNotificationStore();
// const newApiStore = useNewAPIStore();

const id = rootStore.nodeAttribute('app', true);
const clickHandler = (props, $event) =>
    (($event.target as HTMLElement).closest('button.close')
        ? undefined
        : props.item.data.clickHandler?.(props, $event)) ?? props.close();

onMounted(() => {
    useSettingsStore()
        .getModule('global')
        .then(({ iconBg, iconBgAsNavBg }) => {
            if (iconBgAsNavBg) {
                useRootStore().addStyle({
                    selectorText:
                        '.navbar-default, .navbar-default .dropdown-menu',
                    style: {
                        'background-color': `${iconBg} !important`,
                    },
                });
            }
        });

    // Workaround for when modals container appears behind V4 instance (dialogs are behind modals)
    const modalsContainer =
        document.querySelector<HTMLDivElement>('#modals-container');
    if (
        modalsContainer &&
        getCurrentInstance()?.proxy.$el.compareDocumentPosition(
            modalsContainer
        ) & Node.DOCUMENT_POSITION_FOLLOWING
    )
        getCurrentInstance()?.proxy.$el.before(modalsContainer);
});
</script>
