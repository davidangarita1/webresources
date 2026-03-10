# HU-03: Crear recurso personal (CRUD — Creación)

**Como** usuario,
**quiero** poder crear un nuevo recurso llenando un formulario en un modal,
**para** agregar mis propios enlaces a mi colección personal sin necesidad de editar código.

---

## Criterios de Aceptación

- [ ] Existe un botón visible **"Crear Recurso"** (ej. con ícono ➕) accesible desde la barra lateral o la barra superior.
- [ ] Al hacer clic se abre un **modal** con un formulario que incluye los siguientes campos:

  | Campo       | Tipo         | Requerido | Notas                                           |
  |-------------|--------------|-----------|--------------------------------------------------|
  | Título      | texto        | ✅        | Nombre del recurso                               |
  | URL         | url          | ✅        | Enlace al recurso. Se valida formato URL         |
  | Descripción | textarea     | ❌        | Descripción opcional                             |
  | Categoría   | select/texto | ✅        | Puede elegir una existente o escribir una nueva  |
  | Tags        | chips/texto  | ❌        | Etiquetas separadas por coma                     |

- [ ] Al guardar, se genera un `id` único (ej. UUID) y un `createdAt` con la fecha actual.
- [ ] El recurso se persiste en `localStorage` (clave `user-resources`).
- [ ] El nuevo recurso aparece inmediatamente en la vista "Tus Recursos".
- [ ] Se validan campos requeridos antes de guardar; se muestran mensajes de error claros.
- [ ] El modal puede cerrarse sin guardar (cancelar / clic fuera / tecla Escape).

---

## Notas Técnicas

- El modelo del recurso del usuario reutiliza la interfaz `Resource` existente, añadiendo opcionalmente un campo `source: "user"` para diferenciarlo.
- Servicio nuevo: `userResourceService` con métodos CRUD sobre `localStorage`.
- Considerar un hook `useUserResources` para encapsular la lógica.

### Modelo de datos propuesto

```typescript
// Extensión de Resource para recursos del usuario
interface UserResource extends Resource {
  source: "user"      // Diferencia de los recursos de comunidad
  updatedAt?: string  // Fecha de última edición (opcional)
}

// Clave en localStorage: "user-resources"
// Valor: UserResource[]
```

---

## Dependencias

- [HU-02](./HU-02-tus-recursos.md) — Sección "Tus Recursos"
