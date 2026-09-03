# Contrato de interfaz: Reseñas ↔ Check-in

**Versión:** 1.0
**Equipo consumidor:** Reseñas (Equipo6-Resenas)
**Equipo proveedor:** Check-in
**Basado en:** Diagrama de secuencia HU-01 (Reseñar evento asistido)

---

## 1. Propósito

El módulo de Reseñas necesita saber, para un usuario y un evento dados, si ese usuario asistió al evento (check-in confirmado), antes de habilitar el formulario de reseña. Check-in expone esta información como un servicio de solo confirmación, sin entregar datos adicionales del asistente.

---

## 2. Operación: Verificar asistencia

### 2.1 Descripción
Dado un usuario y un evento, confirma si existe un check-in / asistencia registrada para esa combinación.

### 2.2 Quién la expone
Equipo Check-in.

### 2.3 Quién la consume
Equipo Reseñas, en el momento en que el cliente finaliza el evento (según diagrama HU-01).

### 2.4 Endpoint propuesto
```
GET /checkin/asistencia?usuarioId={id}&eventoId={id}
```

### 2.5 Request

| Campo       | Tipo   | Obligatorio | Descripción                          |
|-------------|--------|:-----------:|---------------------------------------|
| usuarioId   | string | Sí           | Identificador único del usuario/cliente |
| eventoId    | string | Sí           | Identificador único del evento         |

**Ejemplo:**
```json
{
  "usuarioId": "u-12345",
  "eventoId": "e-98765"
}
```

### 2.6 Response

| Campo    | Tipo    | Obligatorio | Descripción                                   |
|----------|---------|:-----------:|------------------------------------------------|
| asistio  | boolean | Sí           | `true` si el usuario tiene check-in confirmado para el evento; `false` en caso contrario |

**Ejemplo (asistió):**
```json
{
  "asistio": true
}
```

**Ejemplo (no asistió):**
```json
{
  "asistio": false
}
```

> **Nota de diseño:** Check-in solo entrega este booleano. No se comparten datos personales del asistente, hora de entrada, ni ningún otro dato — Reseñas no los necesita y Check-in no debe exponerlos.

### 2.7 Códigos de error

| Código | Significado                                  |
|--------|-----------------------------------------------|
| 400    | `usuarioId` o `eventoId` ausente o inválido   |
| 404    | Evento o usuario no existe                    |
| 500    | Error interno del servicio de Check-in        |

### 2.8 Tiempo de respuesta esperado (SLA)
A definir con el equipo de Check-in (propuesta inicial: < 300 ms, ya que esta llamada es síncrona y bloquea la habilitación del formulario de reseña en la UI).

---

## 3. Reglas de uso (lado Reseñas)

Según el diagrama de secuencia:

1. Al finalizar el evento, Reseñas llama a esta operación con `(usuarioId, eventoId)`.
2. Si `asistio = false` → Reseñas **no habilita** el formulario de reseña.
3. Si `asistio = true` → Reseñas valida internamente si ya existe una reseña previa de ese usuario para ese evento:
   - Si ya existe → **no habilita** el formulario.
   - Si no existe → **habilita** el formulario de reseña.

*(La validación de reseña existente es responsabilidad interna de Reseñas, no de Check-in.)*

---

## 4. Versionado y cambios

- Cualquier cambio en la forma del request/response de esta operación debe ser **versionado** (ej. `v1`, `v2`) y comunicado con anticipación al equipo de Reseñas.
- Cambios que rompan compatibilidad (breaking changes) requieren período de transición acordado entre ambos equipos.

## 5. Dueños del contrato

| Rol                  | Equipo     | 
|-----------------------|------------|
| Dueño del contrato     | Check-in   |
| Consumidor principal   | Reseñas    |

---

## 6. Pendientes a acordar con el equipo de Check-in

- [ ] Confirmar protocolo (REST vs evento asíncrono vs gRPC).
- [ ] Confirmar nombre exacto del endpoint y formato de autenticación.
- [ ] Confirmar SLA de tiempo de respuesta.
- [ ] Confirmar manejo de reintentos si Check-in no responde.
