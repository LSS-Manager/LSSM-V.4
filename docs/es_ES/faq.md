---
title: FAQ ❓
lang: es_ES
sidebarDepth: 3
---

# FAQ ❓

### ¿Cuánto cuesta LSS Manager ?
LSS-Manager es una extensión gratuita, no tenemos la intención de cambiar esto.

::: warning Donaciones
Hay algunos usuarios amables a los que les gustaría donarnos dinero. Sin embargo, LSS Manager es y seguirá siendo gratuito. No aceptaremos donaciones para este proyecto.

Hay varias razones:
* Este proyecto se desarrolla de forma voluntaria en el tiempo libre de los desarrolladores participantes.
* Una opción de suscripción, nos presionaría demasiado para seguir programando LSS Manager.
* Por razones legales no podemos aceptar donaciones;
    * Si fundáramos una empresa para LSS Manager para que pudiéramos recibir donaciones, no habría futuro, porque una empresa sin gastos no puede ser una empresa.
    * Si ejecutamos los servidores, que actualmente ejecutan LSS Manager, a través de una empresa, anularían inmediatamente los ingresos.
:::

### ¿Cómo puedo contribuir a LSS Manager?
El usuario final puede [reportar errores][error] ó [hacer sugerencias][suggestions].

Actualmente estamos diseñando una guía de estilo para desarrolladores, para que ellos también puedan agregar fácilmente sus propios complementos a LSSM. Hemos tratado de mantener la estructura de nuestro código clara y comprensible. Sin embargo, agregar un complemento no implica de ninguna manera unirse al equipo.

### ¿Cómo informo de errores?
Por favor eche un vistazo a la página [reportar errores][error].

### ¿Dónde puedo obtener apoyo?
A través de nuestro sistema de apoyo [aquí][support].

### ¿Cómo puedo enviar ideas?
En nuestra página de [sugerencias][suggestions].

### ¿En qué navegadores funciona LSS Manager?
Aquí solo se enumeran los navegadores de escritorio, ya que los navegadores móviles no son compatibles oficialmente.
¡Esta tabla no está necesariamente actualizada y se actualizará cuando haya nueva información disponible!

Dado que queremos mantener los últimos estándares de codificación en todo momento, es necesario y recomendable un navegador moderno y actualizado, aunque solo sea por razones de seguridad, incluso fuera del juego.

::: warning Compatibilidad
Una compatibilidad enumerada aquí no garantiza la funcionalidad. Sólo es información recopilada y evaluada por terceros.
:::

<table>
<thead>
    <tr>
        <th>Navegador</th>
        <th>Versión mínima</th>
        <th>Descargar</th>
    </tr>
</thead>
<tbody>
    <tr v-for="({supported, download}, browser) in $themeConfig.variables.browsers">
        <td>{{ browser.replace(/^./, $1 => $1.toUpperCase()) }}</td>
        <td>{{ supported }}</td>
        <td><a :href="download" target="_blank">Descargar</a></td>
    </tr>
</tbody>
</table>

::: danger Navegadores no compatibles
Internet Explorer & Microsoft Edge **NO son compatibles.**
:::

### Quiero compartir mi configuración con amigos o usarla en varios dispositivos. ¿Es eso posible?
Actualmente, esto no es compatible, pero planeamos implementarlo en el futuro.

### ¿Hay alguna manera de guardar la configuración vinculada a la cuenta para que no tenga que importarla en otro dispositivo?
Actualmente, esto no es compatible, pero planeamos implementarlo en el futuro.

[Soporte]: support.md
[Errores]: error_report.md
[Sugerencias]: suggestions.md
