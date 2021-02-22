<template>
    <lightbox name="redesign-lightbox">
        <div v-if="type === 'vehicle'">
            <Vehicle :vehicle="data"></Vehicle>
        </div>
        <iframe v-else :src="url"></iframe>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import { VehicleWindow } from '../parsers/vehicle';
import { DefaultComputed } from 'vue/types/options';

type types = 'vehicle';

const routeChecks = {
    '^/vehicles/\\d+/?$': 'vehicle',
} as Record<string, types>;

const getIdFromEl = (el: HTMLAnchorElement | null): number =>
    parseInt(
        new URL(el?.href ?? '', window.location.href).pathname?.match(
            /\d+\/?$/
        )?.[0] ?? '-1'
    );

export default Vue.extend<
    {
        type: 'vehicle';
        data: VehicleWindow;
        html: string;
    },
    {
        parse(url: string): void;
    },
    DefaultComputed,
    { url: string }
>({
    name: 'redesign-lightbox',
    components: {
        Lightbox: () =>
            import(
                /* webpackChunkName: "components/lightbox" */ '../../../components/lightbox.vue'
            ),
        Vehicle: () =>
            import(
                /*webpackChunkName: "modules/redesign/windows/vehicle"*/ './vehicle.vue'
            ),
    },
    data() {
        return {
            type: '',
            data: {},
            html: '',
        };
    },
    props: {
        url: {
            type: String,
            required: true,
        },
    },
    methods: {
        parse(url) {
            const type = Object.entries(routeChecks).find(([regex]) =>
                new URL(url, window.location.href).pathname.match(regex)
            )?.[1];
            if (!type) return (this.type = '');

            this.$store
                .dispatch('api/request', {
                    url,
                    feature: `redesign-${type}`,
                })
                .then((res: Response) => res.text())
                .then(html =>
                    import(
                        /*webpackChunkName: "modules/redesign/parsers/[request]"*/ `../parsers/${type}`
                    ).then(parser => {
                        this.type = type;
                        this.data = parser.default(html, url, getIdFromEl);
                    })
                );
        },
    },
    mounted() {
        this.parse(this.url);
    },
});
</script>
