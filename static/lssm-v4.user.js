// ==UserScript==
// @name         LSS-Manager V.4 - Dev Version
// @version      4.0.2+DE-NL-US-UK-AU-ES-PL-SE-IT-FR-RU-DK-NO-CZ-TR-PT-BR-MX-UA-JP-RO
// @author       Aisaka | Sanni | Jan (jxn_30)
// @description  Das Tool für das LSS in der Version 4
// @include      /^https?:\/\/[www.]*(?:leitstellenspiel\.de|meldkamerspel\.com|missionchief\.com|missionchief\.co.uk|missionchief-australia\.com|centro-de-mando\.es|operatorratunkowy\.pl|larmcentralen-spelet\.se|operatore112\.it|operateur112\.fr|dispetcher112\.ru|alarmcentral-spil\.dk|nodsentralspillet\.com|operacni-stredisko\.cz|112-merkez\.com|operador112\.pt|operador193\.com|centro-de-mando\.mx|dyspetcher101-game\.com|missionchief-japan\.com|jocdispecerat112\.com)\/.*$/
// @homepage     https://v4.lssm.ledbrain.de/
// @updateURL    https://v4.lssm.ledbrain.de/lssm-v4.user.js
// @run-at       document-idle
// ==/UserScript==
const script=document.createElement("script");script.src=`https://v4.lssm.ledbrain.de/${I18n.locale}/core.js?_=${(new Date).getTime()}`,script.setAttribute("type","module"),script.setAttribute("async",""),document.querySelector("body").appendChild(script);
