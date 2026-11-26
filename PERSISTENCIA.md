# PERSISTENCIA — ExpenseTracker (React Native / Expo, Sprint 3)

Persistencia en dos capas:

| Dato | Dónde se guarda | Clave / colección |
| :--- | :--- | :--- |
| Ajustes (Notificaciones, Modo oscuro) | `AsyncStorage` (US #3) | `@expensetracker/settings` |
| Gastos | Cloud Firestore (US #5) | colección `expenses` |

La US #3 dejó los gastos también en `AsyncStorage` (`@expensetracker/expenses`); en la US #5 la fuente de verdad
pasó a Firestore (`onSnapshot` + `addDoc` + `deleteDoc`) y los ajustes siguen en `AsyncStorage`.

## Hidratación con `isLoaded` y `ActivityIndicator`

`AsyncStorage` es asíncrono: al abrir la app los datos no están disponibles en el primer render. Cada Provider
arranca con `isLoaded = false`, lee el almacenamiento en un `useEffect` y recién entonces pasa a `true`.
`App.js` muestra un `ActivityIndicator` mientras `isLoaded` o `isSettingsLoaded` sean `false`. La escritura a disco
(`setItem`) está protegida con `if (!isLoaded) return;`.

### Experimento: ¿qué pasa si falta `isLoaded`?

> Probar y completar con lo observado (capturas en `docs/persistencia/`). Pasos: quitar el `ActivityIndicator`
> de `App.js` y el `if (!isLoaded) return;` del efecto de escritura, guardar un gasto y activar Modo oscuro,
> cerrar la app por completo y volver a abrirla.

Qué se espera ver (confirmar en el dispositivo):

- Sin el *gate* de `App.js`: durante un instante se ve la UI con valores por defecto (tema claro y "Todavía no
  registraste gastos") antes de que lleguen los datos guardados — un destello visual.
- Sin el `if (!isLoaded) return;`: el efecto de escritura corre en el primer render y guarda `[]` / ajustes por defecto
  antes de que termine la lectura. La lectura ya pedida suele devolver los datos viejos y la UI se corrige, pero queda
  una ventana en la que el disco tiene datos vacíos: si la app se cierra en ese momento, **se pierden los datos guardados**.

## Decisiones técnicas

- **Modo oscuro visual**: `src/styles/theme.js` define `LIGHT_THEME` y `DARK_THEME`; `SettingsContext` expone `theme`
  y todas las pantallas, el `TabNavigator`, el `StackNavigator` y el `NavigationContainer` lo usan.
- **`getFirestore(app)`** en `src/services/firebase.js`. Credenciales en `.env` (`EXPO_PUBLIC_FIREBASE_*`, ver `.env.example`).
  Tras cambiar `.env` hay que reiniciar con `npx expo start -c`.
- **`serverTimestamp()` en `addDoc`** y lectura con `data({ serverTimestamps: 'estimate' })` para que el gasto nuevo
  aparezca ordenado arriba aun antes de que el servidor confirme.
- **`addDoc` / `deleteDoc` sin `await`**: el modal se cierra al instante. Offline la promesa de `addDoc` no se
  resuelve hasta reconectar; esperarla dejaría el modal abierto.
- **Orden**: `orderBy('createdAt', 'desc')`.
- **Timeout de 4 s** en la carga inicial para no quedar en el spinner si Firestore no responde sin red.

## Pruebas offline (Expo Go + Modo avión)

> Completar la columna "Resultado observado" y adjuntar capturas en `docs/persistencia/`.

| # | Prueba | Pasos | Resultado esperado en React Native | Captura |
| :-: | :--- | :--- | :--- | :--- |
| 1 | Persistencia con red | Cargar un gasto online, cerrar Expo Go por completo y reabrir | El gasto sigue ahí (viene de Firestore) y el Modo oscuro conserva su estado | `docs/persistencia/prueba-1.png` |
| 2 | Alta sin conexión | Activar Modo avión, cargar un gasto | Aparece al instante en la lista; el modal cierra sin esperar | `docs/persistencia/prueba-2.png` |
| 3 | Cierre sin conexión | Con el gasto pendiente, seguir en Modo avión, cerrar Expo Go y reabrir | **El gasto pendiente se pierde** (caché solo en memoria) | `docs/persistencia/prueba-3.png` |
| 4 | Reconexión | Cargar un gasto offline, desactivar Modo avión **sin cerrar la app** | El gasto se sincroniza con Firestore y aparece en la PWA | `docs/persistencia/prueba-4.png` |

## Comparativa React Native vs PWA

| Aspecto | React Native (Expo Go) | PWA (React + Vite) |
| :--- | :--- | :--- |
| Almacenamiento local de ajustes | `AsyncStorage` (asíncrono, requiere bandera `isLoaded`) | `localStorage` (síncrono) |
| Hidratación al iniciar | Asíncrona: `ActivityIndicator` hasta tener los datos | Síncrona: sin pantalla de carga para ajustes |
| Inicialización de Firestore | `getFirestore(app)` — caché solo en memoria | `initializeFirestore(app, { localCache: persistentLocalCache({}) })` — IndexedDB |
| Gasto creado offline y app cerrada (Prueba 3) | **Se pierde** | **Se conserva** y se sube al reconectar |
| Modo oscuro | Paleta `LIGHT_THEME`/`DARK_THEME` aplicada con `useSettings()` | Variables CSS con `[data-theme="dark"]` |
| Estados de carga | Gate global en `App.js` | `isLoaded` en cada pantalla |

## Por qué la Prueba 3 da distinto en cada plataforma

Un gasto creado sin conexión queda como **escritura pendiente** hasta que Firestore pueda subirlo. En la PWA esa
escritura se guarda en la caché persistente de IndexedDB (`persistentLocalCache`), así que sobrevive al cierre o recarga
de la app y se sincroniza al reconectar. En React Native el SDK web de Firebase no tiene IndexedDB y usa caché en
memoria: si la app se cierra mientras el gasto está pendiente, la escritura se pierde con el proceso. Por eso la Prueba 4
en RN se hace **sin cerrar la app**.

## Variables de entorno

Copiar `.env.example` a `.env` y completar los `EXPO_PUBLIC_FIREBASE_*` con los valores que comparte Conrado. `.env` está en
`.gitignore`.
