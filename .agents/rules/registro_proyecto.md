# Registro del proyecto — leer siempre antes de trabajar

## Cómo usar este archivo
Cada vez que se implemente o modifique algo, agregar una entrada nueva abajo 
en "Historial de cambios". No borrar entradas viejas. Antes de tocar código 
ya marcado como "Verificado", detenerse y reportarlo como riesgo.

## Estado actual — Verificado en dispositivo real (APK)
(vacío por ahora — se llena cuando algo se prueba en el celular, no solo 
por contraste de datos en el código)

## Estado actual — Implementado pero NO verificado en APK
- Detección automática de parada por proximidad GPS (auto-selección de dirección de ruta).
- Fix del banner "próximo bus" (evitar mostrar horarios ya pasados, priorizar bus futuro real).
- Pantalla de Configuración Global (radio de proximidad, tolerancia en minutos, próximos buses a mostrar) + mecanismo de persistencia (`localStorage` a través de `SettingsContext`).

## Riesgos conocidos, no confirmados como bug
- Paradas cerca de la Interamericana (~20m entre carriles opuestos): riesgo 
  de detección ambigua de proximidad con radio de 50m. No probado en campo.

## Historial de cambios
### 2026-09-04 — Detección de proximidad GPS
Se implementó auto-detección de parada cercana y auto-cambio de dirección.
Archivos: `src/utils/geo.ts` (nuevo), `src/hooks/useUserPosition.ts` (nuevo), `src/components/TransporteView.tsx`, `src/components/BusMap.tsx`

### 2026-09-04 — Simplificación Extrema de Lógica de Próximo Bus
Se redujo al mínimo el cálculo en `TransporteView.tsx`: ahora el sistema junta todos los horarios de todos los tramos, descarta los menores a la hora actual, y elige el primero. El ETA se calcula con un delay fijo igual a `duracionHastaMiParada`, con formato AM/PM explícito. También se **desactivó** el `useEffect` que auto-cambiaba de pestaña basado en el GPS (la lógica GPS sigue viva en memoria, pero ya no forza el cambio de UI, devolviéndole el control total de la pestaña al usuario).

### 2026-09-04 — Fix banner "próximo bus"
Se refactorizó `getSalidaStatus` en `TransporteView.tsx` para priorizar el ETA futuro real y mostrar como "PASADO_RECIENTE" a los buses que ya pasaron por la parada del usuario pero siguen en la ventana de tolerancia.

### 2026-09-04 — Pantalla de Configuración
Se agregaron controles interactivos (sliders) en una nueva pestaña "Rutas y GPS" dentro de `GlobalSettingsModal.tsx` para modificar la tolerancia, la proximidad y la cantidad de próximos buses. Los valores se guardan en `localStorage` (como `uniagenda_route_settings`) mediante `SettingsContext.tsx`.
