<template>
    <div>
        <span
            class="glyphicon"
            :class="[`glyphicon-eye-${isHidden ? 'open' : 'close'}`]"
            @click="isHidden = !isHidden"
        ></span>
    </div>
</template>

<script>
export default {
    name: 'renameFz',
};
</script>

<style scoped></style>
