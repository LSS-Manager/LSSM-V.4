<template>
    <lightbox
        name="redesign-lightbox"
        full-height
        :no-title-hide="!type"
        :extra-classes="{ 'is-iframe': !type }"
    >
        <div v-if="type === 'vehicle'">
            <Vehicle :vehicle="data" :lightbox="this"></Vehicle>
        </div>
        <div v-show="!type" class="iframe-wrapper">
            <iframe
                ref="iframe"
                :src="url"
                :id="$store.getters.nodeAttribute('redesign-lightbox-iframe')"
            ></iframe>
        </div>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import { VehicleWindow } from '../parsers/vehicle';
import { DefaultComputed, DefaultMethods } from 'vue/types/options';

type types = 'vehicle';

const routeChecks = {
    '^/vehicles/\\d+/?$': 'vehicle',
} as Record<string, types>;

interface Data<T, D> {
    type: T;
    data: D;
    html: string;
}

const getIdFromEl = (el: HTMLAnchorElement | null): number =>
    parseInt(
        new URL(el?.href ?? '', window.location.href).pathname?.match(
            /\d+\/?$/
        )?.[0] ?? '-1'
    );

export default Vue.extend<
    Data<'', null> | Data<'vehicle', VehicleWindow>,
    DefaultMethods<Vue>,
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
            data: null,
            html: '',
        };
    },
    props: {
        url: {
            type: String,
            required: true,
        },
    },
    computed: {
        src: {
            get() {
                return this.src ?? this.url;
            },
            set(url) {
                const type = Object.entries(routeChecks).find(([regex]) =>
                    new URL(url, window.location.href).pathname.match(regex)
                )?.[1];
                if (!type) {
                    this.type = '';
                    if (this.$refs.iframe)
                        (this.$refs.iframe as HTMLIFrameElement).src = url;
                    return;
                }

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
                            this.data = parser.default(html, url, getIdFromEl);
                            this.type = type;
                        })
                    );
            },
        },
    },
    mounted() {
        this.src = this.url;
    },
});
</script>

<style lang="sass" scoped>
.iframe-wrapper
    &, iframe
        width: 100%
        height: 100%
</style>
