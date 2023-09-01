export default {
    updateUserscript: {
        title: 'Userscript desatualizado',
        text: `Caro LSSM-User,<br>
infelizmente o nosso LSSM V.4 userscript está desatualizado. Na última versão fizemos alterações ao userscript, que serão importantes nas funcionalidades do LSSM V.4.<br>
Precisas no mínimo da versão {minVersion}, faz o teu update através de {updateLink}.<br>
Por vezes carregar no link do update não funciona(por razões desconhecidadas). Podes fazer o update através do Tampermonkey (carrega no icon do tampermonkey do teu browser, depois "Overview". Na caixa à frente do LSSM userscript e seleciona "Update" como ação.<br>
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
            text: `Ouch, unfortunately an error occurred with this server request:<br>
<b>Estado</b>: <code>{status}</code> <code>{statusText}</code><br>
<b>URL</b>: <em><code>{method}</code></em> <code>{url}</code><br>
<b>Feature</b>: <code>{feature}</code><br>
<b>Duração</b>: <code>{duration}ms</code><br>
<b>User</b>: <code>{uid}</code><br>
<b>Timestamp</b>: <code>{timestamp}</code>
<br>
Please try to perform the desired action again.<br>
If several requests fail in a short time, this could be due to server problems. Please try again at a later time.`,
            close: 'Dismiss',
        },
    },
    warnings: {
        version: {
            title: 'Versão errada LSS',
            text: 'Caro utilizador, infelizmente descobrimos que não estás a usar a última versão do LSS Manager. A última versão é {version}, mas tu tens {curver}. Por favor recarrega o teu jogo sem cache (com Ctrl + F5, em dispositivos Apple command + R), isto deve resolver o bug. Se o erro persistir, por favor reporta à nossa equipa! Se usas a versão antiga não podemos garantir que todas as funcionalidades do LSS-Manager funcionem corretamente.',
            close: 'Fechar a mensagem e recarregar (recomendado)',
            abort: 'Fechar a mensagem sem recarregar o jogo',
        },
    },
    anniversary: {
        closeNote: 'Tip: Podes carregar nos balões para fechar!',
    },
    settings: {
        name: 'General Settings',
        labelInMenu: {
            title: 'Label instead of icon in menu',
            description:
                'Displays a simple label in the navigation bar instead of the LSSM logo',
        },
        allowTelemetry: {
            description:
                'Controls whether LSS-Manager is allowed to send Data which helps us in developing this extension.',
            title: 'Allow Telemetry',
        },
        branch: {
            description:
                'Choose here between stable, beta or a preview version. Note that preview versions are automatically deleted approx. 7 days after their last update.',
            title: 'Choose version',
        },
        iconBg: {
            description: 'Change the background of LSSM-Icon!',
            title: 'LSSM-Icon Background',
        },
        iconBgAsNavBg: {
            description:
                'Color the whole navbar in the color of LSSM-Icon Background!',
            title: 'colorize navbar',
        },
        loadingIndicator: {
            description:
                'If this setting is active, LSSM displays a small loading circle in the lower right corner when it loads its own files.',
            title: 'show loading progress',
        },
        osmDarkTooltip: {
            description:
                'This setting darkens tooltips on map if you have enabled dark mode.',
            title: 'Dark tooltips on map',
        },
        osmDarkControls: {
            description:
                'This setting darkens buttons on map if you have enabled dark mode.',
            title: 'Dark buttons on map',
        },
        v3MenuAsSubmenu: {
            title: 'V3 Menu as sub-menu',
            description:
                'Moves the menu of the LSSM V3 to the menu of the V4 to save some space in the navigation bar.',
        },
        debugMode: {
            title: 'Debug-Mode',
            description:
                'A small debug mode that displays helpful hints in the browser console. Enabling it is only recommended if requested by the LSSM team, as the console will contain many messages.',
        },
    },
};
