export default {
    updateUserscript: {
        title: 'Userscript desatualizado',
        text: `Caro LSSM-User,<br>
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
        msg: 'Se este erro ocorre frequentemente, por favor reporta à equipa LSSM!',
        requestIssue: {
            title: 'Erroneous request: Status {status}',
            text: `Ouch, infelizmente ocorreu um erro com esta solicitação de servidor:<br>
<b>Estado</b>: <code>{status}</code> <code>{statusText}</code><br>
<b>URL</b>: <em><code>{method}</code></em> <code>{url}</code><br>
<b>Feature</b>: <code>{feature}</code><br>
<b>Duração</b>: <code>{duration}ms</code><br>
<b>User</b>: <code>{uid}</code><br>
<b>Timestamp</b>: <code>{timestamp}</code>
<br>
Por favor tenta fazer a última ação novamente.<br>
Se várias solicitações falharem em um curto espaço de tempo, pode ser por cause de problemas de servidor. Por favor tenta novamente mais tarde.`,
            close: 'Ok',
        },
    },
    warnings: {
        version: {
            title: 'Versão errada LSS',
            text: 'Caro utilizador, infelizmente descobrimos que não estás a usar a última versão do LSS Manager. A última versão é {version}, mas estás a usar {curver}. Por favor recarrega o teu jogo sem cache (com Ctrl + F5, em dispositivos Apple command + R), isto deve resolver o bug. Se o erro persistir, por favor reporta à nossa equipa! Se usas a versão antiga não podemos garantir que todas as funcionalidades do LSS-Manager funcionem corretamente.',
            close: 'Fechar a mensagem e recarregar (recomendado)',
            abort: 'Fechar a mensagem sem recarregar o jogo',
        },
    },
    anniversary: {
        closeNote: 'Dica: Podes carregar nos balões para fechar!',
    },
    settings: {
        name: 'Definições Gerais',
        labelInMenu: {
            title: 'Rótulo em vez de ícone no menu',
            description:
                'Exibe uma rótulo na barra de navegação em vez do ícone do LSSM',
        },
        allowTelemetry: {
            description:
                'Controla se LSS-Manager pode enviar Data para ajudar a desenvolver esta extenção.',
            title: 'Permitir Telemetry',
        },
        branch: {
            description:
                'Escolhe entre Estável, Beta ou uma versão de visualização. Nota que versões de visualização serão automáticamente apagadas apróximadamente depois da última atualização.',
            title: 'Escolhe versão',
        },
        iconBg: {
            description: 'Muda o fundo do ícone do LSSM!',
            title: 'Fundo do ícone do LSSM',
        },
        iconBgAsNavBg: {
            description:
                'Pinte a barra de navegação toda com a mesma cor de fundo do ícone do LSSMColor the whole navbar in the color of LSSM-Icon Background!',
            title: 'Pinte a barra de navegação',
        },
        loadingIndicator: {
            description:
                'Se estiver ativado, LSSM exibe um pequeno círculo de carregamento no canto inferior direito quando estiver a carregar.',
            title: 'Mostre o progresso de carregamento',
        },
        osmDarkTooltip: {
            description:
                'Esta definição escurece as dicas de contexto no mapa se tiveres o modo escuro ativado.',
            title: 'Dicas de contexto escuras no mapa',
        },
        osmDarkControls: {
            description:
                'Esta definição escurece os butões no mapa se tiveres o modo escuro ativado.',
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
                'Um pequno modo debug que mostra dicas úteis na consola do navegador. É recomendado ativá-lo apenas se for pedido pela equipa do LSSM, porque a consola vai ter muitas mensagens.',
        },
    },
};
