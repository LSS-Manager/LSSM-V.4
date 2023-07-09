---
title: LSS-Manager V.4
lang: nb-NO
sidebarDepth: 2
---

# Wiki 🇳🇴 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status][lssm.status]

[Game-Online-Status](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## About LSSM

LSS-MANAGER V.4 is an extension for [Missionchief.co.uk][games.self] and its other language versions.

With this extension an appstore is added to the game, which allows the usage of plugins. All functions are modular - you can decide what to activate, down to the last module.

Plugins that are not activated will not be loaded either - this makes administration very easy of course and provides a better performance.


## Installation 📥
By using LSSM you agree that we collect metadata. You can find more information about this at [Metadata][docs.metadata]

A table with which browsers LSSM is compatible can be found in our [FAQ](faq.md#in-which-browsers-lss-manager works)

::: tip Using LSSM on your mobile phone
Officially we do not support a mobile version. However, the browser Firefox offers the possibility to use add-ons even in its mobile version. Nevertheless, we do not guarantee an attractive design or full functionality for mobile browsers.

Official support of mobile browsers is currently **not** planned.
:::

### Step 1: Tampermonkey
If you have not yet installed Tampermonkey in your browser, you still have to do so. Here is an overview of links for the most common browsers:

<tampermonkey-download-table/>

For other browsers you can download Tampermonkey on [tampermonkey.net][tampermonkey].

::: warning
Please note that we do not officially support older browsers, mobile browsers and Apple Safari. Support for these browsers is therefore neither guaranteed nor likely.
:::

### Step 2: Userscript
If Tampermonkey was successfully installed in your browser, you can either click [here][lssm.userscript] or create a new userscript with the following content:

@[code js](@userscript)

### Step 3: Activate
The LSSM indicator is a green highlighted text `LSSM V.4`.
If you are in missionchief but do not see this indicator in the upper right corner, click on the tampermonkey icon in your browser and check if the switch for LSS-Manager script is set to `on`.

If you have any problems you can always contact [Support][docs.support].

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /nb_NO/
[docs.apps]: /nb_NO/apps.md
[docs.appstore]: /nb_NO/appstore.md
[docs.bugs]: /nb_NO/bugs.md
[docs.error_report]: /nb_NO/error_report.md
[docs.faq]: /nb_NO/faq.md
[docs.metadata]: /nb_NO/metadata.md
[docs.other]: /nb_NO/other.md
[docs.settings]: /nb_NO/settings.md
[docs.suggestions]: /nb_NO/suggestions.md
[docs.support]: /nb_NO/support.md
[games.self]: https://nodsentralspillet.com
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug