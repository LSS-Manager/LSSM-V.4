import fs from 'fs';

const [, , manifestFile, description, name, url] = process.argv;

const manifest = JSON.parse(fs.readFileSync(manifestFile).toString());

manifest.description = description;
manifest.name = name;
manifest.short_name = name;
manifest.scope = url;
manifest.start_url = url;
manifest.shortcuts = [
    {
        name: 'Home',
        url,
    },
];
manifest.icons = [
    {
        src: `${url}img/icons/android-chrome-192x192.png`,
        sizes: '192x192',
        type: 'image/png',
    },
    {
        src: `${url}img/icons/android-chrome-512x512.png`,
        sizes: '512x512',
        type: 'image/png',
    },
];

fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 4));
