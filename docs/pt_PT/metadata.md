---
title: Metadados
lang: pt_PT
sidebarDepth: 0
---

# Compilação de metadados do utilizador

Ao usar `LSSM` (Leitstellenspiel Manager, userscript para o navegador) o utilizador aceita a compilação de metadados. Os seguintes dados serão armazenados:

* ID de utilizador único
    * incluindo Segredo único (único, sequencia de caracteres não públicados para identificação)
* nome de utilizador
* quantidade de edifícios
* navegador em utilização
    * versão incluída
* data/hora da compilação de metadados
* módulos ativos
* idioma do jogo
    * incluindo informação da versão do jogo (polícia (se estiver disponível) ou "normal")
* que tipo de mapa está ativado (OSM ou MapKit)
* versão do LSSM
* versão do LSSM (`stable`, `beta` ou uma versão de visualização)
* versão do LSSM userscript instalado

Estes dados são usados para melhorar a extensão, tal como guiar o desenvolvimento de existentes e futuros módulos.
Os dados também são usados como base para estatísticas interessantes, que podem ser publicadas, por exemplo como notícias (para mais informação, veja [em baixo](#Publicação-de-estatísticas)).

**O utilizador pode (des)ativar a compilação destes dados a qualquer momento nas [configurações][docs.settings].**

**Podes pedir a eliminação de dados já compilados a qualquer momento ao enviar uma mensagem aos desenvolvedores através de um dos meios listado em [suporte][docs.support] ou ao enviar um e-mail informal para `developer[at]lss-manager.de`.**

Sempre que a página principal do jogo for aberta, os dados (se ativado) serão enviados para o servidor LSSM.
Se já exister um registro de dados para o utilizador, os dados serão sobrescritos, o histórico do individual não será guardado.
Se o registro de dados não receber uma atualização durante mais de 6 meses, os dados serão apagados automáticamente.

## Publicação de estatísticas

As estatísticas seguintes podem ser publicadas pela equipa LSSM:

* número total de registros de telemetria atuais para os seguintes períodos de tempo:
    * últimos 6 meses
    * últimos 30 dias
    * últimos 7 dias
    * últimas 24 horas
    * data do calendário do dia de acordo com o horário Alemão
* número de entradas de telemetria de utilizadores com ou sem conta premium
* número de entradas de telemetria por idioma
    * incluindo divisão entre versão "normal" e versão polícia, se disponível
* número de entradas de telemetria por navegador
    * incluindo divisão na versão principal do navegador. Por exemplo "Firefox 100.3" e "Firefox 100.4" serão combinados como "Firefox 100" 
* número de entradas de telemetria por tipo de mapa
* número de entradas de telemetria por versão LSMM
* número de entradas de telemetria para cada um dos módulos disponíveis.

Inferência para registros individuais **não** é possível através de estastísticas.

## Compilação de metadados por fornecedores terceiros

O próprio LSSM não usa ferramentas, bibliotecas, utilitários ou similares, que podem coletar metadados dos utilizadores.
Com o uso de navegadores e um userscript manager, tal como [Tampermonkey][tampermonkey], é inevitável a compilação de metadados.
Todas as compilações de dados não são acessíveis ou visíveis pela equipa LSSM e não podem ser prevenido, favorecido ou manipulado pela equipa LSSM.
Informação sobre a compilação de dados do respectivo software usado pode ser encontradas nas fontes de informação do respectivo software.

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