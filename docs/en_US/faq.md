---
title: FAQ ❓
lang: en_US
sidebarDepth: 3
---

# FAQ ❓

## LSS-Manager does not load in my game. What should I do?

There are two possibilities:

### 1. LSS-Manager does not support your game yet

LSS-Manager only works in games that it has translations for. We (the LSSM-Team) decided not to add translations for all games, because it would take too much time, and we don't speak most of the languages ourselves.

If you want LSSM to work in your game, you can help us by adding the translations. Help with that can be found on our <discord/>. Please also have a look at our [contribution guide][contributing] which guides on how to do translations.

### 2. There's a bug in LSS-Manager

In that case, please refer to [report bugs][docs.error_report] or [support][docs.support].

## What does LSS Manager cost?
LSS-Manager is a free offer - we do not intend to change this.

Would you still like to support us financially? Then you are welcome to send us a donation via [OpenCollective][lssm.donations]. We are happy about any support!

:::warning donations
All donations will only be used to cover our running costs. We have no intention of making a profit and will not distribute any profits.

Donations have no direct influence on the development of the LSSM! We will not invest more or less time and there will be no direct benefits for individual users such as premium features. The development of the LSSM will remain on a voluntary basis in our spare time and the use will remain completely free for all users!

Of course, we are happy about any donation, but we would still like to point out that we would like to keep the project running as before even without the donations.
:::

## How can I contribute to LSS Manager?
The end user can [report bugs][docs.error_report] or [make suggestions][docs.suggestions]. For translations, please refer to our [contribution guide][contributing].

We are currently designing a style guide for developers, so that they too can easily add their own plugins to LSSM. We have tried to keep our code structure clear and understandable. However, adding a plugin does not in any way imply joining the team.

## How do I report bugs?
Please have a look at our [report bugs][docs.error_report] page.

## Where can I get support?
Through our support system [here][docs.support].

## How can I submit ideas?
On the [suggestions][docs.suggestions] page.

## Which browsers does LSS Manager work in?
Only desktop browsers are listed here, as mobile browsers are not officially supported.

Since we want to keep the latest coding standards throughout, a modern and up-to-date browser is necessary and recommended - if only for security reasons, even outside the game.

<browser-support-table/>

:::danger Internet Explorer and Safari
These two browsers can be described as the "problem children" of a modern web developer. There are some functions that do not work in them, or require additional code.

We don't see the point of doing this everywhere and officially **do not** support these two browsers.
:::

### Using LSSM on a smartphone
We regularly receive requests asking whether the LSSM can also be used on mobile devices.

The answer is: Yes - through detours - but we do not offer any support for this. Activation is at your own risk.

How does it work?

1. Install Firefox for Android (Must be at least version 110)
2. Start Firefox and open the context menu (three dots in the menu bar)
3. Under "recommended addons" Tampermonkey should now be suggested.
4. continue with the normal [installation instructions][docs.home]

## I want to share my setup with friends or use it on multiple devices. Is that possible?
Yes, it is. Just open the [settings][docs.settings] and click `Export`, to download a config-file. `Import` lets you choose a config-file to import the settings.

## Is there a way to save settings account bound so that you don't have to import them on another device?
This is not currently supported, but we plan to implement this in the future.

## Where can I see if the LSSM servers are online?
Best here: [https://status.lss-manager.de/](https://status.lss-manager.de/)

Or in the <discord-channel channel="uptime"/> on our <discord/>

[contributing]: contributing.md

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