// ==UserScript==
// @name         LSS-Manager V.4 - Dev Version
// @version      4.0.0+de-NL-US-UK-AU-ES-PL-SE-IT-FR-RU-DK-NO-CZ-TR-PT-BR-MX-UA-JP
// @description  Das Tool für das LSS in der Version 4
// @include      *://www.leitstellenspiel.de/*
// @include      *://www.meldkamerspel.com/*
// @include      *://www.missionchief.com/*
// @include      *://www.missionchief.co.uk/*
// @include      *://www.missionchief-australia.com/*
// @include      *://www.centro-de-mando.es/*
// @include      *://www.operatorratunkowy.pl/*
// @include      *://www.larmcentralen-spelet.se/*
// @include      *://www.operatore112.it/*
// @include      *://www.operateur112.fr/*
// @include      *://www.dispetcher112.ru/*
// @include      *://www.alarmcentral-spil.dk/*
// @include      *://www.nodsentralspillet.com/*
// @include      *://www.operacni-stredisko.cz/*
// @include      *://www.112-merkez.com/*
// @include      *://www.operador112.pt/*
// @include      *://www.operador193.com/*
// @include      *://www.centro-de-mando.mx/*
// @include      *://www.dyspetcher101-game.com/*
// @include      *://www.missionchief-japan.com/*
// @homepage     https://v4.lssm.ledbrain.de/
// @updateURL    https://v4.lssm.ledbrain.de/lssm-v4.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==
const script=document.createElement("script");script.src=`https://v4.lssm.ledbrain.de/${I18n.locale}/core.js`,script.setAttribute("type","module"),script.setAttribute("async",""),document.querySelector("body").appendChild(script);
