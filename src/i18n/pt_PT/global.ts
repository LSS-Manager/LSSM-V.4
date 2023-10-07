export default {
    updateUserscript: {
        title: 'Userscript desatualizado',
        text: `Caro LSSM-Utilizador,<br>
        infelizmente o nosso LSSM V.4 userscript está desatualizado. Na última versão fizemos alterações ao userscript, que serão importantes nas funcionalidades do LSSM V.4.<br>
        Precisas no mínimo da versão {minVersion}, faz o teu update através de {updateLink}.<br>
        Por vezes carregar no link do update pode não funcionar (por razões desconhecidadas). Podes fazer o update através do Tampermonkey (carrega no icon do tampermonkey do teu browser, depois "Overview". Na caixa à frente do LSSM userscript e seleciona "Update").<br>
        Se não resultar, edita o LSSM Script no Tampermonkey repondo o conteúdo do script pelo conteúdo {bypassLink}.<br>
        Por vezes, o LSSM é instalado várias vezes depois do update. Neste caso desinstala/remove todas as instalções do LSSM V.4 no Tampermonkey e depois reinstala o LSSM V.4.<br><br>
        Melhores cumprimentos,<br>
        A equipa LSSM`,
        close: 'Ok',
    },
    error: {
        title: 'LSS Manager: Erro',
        msg: 'Se este erro ocorre frequentemente, por favor reporte à equipa LSSM!',
        requestIssue: {
            title: 'Solicitação Errada: Estado {status}',
            text: `Ouch, infelizmente ocorreu um erro com esta solicitação de servidor:<br>
<b>Estado</b>: <code>{status}</code> <code>{statusText}</code><br>
<b>Link</b>: <em><code>{method}</code></em> <code>{url}</code><br>
<b>Conteúdo</b>: <code>{feature}</code><br>
<b>Duração</b>: <code>{duration}ms</code><br>
<b>Utilizador</b>: <code>{uid}</code><br>
<b>Data</b>: <code>{timestamp}</code>
<br>
Por favor tenta fazer a última ação novamente.<br>
Se várias solicitações falharem em um curto espaço de tempo, pode ser causado por problemas de servidor. Por favor tenta novamente mais tarde.`,
            close: 'Ok',
        },
    },
    warnings: {
        version: {
            title: 'Versão LSSM errada',
            text: 'Caro utilizador, infelizmente descobrimos que não estás a utilizar a última versão do LSS Manager. A última versão é {version}, mas estás a usar {curver}. Por favor, recarrega o teu jogo sem cache (com Ctrl + F5, em dispositivos Apple command + R), isto deve resolver o erro. Se o erro persistir, por favor reporte à nossa equipa! Se usas a versão antiga não podemos garantir que todas as funcionalidades do LSS-Manager funcionem corretamente.',
            close: 'Fechar a mensagem e recarregar (recomendado)',
            abort: 'Fechar a mensagem sem recarregar o jogo',
        },
    },
    anniversary: {
        closeNote: 'Dica: Podes carregar nos balões para fechar!',
    },
    settings: {
        name: 'Configurações Gerais',
        labelInMenu: {
            title: 'Rótulo em vez de ícone no menu',
            description:
                'Exibe uma rótulo na barra de navegação em vez do ícone do LSSM',
        },
        allowTelemetry: {
            description:
                'Controle se LSS-Manager pode enviar dados de telemetry para ajudar a desenvolver esta extenção.',
            title: 'Permitir telemetria',
        },
        branch: {
            description:
                'Escolhe entre Stable, Beta ou uma versão de visualização. Nota que versões de visualização serão automáticamente apagadas apróximadamente 7 dias depois da última atualização.',
            title: 'Escolhe versão',
        },
        iconBg: {
            description: 'Muda o fundo do ícone do LSSM!',
            title: 'Fundo do ícone do LSSM',
        },
        iconBgAsNavBg: {
            description:
                'Pinte a barra de navegação toda com a mesma cor de fundo do ícone do LSSM!',
            title: 'Pinte a barra de navegação',
        },
        loadingIndicator: {
            description:
                'Se estiver ativado, LSSM exibe um pequeno círculo de carregamento no canto inferior direito quando estiver a carregar.',
            title: 'Mostre o progresso de carregamento',
        },
        osmDarkTooltip: {
            description:
                'Esta configuração escurece as dicas de contexto no mapa se o modo escuro estiver ativo.',
            title: 'Dicas de contexto escuras no mapa',
        },
        osmDarkControls: {
            description:
                'Esta configuração escurece os butões no mapa se o modo escuro estiver ativo.',
            title: 'Butões escuros no mapa',
        },
        v3MenuAsSubmenu: {
            title: 'Menu V3 como sub-menu',
            description:
                'Move o menu do LSSM V3 para o menu do V4 para livrar espaço na barra de navegação.',
        },
        debugMode: {
            title: 'Debug-Mode',
            description:
                'Um pequno modo debug que mostra informação útil na consola do navegador. É recomendado ativar apenas se for pedido pela equipa do LSSM, porque a consola vai ter muitas mensagens.',
        },
    },
};
