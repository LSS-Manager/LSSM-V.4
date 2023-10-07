---
title: LSS-Manager V.4
lang: pt_PT
sidebarDepth: 2
---

# Wiki 🇵🇹 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[Estado do servidor LSSM][lssm.status]

[Estado do jogo](https://status.lss-manager.de/status/missionchief)

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