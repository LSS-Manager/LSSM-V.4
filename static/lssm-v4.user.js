// ==UserScript==
// @name         LSS-Manager V.4 - Dev Version
// @version      4.0.5+CZ-DK-DE-GR-AU-GB-US-ES-MX-FI-FR-IT-JP-KR-NO-NL-PL-BR-PT-RO-RU-SK-SE-TR-UA
// @author       Aisaka | Sanni | Jan (jxn_30)
// @description  Das Tool für das LSS in der Version 4
// @include      /^https?:\/\/(?:w{3}\.)?(?:operacni-stredisko\.cz|alarmcentral-spil\.dk|leitstellenspiel\.de|missionchief\.gr|(?:missionchief-australia|missionchief|hatakeskuspeli|missionchief-japan|missionchief-korea|nodsentralspillet|meldkamerspel|operador193|jogo-operador112|jocdispecerat112|dispecerske-centrum|112-merkez|dyspetcher101-game)\.com|missionchief\.co\.uk|centro-de-mando\.es|centro-de-mando\.mx|operateur112\.fr|operatore112\.it|operatorratunkowy\.pl|dispetcher112\.ru|larmcentralen-spelet\.se)\/.*$/
// @homepage     https://v4.lssm.ledbrain.de/
// @updateURL    https://v4.lssm.ledbrain.de/lssm-v4.user.js
// @downloadURL  https://v4.lssm.ledbrain.de/lssm-v4.user.js
// @run-at       document-idle
// @icon         https://v4.lssm.ledbrain.de/docs/img/lssm.png
// @supportURL   https://v4.lssm.ledbrain.de/docs/de_DE/error_report
// ==/UserScript==
var _a;if((!window.frameElement||(null===(_a=window.frameElement)||void 0===_a?void 0:_a.src.startsWith("https")))&&"undefined"!=typeof user_id&&"undefined"!=typeof I18n){var script=document.createElement("script");script.src="https://v4.lssm.ledbrain.de/"+I18n.locale+"/core.js?_="+(new Date).getTime()+"&uid="+I18n.locale+"-"+user_id,script.setAttribute("type","module"),script.setAttribute("async",""),document.body.appendChild(script)}
