---
title: LSS-Manager V.4
lang: en-GB
sidebarDepth: 2
---

# Wiki 🇬🇧 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: <i>{{ $theme.variables.versions.stable }}</i>
> 
> beta: <i>{{ $theme.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status](https://status.lss-manager.de)

[Game-Online-Status](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## About LSSM

LSS-MANAGER V.4 is an extension for [Missionchief.co.uk](https://www.missionchief.co.uk) and its other language versions.

With this extension an appstore is added to the game, which allows the usage of plugins. All functions are modular - you can decide what to activate, down to the last module.

Plugins that are not activated will not be loaded either - this makes administration very easy of course and provides a better performance.


## Installation 📥
By using LSSM you agree that we collect metadata. You can find more information about this at [Metadata](metadata.md)

A table with which browsers LSSM is compatible can be found in our [FAQ](faq.md#in-which-browsers-does-lss-manager-work)

:::tip Using LSSM on your mobile phone
Officially we do not support a mobile version. However, the browser Firefox offers the possibility to use add-ons even in its mobile version. Nevertheless, we do not guarantee an attractive design or full functionality for mobile browsers.

Official support of mobile browsers is currently **not** planned.
:::

### Step 1: Tampermonkey
If you have not yet installed Tampermonkey in your browser, you still have to do so. Here is an overview of links for the most common browsers:

<tampermonkey-download-table/>

For other browsers you can download Tampermonkey on [tampermonkey.net](https://www.tampermonkey.net/).

:::warning
Please note that we do not officially support older browsers, mobile browsers and Apple Safari. Support for these browsers is therefore neither guaranteed nor likely.
:::

### Step 2: Userscript
If Tampermonkey was successfully installed in your browser, you can either click <a :href="$theme.variables.server + 'lssm-v4.user.js'" target="_blank">here</a> or create a new userscript with the following content:

@[code js](@userscript)

### Step 3: Activate
The LSSM indicator is a green highlighted text `LSSM V.4`.
If you are in missionchief but do not see this indicator in the upper right corner, click on the tampermonkey icon in your browser and check if the switch for LSS-Manager script is set to `on`.

If you have any problems you can always contact [Support](support.md).
