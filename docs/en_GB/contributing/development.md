---
title: Local development
lang: en_GB
sidebarDepth: 2
---

# Local development

## Prerequisites

- [Node.js](https://nodejs.org/en/) (version 20.x)
- [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- Windows: Bash (e.g. [Git Bash](https://gitforwindows.org/))
- [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/)

## Setup

To work on LSSM locally follow these steps:

1. Clone the repository to your local machine and use the `dev` branch:
   ```bash
   git clone -b dev https://github.com/LSS-Manager/LSSM-V.4.git
    ```
2. Install the dependencies:
   ```bash
   yarn install
   ```
3. Modify the variable `urls.server` in `src/config.ts` to point to your local machine:
   ```ts
    export default {
        //...
        urls: {
            server: 'https://localhost:8080/',
            //...
        },
        //...
    } as Config;
   ```
4. Run the dev build:
   ```bash
   yarn dev
   ```

    :::tip DX notes
    The `dev` option will try to install Node.js via NVM as well as Yarn.
    If you already have these installed or want to install them yourself, please run the following commands instead:
       ```bash
       bash build/build.sh --dependencies
       bash build/build.sh --quick
       bash build/build.sh --userscript
       bash build/build.sh --prebuild
       bash build/build.sh --webpack
       ```
    :::

5. Start the development server, which will serve the `dist` folder on `https://localhost:8080/`:
   ```bash
   yarn dev:serve
   ```

   :::tip DX notes
   If you have used another address in step 3, you will need to adjust the host/post in the `dev:serve` script in `package.json`.
   :::

6. Install the userscript in your browser:
   Open Tampermonkey/Greasemonkey and create a new script.
   Copy the contents of `dist/static/lssm-v4.user.js` into the script and save it.

   :::warning Beware of duplicate scripts
   Please disable the production version of LSSM before enabling the development version.
   :::

7. Visit https://localhost:8080/ in your browser and accept the insecure self-signed certificate.
8. Reload the game website and you should see the development version of LSSM.
