<template>
    <div>
        <button class="btn btn-danger" @click="importFromRenameFz()">
            {{ $m('action.importFromRenameFz') }}
        </button>
    </div>
</template>

<script setup lang="ts">
import type Vue from 'vue';

import { defineEmits } from 'vue/types/v3-setup-helpers';
import { useSettingsStore } from '@stores/settings';

import { useI18nModule } from '../../../i18n';

import type { AppendableList } from 'typings/Setting';
import type {
    DefaultComputed,
    DefaultData,
    DefaultMethods,
    DefaultProps,
} from 'vue/types/options';

export interface ImportSettingComponentInterface {
    Data: DefaultData<Vue>;
    Methods: DefaultMethods<Vue>;
    Computed: DefaultComputed;
    Props: DefaultProps & {
        module: {
            vehicleAliases: AppendableList;
        };
        disabled: boolean;
    };
}

const { $m } = useI18nModule('nameSchema');

const props = defineProps<{
    module: {
        vehicleAliases: AppendableList;
    };
    disabled: boolean;
}>();

const emit = defineEmits<{
    (e: 'update'): void;
}>();

const importFromRenameFz = async () => {
    const v3Settings = JSON.parse(
        window.localStorage.getItem('lssm_LSS_RENAMEFZ_STORAGE') ?? '{}'
    );

    const importVehicleTypes = async (
        map: { type: string; alias: string }[]
    ) => {
        const newSetting: typeof props.module.vehicleAliases.value = {
            enabled: true,
            value: [],
        };

        for (const { type, alias } of map) {
            newSetting.value.push({
                type,
                alias,
            });
        }

        await useSettingsStore().setSetting({
            moduleId: 'nameSchema',
            settingId: 'vehicleAliases',
            value: newSetting,
        });
    };

    const vehicleAliases = Object.entries(v3Settings)
        .filter(([key]) => key.startsWith('renameFz_vehicleTypes-'))
        .map(([typeId, value]) => {
            return {
                type: typeId.replace(/\D/gu, ''),
                alias: String(value),
            };
        });
    await importVehicleTypes(vehicleAliases);
    emit('update');

    alert(
        $m('notification.importFromRenameFzSuccess', {
            count: vehicleAliases.length,
        })
    );
};
</script>
