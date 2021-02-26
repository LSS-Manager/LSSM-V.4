<template>
    <lightbox
        name="redesign-lightbox"
        :full-height="!type"
        :no-title-hide="!type"
    >
        <div v-show="type" class="redesign-wrapper">
            <Vehicle
                v-if="type === 'vehicle'"
                :vehicle="data"
                :lightbox="this"
                :$m="$m"
                :$mc="$mc"
            ></Vehicle>
        </div>
        <iframe
            v-show="!type"
            ref="iframe"
            :src="url"
            :id="$store.getters.nodeAttribute('redesign-lightbox-iframe')"
            :name="$store.getters.nodeAttribute('redesign-lightbox-iframe')"
        ></iframe>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import { VehicleWindow } from '../parsers/vehicle';
import { DefaultComputed, DefaultMethods } from 'vue/types/options';
import VueI18n from 'vue-i18n';

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
    {
        url: string;
        $m(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        $mc(
            key: string,
            amount: number,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
    }
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
        $m: {
            type: Function,
            required: true,
        },
        $mc: {
            type: Function,
            required: true,
        },
    },
    computed: {
        src: {
            get() {
                return this.src ?? this.url;
            },
            set(url) {
                const link = new URL(url, window.location.href);
                const type = Object.entries(routeChecks).find(([regex]) =>
                    link.pathname.match(regex)
                )?.[1];
                if (!type) {
                    const iframe = this.$refs
                        .iframe as HTMLIFrameElement | null;
                    if (
                        iframe &&
                        new URL(
                            iframe.contentWindow?.location.href ?? '',
                            window.location.href
                        ).toString() !== link.toString()
                    )
                        iframe.src = url;
                    this.type = '';
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
        window['lssmv4-redesign-lightbox'] = this;
    },
});
</script>

<style lang="sass" scoped>
.redesign-wrapper
    margin: 1rem

iframe
    width: 100%
    height: 100%
    display: block
</style>
