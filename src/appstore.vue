<template>
    <lightbox name="appstore">
        <h1>
            AppStore
            <button class="btn btn-success" :disabled="!changes" @click="save">
                {{ $t('modules.appstore.save') }}
            </button>
            <button class="btn btn-danger" :disabled="!changes" @click="reset">
                {{ $t('modules.appstore.reset') }}
            </button>
        </h1>
        <ul class="auto-sized-grid">
            <li
                v-for="moduleId in modulesSorted"
                :key="moduleId"
                class="card"
                :class="{
                    dev: modules[moduleId].dev,
                    mapkit:
                        modules[moduleId].noMapkit &&
                        'undefined' !== typeof mapkit,
                }"
            >
                <toggle-button
                    @change="toggleModule(moduleId, $event)"
                    class="pull-right appstore-toggle"
                    :value="active.indexOf(moduleId) >= 0"
                    :id="
                        $store.getters['nodeId'](`appstore-toggle-${moduleId}`)
                    "
                    :module="moduleId"
                    labels
                ></toggle-button>
                <a
                    :href="$store.getters['wikiModul'](moduleId)"
                    class="pull-right lightbox-open"
                    style="margin-right: 1rem;"
                >
                    <span class="glyphicon glyphicon-info-sign"></span>
                </a>
                <h4>
                    <b>{{ $t(`modules.${moduleId}.name`) }}</b>
                </h4>
                <small
                    v-if="
                        modules[moduleId].noMapkit &&
                            'undefined' !== typeof mapkit
                    "
                >
                    {{ $t('modules.appstore.noMapkit') }}
                </small>
                <br />
                {{ $t(`modules.${moduleId}.description`) }}
            </li>
        </ul>
    </lightbox>
</template>

<script>
import Lightbox from './components/lightbox.vue';

export default {
    name: 'appstore',
    components: { Lightbox },
    data() {
        let modules = this.$store.getters.appModules;
        return {
            modules,
            modulesSorted: this.$store.getters.modulesSorted({
                modules,
            }),
            activeStart: Object.keys(this.$store.state.modules).filter(
                x => this.$store.state.modules[x].active
            ),
            active: Object.keys(this.$store.state.modules).filter(
                x => this.$store.state.modules[x].active
            ),
            mapkit: window.mapkit,
        };
    },
    computed: {
        changes() {
            return !(
                this.active.length === this.activeStart.length &&
                this.active.every(
                    (value, index) => value === this.activeStart[index]
                )
            );
        },
    },
    methods: {
        toggleModule(moduleId, event) {
            if (event.value) {
                this.active.push(moduleId);
            } else {
                this.active.splice(this.active.indexOf(moduleId), 1);
            }
            this.$store.commit('appStoreState', this.changes);
        },
        save() {
            this.$store
                .dispatch('storage/set', {
                    key: 'active',
                    val: this.active,
                })
                .then(() => {
                    this.activeStart = [...this.active];
                    this.$store.commit('appStoreState', this.changes);
                    this.$store.commit('appStoreReload', true);
                })
                .catch(err => console.error(err));
        },
        reset() {
            this.active = [...this.activeStart];
            this.$store.commit('appStoreState', this.changes);
            document.querySelectorAll('.appstore-toggle').forEach(el => {
                let input = el.querySelector('input[type="checkbox"]');
                if (
                    input.checked !==
                    this.active.indexOf(el.getAttribute('module')) >= 0
                )
                    input.click();
            });
        },
    },
};
</script>

<style scoped lang="sass">
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
            cursor: not-allowed
            pointer-events: none
            opacity: 0.5

        &:hover
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)
</style>
