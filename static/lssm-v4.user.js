// ==UserScript==
// @name         LSS-Manager V.4
// @version      4.5.2+CZ-DK-DE-AU-GB-US-ES-MX-FI-FR-IT-JP-KR-NO-NL-PL-BR-PT-RO-RU-SK-SE-TR-UA
// @author       Aisaka | Sanni | Jan (jxn_30) | Ron31
// @description  A Script-Collection for Leitstellenspiel, Missionchief and its other language versions.
// @include      /^https?:\/\/(?:w{3}\.)?(?:(policie\.)?operacni-stredisko\.cz|(politi\.)?alarmcentral-spil\.dk|(polizei\.)?leitstellenspiel\.de|(?:(police\.)?missionchief-australia|(police\.)?missionchief|(poliisi\.)?hatakeskuspeli|missionchief-japan|missionchief-korea|(politiet\.)?nodsentralspillet|(politie\.)?meldkamerspel|operador193|(policia\.)?jogo-operador112|jocdispecerat112|dispecerske-centrum|112-merkez|dyspetcher101-game)\.com|(police\.)?missionchief\.co\.uk|centro-de-mando\.es|centro-de-mando\.mx|(police\.)?operateur112\.fr|(polizia\.)?operatore112\.it|(policja\.)?operatorratunkowy\.pl|dispetcher112\.ru|(polis\.)?larmcentralen-spelet\.se)\/.*$/
// @homepage     https://proxy.lss-manager.de/v4/
// @updateURL    https://proxy.lss-manager.de/v4/lssm-v4.user.js
// @downloadURL  https://proxy.lss-manager.de/v4/lssm-v4.user.js
// @run-at       document-idle
// @icon         https://proxy.lss-manager.de/v4/docs/img/lssm.png
// @supportURL   https://proxy.lss-manager.de/v4/docs/de_DE/error_report
// ==/UserScript==
var _a,loadLSSM=function(){var e=document.createElement("script");e.src="".concat("https://proxy.lss-manager.de/v4/","core.js?_=").concat((new Date).getTime(),"&uid=").concat(I18n.locale,"-").concat(user_id),e.setAttribute("type","module"),e.setAttribute("async",""),document.body.appendChild(e)};if((!window.frameElement||(null===(_a=window.frameElement)||void 0===_a?void 0:_a.src.startsWith("https")))&&!window.location.pathname.match(/^\/users\//)&&"undefined"!=typeof user_id&&"undefined"!=typeof I18n)if(window!==window.parent&&window.parent.hasOwnProperty("lssmv4-redesign-lightbox")){var redesignTriggerEvent_1="lssmv4-redesign-iframe-trigger-lssm-load";window.parent.addEventListener(redesignTriggerEvent_1,loadLSSM),window.addEventListener("pagehide",(function(){return window.parent.removeEventListener(redesignTriggerEvent_1,loadLSSM)})),window.parent["lssmv4-redesign-lightbox"].src=new URL(window.location.href).toString()}else loadLSSM();
