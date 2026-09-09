# Contrato de interfaz: [Equipo A] ↔ [Equipo B]

**Versión:** 1.0
**Estado:** Propuesto / Aprobado
**Equipo consumidor:** [Nombre del equipo que usa la información]
**Equipo proveedor:** [Nombre del equipo que entrega la información]
**Basado en:** [Historia de usuario o diagrama relacionado]

---

## 1. Propósito

*Explica en 2-3 líneas: ¿qué necesita el equipo consumidor y por qué? ¿Qué entrega el equipo proveedor?*

[Escribir aquí]

---

## 2. Operación: [Nombre de la operación, ej. "Verificar asistencia"]

### 2.1 Descripción
*¿Qué hace esta operación en una frase?*

[Escribir aquí]

### 2.2 Quién la expone
Equipo [Proveedor].

### 2.3 Quién la consume
Equipo [Consumidor], en el momento en que [describir el momento/disparador].

### 2.4 Endpoint propuesto
```
[MÉTODO] /ruta/del/endpoint?parametro={id}
```

### 2.5 Request (lo que se envía)

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|:-----------:|-------------|
| campo1 | string | Sí | [Descripción] |
| campo2 | string | No | [Descripción] |

**Ejemplo:**
```json
{
  "campo1": "valor-ejemplo",
  "campo2": "valor-ejemplo"
}
```

### 2.6 Response (lo que se recibe)

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|:-----------:|-------------|
| campoRespuesta | tipo | Sí | [Descripción] |

**Ejemplo:**
```json
{
  "campoRespuesta": "valor-ejemplo"
}
```

> **Nota de diseño:** [Aclarar qué datos NO se comparten y por qué — mantener la respuesta acotada a lo mínimo necesario.]

### 2.7 Códigos de error

| Código | Significado |
|--------|--------------|
| 400 | [Ej. parámetro ausente o inválido] |
| 404 | [Ej. recurso no existe] |
| 500 | Error interno del servicio |

### 2.8 Tiempo de respuesta esperado (SLA)
[Ej. < 300 ms]

---

## 3. Reglas de uso (lado consumidor)

*Pasos o condiciones que sigue el equipo consumidor al usar esta operación.*

1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

---

## 4. Versionado y cambios

- Cualquier cambio en el request/response debe ser **versionado** (ej. `v1`, `v2`) y comunicado con anticipación.
- Cambios que rompan compatibilidad (breaking changes) requieren período de transición acordado entre ambos equipos.

## 5. Dueños del contrato

| Rol | Equipo | Contacto |
|-----|--------|----------|
| Dueño del contrato | [Proveedor] | [nombre/usuario] |
| Consumidor principal | [Consumidor] | [nombre/usuario] |

---

## 6. Pendientes a acordar

- [ ] Confirmar protocolo (REST vs evento asíncrono vs gRPC).
- [ ] Confirmar nombre exacto del endpoint y autenticación.
- [ ] Confirmar SLA de tiempo de respuesta.
- [ ] Confirmar manejo de reintentos/errores.
