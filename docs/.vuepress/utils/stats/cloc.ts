import { execSync } from 'child_process';

interface ClocResult {
    header: {
        cloc_url: string;
        cloc_version: string;
        elapsed_seconds: number;
        n_files: number;
        n_lines: number;
        files_per_second: number;
        lines_per_second: number;
    };
    SUM: {
        blank: number;
        comment: number;
        code: number;
        nFiles: number;
    };
}

type AbsoluteClocResult = ClocResult &
    Record<
        string,
        {
            nFiles: number;
            blank: number;
            comment: number;
            code: number;
        }
    >;
type RelativeClocResult = ClocResult &
    Record<
        string,
        {
            nFiles: number;
            blank_pct: number;
            comment_pct: number;
            code: number;
        }
    >;

const clocBin = '"$(yarn workspace lss-manager-v4-docs bin cloc)"';

export default (
    ROOT_PATH: string,
    $t: (path: string) => string,
    toLocaleNum: (num: number, style?: string) => string
): string => {
    const clocTime = new Date();
    const absoluteClocStats: AbsoluteClocResult = JSON.parse(
        execSync(
            `cd "${ROOT_PATH}" && ${clocBin} --vcs git --skip-uniqueness --json`
        ).toString()
    );
    const relativeClocStats: RelativeClocResult = JSON.parse(
        execSync(
            `cd "${ROOT_PATH}" && ${clocBin} --vcs git --skip-uniqueness --json --by-percent cmb`
        ).toString()
    );

    const clocHeaderStats = absoluteClocStats.header;

    return `
*generated with [cloc v ${clocHeaderStats.cloc_version}](https://${
        clocHeaderStats.cloc_url
    }) in ${(
        absoluteClocStats.header.elapsed_seconds +
        relativeClocStats.header.elapsed_seconds
    ).toFixed(2)}s at ${clocTime.toISOString()}*

|${$t('language')}|${$t('files')} (%)|${$t('blank')} (%)|${$t(
        'comment'
    )} (%)|${$t('code')} (%)|${$t('total')}|${$t('percentOfLines')}|
|:-------|--------:|--------:|----------:|-------:|----:|---------:|
${Object.entries(absoluteClocStats)
    .filter(([key]) => !['header', 'SUM'].includes(key))
    .sort(([, { code: codeA }], [, { code: codeB }]) => codeB - codeA)
    .map(
        ([lang, { nFiles, blank, comment, code }]) =>
            `|${[
                lang,
                `${toLocaleNum(nFiles)} (${toLocaleNum(
                    nFiles / absoluteClocStats.SUM.nFiles,
                    'percent'
                )})`,
                `${toLocaleNum(blank)} (${toLocaleNum(
                    relativeClocStats[lang].blank_pct / 100,
                    'percent'
                )})`,
                `${toLocaleNum(comment)} (${toLocaleNum(
                    relativeClocStats[lang].comment_pct / 100,
                    'percent'
                )})`,
                `${toLocaleNum(code)} (${toLocaleNum(
                    1 -
                        (relativeClocStats[lang].blank_pct / 100 +
                            relativeClocStats[lang].comment_pct / 100),
                    'percent'
                )})`,
                toLocaleNum(blank + comment + code),
                `${toLocaleNum(
                    (blank + comment + code) / clocHeaderStats.n_lines,
                    'percent'
                )}`,
            ].join('|')}|`
    )
    .join('\n')}
|||||||
|${[
        $t('sum.toUpperCase()'),
        toLocaleNum(absoluteClocStats.SUM.nFiles),
        `${toLocaleNum(absoluteClocStats.SUM.blank)} (${toLocaleNum(
            relativeClocStats.SUM.blank / 100,
            'percent'
        )})`,
        `${toLocaleNum(absoluteClocStats.SUM.comment)} (${toLocaleNum(
            relativeClocStats.SUM.comment / 100,
            'percent'
        )})`,
        `${toLocaleNum(absoluteClocStats.SUM.code)} (${toLocaleNum(
            1 -
                (relativeClocStats.SUM.blank / 100 +
                    relativeClocStats.SUM.comment / 100),
            'percent'
        )})`,
        toLocaleNum(clocHeaderStats.n_lines),
        toLocaleNum(1, 'percent'),
    ]
        .map(c => `**${c}**`)
        .join('|')}|
`.trim();
};
