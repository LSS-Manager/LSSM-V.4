---
title: LSS-Manager V.4
lang: pt-PT
sidebarDepth: 2
---

# Wiki 🇵🇹 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status][lssm.status]

[Game-Online-Status](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## Sobre LSSM

LSS MANAGER V.4 é uma extensão para [Jogo-Operador112.com][games.self] e outros idiomas do jogo.

Com esta extensão, uma appstore é adicionada ao jogo aonde podes decidir que módulos queres ativar.

Módulos desativados não são carregados no teu navegador para melhorar o desempenho do jogo.

## Instalação 📥

[Ao usar LSSM aceitas a compilação de metadados.][docs.metadata]

Uma tabela com quais navegadores são compatível com LSSM pode ser encontrada em [FAQ](faq.md)

::: tip Usar LSSM no telemóvel
Não suportamos o uso de LSSM no telemóvel. Enquanto Firefox no telemóvel permite Extras, não garantimos funcionalidade total.

De momento **não** planeamos oferecer suporte oficial para nagevadores móveis.
:::

### Etapa 1: Instalar Tampermonkey
Instale a extanção Tampermonkey no seu navegador.

<tampermonkey-download-table/>

Para outros navegadores, podes instalar Tampermonker em [tampermonkey.net][tampermonkey].

::: warning
Por favor, note que oficialmente não suportamos navegadores antigos, navegadores móveis e Apple Safari. Portanto, o suporte para esses navegadores não será garantido nem provável.
:::

### Etapa 2: Userscript
Se Tampermonkey for instalado no seu navegador com sucesso, podes clicar [aqui][lssm.userscript] ou criar um novo userscript com o seguinte conteúdo:

@[code js](@userscript)

#### Step 2.5: Activate developer mode or switch to Firefox

If you use "Google Chrome" or a browser based on Chromium, it may be necessary to activate developer mode in order to execute userscripts. If you don't want to switch to Firefox, you can find the following at [https://www.tampermonkey.net/faq.php?locale=en#Q209](https://www.tampermonkey.net/faq.php?locale=en#Q209) for instructions on how to activate developer mode.

### Etapa 3: Ativar
O indicador LSSM é um ícone presente no canto superior direito do jogo.
Se não encontrares o ícone, clica no ícone Tampermonkey no teu navegador e confirme se o butão do LSS-Manager script está configarado como `on`.

Se houver algum problema, fique à vontade para contactar [Suporte][docs.support].

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /pt_PT/
[docs.apps]: /pt_PT/apps.md
[docs.appstore]: /pt_PT/appstore.md
[docs.bugs]: /pt_PT/bugs.md
[docs.error_report]: /pt_PT/error_report.md
[docs.faq]: /pt_PT/faq.md
[docs.metadata]: /pt_PT/metadata.md
[docs.other]: /pt_PT/other.md
[docs.settings]: /pt_PT/settings.md
[docs.suggestions]: /pt_PT/suggestions.md
[docs.support]: /pt_PT/support.md
[games.self]: https://jogo-operador112.com
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug