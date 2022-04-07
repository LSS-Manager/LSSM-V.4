<template>
    <form>
        <input type="text" v-model="format" />
        <br />
        <input type="datetime-local" v-model="date" />
        <code
            class="momentjs-preview"
            :data-moment="format"
            :data-date="new Date(date).toISOString()"
        ></code>
        <br />
        <code class="momentjs-preview" :data-moment="format"></code>
    </form>
</template>

<script>
import { defineComponent } from 'vue';

import moment from 'moment/min/moment-with-locales.min';

export default defineComponent({
    name: 'momentjs-preview',
    data() {
        return {
            moment,
            format: 'LLLL:ss',
            date: '1970-01-01T00:00',
        };
    },
    mounted() {
        this.moment.locale(this.$lang.replace(/_.*$/u, '').toUpperCase());
        this.$el
            .querySelectorAll('.momentjs-preview[data-moment]:not([data-date])')
            .forEach(preview =>
                window.setInterval(
                    () =>
                        (preview.textContent = this.moment().format(
                            preview.dataset.moment
                        )),
                    1000
                )
            );
        this.$el
            .querySelectorAll('.momentjs-preview[data-moment][data-date]')
            .forEach(preview =>
                window.setInterval(
                    () =>
                        (preview.textContent = this.moment(
                            preview.dataset.date
                        ).format(preview.dataset.moment)),
                    1000
                )
            );
    },
});
</script>

<style scoped>
tr td {
    text-align: center;
}
</style>
