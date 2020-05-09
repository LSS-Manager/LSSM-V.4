// ==UserScript==
// @name         LSS-Manager V.4 - Dev Version
// @version      4.0.5+DE-NL-US-GB-AU-ES-PL-SE-IT-FR-RU-DK-NO-CZ-TR-PT-BR-MX-UA-JP-RO-KR-FI-SK-GR
// @author       Aisaka | Sanni | Jan (jxn_30)
// @description  Das Tool für das LSS in der Version 4
// @include      /^https?:\/\/(?:w{3}\.)?(?:leitstellenspiel\.de|(?:meldkamerspel|missionchief|missionchief-australia|nodsentralspillet|112-merkez|jogo-operador112|operador193|dyspetcher101-game|missionchief-japan|jocdispecerat112|missionchief-korea|hatakeskuspeli|dispecerske-centrum)\.com|missionchief\.co\.uk|centro-de-mando\.es|operatorratunkowy\.pl|larmcentralen-spelet\.se|operatore112\.it|operateur112\.fr|dispetcher112\.ru|alarmcentral-spil\.dk|operacni-stredisko\.cz|centro-de-mando\.mx|missionchief\.gr)\/.*$/
// @homepage     https://v4.lssm.ledbrain.de/
// @updateURL    https://v4.lssm.ledbrain.de/lssm-v4.user.js
// @downloadURL  https://v4.lssm.ledbrain.de/lssm-v4.user.js
// @run-at       document-idle
// @icon         https://v4.lssm.ledbrain.de/docs/img/lssm.png
// @supportURL   https://v4.lssm.ledbrain.de/docs/de_DE/error_report
// ==/UserScript==
if((!window.frameElement||window.frameElement&&window.frameElement.src.startsWith("https"))&&void 0!==typeof user_id&&void 0!==typeof I18n){const e=document.createElement("script");e.src=`https://v4.lssm.ledbrain.de/${I18n.locale}/core.js?_=${(new Date).getTime()}&uid=${I18n.locale}-${user_id}`,e.setAttribute("type","module"),e.setAttribute("async",""),document.querySelector("body").appendChild(e)}
