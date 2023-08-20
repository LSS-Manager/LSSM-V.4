---
title: Test your changes locally
lang: en_US
sidebarDepth: 2
---

# Test your changes locally
If you want to check out whether your changes work properly, you can run the changes locally.
::: warning
Please be aware that stuff like this is a little bit advanced, and you should know what you're doing.
:::

## Prerequisites
The latest version of node.js should be installed.

## Steps
1. Change the `server.url` in `/src/config.ts` to url preferred domain. (Probably something like `localhost:3000`)
2. May change the port in the `build.sh`. The relevant section is `live-server ./dist/ --port=3000 --no-browser`.
3. Run `build.sh --local`. This will start a local server on your desired host and port (default: localhost:3000)
4. Replace the last three line in the userscript with:
```js
// @grant        GM_getResourceURL
// @resource     script http://127.0.0.1:3000/core.js
// ==/UserScript==
/* global I18n, user_id */
const e=()=>{const e=document.createElement("script");e.src=GM_getResourceURL("script");e.setAttribute("type","module");e.setAttribute("async","");unsafeWindow["lssmv4-GM_Info"]=JSON.parse(JSON.stringify(GM_info));document.body.append(e)};if((!window.frameElement||window.frameElement?.src.startsWith("https"))&&!window.location.pathname.match(/^\/users\//u)&&"undefined"!=typeof user_id&&"undefined"!=typeof I18n)if(window!==window.parent&&window.parent.hasOwnProperty("lssmv4-redesign-lightbox")){const t="lssmv4-redesign-iframe-trigger-lssm-load";window.parent.addEventListener(t,e);window.addEventListener("pagehide",(()=>window.parent.removeEventListener(t,e)));window.parent["lssmv4-redesign-lightbox"].src=new URL(window.location.href).toString()}else e();
```
This will bypass ssl and cors errors by mocking the script als "local ressource"



:::tip What's next?

* Read [how to create a Pull Request](./prs.md)
* Read one of the special sections for contribution topics
  :::
