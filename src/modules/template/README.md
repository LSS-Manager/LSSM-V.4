This document defines the basic structure that all modules should have.
In this case, the module's ID is `template`. Further explanations below.
```
.
├── template
│   ├── README.md
│   ├── main.ts
│   ├── register.json
│   ├── settings.ts
│   ├── i18n
│   │   ├── de_DE
|   │   │   ├── part1.json
|   │   │   ├── part2.json
|   |   |   └── index.js
|   │   ├── de_DE.root.js
│   │   ├── nl_NL.js
│   │   ├── en_US.json
│   │   └── ...
|   ├── template.vue
|   ├── assets
|   |   ├── img
|   |   |   └── ...
|   |   └── ...
|   ├── docs
|   |   ├── assets
|   |   |   ├── img
|   |   |   |   └── ...
|   |   |   └── ...
|   |   ├── de_DE.md
|   |   ├── nl_NL.md
|   |   ├── en_US.md
|   |   └── ...
|   └
```

### README.md
This file contains some basic information on the module:
* What does it do?
* Current Status
* ...

The file should inform other developers short but precisely so that they don't have to read the code to understand what the module is about.

### main.ts
This is the file requested by the core. Further TS-Files must be located in `assets/`.

### register.json
This file contains necessary information on the module for the core. This may also be a JS-File `register.js` returning a JSON-Object. Details are explained in the templates registration-file

### settings.ts
This file exports a function returning a settings-configuration object.
It will only be called if `settings` is set to `true` in the registration-file.

### i18n
This folder contains Files that return JSON-Objects. That may either be a `json`-File or a `js`-File.
It is also allowed to split up the translations of a language when put inside the corresponding folder.
The translations must be directly accessible via the language-code used in game.

Any translations that need to be available on root level (without the module being active on main page), need to be available via `xx_XX.root` where `xx_XX` is the current language-code. This can also be either a `.json` or a `.js` file.

### template.vue
If a module needs its own vue component, it may be stored as a single-file-component. If so, it must be the name of the module followed by the `.vue` extension.
Any further components that are used only in this module must be in `components`.

### assets
This folder stores all assets, such as extra JS-Files, more Vue-components, images and more.
Assets must be ordered by categories, like images, components, ...

### docs
Within this folder must be all required files for the Wiki-Page of this module.
The name of each file must be the according language code with `.md` file extension (`xx_XX.md`).
Any assets for this page of the wiki must be stored within `docs/assets`.

Pictures referenced in a doc file are using a shortcut-path. Using `image.png` in `de_DE.md` points to the locale asset folder `docs/assets/de_DE/image.png`. Thus, any image referenced must exist in the corresponding asset folder.
