import config from '../../src/config';

import { Issue } from './types/issues';

declare module 'vue/types/vue' {
    interface Vue {
        $themeConfig: {
            variables: {
                discord: string;
                github: string;
                server: string;
                versions: {
                    beta: string;
                    stable: string;
                    short: string;
                };
                browsers: typeof config.browser;
                noMapkitModules: Record<string, { title: string; f: string }[]>;
                bugIssues: Issue[];
            };
        };
    }
}
