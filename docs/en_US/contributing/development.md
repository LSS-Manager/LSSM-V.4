---
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

## Testing in Chrome

Recent versions of Chrome ask for the **Local network access** permission before a website may load anything from `localhost`.
Allow it in the site settings of the game, otherwise the development version cannot be loaded.

Tampermonkey may also fail to load the `@resource` from `https://localhost:36551` because of the self-signed certificate
(`can't load @resource 'core'`). In that case, you can load the development version from the browser console:

```js
window['lssmv4-GM_Info'] ??= { script: { version: '4.7.12' } };
const script = document.createElement('script');
script.type = 'module';
script.src = 'https://localhost:36551/core.js?_=' + Date.now();
document.body.append(script);
```

## Shared workers

Data that all tabs need is handled in [SharedWorkers](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker),
so that all tabs (and iframes) of a user share it. `TypedWorker` and `TypedMultiWorker` in `src/workers/TypedWorker.ts` take care of this:

* The code of a worker is created from the functions passed to it via `toString()`.
  They must be arrow functions, function expressions or classes and must not reference anything outside their own body.
  Use the `self` parameter for state and importable scripts for helpers.
* All tabs of the same user, locale and build share one worker. If a worker cannot be started, the functions run in the window instead.
* Workers send events to the tabs with `self.publish(event, data)`, tabs listen to them with `worker.subscribe(event, listener)`.
* Setting `localStorage.lssmv4_disableSharedWorker = 'true'` runs all workers in the window, which helps with debugging.

The API store (`src/stores/api.ts`) uses the `api` worker:
it refreshes the APIs once for all tabs, only sends data to the tabs when it has changed
and shares live updates of vehicles and buildings (e.g. from radio messages) between the tabs.
The broadcast store (`src/stores/broadcast.ts`) sends messages between tabs via the `broadcast` worker:
tabs register named handlers with `on(name, handler)` and send data with `send(name, data)`.
