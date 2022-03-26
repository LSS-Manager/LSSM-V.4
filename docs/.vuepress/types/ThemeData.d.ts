import type config from '../../../src/config';
import type de_DE from '../i18n/de_DE.json';
import type { DefaultThemeData } from '@vuepress/theme-default';
import type { Issue } from './issues';
import type { ModulesFile } from '../utils/generate/modules';
import type v3Comparison from '../utils/v3Comparison.json';

type MomentShort =
    | 'L'
    | 'l'
    | 'LL'
    | 'll'
    | 'LLL'
    | 'lll'
    | 'LLLL'
    | 'llll'
    | 'LT'
    | 'LTS';

type MomentVariableCategories =
    | 'ampm'
    | 'dom'
    | 'dow'
    | 'doy'
    | 'hour'
    | 'minute'
    | 'month'
    | 'quarter'
    | 'second'
    | 'week'
    | 'year';

export interface ThemeData extends DefaultThemeData {
    variables: {
        discord: {
            invite: string;
            id: string;
            channels: Record<string, string>; // string because are too big for numbers
        };
        github: string;
        server: string;
        fontAwesomeIconSearchLink: string;
        versions: {
            beta: string;
            stable: string;
            short: string;
        };
        browsers: typeof config.browser;
        bugIssues: Issue[];
        i18n: Record<string, typeof de_DE>;
        modules: ModulesFile;
        noMapkitSettings: Record<string, string[]>;
        moment: Record<
            string,
            {
                titles: {
                    shorts: Record<
                        'description' | 'example' | 'variable',
                        string
                    >;
                    variables: Record<
                        | MomentVariableCategories
                        | 'category'
                        | 'description'
                        | 'output'
                        | 'variable',
                        string
                    >;
                };
                shorts: Record<MomentShort, string>;
                variables: Record<
                    MomentVariableCategories,
                    Record<string, string>
                > & { order: MomentVariableCategories[] };
            }
        >;
        tables: Record<
            string,
            Record<'browser' | 'download' | 'link' | 'minVersion', string>
        >;
        v3Comparison: typeof v3Comparison & {
            translations: Record<
                string,
                {
                    modules: Record<
                        string,
                        { v3Name: string; annotation?: string }
                    >;
                    settings: Record<string, Record<string, string>>;
                    tables: Record<
                        | 'annotations'
                        | 'changes'
                        | 'feature'
                        | 'module'
                        | 'setting',
                        string
                    >;
                    v4annotations: Record<string, string>;
                }
            >;
        };
        contributors: {
            avatar_url: string;
            contributions: string[];
            login: string;
            name: string;
            profile: string;
        }[];
        contributionTypes: Record<
            string,
            {
                description: string;
                link: string;
                symbol: string;
            }
        >;
    };
}
