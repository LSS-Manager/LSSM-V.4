// ==UserScript==
// @name         LSS-Manager V.4
// @version      4.1.11+CZ-DK-DE-AU-GB-US-ES-MX-FI-FR-IT-JP-KR-NO-NL-PL-BR-PT-RO-RU-SK-SE-TR-UA
// @author       Aisaka | Sanni | Jan (jxn_30) | Ron31
// @description  Das Tool für das LSS in der Version 4
// @include      /^https?:\/\/(?:w{3}\.)?(?:(policie\.)?operacni-stredisko\.cz|(politi\.)?alarmcentral-spil\.dk|(polizei\.)?leitstellenspiel\.de|(?:(police\.)?missionchief-australia|(police\.)?missionchief|(poliisi\.)?hatakeskuspeli|missionchief-japan|missionchief-korea|(politiet\.)?nodsentralspillet|(politie\.)?meldkamerspel|operador193|(policia\.)?jogo-operador112|jocdispecerat112|dispecerske-centrum|112-merkez|dyspetcher101-game)\.com|(police\.)?missionchief\.co\.uk|centro-de-mando\.es|centro-de-mando\.mx|(police\.)?operateur112\.fr|(polizia\.)?operatore112\.it|(policja\.)?operatorratunkowy\.pl|dispetcher112\.ru|(polis\.)?larmcentralen-spelet\.se)\/.*$/
// @homepage     https://proxy.lss-manager.de/v4/
// @updateURL    https://proxy.lss-manager.de/v4/lssm-v4.user.js
// @downloadURL  https://proxy.lss-manager.de/v4/lssm-v4.user.js
// @run-at       document-idle
// @icon         https://proxy.lss-manager.de/v4/docs/img/lssm.png
// @supportURL   https://proxy.lss-manager.de/v4/docs/de_DE/error_report
// ==/UserScript==
var _a;if((!window.frameElement||(null===(_a=window.frameElement)||void 0===_a?void 0:_a.src.startsWith("https")))&&"undefined"!=typeof user_id&&"undefined"!=typeof I18n){var script=document.createElement("script");script.src="https://proxy.lss-manager.de/v4/core.js?_="+(new Date).getTime()+"&uid="+I18n.locale+"-"+user_id,script.setAttribute("type","module"),script.setAttribute("async",""),document.body.appendChild(script)}
