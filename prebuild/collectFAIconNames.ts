import fs from 'fs';
import path from 'path';

import yaml from 'js-yaml';

// these Types have been extracted from the FontAwesome metadata/icons.yml
interface Icon {
    changes: string[];
    label: string;
    search: Search;
    styles: string[];
    unicode: string;
    voted: boolean;
    aliases?: Aliases;
}

interface Aliases {
    names?: string[];
    unicodes?: Unicodes;
}

interface Unicodes {
    composite?: string[];
    secondary?: string[];
    primary?: string[];
}

interface Search {
    terms: string[];
}

const iconsByStyle: Record<string, string[]> = {};

const icons = yaml.load(
    fs.readFileSync(
        path.join(
            __dirname,
            '..',
            'node_modules',
            '@fortawesome',
            'fontawesome-free',
            'metadata',
            'icons.yml'
        ),
        'utf8'
    )
) as Record<string, Icon>;
Object.entries(icons).forEach(([name, icon]) =>
    icon.styles.forEach(style => {
        if (!iconsByStyle[style]) iconsByStyle[style] = [];
        iconsByStyle[style].push(name, ...(icon.aliases?.names ?? []));
    })
);
export default (): void =>
    fs.writeFileSync(
        './src/generated/faIcons.json',
        JSON.stringify(iconsByStyle)
    );
