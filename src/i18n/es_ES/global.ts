export default {
    updateUserscript: {
        title: 'Userscript out of date',
        text: `Dear LSSM-User,<br>
unfortunately your LSSM V.4 userscript is outdated. In the latest version changes have been made to the userscript, which are important for the function of LSSM V.4.<br>
You need at least version {minVersion}, the update can be done comfortably by clicking on {updateLink}.<br>
Sometimes the update does not work by clicking the link (for unknown reasons). Then you can either trigger an update within Tampermonkey (click on the tampermonkey icon in your browser, then "Overview". Check the box in front of the LSSM userscript and select "Update" as action.<br>
If that also does not work, edit the LSSM Script within Tampermonkey by replacing all script content with the content of {bypassLink}.<br>
Sometimes, LSSM is installed multiple times after an update. In this case it helps to uninstall/remove all LSSM V.4 installations in Tampermonkey and then reinstall LSSM V.4 once.<br><br>
Kind regards,<br>
your LSSM team`,
        close: 'Ok',
    },
    error: {
        title: 'LSS Manager: Error',
        msg: 'Si este error ocurre con frecuencia, ¡Infórmelo al equipo de LSSM!',
    },
    warnings: {
        version: {
            title: 'Versión de LSS Manager incorrecta',
            text: 'Estimado usuario, lamentablemente tuvimos que descubrir que no tiene la última versión de LSS Manager. La última versión es {version}, pero primero tienes {curver}. Vuelva a cargar el juego sin caché (con Ctrl + F5, en dispositivos Apple comando + R), esto debería corregir el error. Si el error persiste, ¡Infórmalo al equipo! Si usa una versión incorrecta, no podemos garantizar la funcionalidad completa del LSS-Manager.',
            close: 'Cerrar mensaje y recargar el juego (recomendado)',
            abort: 'Cerrar el mensaje sin recargar el juego',
        },
    },
    anniversary: {
        closeNote: 'Tip: You can also click on the balloons to close!',
    },
    settings: {
        name: 'Ajustes generales',
        labelInMenu: {
            title: 'Etiqueta en lugar de icono en el menú',
            description:
                'Muestra una etiqueta simple en la barra de navegación en lugar del logotipo de LSSM',
        },
        allowTelemetry: {
            description:
                'Controla si LSS Manager puede enviar datos, lo que nos ayuda a desarrollar esta extensión.',
            title: 'Permitir Telemetría',
        },
        branch: {
            description:
                'Elija aquí entre una versión estable, beta o de vista previa. Tenga en cuenta que las versiones de vista previa se eliminan automáticamente aprox. 7 días después de su última actualización.',
            title: 'Elegir una versión',
        },
        iconBg: {
            description: 'Cambiar el fondo de icono de LSSM',
            title: 'Fondo de icono LSSM',
        },
        iconBgAsNavBg: {
            description:
                '¡Colorea toda la barra de navegación con el color del fondo del icono LSSM!',
            title: 'Colorear barra de navegación',
        },
        osmDarkTooltip: {
            description:
                'Esta configuración oscurece la información sobre herramientas en el mapa si ha habilitado el modo oscuro',
            title: 'Información sobre herramienta oscura en el mapa',
        },
        debugMode: {
            title: 'Modo de depuración',
            description:
                'Un pequeño modo de depuración que muestra sugerencias útiles en la consola del navegador. Solo se recomienda habilitarlo si lo solicita el equipo de LSSM, ya que la consola contendrá muchos mensajes.',
        },
    },
};
