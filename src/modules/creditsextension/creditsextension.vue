<template>
    <li
        class="dropdown"
        :class="{
            'highlight': highlighted,
            'highlight-consistent': highlightedConsistend,
        }"
        :id="id"
        :title="
            `${$t('credits')}: ${creditsLocalized}\n${$t(
                'coins'
            )}: ${coinsLocalized}`
        "
        @click="() => (highlightedConsistend = false)"
    >
        <a
            href="#"
            class="dropdown-toggle"
            :class="{ 'piggy-bank-mode': !creditsInNav }"
            :id="menuId"
            role="button"
            data-toggle="dropdown"
        >
            <template v-if="creditsInNav">
                <img
                    :src="creditsIcon"
                    :alt="$t('credits')"
                    class="navbar-icon"
                />
                {{ creditsLocalized }}
            </template>
            <span class="fa-2x" v-else>
                <font-awesome-icon
                    :icon="faDollarSign"
                    transform="shrink-10"
                    :mask="faPiggyBank"
                ></font-awesome-icon>
            </span>
            <b class="caret"></b>
        </a>
        <ul class="dropdown-menu" role="menu" :aria-labelledby="menuId">
            <li role="presentation" class="flex-li">
                <a href="/credits" class="lightbox-open">
                    <img
                        :src="creditsIcon"
                        :alt="$t('credits')"
                        class="navbar-icon"
                    />
                    {{ $t('credits') }}: {{ creditsLocalized }}
                </a>
                <button
                    href="/credits/daily"
                    class="lightbox-open btn btn-xs btn-default pull-right"
                    :title="$m('credits.daily')"
                >
                    <font-awesome-icon :icon="faTable"></font-awesome-icon>
                </button>
                <button
                    href="/credits/overview"
                    class="lightbox-open btn btn-xs btn-default pull-right"
                    :title="$m('credits.overview')"
                >
                    <font-awesome-icon :icon="faChartBar"></font-awesome-icon>
                </button>
            </li>
            <li class="flex-li">
                <a href="/coins" class="lightbox-open">
                    <img
                        :src="coinsIcon"
                        :alt="$t('coins')"
                        class="navbar-icon"
                    />
                    {{ $t('coins') }}: {{ coinsLocalized }}
                </a>
                <button
                    href="/coins/list"
                    class="lightbox-open btn btn-xs btn-default pull-right"
                    :title="$m('coins.list')"
                >
                    <font-awesome-icon :icon="faListUl"></font-awesome-icon>
                </button>
            </li>
            <li class="divider"></li>
            <li class="no-link">
                {{ $m('totalEarnedCredits') }}:
                <ul class="no-style-list">
                    <li>{{ totalCredits.toLocaleString() }}</li>
                </ul>
            </li>
            <li v-if="nextRank">
                <a href="/level" class="lightbox-open">
                    {{ $m('nextRank') }}:
                    <ul class="no-style-list">
                        <li>{{ nextRank }}</li>
                        <li>
                            {{ nextRankMissing.toLocaleString() }}
                            {{ $t('credits') }}
                            {{ $m('nextRankMissing') }}
                        </li>
                    </ul>
                </a>
            </li>
            <li v-if="showToplistPosition" role="presentation">
                <a :href="toplistSite" class="lightbox-open">
                    {{ $m('toplistPositionName') }}:
                    {{ toplistPosition.toLocaleString() }}
                </a>
            </li>
            <template v-if="$store.state.api.credits.credits_alliance_active">
                <li class="divider"></li>
                <li>
                    <a href="/verband/kasse" class="lightbox-open">
                        {{ $m('allianceFunds.title') }}
                        <ul class="no-style-list">
                            <li>
                                {{
                                    $store.state.api.credits.credits_alliance_current.toLocaleString()
                                }}
                                {{ $t('credits') }}
                                {{ $m('allianceFunds.currently') }}
                            </li>
                            <li>
                                {{
                                    $store.state.api.credits.credits_alliance_total.toLocaleString()
                                }}
                                {{ $t('credits') }}
                                {{ $m('allianceFunds.total') }}
                            </li>
                            <li class="divider"></li>
                            <li class="no-link">
                                <em>{{ $m('allianceFunds.updateNote') }}</em>
                            </li>
                        </ul>
                    </a>
                </li>
            </template>
        </ul>
    </li>
</template>

<script lang="ts">
import Vue from 'vue';

import { faChartBar } from '@fortawesome/free-solid-svg-icons/faChartBar';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons/faDollarSign';
import { faListUl } from '@fortawesome/free-solid-svg-icons/faListUl';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons/faPiggyBank';
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import VueI18n from 'vue-i18n';

export default Vue.extend<
    {
        id: string;
        menuId: string;
        faChartBar: IconDefinition;
        faDollarSign: IconDefinition;
        faListUl: IconDefinition;
        faPiggyBank: IconDefinition;
        faTable: IconDefinition;
        creditsIcon: string;
        coinsIcon: string;
        highlighted: boolean;
        highlightedConsistend: boolean;
        ranks: Record<string, string>;
        creditsInNav: boolean;
        showToplistPosition: boolean;
    },
    {
        $m(
            key: string,
            args?: {
                [key: string]: unknown;
            }
        ): VueI18n.TranslateResult;
        highlight(): void;
        getSetting<Type = boolean>(settingId: string): Promise<Type>;
    },
    {
        credits: number;
        creditsLocalized: string;
        coins: number;
        coinsLocalized: string;
        totalCredits: number;
        nextRankCredits: number;
        nextRank: string;
        nextRankMissing: number;
        toplistPosition: number;
        toplistSite: string;
    },
    { MODULE_ID: string }
>({
    name: 'lssmv4-creditsextension-menu',
    components: {},
    data() {
        return {
            id: this.$store.getters.nodeAttribute(this.MODULE_ID),
            menuId: this.$store.getters.nodeAttribute(`${this.MODULE_ID}-menu`),
            faChartBar,
            faDollarSign,
            faListUl,
            faPiggyBank,
            faTable,
            creditsIcon: '',
            coinsIcon: '',
            highlighted: false,
            highlightedConsistend: false,
            ranks: (this.$t(
                `ranks.${
                    this.$store.state.policechief
                        ? 'policechief'
                        : 'missionchief'
                }`
            ) as unknown) as Record<string, string>,
            creditsInNav: false,
            showToplistPosition: false,
        };
    },
    props: {
        MODULE_ID: {
            type: String,
            required: true,
        },
    },
    computed: {
        credits() {
            return this.$store.state.credits;
        },
        creditsLocalized() {
            return this.credits.toLocaleString();
        },
        coins() {
            return this.$store.state.coins;
        },
        coinsLocalized() {
            return this.coins.toLocaleString();
        },
        totalCredits() {
            return this.$store.state.api.credits.credits_user_total;
        },
        nextRankCredits() {
            return (
                Object.keys(this.ranks)
                    .map(credits => parseInt(credits))
                    .find(credits => credits > this.totalCredits) ?? -1
            );
        },
        nextRank() {
            return this.ranks[this.nextRankCredits] ?? '';
        },
        nextRankMissing() {
            return this.nextRankCredits - this.totalCredits;
        },
        toplistPosition() {
            return this.$store.state.api.credits.user_toplist_position;
        },
        toplistSite() {
            return `/toplist?page=${Math.ceil(this.toplistPosition / 20)}`;
        },
    },
    watch: {
        credits() {
            this.highlight();
        },
        coins() {
            this.highlight();
        },
    },
    methods: {
        $m(key, args) {
            return this.$t(`modules.${this.MODULE_ID}.${key}`, args);
        },
        highlight() {
            this.highlighted = false;
            window.setTimeout(() => (this.highlighted = true), 10);
        },
        async getSetting(settingId: string) {
            return this.$store.dispatch('settings/getSetting', {
                moduleId: this.MODULE_ID,
                settingId,
            });
        },
    },
    beforeMount() {
        const creditsIcon = document.querySelector<HTMLImageElement>(
            '#navigation_top > img.navbar-icon'
        )?.src;
        if (creditsIcon) this.creditsIcon = creditsIcon;
        const coinsIcon = document.querySelector<HTMLImageElement>(
            '#coins_top > img.navbar-icon'
        )?.src;
        if (coinsIcon) this.coinsIcon = coinsIcon;

        this.$store
            .dispatch('api/fetchCreditsInfo', this.MODULE_ID)
            .then(() =>
                window.setInterval(
                    () =>
                        this.$store.dispatch(
                            'api/fetchCreditsInfo',
                            this.MODULE_ID
                        ),
                    5 * 60 * 1000
                )
            );

        this.getSetting('creditsInNavbar').then(value =>
            this.$set(this, 'creditsInNav', value)
        );
        this.getSetting('showToplistPosition').then(value =>
            this.$set(this, 'showToplistPosition', value)
        );

        this.getSetting<{ enabled: boolean; value: { credits: number }[] }>(
            'alerts'
        ).then(({ value: alerts }) =>
            window.addEventListener(`${PREFIX}_credits_update`, ev => {
                const { new: newValue, old: oldValue } = (<
                    CustomEvent<{ new: number; old: number; diff: number }>
                >ev).detail;
                if (newValue < oldValue) return;
                alerts.forEach(({ credits }) => {
                    if (oldValue < credits && newValue >= credits)
                        this.highlightedConsistend = true;
                });
            })
        );
    },
});
</script>

<style scoped lang="sass">
@use "sass:math"

.highlight-consistent
    background: #62c462

li.dropdown
    > a.dropdown-toggle.piggy-bank-mode
        padding-top: math.div(50.5px - 29, 2)
        padding-bottom: math.div(50.5px - 29, 2)

    > ul.dropdown-menu
        > li.flex-li
            display: flex
            align-items: center
            justify-content: space-between
            padding-right: 10px

            > a
                height: 19px + 3px + 3px
                width: 100%

        > li.no-link
            padding: 3px 20px

.no-style-list
    list-style: none
    padding-left: 20px

    li
        padding-left: 1em
        text-indent: -1em
</style>
