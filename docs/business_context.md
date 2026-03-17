# Gestor de Marcadores Web — Contexto de Negocio

## ¿Qué es este proyecto?

Es una aplicación personal para **explorar y organizar una colección de enlaces web** que un desarrollador ha ido guardando a lo largo del tiempo.

Con el paso de los años, es fácil acumular cientos o miles de enlaces interesantes — tutoriales, herramientas, documentación, recursos de diseño, cursos, referencias técnicas — pero sin un sistema claro para organizarlos, terminan perdiéndose o siendo imposibles de encontrar cuando se necesitan.

Esta aplicación resuelve ese problema.

---

## ¿Para quién es?

Para **una sola persona**: el dueño de la colección de marcadores.

No es una plataforma colaborativa ni tiene usuarios registrados. Es una herramienta personal, como una libreta digital de recursos favoritos.

---

## ¿Qué puede hacer el usuario?

Una vez abierta la aplicación, el usuario puede:

- **Explorar la Comunidad** — los recursos del catálogo curado, organizados por categorías (CSS, JavaScript, React, diseño, despliegue, etc.).
- **Ver sus propios recursos** — a través de la sección **"Tus Recursos"**, el usuario puede acceder a los enlaces que él mismo haya guardado, completamente separados del catálogo de la comunidad.
- **Crear recursos personales** — mediante el botón **"Crear recurso"** en la barra lateral o en el estado vacío de "Tus Recursos", el usuario puede agregar nuevos enlaces con título, URL, descripción, categoría y etiquetas.
- **Editar recursos personales** — cada recurso creado por el usuario muestra un botón de edición que abre el formulario pre-completado para modificar cualquier campo.
- **Eliminar recursos personales** — cada recurso creado por el usuario muestra un botón de eliminación que solicita confirmación antes de eliminar el enlace definitivamente.
- **Buscar rápidamente** cualquier recurso escribiendo palabras clave — el buscador entiende búsquedas aproximadas, por lo que no hace falta escribir exactamente el nombre.
- **Marcar favoritos** para identificar los recursos más valiosos o consultados frecuentemente.
- **Cambiar el estado** de cada recurso:
  - **Pendiente** — algo que quiere explorar o aprender próximamente.
  - **Consumido** — algo que ya revisó o completó.
  - **Referencia** — algo que consulta de forma recurrente, como una guía o documentación oficial.
- **Filtrar por estado** para ver únicamente los recursos pendientes, consumidos o favoritos.
- **Navegar por categorías** para explorar recursos agrupados por tema.
- **Reproducir videos de YouTube** — cuando un recurso (de la comunidad o personal) tiene una URL de YouTube, la tarjeta muestra la miniatura del video y permite reproducirlo directamente dentro de la aplicación mediante un reproductor embebido.
- **Sección dedicada de Videos de YouTube** — en cualquier vista activa (Comunidad, Tu­s Recursos, Favoritos, Pendientes, etc.), los recursos con URL de YouTube aparecen agrupados bajo el encabezado "Videos de YouTube", visualmente separados del resto de recursos. La sección es colapsable. Además, la barra lateral incluye un filtro **"Videos"** que muestra exclusivamente los recursos multimedia de YouTube.
- **Exportar respaldo** — desde la sección "Tus Recursos", el usuario puede descargar un archivo de respaldo con todos sus recursos personales, favoritos y estados. El botón solo aparece cuando el usuario tiene al menos un recurso guardado.
- **Importar respaldo** — el usuario puede cargar un archivo de respaldo descargado previamente; la aplicación verifica que sea válido, detecta si algún enlace ya existe en la colección y permite decidir recurso a recurso si actualizar o conservar la versión actual.
- **Recordatorio de seguridad de datos** — en la sección "Tus Recursos" se muestra un aviso recordando que los datos se guardan en el navegador y que conviene descargar un respaldo para no perderlos al cambiar de dispositivo o limpiar el historial.
- **Cambiar idioma** — el usuario puede cambiar entre español e inglés usando el botón ES/EN en la barra superior; la preferencia se guarda en el navegador y se recuerda en la próxima visita. Si el usuario no ha elegido idioma antes, la aplicación detecta automáticamente el idioma del navegador.
- **Recursos personales en todos los filtros** — los recursos guardados por el usuario aparecen junto con los del catálogo en los filtros de Favoritos, Pendientes, Consumidos y Categoría.

---

## ¿Qué NO puede hacer la aplicación?

La aplicación no tiene servidor propio ni base de datos externa:

- **No permite editar ni eliminar los recursos del catálogo curado** (la sección "Comunidad") — esos solo pueden cambiarse por el dueño del proyecto de forma manual.
- **No tiene un servidor propio** — no guarda datos en ningún servicio externo. Todo se almacena en el propio navegador del usuario.

---

## ¿Dónde se guardan los datos?

Hay dos tipos de información:

**El catálogo de recursos** — la lista de todos los enlaces curados — es fijo y solo cambia cuando el dueño del proyecto decide actualizarlo manualmente.

**Los recursos personales del usuario** — los enlaces que el propio usuario ha agregado — se guardan en el navegador del dispositivo que usa. Si cambia de navegador o dispositivo, no estarán disponibles a menos que haya descargado un respaldo.

**Las preferencias del usuario** — favoritos, estados (pendiente, consumido, referencia), modo oscuro e idioma de la interfaz — también se guardan en el navegador del dispositivo. Son privadas y no se comparten ni sincronizan entre dispositivos.

---

## ¿Cómo se accede?

La aplicación está publicada en internet y es accesible desde cualquier navegador moderno, ya sea en computador, tableta o teléfono.

Además, puede **instalarse como una aplicación** en el dispositivo (como si fuera una app del sistema) y funciona incluso **sin conexión a internet**, gracias a que guarda una copia local de los datos.

---

## Valor que aporta

| Problema | Solución |
|---|---|
| Tengo cientos de marcadores y no los encuentro | Búsqueda rápida, vista Comunidad y filtros por categoría |
| Quiero guardar mis propios enlaces | Sección "Tus Recursos" — colección personal separada del catálogo |
| No sé qué recursos ya revisé | Estados: Pendiente / Consumido / Referencia |
| Quiero marcar mis favoritos del catálogo | Botón de favorito por recurso (estrella amarilla con animación) |
| Quiero ver mis recursos en favoritos o pendientes | Los recursos personales aparecen en todos los filtros junto al catálogo |
| No quiero perder mis recursos al limpiar el navegador | Descarga de respaldo desde "Tus Recursos"; aviso recordatorio visible en todo momento |
| Quiero ver solo los videos de YouTube | Filtro "Videos" en la barra lateral; sección colapsable "Videos de YouTube" en cada vista |
| Quiero usar la app en inglés | Botón ES/EN en la barra superior; el idioma se recuerda para la próxima visita |
| Quiero usarlo desde el teléfono | Diseño adaptable a cualquier pantalla, instalable como app |
| No quiero depender de internet | Funciona offline una vez cargada |

---

## Mantenimiento

Agregar o quitar recursos del catálogo es una tarea que solo puede hacer el dueño del proyecto. Requiere actualizar la colección de forma manual y volver a publicar la aplicación. Está pensado para hacerse de vez en cuando, cuando se quiera ampliar o renovar el catálogo.
