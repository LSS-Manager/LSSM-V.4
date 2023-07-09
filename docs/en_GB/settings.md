---
title: Settings ⚙️
lang: en_GB
---

# Settings ⚙️

The settings of all modules are managed centrally in the settings. Only the settings of active modules can be changed.

It is planned to add a possibility to export and import the settings as in `LSSM V.3`.
In addition, we would like to offer the possibility to save settings profile-bound in the near future. This means that settings are no longer device-bound.

::: tip Changes
As soon as you exit the settings and have saved changes, the game will reload to easily apply all settings.
If you have unsaved changes, you can't close the settings, you will get a small hint message.
:::

::: danger Reset the settings
Caution: If you reset settings, they cannot be restored without previous export!
:::


## Moment.js
This section provides some information on how to configure the date-time configs, e.g. in the module [clock](modules/clock.md).

We use [Moment.js](https://momentjs.com) to offer a large selection of configuration. If you wish to see the original documentation you can find that [here](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/).

### Live-Editor
Try your own format here and see a live preview! See information on configuration below.

<momentjs-preview/>

### Variables
<momentjs-variables/>

### Locale short forms
<momentjs-shorts/>

### Normal Text
If you want to include other text with your clock such as `hour`, simply typing `LTS hour` will not work. That results in `11:13:27 AM 11our`. In order to include text that shouldn't be formatted, surround it in `[]`. `LTS [Hour]` or `LTS [H]our` will both result in `11:13:27 AM Hour` being displayed.

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /en_GB/
[docs.apps]: /en_GB/apps.md
[docs.appstore]: /en_GB/appstore.md
[docs.bugs]: /en_GB/bugs.md
[docs.error_report]: /en_GB/error_report.md
[docs.faq]: /en_GB/faq.md
[docs.metadata]: /en_GB/metadata.md
[docs.other]: /en_GB/other.md
[docs.settings]: /en_GB/settings.md
[docs.suggestions]: /en_GB/suggestions.md
[docs.support]: /en_GB/support.md
[games.self]: https://missionchief.co.uk
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug