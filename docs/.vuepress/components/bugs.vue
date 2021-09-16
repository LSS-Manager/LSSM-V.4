<template>
    <div id="bugs">
        <b v-if="!bugs.length"> {{ noBugs }} 🎉 </b>
        <div class="bug-field" v-for="bug in bugs" :key="bug.id">
            <div
                class="bug"
                :data-content-state="
                    showContent.includes(bug.id) ? 'open' : 'closed'
                "
            >
                <div class="bug-header">
                    <button class="bug-header-icon">
                        <span
                            class="icon"
                            v-html="octicons['issue-opened'].toSVG()"
                        ></span>
                    </button>
                    <p class="bug-header-title">
                        <a :href="bug.html_url" target="_blank">{{
                            bug.title
                        }}</a>
                    </p>
                    <button
                        class="bug-header-icon"
                        @click="
                            () =>
                                showContent.includes(bug.id)
                                    ? showContent.splice(
                                          showContent.findIndex(
                                              id => id === bug.id
                                          ),
                                          1
                                      )
                                    : showContent.push(bug.id)
                        "
                    >
                        <span
                            class="icon"
                            v-html="octicons['chevron-down'].toSVG()"
                        ></span>
                    </button>
                </div>
                <small class="bug-description">
                    #{{ bug.number }} opened
                    <span :title="new Date(bug.created_at).toLocaleString()">{{
                        getRelativeTime(new Date(bug.created_at))
                    }}</span>
                    by
                    <a :href="bug.user.html_url" target="_blank">{{
                        bug.user.login
                    }}</a>

                    <span class="bug-labels">
                        <a
                            class="bug-label"
                            :href="`https://github.com/${$themeConfig.variables.github}/issues?q=is%3Aissue+is%3Aopen+label%3A${label.name}`"
                            target="_blank"
                            :title="label.description"
                            :style="labelStyle(label.color)"
                            v-for="label in bug.labels"
                            :key="label.id"
                        >
                            {{ label.name }}
                        </a>
                    </span>
                </small>
                <div
                    class="bug-content"
                    v-html="showdown.makeHtml(bug.body)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const octicons = require('@primer/octicons');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const showdown = require('showdown');

const sdConverter = new showdown.Converter({
    headerLevelStart: 5,
    literalMidWordUnderscores: true,
    strikethrough: true,
    tables: true,
    tasklists: true,
    smartIndentationFix: true,
    disableForced4SpacesIndentedSublists: true,
    simpleLineBreaks: true,
    openLinksInNewWindow: true,
});

const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
};

const rtf = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
    style: 'long',
});

const getRelativeTime = (d1, d2 = new Date()) => {
    const elapsed = d1.getTime() - d2.getTime();

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (const unit in units) {
        if (Math.abs(elapsed) > units[unit] || unit === 'second')
            return rtf.format(Math.round(elapsed / units[unit]), unit);
    }
    return elapsed.toLocaleString();
};

export default Vue.extend({
    name: 'bugs',
    data() {
        return {
            octicons,
            showdown: sdConverter,
            showContent: [],
            getRelativeTime,
        };
    },
    computed: {
        bugs() {
            return this.$themeConfig
                ? this.$themeConfig.variables
                    ? this.$themeConfig.variables.bugIssues || []
                    : []
                : [];
        },
    },
    methods: {
        labelStyle(color) {
            const values = {
                r: parseInt(
                    color
                        .split('')
                        .splice(0, 2)
                        .join(''),
                    16
                ),
                g: parseInt(
                    color
                        .split('')
                        .splice(2, 2)
                        .join(''),
                    16
                ),
                b: parseInt(
                    color
                        .split('')
                        .splice(4, 2)
                        .join(''),
                    16
                ),
                h: 0,
                s: 0,
                l: 0,
            };

            const r = values.r / 255;
            const g = values.g / 255;
            const b = values.b / 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            values.l = (max + min) / 2;

            if (max !== min) {
                const d = max - min;
                values.s =
                    values.l > 0.5 ? d / (2 - max - min) : d / (max + min);

                switch (max) {
                    case r:
                        values.h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        values.h = (b - r) / d + 2;
                        break;
                    case b:
                        values.h = (r - g) / d + 4;
                        break;
                }

                values.h /= 6;
                values.h *= 360;
                values.s *= 100;
                values.l *= 100;

                return Object.entries(values)
                    .map(
                        ([type, value]) =>
                            `--label-${type}: ${Math.floor(value)};`
                    )
                    .join('');
            }
        },
    },
    props: {
        noBugs: {
            type: String,
            required: false,
            default: 'There are no open Bugs currently!',
        },
    },
});
</script>

<style scoped>
#bugs {
    display: flex;
    flex-wrap: wrap;
}

.bug-field {
    flex: none;
    padding: 0.7em;
}
@media print, screen and (min-width: 769px) {
    .bug-field {
        width: calc(100% - 0.7em * 2);
    }
}
@media screen and (min-width: 1216px) {
    .bug-field {
        width: calc(50% - 0.7em * 2);
    }
}

.bug {
    max-width: 100%;
    position: relative;
    border: 2px solid rgb(121, 113, 100);
    border-radius: 0.4em;
    box-shadow: none;
}
body.yuu-theme-dark .bug >>> {
    background-color: #282f2f;
}

.bug-header {
    display: flex;
    align-items: stretch;
    border-radius: 0.4em 0.4em 0 0;
    box-shadow: none;
    background-color: rgba(18, 18, 18, 0.2);
}

.bug-header-title {
    align-items: center;
    display: flex;
    flex-grow: 1;
    font-weight: 700;
    padding: 0.75rem 1rem;
}

.bug-header-icon {
    appearance: none;
    background: 0 0;
    border: none;
    font-family: inherit;
    font-size: 1em;
    margin: 0;
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 0.75rem 1rem;
}

.icon {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    height: 1.5rem;
    width: 1.5rem;
    transition: transform 0.25s linear;
}

.bug-description {
    padding-left: 0.75rem;
}

.bug-content {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    padding: 1.5rem;
}

.bug-labels {
    display: inline-flex;
    flex-wrap: wrap;
}

.bug-labels .bug-label {
    /** will be overridden by inline style **/
    --label-r: 0;
    --label-g: 0;
    --label-b: 0;
    --label-h: 0;
    --label-s: 0;
    --label-l: 0;

    --lightness-threshold: 0.6;
    --background-alpha: 0.18;
    --border-alpha: 0.3;
    --perceived-lightness: calc(
        (
                (var(--label-r) * 0.2126) + (var(--label-g) * 0.7152) +
                    (var(--label-b) * 0.0722)
            ) / 255
    );
    --lightness-switch: max(
        0,
        min(
            calc(
                (var(--perceived-lightness) - var(--lightness-threshold)) *
                    -1000
            ),
            1
        )
    );
    --lighten-by: calc(
        ((var(--lightness-threshold) - var(--perceived-lightness)) * 100) *
            var(--lightness-switch)
    );

    background: rgba(
        var(--label-r),
        var(--label-g),
        var(--label-b),
        var(--background-alpha)
    );
    color: hsl(
        var(--label-h),
        calc(var(--label-s) * 1%),
        calc((var(--label-l) + var(--lighten-by)) * 1%)
    );
    display: inline-block;
    padding: 0 7px;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    border: 1px solid
        hsla(
            var(--label-h),
            calc(var(--label-s) * 1%),
            calc((var(--label-l) + var(--lighten-by)) * 1%),
            var(--border-alpha)
        );
    border-radius: 2em;
    margin-left: 0.25em;
    margin-right: 0.25em;
}

.bug[data-content-state='open'] .bug-header-icon .icon {
    transform: rotate(180deg);
}

.bug[data-content-state='closed'] .bug-content {
    display: none;
}
</style>
