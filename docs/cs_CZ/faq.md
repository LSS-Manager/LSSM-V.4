---
title: FAQ ❓
lang: cs_CZ
sidebarDepth: 3
---

# FAQ ❓

### What does LSS Manager cost?
LSS-Manager is a free offer - we do not intend to change this.

::: warning donations
There are a few nice users who would like to donate money to us. But: The LSS-Manager is and remains free of charge. Also we will not accept any donations for this project.

This has several reasons:

* This project is developed on a voluntary basis in the spare time of the participating developers
* A subscription variant, similar to the Premium in the game would put too much pressure on us personally to continue programming beyond our desire.
* For legal reasons we cannot accept donations:
    * If we would found a company for LSS Manager so that we could receive donations, this would have no future, because a company without expenses cannot be a company.
    * If we would run the servers, which are currently running LSS Manager, through a company, they would immediately eat up the income.

Therefore, besides the idea of voluntariness, it makes no sense for us to take money for the LSS-Manager.
:::

### How can I contribute to LSS Manager?
The "normal" user can [report bugs][error] or [make suggestions][suggestions].

We are currently designing a style guide for developers, so that they too can easily add their own plugins to LSSM. We also tried to keep our code structure clear and understandable. However, adding a plugin does not in any way imply joining the team.

### How do I report bugs?
Please have a look at our [report bugs][error] page.

### Where can I get help?
Through our support. You can find more information [here][support].

### How can I submit ideas?
On the [suggestions][suggestions] page we have put together some information about it.

### In which browsers does LSS Manager work?
Only desktop browsers are listed here, as mobile browsers are not officially supported.
This table is not necessarily correct yet and will be updated when new information is available!

Since we want to keep the latest coding standards throughout, a modern and up-to-date browser is necessary and recommended - if only for security reasons, even outside the game.

::: warning compatibility
A compatibility listed here does not guarantee functionality. This is only information collected and evaluated by third parties.
:::

<table>
<thead>
    <tr>
        <th>Browser</th>
        <th>min. version</th>
        <th>Download</th>
    </tr>
</thead>
<tbody>
    <tr v-for="({supported, download}, browser) in $themeConfig.variables.browsers">
        <td>{{ browser.replace(/^./, $1 => $1.toUpperCase()) }}</td>
        <td>{{ supported }}</td>
        <td><a :href="download" target="_blank">Download</a></td>
    </tr>
</tbody>
</table>

::: danger Internet Explorer and Safari
These two browsers can be described as the "problem children" of a modern web developer. There are some functions that do not work in them, or require additional code.

We don't see the point of doing this everywhere and officially **do not** support these two browsers.
:::

### I want to share my setup with friends or use it on multiple devices. Is that possible?
Currently it is not possible, but we are working on it.

### Is there a way to save settings account bound so that you don't have to import them on another device?
Currently we do not offer this, but an implementation of this feature is planned.


[support]: support.md
[error]: error_report.md
[suggestions]: suggestions.md
