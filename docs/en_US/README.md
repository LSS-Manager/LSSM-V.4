---
title: LSS-Manager V.4
lang: en-US
sidebarDepth: 2
---

# Wiki 🇺🇸 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status][lssm.status]

[Game-Online-Status](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## About LSSM

LSS MANAGER V.4 is an extension for [Missionchief.com][games.self] and its other language versions.

With this extension, an appstore is added to the game, allowing the usage of modules. You can decide which modules to activate.

Deactivated plugins are not loaded into your browser, for better performance.


## Installation 📥
[By using LSSM you agree that we collect metadata.][docs.metadata]

A table with which browsers LSSM is compatible can be found in our [FAQ](faq.md)

::: tip Using LSSM on mobile phones
We do not support using LSSM on mobile. While Firefox on mobile allows add-ons, we do not guarantee functionality.

Official support of mobile browsers is currently **not** planned.
:::

### Step 1: Install Tampermonkey
Install Tampermonkey extension into your browser.

<tampermonkey-download-table/>

For other browsers you can download Tampermonkey on [tampermonkey.net][tampermonkey].

::: warning
Please note that we do not officially support older browsers, mobile browsers and Apple Safari. Support for these browsers is therefore neither guaranteed nor likely.
:::

### Step 2: Userscript
If Tampermonkey was successfully installed in your browser, you can either click [here][lssm.userscript] or create a new userscript with the following content:

@[code js](@userscript)

### Step 3: Activate
The LSSM indicator is a green highlighted text `LSSM V.4`, present in the upper right corner of Missionchief.
If you cannot find this indicator, click on the tampermonkey icon in your browser and check if the switch for LSS-Manager script is set to `on`.

If you have any problems, feel free to contact [Support][docs.support].

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /en_US/
[docs.apps]: /en_US/apps.md
[docs.appstore]: /en_US/appstore.md
[docs.bugs]: /en_US/bugs.md
[docs.error_report]: /en_US/error_report.md
[docs.faq]: /en_US/faq.md
[docs.metadata]: /en_US/metadata.md
[docs.other]: /en_US/other.md
[docs.settings]: /en_US/settings.md
[docs.suggestions]: /en_US/suggestions.md
[docs.support]: /en_US/support.md
[games.self]: https://missionchief.com
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug