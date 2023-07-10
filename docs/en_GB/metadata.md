---
title: Metadata
lang: en_GB
sidebarDepth: 0
---

# Collection of user metadata

By using `LSSM` (Leitstellenspiel Manager, userscript for the browser) the user accepts that metadata will be collected. The following data will be stored:

* Unique user ID
    * Including unique Secret (unique, non-public character string for identification)
* User name
* Amount of buildings
* used browser
    * including version
* time of metadata collection
* enabled modules
* language version of the game
    * including information whether police version (if available) or not
* which map type is activated (OSM or Mapkit)
* LSSM version
* LSSM branch (`stable`, `beta` or a preview-branch)
* version of the installed LSSM userscript

This data is used to improve the extension as well as to guide the development of existing or future modules.
They are also the basis for exciting statistics, which can be published, for example as news (for more information, see [below](#publishing-statistics)).

**The user can (de-)activate the collection of this data at any time in the [settings][docs.settings].**

**A deletion of already collected data can be requested at any time by sending a message to the developers via one of the ways listed in [support][docs.support] or by sending an informal e-mail to `developer[at]lss-manager.de`.**

Every time the main page of the game is opened, telemetry data (if enabled) is sent to the LSSM server.
If a data record already exists for the user, it will be overwritten, a history of the individual data will not be saved.
If a data record has not received an update for more than 6 months, it will be deleted automatically.

## Publishing statistics

The following telemetry statistics may be published by the LSSM team:

* total number of current telemetry records for the following time periods:
    * past 6 months
    * past 30 days
    * past 7 days
    * past 24 hours
    * today's calendar date according to German time
* number of telemetry entries of users with or without premium account
* number of telemetry entries per language version
    * including split into police version and "normal" version, if available
* number of telemetry entries per browser
    * including split into major version of browser. I.e. "Firefox 100.3" and "Firefox 100.4" are combined as "Firefox 100".
* number of telemetry entries per map type
* number of telemetry entries per LSSM version
* number of telemetry entries for each of the available modules.

Inference to individual records is **not** possible through these statistics.

## Collection of metadata by third-party providers

LSSM itself does not use any tools, libraries, utilities or similar, which could collect metadata of the users.
With the use of a browser and an userscript manager, such as [Tampermonkey][tampermonkey], a collection of metadata of these may not be avoided.
All of this collected data is not accessible or viewable by the LSSM team and cannot be prevented, favored or manipulated by LSSM.
Information about the data collection of the respective software used can be found in the information sources of the respective software.

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