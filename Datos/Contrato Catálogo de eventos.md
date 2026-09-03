# Contrato de interfaz: Reseñas ↔ Catálogo de Eventos

**Versión:** 1.0
**Estado:** Propuesto
**Equipo consumidor:** Reseñas (Equipo6-Resenas)
**Equipo proveedor:** Catálogo de Eventos
**Basado en:** HU-01 (Reseñar evento asistido) y HU-02 (Adjuntar imagen a la reseña)

---

## 1. Propósito

El módulo de Reseñas necesita datos básicos del evento para mostrarlos junto a la reseña publicada (ej. nombre del evento, fecha) y para validar que el evento exista antes de habilitar el flujo de reseña. Catálogo de Eventos expone estos datos de forma acotada, sin entregar información interna de gestión del evento (organizador, aforo, precios, etc.) salvo que se acuerde lo contrario.

---

## 2. Operación: Obtener datos del evento

### 2.1 Descripción
Dado un identificador de evento, retorna los datos mínimos necesarios para mostrarlos en el contexto de una reseña.

### 2.2 Quién la expone
Equipo Catálogo de Eventos.

### 2.3 Quién la consume
Equipo Reseñas, al habilitar el formulario de reseña y al renderizar una reseña ya publicada.

### 2.4 Endpoint propuesto
```
GET /eventos/{eventoId}
```
*(Formato exacto —REST, gRPC o evento asíncrono— a acordar con el equipo de Catálogo de Eventos. Se propone REST por simplicidad.)*

### 2.5 Request

| Campo     | Tipo   | Obligatorio | Descripción                     |
|-----------|--------|:-----------:|-----------------------------------|
| eventoId  | string | Sí           | Identificador único del evento    |

**Ejemplo:**
```json
{
  "eventoId": "e-98765"
}
```

### 2.6 Response

| Campo        | Tipo    | Obligatorio | Descripción                                   |
|--------------|---------|:-----------:|------------------------------------------------|
| eventoId     | string  | Sí           | Identificador único del evento                 |
| nombre       | string  | Sí           | Nombre del evento                              |
| fecha        | string (ISO 8601) | Sí | Fecha de realización del evento           |
| tipo         | string  | Sí           | Tipo/categoría del evento (ej. gratuito, pagado) |
| existe       | boolean | Sí           | `true` si el evento existe en el catálogo      |

**Ejemplo (evento existente):**
```json
{
  "eventoId": "e-98765",
  "nombre": "Feria de Innovación TITEC",
  "fecha": "2026-09-21",
  "tipo": "gratuito",
  "existe": true
}
```

**Ejemplo (evento no existente):**
```json
{
  "eventoId": "e-98765",
  "existe": false
}
```

> **Nota de diseño:** Catálogo de Eventos solo entrega los campos necesarios para mostrar contexto en la reseña. No se comparten datos de gestión interna del evento (organizador, aforo, costos, proveedores, etc.) salvo que Reseñas justifique la necesidad y ambos equipos lo acuerden explícitamente.

### 2.7 Códigos de error

| Código | Significado                                        |
|--------|------------------------------------------------------|
| 400    | `eventoId` ausente o con formato inválido             |
| 404    | Evento no existe en el catálogo                       |
| 500    | Error interno del servicio de Catálogo de Eventos     |

### 2.8 Tiempo de respuesta esperado (SLA)
A definir con el equipo de Catálogo de Eventos (propuesta inicial: < 300 ms, ya que puede bloquear la carga del formulario o de la reseña en la UI).

---

## 3. Reglas de uso (lado Reseñas)

1. Antes de habilitar o mostrar una reseña, Reseñas puede consultar esta operación con `eventoId` para validar que el evento existe y para mostrar su nombre, fecha y tipo.
2. Si `existe = false` → Reseñas no debe permitir crear ni mostrar una reseña asociada a ese evento.
3. El campo `tipo` se usa únicamente para contexto visual; según HU-01, **las reglas de reseña son iguales sin importar si el evento es gratuito o pagado**.

---

## 4. Versionado y cambios

- Cualquier cambio en la forma del request/response de esta operación debe ser **versionado** (ej. `v1`, `v2`) y comunicado con anticipación al equipo de Reseñas.
- Cambios que rompan compatibilidad (breaking changes) requieren período de transición acordado entre ambos equipos.

## 5. Dueños del contrato

| Rol                  | Equipo              | Contacto (a completar) |
|-----------------------|----------------------|--------------------------|
| Dueño del contrato     | Catálogo de Eventos  |                          |
| Consumidor principal   | Reseñas              | constanzadiaz03 y equipo |

---

## 6. Pendientes a acordar con el equipo de Catálogo de Eventos

- [ ] Confirmar protocolo (REST vs evento asíncrono vs gRPC).
- [ ] Confirmar nombre exacto del endpoint y formato de autenticación.
- [ ] Confirmar si se requieren campos adicionales (ej. ubicación, imagen del evento).
- [ ] Confirmar SLA de tiempo de respuesta.
- [ ] Confirmar manejo de reintentos si Catálogo de Eventos no responde.
