<template>
    <div>
        <span
            class="glyphicon"
            :class="[`glyphicon-eye-${isHidden ? 'open' : 'close'}`]"
            @click="isHidden = !isHidden"
        ></span>
        <div v-show="!isHidden">
            <p>
                <strong>{{ $t('modules.renameFz.name') }}</strong>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'renameFz',
    data() {
        return {
            isHidden: true,
            templates: {
                test1: [],
            },
        };
    },
};
</script>

<style scoped></style>
