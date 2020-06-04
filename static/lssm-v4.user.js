// ==UserScript==
// @name         LSS-Manager V.4 - TypeScript
// @version      4.0.5+CZ-DK-DE-GR-AU-GB-US-ES-MX-FI-FR-IT-JP-KR-NO-NL-PL-BR-PT-RO-RU-SK-SE-TR-UA
// @author       Aisaka | Sanni | Jan (jxn_30)
// @description  Das Tool für das LSS in der Version 4
// @include      /^https?:\/\/(?:w{3}\.)?(?:operacni-stredisko\.cz|alarmcentral-spil\.dk|leitstellenspiel\.de|missionchief\.gr|(?:missionchief-australia|missionchief|hatakeskuspeli|missionchief-japan|missionchief-korea|nodsentralspillet|meldkamerspel|operador193|jogo-operador112|jocdispecerat112|dispecerske-centrum|112-merkez|dyspetcher101-game)\.com|missionchief\.co\.uk|centro-de-mando\.es|centro-de-mando\.mx|operateur112\.fr|operatore112\.it|operatorratunkowy\.pl|dispetcher112\.ru|larmcentralen-spelet\.se)\/.*$/
// @homepage     https://v4.lssm.ledbrain.de/ts/
// @updateURL    https://v4.lssm.ledbrain.de/ts/lssm-v4.user.js
// @downloadURL  https://v4.lssm.ledbrain.de/ts/lssm-v4.user.js
// @run-at       document-idle
// @icon         https://v4.lssm.ledbrain.de/ts/docs/img/lssm.png
// @supportURL   https://v4.lssm.ledbrain.de/ts/docs/de_DE/error_report
// ==/UserScript==
if((!window.frameElement||window.frameElement&&window.frameElement.src.startsWith("https"))&&void 0!==typeof user_id&&void 0!==typeof I18n){const e=document.createElement("script");e.src=`https://v4.lssm.ledbrain.de/ts/${I18n.locale}/core.js?_=${(new Date).getTime()}&uid=${I18n.locale}-${user_id}`,e.setAttribute("type","module"),e.setAttribute("async",""),document.querySelector("body").appendChild(e)}
