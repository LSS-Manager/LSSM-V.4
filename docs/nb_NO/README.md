---
title: General
lang: nb_NO
sidebarDepth: 2
---

# Wiki :no: <Badge :text="'LSSM V.' + ($themeConfig.variables.versions.stable || 4)"/>

*Current versions:*
> Stable: <i>{{ $themeConfig.variables.versions.stable }}

## About LSSM

LSS-MANAGER V.4 is an extension for [Missionchief.co.uk](https://www.missionchief.co.uk) and its other language versions.

With this extension an appstore is added to the game, which allows the usage of plugins. All functions are modular - you can decide what to activate, down to the last module.

Plugins that are not activated will not be loaded either - this makes administration very easy of course and provides a better performance.


## Installation 📥
By using LSSM you agree that we collect metadata. You can find more information about this at [Metadata](metadata.md)

A table with which browsers LSSM is compatible can be found in our [FAQ](faq.md#in-which-browsers-lss-manager works)

::: tip Using LSSM on your mobile phone
Officially we do not support a mobile version. However, the browser Firefox offers the possibility to use add-ons even in its mobile version. Nevertheless, we do not guarantee an attractive design or full functionality for mobile browsers.

Official support of mobile browsers is currently **not** planned.
:::

### Step 1: Tampermonkey
If you have not yet installed Tampermonkey in your browser, you still have to do so. Here is an overview of links for the most common browsers:

Browser|Link
-------|----
Chrome | [Download](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
Firefox| [Download](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
Safari | [Download](https://safari.tampermonkey.net/tampermonkey.safariextz)
Opera  | [Download](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)

For other browsers you can download Tampermonkey on [tampermonkey.net](https://www.tampermonkey.net/).

::: warning
Please note that we do not officially support older browsers, mobile browsers and Microsoft Edge or Internet Explorer. Support for these browsers is therefore neither guaranteed nor likely.
:::

### Step 2: Userscript
If Tampermonkey was successfully installed in your browser, you can either click <a :href="$themeConfig.variables.server + 'lssm-v4.user.js'" target="_blank">here</a> or create a new userscript with the following content:

<<< ./dist/static/lssm-v4.user.js

### Step 3: Activate
The LSSM indicator is a green highlighted text `LSSM V.4`.
If you are in missionchief but do not see this indicator in the upper right corner, click on the tampermonkey icon in your browser and check if the switch for LSS-Manager script is set to `on`.

If you have any problems you can always contact [Support](support.md).
