<template>
    <div :id="id">
        <v-dialog></v-dialog>
        <notifications
            v-for="group in notificationStore.groups"
            :key="group"
            :group="group.replace(' ', '_')"
            :position="group"
            :class="group.replace('_', ' ')"
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
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';

import { useNotificationStore } from '@stores/notifications';
import { useRootStore } from '@stores/index';
import { useSettingsStore } from '@stores/settings';

const rootStore = useRootStore();
const notificationStore = useNotificationStore();

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
