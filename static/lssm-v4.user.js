// ==UserScript==
// @name         LSS-Manager V.4
// @version      4.5.9-CZ-DK-DE-AU-GB-US-ES-MX-FI-FR-IT-JP-KR-NO-NL-PL-BR-PT-RO-RU-SK-SE-TR-UA
// @author       Aisaka | Sanni | Jan (jxn_30) | Ron31
// @description  A Script-Collection for Leitstellenspiel, Missionchief and its other language versions.
// @match        https://www.operacni-stredisko.cz/*
// @match        https://policie.operacni-stredisko.cz/*
// @match        https://www.alarmcentral-spil.dk/*
// @match        https://politi.alarmcentral-spil.dk/*
// @match        https://www.leitstellenspiel.de/*
// @match        https://polizei.leitstellenspiel.de/*
// @match        https://www.missionchief-australia.com/*
// @match        https://police.missionchief-australia.com/*
// @match        https://www.missionchief.co.uk/*
// @match        https://police.missionchief.co.uk/*
// @match        https://www.missionchief.com/*
// @match        https://police.missionchief.com/*
// @match        https://www.centro-de-mando.es/*
// @match        https://www.centro-de-mando.mx/*
// @match        https://www.hatakeskuspeli.com/*
// @match        https://poliisi.hatakeskuspeli.com/*
// @match        https://www.operateur112.fr/*
// @match        https://police.operateur112.fr/*
// @match        https://www.operatore112.it/*
// @match        https://polizia.operatore112.it/*
// @match        https://www.missionchief-japan.com/*
// @match        https://www.missionchief-korea.com/*
// @match        https://www.nodsentralspillet.com/*
// @match        https://politiet.nodsentralspillet.com/*
// @match        https://www.meldkamerspel.com/*
// @match        https://politie.meldkamerspel.com/*
// @match        https://www.operatorratunkowy.pl/*
// @match        https://policja.operatorratunkowy.pl/*
// @match        https://www.operador193.com/*
// @match        https://www.jogo-operador112.com/*
// @match        https://policia.jogo-operador112.com/*
// @match        https://www.jocdispecerat112.com/*
// @match        https://www.dispetcher112.ru/*
// @match        https://www.dispecerske-centrum.com/*
// @match        https://www.larmcentralen-spelet.se/*
// @match        https://polis.larmcentralen-spelet.se/*
// @match        https://www.112-merkez.com/*
// @match        https://www.dyspetcher101-game.com/*
// @homepage     https://proxy.lss-manager.de/v4/docs/
// @updateURL    https://proxy.lss-manager.de/v4/lssm-v4.user.js
// @downloadURL  https://proxy.lss-manager.de/v4/lssm-v4.user.js
// @icon         https://proxy.lss-manager.de/v4/docs/img/lssm.png
// @supportURL   https://proxy.lss-manager.de/v4/docs/en_US/error_report
// @run-at       document-idle
// ==/UserScript==
/* global I18n, user_id */
var _a,loadLSSM=function(){var e=document.createElement("script");e.src="".concat("https://proxy.lss-manager.de/v4/","core.js?_=").concat((new Date).getTime(),"&uid=").concat(I18n.locale,"-").concat(user_id),e.setAttribute("type","module"),e.setAttribute("async",""),document.body.append(e)};if((!window.frameElement||(null===(_a=window.frameElement)||void 0===_a?void 0:_a.src.startsWith("https")))&&!window.location.pathname.match(/^\/users\//u)&&"undefined"!=typeof user_id&&"undefined"!=typeof I18n)if(window!==window.parent&&window.parent.hasOwnProperty("lssmv4-redesign-lightbox")){var redesignTriggerEvent_1="lssmv4-redesign-iframe-trigger-lssm-load";window.parent.addEventListener(redesignTriggerEvent_1,loadLSSM),window.addEventListener("pagehide",(function(){return window.parent.removeEventListener(redesignTriggerEvent_1,loadLSSM)})),window.parent["lssmv4-redesign-lightbox"].src=new URL(window.location.href).toString()}else loadLSSM();
