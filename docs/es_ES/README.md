---
title: LSS-Manager V.4
lang: es-ES
sidebarDepth: 2
---

# Wiki 🇪🇸 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status][lssm.status]

[Game-Online-Status](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## Sobre LSSM

LSS MANAGER V.4 es una extensión de [Centro-de-mando.es][games.self] y de otras versiones lingüísticas.

Con esta extensión, se agrega una tienda de aplicaciones (playStore) al juego, permitiendo el uso de módulos. Puedes decidir qué módulos activar.

Los complementos desactivados no se cargan en su navegador, para un mejor rendimiento.


## Instalación 📥
[Al utilizar LSSM, acepta que recopilamos metadatos.][docs.metadata]

Puede encontrar una tabla con la compatibilidad de los navegadores LSSM en nuestro [FAQ](faq.md)

::: tip 
Consejo de uso de LSSM en teléfonos móviles, no admitimos el uso de LSSM en teléfonos móviles. Con Firefox en dispositivos móviles, permite el uso de LSSM,
pero no garantizamos la funcionalidad.

Actualmente **NO** está previsto el soporte oficial de los navegadores móviles.
:::

### Paso Nº 1: Instalar Tampermonkey
Instala la extensión **Tampermonkey** en tu navegador.

<tampermonkey-download-table/>

Para otros navegadores puedes descargar Tampermonkey en [tampermonkey.net][tampermonkey].

::: warning 
Tenga en cuenta que no admitimos oficialmente navegadores más antiguos, navegadores móviles o Apple Safari.
:::

### Paso Nº 2: Userscript
Si Tampermonkey ha sido instalado con éxito en tu navegador, puedes hacer click [AQUÍ][lssm.userscript] o crear un nuevo script de usuario con el siguiente contenido:

@[code js](@userscript)

### Paso Nº 3: Activación
El indicador LSSM es un texto resaltado en verde `LSSM V.4`, presenten en la esquina superior derecha de Centro de Mando.  

Si no encuentras el indicador, haz click en el icono de Tampermonkey de tu navegador y revisa si el boton para el Script LSS-Manager está configurado en `on` o contiene un tick verde `✔ Activado`. 

Si tiene algún problema, contáctanos con el [Soporte][docs.support].

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /es_ES/
[docs.apps]: /es_ES/apps.md
[docs.appstore]: /es_ES/appstore.md
[docs.bugs]: /es_ES/bugs.md
[docs.error_report]: /es_ES/error_report.md
[docs.faq]: /es_ES/faq.md
[docs.metadata]: /es_ES/metadata.md
[docs.other]: /es_ES/other.md
[docs.settings]: /es_ES/settings.md
[docs.suggestions]: /es_ES/suggestions.md
[docs.support]: /es_ES/support.md
[games.self]: https://centro-de-mando.es
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug