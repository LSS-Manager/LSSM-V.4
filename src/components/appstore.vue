<template>
    <lightbox name="appstore" no-title-hide>
        <h1>
            AppStore
            <button class="btn btn-success" :disabled="!changes" @click="save">
                {{ $t('modules.appstore.save') }}
            </button>
            <button class="btn btn-danger" :disabled="!changes" @click="reset">
                {{ $t('modules.appstore.reset') }}
            </button>
        </h1>
        <label class="search_label">
            <input
                type="search"
                class="search_input_field"
                v-model="moduleSearch"
                :placeholder="$t('search')"
            />
        </label>
        <ul class="auto-sized-grid">
            <li
                v-for="moduleId in modulesFiltered"
                :key="moduleId"
                class="card"
                :class="{
                    dev: modules[moduleId].dev,
                    mapkit: hasMapkitConflict(moduleId),
                }"
            >
                <toggle-button
                    @change="toggleModule(moduleId, $event)"
                    class="pull-right appstore-toggle"
                    :active="active.indexOf(moduleId) >= 0"
                    :mapkit="hasMapkitConflict(moduleId)"
                    :value="
                        hasMapkitConflict(moduleId)
                            ? false
                            : active.indexOf(moduleId) >= 0
                    "
                    :id="
                        $store.getters['nodeId'](`appstore-toggle-${moduleId}`)
                    "
                    :module="moduleId"
                    :disabled="hasMapkitConflict(moduleId)"
                    labels
                ></toggle-button>
                <a
                    :href="$store.getters['wikiModul'](moduleId)"
                    class="pull-right lightbox-open wiki-btn"
                >
                    <span class="glyphicon glyphicon-info-sign"></span>
                </a>
                <small v-if="hasMapkitConflict(moduleId)" class="mapkit-notice">
                    {{ $t('modules.appstore.noMapkit') }}
                </small>
                <small v-if="modules[moduleId].dev" class="dev-notice">
                    {{ $t('modules.appstore.dev') }}
                </small>
                <div class="appstore-content">
                    <h4>
                        <b>{{ $t(`modules.${moduleId}.name`) }}</b>
                    </h4>
                    <br />
                    <span
                        v-if="
                            modules[moduleId].description !==
                                `modules.${moduleId}.description`
                        "
                    >
                        {{ modules[moduleId].description }}
                    </span>
                </div>
            </li>
        </ul>
    </lightbox>
</template>

<script lang="ts">
import Vue from 'vue';
import Lightbox from './lightbox.vue';
import { AppstoreData } from '../../typings/components/Appstore';
import { Modules } from '../../typings/Module';
import { LSSM } from '../core';
import VueI18n from 'vue-i18n';

const $m = (
    key: string,
    args?: { [key: string]: unknown }
): VueI18n.TranslateResult => LSSM.$t(`modules.telemetry.${key}`, args);

export default Vue.extend({
    name: 'appstore',
    components: { Lightbox },
    data() {
        let modules = this.$store.getters.appModules;
        Object.keys(modules).forEach(
            moduleId =>
                (modules[moduleId] = {
                    ...modules[moduleId],
                    description: this.$t(`modules.${moduleId}.description`),
                })
        );
        return {
            modules,
            modulesSorted: Object.keys(modules).sort((a, b) => {
                a = LSSM.$t(`modules.${a}.name`).toString();
                b = LSSM.$t(`modules.${b}.name`).toString();
                return a < b ? -1 : a > b ? 1 : 0;
            }),
            activeStart: Object.keys(this.$store.state.modules).filter(
                x => this.$store.state.modules[x].active
            ),
            active: Object.keys(this.$store.state.modules).filter(
                x => this.$store.state.modules[x].active
            ),
            moduleSearch: '',
            $m,
        } as AppstoreData;
    },
    computed: {
        changes() {
            return !(
                this.active.length === this.activeStart.length &&
                this.active.every(
                    (value: string, index: number) =>
                        value === this.activeStart[index]
                )
            );
        },
        modulesFiltered() {
            return this.modulesSorted.filter((m: string) =>
                this.moduleSearch.length > 0
                    ? JSON.stringify([
                          m,
                          this.$t(`modules.${m}.name`),
                          this.$t(`modules.${m}.description`),
                      ])
                          .toLowerCase()
                          .match(this.moduleSearch.toLowerCase())
                    : true
            );
        },
    },
    methods: {
        toggleModule(moduleId: keyof Modules, event: { value: any }) {
            if (event.value) {
                this.active.push(moduleId);
            } else {
                this.active.splice(this.active.indexOf(moduleId), 1);
            }
            this.$store.commit('appStoreState', this.changes);
        },
        hasMapkitConflict(moduleId: keyof Modules) {
            return this.modules[moduleId].noMapkit && this.$store.state.mapkit;
        },
        save() {
            this.$store
                .dispatch('storage/set', {
                    key: 'active',
                    val: [...new Set(this.active)],
                })
                .then(() => {
                    this.activeStart = [...new Set(this.active)];
                    this.$store.commit('appStoreState', this.changes);
                    this.$store.commit('appStoreReload', true);
                })
                .catch(err => console.error(err));
        },
        reset() {
            // TODO: Beautiful reset
            // this.active = [...new Set(this.activeStart)];
            // this.$store.commit('appStoreState', this.changes);
            // document.querySelectorAll('.appstore-toggle').forEach(el => {
            //     let input = el.querySelector('input[type="checkbox"]');
            //     if (
            //         input.checked !==
            //         this.active.indexOf(el.getAttribute('module')) >= 0
            //     )
            //         input.click();
            // });
            // this.save();
        },
    },
});
</script>

<style scoped lang="sass">
.search_label
    position: absolute
    right: 1em
    top: calc(1em + 32px)

.auto-sized-grid
    display: grid
    grid-gap: 16px
    grid-template-columns: repeat(auto-fit, minmax(150px, 500px))
    list-style: none
    padding-left: 0
    margin-top: 10px
    margin-bottom: 10px

    .card
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2)
        transition: 0.3s
        border-radius: 5px
        padding: 1rem

        &.dev,
        &.mapkit

            .appstore-content
                cursor: not-allowed
                pointer-events: none
                opacity: 0.5
                font-size: unset
                display: inline-block
                transition: 0.3s

            .mapkit-notice,
            .dev-notice
                display: inline-block
                transition: 0.3s
                font-size: 0

            .mapkit-notice
                color: red

            .dev-notice
                color: yellowgreen

        &:hover
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)

            &.dev,
            &.mapkit

                .mapkit-notice,
                .dev-notice
                    font-size: small

                &:hover

                    .appstore-content
                        font-size: 0

        .wiki-btn
            margin-right: 1rem
</style>
