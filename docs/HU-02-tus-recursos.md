# HU-02: Sección "Tus Recursos" para enlaces del usuario

**Como** usuario,
**quiero** un botón en la barra lateral llamado "Tus Recursos" (o "Tus Enlaces"),
**para** ver únicamente los recursos que yo he creado y guardado localmente, separados de los recursos de la comunidad.

---

## Criterios de Aceptación

- [ ] Se agrega un nuevo ítem en el sidebar: **"Tus Recursos"** con ícono representativo (ej. 👤 o 📌).
- [ ] Al hacer clic, el Dashboard muestra exclusivamente los recursos creados por el usuario (almacenados en `localStorage`).
- [ ] Si el usuario no tiene recursos propios, se muestra un estado vacío con un mensaje guía (ej. "Aún no tienes recursos. ¡Crea tu primero!") y un botón/enlace para crear uno.
- [ ] Los recursos del usuario se renderizan con el mismo componente `ResourceCard` y soportan favoritos, estados (pendiente, consumido, referencia) y tags.
- [ ] El contador de recursos refleja solo los del usuario.

---

## Notas Técnicas

- Se requiere un nuevo valor en `ViewFilter` (ej. `"user"`).
- Los recursos del usuario se almacenan en `localStorage` bajo una clave dedicada (ej. `user-resources`).
- El store debe poder combinar o segmentar recursos comunitarios y del usuario según el filtro activo.

---

## Dependencias

- [HU-01](./HU-01-renombrar-comunidad.md) — Renombrar "Todos" → "Comunidad"
