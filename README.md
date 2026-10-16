# 💰 ExpenseTracker — Proyecto Integrador (Sprint 1)

Aplicación móvil para el registro y control de gastos personales desarrollada con **React Native** y **Expo** para la materia **Programación III (2026)**.

---

## 👥 Integrantes del Equipo y Asignación de Ramas (Sprint 1)

| Integrante | User Story Asignada | Rama Git (`branch`) | Archivos principales a trabajar |
| :--- | :--- | :--- | :--- |
| **Conrado** | **US #1, US #2 y US #3** — Base del proyecto y Pantalla de Bienvenida | `main-s1-us3` | `src/screens/HomeScreen.js`, `src/assets/` |
| **Benjamín** | **US #4** — Formulario de Carga de Gastos | `main-s1-us4` | `src/screens/NewExpenseModal.js` |
| **Manuel** | **US #5** — Listado de Gastos y Componente de Ítem | `main-s1-us5` | `src/screens/ExpensesScreen.js`, `src/components/ExpenseItem.js` |
| **Jerónimo** | **US #6** — Detalle, Ajustes e Integración de Navegación | `rn-s1-us6` | `src/navigation/TabNavigator.js`, `src/navigation/StackNavigator.js`, `src/screens/ExpenseDetailScreen.js`, `src/screens/SettingsScreen.js`, `App.js` |
| **Equipo completo** | **US #7 (Bonus 1)** — Íconos, colores por categoría, total e ilustraciones | `rn-s1-us7` | Todos los componentes y pantallas |

---

## 🚀 Cómo levantar el proyecto en cada PC

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/conradosanchez01/ExpenseTracker.git
   cd ExpenseTracker
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Cambiar a tu rama asignada antes de programar:**
   - **Conrado:** `git checkout main-s1-us3`
   - **Benjamín:** `git checkout main-s1-us4`
   - **Manuel:** `git checkout main-s1-us5`
   - **Jerónimo:** `git checkout rn-s1-us6`

4. **Iniciar el servidor de desarrollo con Expo:**
   ```bash
   npx expo start
   ```
   Escanear el código QR desde la aplicación **Expo Go** en tu teléfono (Android / iOS).

---

## 🗂️ Estructura del Proyecto (US #2 — `#rn-s1-us2`)

```text
ExpenseTracker/
├── App.js
├── src/
│   ├── components/
│   │   └── ExpenseItem.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ExpensesScreen.js
│   │   ├── ExpenseDetailScreen.js
│   │   ├── SettingsScreen.js
│   │   └── NewExpenseModal.js
│   ├── navigation/
│   │   ├── TabNavigator.js
│   │   └── StackNavigator.js
│   └── assets/
```

---

## 📸 Capturas de Pantalla en Expo Go

*(Aquí se adjuntarán las capturas de pantalla de la aplicación funcionando en Expo Go al finalizar la integración del Sprint 1).*
