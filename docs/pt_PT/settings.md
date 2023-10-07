---
title: Configurações ⚙️
lang: pt_PT
---

# Configurações ⚙️

As configurações de todos os módulos são gerenciados centralmente nas configurações. Apenas as configurações de módulos ativos podem ser alteradas.

Ao clicar nos butões `Exportar` e `Importar`, podes guardar as configurações num ficheiro e/ou partilhar com os teus amigos. Num próximo futuro, gostariamos de oferecer a possibilidade de guardar as configurações na conta. Isto quer dizer que as configurações passam a ser guardadas na conta em vez de no dispositivo.

::: tip Alterações
Assim que saíres da página de configurações e tiveres guardado as alterações, o jogo vai recarregar para aplicar todas as configurações alteradas mais facilmente.
Se tiveres alterações não guardadas, irás receber uma notificação quando fechares a página de configurações.
:::
::: danger Reverter Configurações
Atenção: Se reverteres as configurações, as mesmas não poderam ser recuperadas sem um ficheiro que tenhas exportado previamente!
:::


## Moment.js

Esta secção fornece alguma informação em como configurar a data/hora nas configurações, por exemplo no módulo [relógio](modules/clock.md).

Nós usamos [Moment.js](https://momentjs.com) para oferecer uma grande seleção de opções. Se quiseres ver o documento original, podes encontrá-lo [aqui](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/).

### Editor-Live
Tenta o teu próprio formato aqui e veja uma pré-visualização do resultado! Veja informações sobre configurações em baixo.

<momentjs-preview/>

### Variáveis
<momentjs-variables/>

### Forma curtas de localidade
<momentjs-shorts/>

### Texto Normal
Se quiseres incluir outro texto com o teu relógio como por exemplo `hora`, simplesmente escrevendo `LTS hora` não irá funcionar pois o resultado será `11:13:27 AM 11ora`. De forma a incluir o texto que não deve ser formatado, encaixe o texto com `[]`. `LTS [Hora]` ou `LTS [H]ora` irá resultar em `11:13:27 AM Hora`.

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /en_US/
[docs.apps]: /en_US/apps.md
[docs.appstore]: /en_US/appstore.md
[docs.bugs]: /en_US/bugs.md
[docs.error_report]: /en_US/error_report.md
[docs.faq]: /en_US/faq.md
[docs.metadata]: /en_US/metadata.md
[docs.other]: /en_US/other.md
[docs.settings]: /en_US/settings.md
[docs.suggestions]: /en_US/suggestions.md
[docs.support]: /en_US/support.md
[games.self]: https://missionchief.com
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug