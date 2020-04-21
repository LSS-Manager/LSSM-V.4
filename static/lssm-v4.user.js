// ==UserScript==
// @name         LSS-Manager V.4 - Dev Version
// @version      4.0.4+DE-NL-US-GB-AU-ES-PL-SE-IT-FR-RU-DK-NO-CZ-TR-PT-BR-MX-UA-JP-RO-KR-FI
// @author       Aisaka | Sanni | Jan (jxn_30)
// @description  Das Tool für das LSS in der Version 4
// @include      /^https?:\/\/[www.]*(leitstellenspiel|meldkamerspel|missionchief|missionchief\.co|missionchief-australia|centro-de-mando|operatorratunkowy|larmcentralen-spelet|operatore112|operateur112|dispetcher112|alarmcentral-spil|nodsentralspillet|operacni-stredisko|112-merkez|jogo-operador112|operador193|centro-de-mando|dyspetcher101-game|missionchief-japan|jocdispecerat112|missionchief-korea|hatakeskuspeli).(de|com|uk|es|pl|se|it|fr|ru|dk|cz|mx)\/.*$/
// @homepage     https://v4.lssm.ledbrain.de/
// @updateURL    https://v4.lssm.ledbrain.de/lssm-v4.user.js
// @run-at       document-idle
// ==/UserScript==
if(user_id&&I18n){const e=document.createElement("script");e.src=`https://v4.lssm.ledbrain.de/${I18n.locale}/core.js?_=${(new Date).getTime()}&uid=${I18n.locale}-${user_id}`,e.setAttribute("type","module"),e.setAttribute("async",""),document.querySelector("body").appendChild(e)}
