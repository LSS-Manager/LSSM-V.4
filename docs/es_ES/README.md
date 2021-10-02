---
title: LSS-Manager V.4
lang: es_ES
sidebarDepth: 2
---

# Wiki 🇪🇸 <Badge :text="'v.' + $themeConfig.variables.versions.short"/>

> stable: <i>{{ $themeConfig.variables.versions.stable }}</i>
> 
> beta: <i>{{ $themeConfig.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status](https://status.lss-manager.de)

[Game-Online-Status](https://stats.uptimerobot.com/OEKDJSpmvK)

---
title: LSS-Manager V.4
lang: es_ES
sidebarDepth: 2
---

# Wiki 🇪🇸 <Badge :text="'v.' + $themeConfig.variables.versions.short"/>

> stable: <i>{{ $themeConfig.variables.versions.stable }}</i>
> 
> beta: <i>{{ $themeConfig.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status](https://status.lss-manager.de)

[Game-Online-Status](https://stats.uptimerobot.com/OEKDJSpmvK)

---
title: LSS-Manager V.4
lang: es_ES
sidebarDepth: 2
---

# Wiki 🇪🇸 <Badge :text="'v.' + $themeConfig.variables.versions.short"/>

> stable: <i>{{ $themeConfig.variables.versions.stable }}</i>
> 
> beta: <i>{{ $themeConfig.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status](https://status.lss-manager.de)

[Game-Online-Status](https://stats.uptimerobot.com/OEKDJSpmvK)
---
title: LSS-Manager V.4
lang: es_ES
sidebarDepth: 2
---

# Wiki 🇪🇸 <Badge :text="'v.' + $themeConfig.variables.versions.short"/>

> stable: <i>{{ $themeConfig.variables.versions.stable }}</i>
> 
> beta: <i>{{ $themeConfig.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status](https://status.lss-manager.de)

[Game-Online-Status](https://stats.uptimerobot.com/OEKDJSpmvK)

## Sobre LSSM

LSS MANAGER V.4 es una extensión de [Centro-de-mando.es](https://www.centro-de-mando.es/) y de otras versiones lingüísticas.

Con esta extensión, se agrega una tienda de aplicaciones (playStore) al juego, permitiendo el uso de módulos. Puedes decidir qué módulos activar.

Los complementos desactivados no se cargan en su navegador, para un mejor rendimiento.


## Instalación 📥
[Al utilizar LSSM, acepta que recopilamos metadatos.](metadata.md)

Puede encontrar una tabla con la compatibilidad de los navegadores LSSM en nuestro [FAQ](faq.md)

::: tip 
Consejo de uso de LSSM en teléfonos móviles, no admitimos el uso de LSSM en teléfonos móviles. Con Firefox en dispositivos móviles, permite el uso de LSSM,
pero no garantizamos la funcionalidad.

Actualmente **NO** está previsto el soporte oficial de los navegadores móviles.
:::

### Paso Nº 1: Instalar Tampermonkey
Instala la extensión **Tampermonkey** en tu navegador.

<tampermonkey-download-table/>

Para otros navegadores puedes descargar Tampermonkey en [tampermonkey.net](https://www.tampermonkey.net/).

::: warning 
Tenga en cuenta que no admitimos oficialmente navegadores más antiguos, navegadores móviles, Microsoft Edge o Internet Explorer.
:::

### Paso Nº 2: Userscript
Si Tampermonkey ha sido instalado con éxito en tu navegador, puedes hacer click <a :href="$themeConfig.variables.server + 'lssm-v4.user.js'" target="_blank">AQUÍ</a> o crear un nuevo script de usuario con el siguiente contenido:

<<< ./dist/static/lssm-v4.user.js

### Paso Nº 3: Activación
El indicador LSSM es un texto resaltado en verde `LSSM V.4`, presenten en la esquina superior derecha de Centro de Mando.  

Si no encuentras el indicador, haz click en el icono de Tampermonkey de tu navegador y revisa si el boton para el Script LSS-Manager está configurado en `on` o contiene un tick verde `✔ Activado`. 

Si tiene algún problema, contáctanos con el [Soporte](support.md).
