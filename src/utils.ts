import type { Mission } from 'typings/Mission';
import type { VueConstructor } from 'vue/types/vue';

export default (Vue: VueConstructor): void => {
    Vue.prototype.$vue = Vue;
    Vue.prototype.$utils = {
        urlRegex:
            /(?:(?:ftp|https?):)?\/\/(?:\S+@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])|(?:(?:[\da-z\u00a1-\uffff][\w\-\u00a1-\uffff]{0,62})?[\da-z\u00a1-\uffff]\.)+[a-z\u00a1-\uffff]{2,}\.?)(?::\d{2,5})?(?:[#/?]\S*)?/giu,
        escapeRegex(s: string) {
            return s.replace(/[$()*+.?[\\\]^|]/gu, '\\$&');
        },
        getMissionTypeInMissionWindow() {
            const missionHelpBtn =
                document.querySelector<HTMLAnchorElement>('#mission_help');
            if (!missionHelpBtn) return '-1';

            let missionType = new URL(
                missionHelpBtn.getAttribute('href') ?? '',
                window.location.origin
            ).pathname.split('/')[2];

            const overlayIndex =
                document
                    .querySelector<HTMLDivElement>('#mission_general_info')
                    ?.getAttribute('data-overlay-index') ?? 'null';
            if (overlayIndex && overlayIndex !== 'null')
                missionType += `-${overlayIndex}`;
            const additionalOverlay =
                document
                    .querySelector<HTMLDivElement>('#mission_general_info')
                    ?.getAttribute('data-additive-overlays') ?? 'null';
            if (additionalOverlay && additionalOverlay !== 'null')
                missionType += `/${additionalOverlay}`;

            return missionType;
        },
        async getMissionOptions(LSSM: Vue, MODULE_ID: string, reason: string) {
            const missions = (await LSSM.$store.dispatch('api/getMissions', {
                force: false,
                feature: `${MODULE_ID}-${reason}`,
            })) as Mission[];
            const missionIds = [] as string[];
            const missionNames = [] as string[];
            const idLengths = { id: 0, variant: 0 };
            missions
                .map(({ id }) => `${id}-`.split('-').map(i => i.length))
                .forEach(([id, variant]) => {
                    idLengths.id = Math.max(idLengths.id, id);
                    idLengths.variant = Math.max(idLengths.variant, variant);
                });

            const fill0Left = (string: string, length: number): string => {
                let longString = string;
                while (longString.length < length)
                    longString = `0${longString}`;
                return longString;
            };

            const idToLength = (id: string): string => {
                if (!id.match(/-/u)) return fill0Left(id, idLengths.id);
                const [base, variant] = id.split('-');
                return `${fill0Left(base, idLengths.id)}-${fill0Left(
                    variant,
                    idLengths.variant
                )}`;
            };

            missions.forEach(({ id, name }) => {
                missionIds.push(id);
                missionNames.push(`${idToLength(id.toString())}: ${name}`);
            });

            return { missionIds, missionNames };
        },
        getNumberFromText<Multiple extends boolean = false>(
            text: string,
            allNumbers?: Multiple,
            fallback = -1
        ): Multiple extends true ? number[] : number {
            const regex = new RegExp(
                /-?\d{1,3}(?:[\s,.]\d{3})*/,
                allNumbers ? 'g' : ''
            );
            return (
                allNumbers
                    ? text
                          .match(regex)
                          ?.map(match =>
                              parseInt(
                                  match.replace(/[\s,.]/gu, '') ??
                                      fallback.toString()
                              )
                          ) ?? []
                    : parseInt(
                          text.match(regex)?.[0]?.replace(/[\s,.]/gu, '') ??
                              fallback.toString()
                      )
            ) as Multiple extends true ? number[] : number;
        },
        getTextNodes(
            root: Node,
            filter?: (node: Node, ...args: unknown[]) => true
        ) {
            const NoneTextParentNodes = [
                'head',
                'meta',
                'title',
                'script',
                'style',
                'link',
                'br',
                'noscript',
                'a',
                'textarea',
            ];
            const children = Array.from(root.childNodes);
            const textChildren = children.filter(
                n => n.nodeType === 3 && (!filter || (filter && filter(n)))
            );
            const elementChildren = children.filter(
                n =>
                    n.nodeType === 1 &&
                    !NoneTextParentNodes.includes(
                        (n as Element).tagName.toLowerCase()
                    ) &&
                    (!filter || (filter && filter(n)))
            );
            return [
                ...textChildren,
                ...elementChildren.map(n => this.getTextNodes(n, filter)),
            ].flat();
        },
        activeCountdowns: [] as string[],
        countdown(id: string, countdown: number, initialCall = true) {
            const $utils = (window[PREFIX] as Vue).$utils;
            if (initialCall && $utils.activeCountdowns.includes(id)) return;

            const element = document.querySelector<HTMLElement>(`#${id}`);
            const activeIndex = $utils.activeCountdowns.findIndex(
                cd => id === cd
            );
            if (!element || countdown <= 0) {
                if (activeIndex >= 0)
                    $utils.activeCountdowns.splice(activeIndex, 1);
                return;
            }
            if (activeIndex < 0) $utils.activeCountdowns.push(id);

            element.textContent = window.formatTime(countdown);
            window.setTimeout(
                () => $utils.countdown(id, countdown - 1, false),
                1000
            );
        },
        highChartsDarkMode: {
            chart: {
                backgroundColor: 'transparent',
                plotBorderColor: '#606063',
            },
            title: {
                style: {
                    color: '#ddd',
                },
            },
            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3',
                    },
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3',
                    },
                },
            },
            yAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3',
                    },
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3',
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85}',
                style: {
                    color: '#F0F0F0',
                },
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#B0B0B3',
                    },
                    marker: {
                        lineColor: '#333',
                    },
                },
            },
            legend: {
                itemStyle: {
                    color: '#E0E0E3',
                },
                itemHoverStyle: {
                    color: '#FFF',
                },
                itemHiddenStyle: {
                    color: '#606063',
                },
            },
            credits: {
                style: {
                    color: '#666',
                },
            },
            labels: {
                style: {
                    color: '#707073',
                },
            },
            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3',
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3',
                },
            },
            dataLabelsColor: '#B0B0B3',
            textColor: '#C0C0C0',
            contrastTextColor: '#F0F0F3',
            maskColor: 'rgba(255,255,255,0.3}',
        },
    };
};
