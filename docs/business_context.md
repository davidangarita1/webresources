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
- **Exportar respaldo** — desde la cabecera de la sección "Tus Recursos", el usuario puede descargar un archivo JSON con todos sus recursos personales, favoritos y estados (`user-resources-backup-{fecha}.json`). El botón sólo aparece cuando el usuario tiene al menos un recurso guardado.
- **Importar respaldo** — el usuario puede cargar un archivo de respaldo previamente exportado (botón en la cabecera de "Tus Recursos"); la aplicación valida la estructura del archivo, detecta conflictos de URL con la colección actual y permite elegir recurso a recurso si actualizar o mantener la versión existente.
- **Aviso de almacenamiento local** — en la sección "Tus Recursos" se muestra un mensaje informativo: _"Tus recursos se guardan localmente en este navegador. Usa Descargar respaldo para no perderlos si limpias el historial o cambias de dispositivo."_
- **Filtros cruzados** — los recursos personales del usuario aparecen junto con los de la comunidad en los filtros de Favoritos, Pendientes, Consumidos y Categoría.

---

## ¿Qué NO puede hacer la aplicación?

La aplicación no tiene servidor propio ni base de datos externa:

- **No permite editar ni eliminar los recursos del catálogo curado** (la sección "Comunidad") — esos solo pueden modificarse editando manualmente `src/data/resources.json`.
- **No tiene un servidor propio** — no guarda datos en una base de datos externa. Todo se almacena en el navegador.

---

## ¿Dónde se guardan los datos?

Hay dos tipos de información:

**El catálogo de recursos** — la lista de todos los enlaces curados — está guardado en un archivo dentro del proyecto. Es fijo y solo cambia cuando el dueño lo edita manualmente.

**Los recursos personales del usuario** — los enlaces que el propio usuario ha agregado — se guardan en el navegador del dispositivo bajo una clave independiente del catálogo.

**Las preferencias del usuario** — favoritos, estados (pendiente, consumido, referencia) y modo oscuro — se guardan directamente en el navegador del dispositivo que se usa. Esto significa que son privadas, no se comparten ni se sincronizan entre dispositivos.

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
| Quiero ver mis recursos en favoritos o pendientes | Filtros cruzados incluyen recursos personales y de comunidad |
| No quiero perder mis recursos al limpiar el navegador | Respaldo y restauración con archivo JSON; aviso informativo en "Tus Recursos" |
| Quiero usarlo desde el teléfono | Diseño adaptable a cualquier pantalla, instalable como app |
| No quiero depender de internet | Funciona offline una vez cargada |

---

## Mantenimiento

Agregar o quitar recursos del catálogo es una tarea manual y técnica — requiere editar el archivo de datos y volver a publicar la aplicación. Está pensado para que el dueño del proyecto lo haga de forma ocasional cuando quiera actualizar su colección.
