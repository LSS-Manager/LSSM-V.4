---
title: General
lang: en_US
sidebarDepth: 2
---

# Wiki :us: <Badge :text="'LSSM V.' + ($themeConfig.variables.versions.stable || 4)"/>

*Current versions:*
> Stable: <i>{{ $themeConfig.variables.versions.stable }}</i>

## About LSSM

LSS MANAGER V.4 is an extension for [Missionchief.com](https://www.missionchief.com) and its other language versions.

With this extension, an appstore is added to the game, allowing the usage of modules. You can decide which modules to activate.

Deactivated plugins are not loaded into your browser, for better performance.


## Installation 📥
[By using LSSM you agree that we collect metadata.](metadata.md)

A table with which browsers LSSM is compatible can be found in our [FAQ](faq.md)

::: tip Using LSSM on mobile phones
We do not support using LSSM on mobile. While Firefox on mobile allows add-ons, we do not guarantee functionality.

Official support of mobile browsers is currently **not** planned.
:::

### Step 1: Install Tampermonkey
Install Tampermonkey extension into your browser.

Browser|Link
-------|----
Chrome | [Download](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
Firefox| [Download](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
Safari | [Download](https://safari.tampermonkey.net/tampermonkey.safariextz)
Opera  | [Download](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)

For other browsers you can download Tampermonkey on [tampermonkey.net](https://www.tampermonkey.net/).

::: warning
Please note that we do not officially support; older browsers; mobile browsers; Microsoft Edge; or Internet Explorer.
:::

### Step 2: Userscript
If Tampermonkey was successfully installed in your browser, you can either click <a :href="$themeConfig.variables.server + 'lssm-v4.user.js'" target="_blank">here</a> or create a new userscript with the following content:

<<< ./dist/static/lssm-v4.user.js

### Step 3: Activate
The LSSM indicator is a green highlighted text `LSSM V.4`, present in the upper right corner of Missionchief.
If you cannot find this indicator, click on the tampermonkey icon in your browser and check if the switch for LSS-Manager script is set to `on`.

If you have any problems, feel free to contact [Support](support.md).
