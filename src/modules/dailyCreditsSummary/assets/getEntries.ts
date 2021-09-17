import { $m } from 'typings/Module';
import { CreditsDailyWindow } from 'modules/redesign/parsers/credits/daily';
import { CreditsTypes } from 'typings/modules/dailyCreditsSummary/main';
import { Mission } from 'typings/Mission';

export default async (
    LSSM: Vue,
    doc = document
): Promise<CreditsDailyWindow> => {
    const $m: $m = (key: string, args?: { [key: string]: unknown }) =>
        LSSM.$t(`modules.dailyCreditsSummary.${key}`, args);

    const missions = (await LSSM.$store.dispatch('api/getMissions', {
        force: false,
        feature: 'dailyCreditSummary-getMissions',
    })) as Mission[];

    const missionsString = missions
        .map(({ name }) => LSSM.$utils.escapeRegex(name))
        .join('|');

    const credits_types: CreditsTypes = (
        await import(
            /* webpackChunkName: "modules/i18n/dailyCreditsSummary/[request]" */ `../i18n/${LSSM.$store.state.lang}.ts`
        )
    ).default.categories;
    const creditsTypes: CreditsTypes = Object.fromEntries([
        ...Object.entries(credits_types).map(
            ([key, { regex, title, backgroundColor, textColor }]) => {
                return [
                    key,
                    {
                        ...(!!regex && {
                            regex:
                                typeof regex === 'string'
                                    ? new RegExp(
                                          regex.replace(
                                              /%missions%/,
                                              `(${missionsString})`
                                          )
                                      )
                                    : regex,
                        }),
                        ...(!!title && { title }),
                        backgroundColor,
                        textColor,
                    },
                ];
            }
        ),
        [
            'others',
            {
                title: $m('others').toString(),
                backgroundColor: '#dcdcdc',
                textColor: 'black',
            },
        ],
    ]);

    const getNum = (el: Element | null) =>
        parseInt(
            el?.textContent
                ?.trim()
                .match(/-?\d{1,3}(([,.]|\s)\d{3})*/)?.[0]
                ?.replace(/[,.]|\s/g, '') ?? '0'
        );

    return {
        entries: Array.from(
            doc.querySelectorAll<HTMLTableRowElement>('#daily_table tbody tr')
        ).map(entry => {
            const desc = entry.children[3]?.textContent?.trim() ?? '';
            const types = Object.entries(creditsTypes)
                .filter(([, { regex }]) => !!regex && desc.match(regex))
                .map(([key]) => key);
            return {
                total: getNum(entry.children[0]),
                average: getNum(entry.children[1]),
                amount: getNum(entry.children[2]),
                desc,
                types: types.length === 0 ? ['others'] : types,
            };
        }),
        creditsTypes,
    };
};
