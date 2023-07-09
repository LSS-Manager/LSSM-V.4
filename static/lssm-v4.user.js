// ==UserScript==
// @name         LSS-Manager V.4
// @version      4.7.7-CZ-DK-DE-AU-GB-US-ES-MX-FI-FR-IT-JP-KR-NO-NL-PL-BR-PT-RO-RU-SK-SE-TR-UA
// @author       The LSSM-Team: Sanni, Jan (jxn_30), Ron31, Crazycake
// @description  LSSM V4 is a Script-Collection for Leitstellenspiel, Missionchief, Meldkamerspel and its other language versions.
// @namespace    https://lss-manager.de/
// @homepage     https://docs.lss-manager.de/
// @downloadURL  https://v4.lss-manager.de/lssm-v4.user.js
// @updateURL    https://v4.lss-manager.de/lssm-v4.user.js
// @supportURL   https://docs.lss-manager.de/en_US/error_report
// @icon         https://docs.lss-manager.de/img/lssm.png
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
// @run-at       document-idle
// @grant        GM_info
// @grant        unsafeWindow
// ==/UserScript==
/* global I18n, user_id */
const e=()=>{const e=document.createElement("script");e.src=`https://v4.lss-manager.de/core.js?_=${Math.floor(Date.now()/6e5)}&branch=${localStorage.getItem("lssmv4_branch")??"stable"}`;e.setAttribute("type","module");e.setAttribute("async","");unsafeWindow["lssmv4-GM_Info"]=JSON.parse(JSON.stringify(GM_info));document.body.append(e)};if((!window.frameElement||window.frameElement?.src.startsWith("https"))&&!window.location.pathname.match(/^\/users\//u)&&"undefined"!=typeof user_id&&"undefined"!=typeof I18n)if(window!==window.parent&&window.parent.hasOwnProperty("lssmv4-redesign-lightbox")){const t="lssmv4-redesign-iframe-trigger-lssm-load";window.parent.addEventListener(t,e);window.addEventListener("pagehide",(()=>window.parent.removeEventListener(t,e)));window.parent["lssmv4-redesign-lightbox"].src=new URL(window.location.href).toString()}else e();
