import fs from 'fs';
import path from 'path';

interface Translation {
    [key: string]: Translation | string;
}

export type $t = (lang: string, key: string) => Translation | string;

export default (DOCS_I18N_PATH: string) => {
    const I18N: Record<string, Translation> = {};

    for (const lang of fs.readdirSync(DOCS_I18N_PATH)) {
        const filePath = path.join(DOCS_I18N_PATH, lang);
        I18N[lang.split('.')[0]] = JSON.parse(
            fs.readFileSync(filePath).toString()
        );
    }

    return (lang: string, key: string): Translation | string => {
        if (!key) return I18N[lang] ?? I18N.en_US ?? I18N.de_DE ?? '';

        const walk = (
            base: Translation | string,
            path: string[]
        ): Translation | string => {
            if (typeof base === 'string' || !base) return base;
            if (path.length === 1) return base[path[0]];
            const attr = path.shift();
            if (!attr) return base;
            return walk(base[attr], path);
        };

        const path = key.split('.');

        const reqLang = walk(I18N[lang], [...path]);
        const en_US = walk(I18N.en_US, [...path]);
        const de_DE = walk(I18N.de_DE, [...path]);
        return reqLang ?? en_US ?? de_DE ?? key;
    };
};
