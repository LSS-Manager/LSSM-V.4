---serve
title: Local development
lang: en_US
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
3. Run the local dev build
    ```bash
    yarn dev:local
    ```
    This will start the development server as well. If you need to restart it later use `yarn run dev:serve`
   :::tip Different Port
   If you want to use a different port (eg. 8081) run `yarn run dev:local --port 8081` respectively `yarn run dev:serve --port 8081`.
   :::

4. Install the userscript in your browser:
   Open `https://localhost:36551/static/lssm-v4.local.user.js` and run the tampermonkey installation process.

   :::warning Beware of duplicate scripts
   Please disable the production version of LSSM before enabling the development version.
   :::

5. Reload the game website, and you should see the development version of LSSM.
