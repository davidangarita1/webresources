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
- **Buscar rápidamente** cualquier recurso escribiendo palabras clave — el buscador entiende búsquedas aproximadas, por lo que no hace falta escribir exactamente el nombre.
- **Marcar favoritos** para identificar los recursos más valiosos o consultados frecuentemente.
- **Cambiar el estado** de cada recurso:
  - **Pendiente** — algo que quiere explorar o aprender próximamente.
  - **Consumido** — algo que ya revisó o completó.
  - **Referencia** — algo que consulta de forma recurrente, como una guía o documentación oficial.
- **Filtrar por estado** para ver únicamente los recursos pendientes, consumidos o favoritos.
- **Navegar por categorías** para explorar recursos agrupados por tema.
- **Cambiar entre modo claro y oscuro** según su preferencia o condiciones de luz.

---

## ¿Qué NO puede hacer la aplicación?

La aplicación es solo para **leer y organizar** — no para editar el catálogo de recursos:

- **No permite agregar nuevos recursos** desde la pantalla.
- **No permite editar ni eliminar recursos** existentes.
- **No tiene un servidor propio** — no guarda datos en una base de datos externa.

Los recursos del catálogo solo pueden modificarse editando manualmente un archivo de texto en el código del proyecto.

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
| Quiero marcar mis favoritos del catálogo | Botón de favorito por recurso |
| Quiero usarlo desde el teléfono | Diseño adaptable a cualquier pantalla, instalable como app |
| No quiero depender de internet | Funciona offline una vez cargada |

---

## Mantenimiento

Agregar o quitar recursos del catálogo es una tarea manual y técnica — requiere editar el archivo de datos y volver a publicar la aplicación. Está pensado para que el dueño del proyecto lo haga de forma ocasional cuando quiera actualizar su colección.
