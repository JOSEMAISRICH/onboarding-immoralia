# Onboarding Gamificado Immoralia

Web app interactiva para onboarding de nuevos miembros del equipo Immoralia.

## Objetivo

Transformar un onboarding estatico en una experiencia gamificada:
- flujo por modulos secuenciales,
- sistema de puntos global,
- progreso visible en todo momento,
- pantalla final con resultado, badge y siguientes pasos.

## Stack

- `React` + `Vite`
- `Tailwind CSS` (via `@tailwindcss/vite`)
- `@dnd-kit` (puzzle con arrastre ordenable)
- `ESLint`

## Monorepo y API (Express)

En un monorepo, esta carpeta suele ser **`frontend/`**. El backend Express va aparte (p. ej. `http://localhost:3000`).

1. Copiar **`.env.example`** → **`.env`** en esta misma carpeta.
2. Definir al menos `VITE_API_URL` y `VITE_DEV_USER_ID` (cabecera `X-Dev-User-Id` si no usas `VITE_AUTH_TOKEN`).
3. **Reiniciar** `npm run dev` tras editar `.env` (Vite solo lee `VITE_*` al arrancar).

En la barra superior verás **API: sí** si `VITE_API_URL` está definida; **API: no** si no (solo `localStorage`). Sincronización: GET al cargar, PATCH en debounce, POST `/start` al empezar, DELETE al reiniciar; banner ámbar si falla el sync.

Backend de desarrollo: `ALLOW_DEV_AUTH=true`, `NODE_ENV=development`, y `JWT_SECRET` / Supabase cuando toque.

## Funciones destacadas

- Progreso guardado en `localStorage` (paso, nombre, puntos, checklist parcial).
- Boton **Reiniciar** en la barra superior y en la pantalla final.
- Modulo 1: **indice de documentacion** (ficha por tema: herramientas, calendario, politicas, etc.) y **repaso rapido** en la misma pantalla (`10 pts` por ficha si aciertas).
- Quiz: boton **Repasar falladas** (sin puntos extra) tras la ultima pregunta.
- Puzzle: **drag and drop** vertical con teclado compatible.
- Pantalla final: **desglose por modulo**, texto que separa *recorrido 100%* vs *puntuacion perfecta* (badge Hero).

## Modulos incluidos

1. `Welcome`: captura de nombre del usuario.
2. `MiniHerramientas` / documentacion: fichas por tema (pantalla dedicada) + micro test por ficha.
3. `Valores`: cards/carrusel de cultura de empresa.
4. `Quiz`: preguntas de opcion multiple con feedback inmediato.
5. `Puzzle`: ordenar pasos de un proceso (arrastrando).
6. `Finish`: resumen final con puntos, tiempo, badge y siguientes pasos.

### Minijuegos extra (tras el puzzle)

7. **Verdadero / falso** — 5 afirmaciones, `8 pts` por acierto (max 40).
8. **Empareja** — herramienta ↔ uso, `10 pts` por par (max 40).
9. **Palabra revuelta** — adivina la herramienta, `10 pts` por ronda (max 40).
10. **El intruso** — elige lo que no encaja, `10 pts` por acierto (max 40).

### Ronda violeta: 10 extras (uno por pantalla)

11–20. **Extras 1–10** — mezcla de **test 4 opciones** y **verdadero/falso** (`12 pts` cada uno si aciertas, max **120**).

## Sistema de puntos

- Documentacion (modulo 1): `10 pts` por ficha si aciertas el repaso (max `160` pts, 16 fichas).
- Quiz: `20 pts` por respuesta correcta.
- Puzzle: `50 pts` al orden correcto.
- Valores: `40 pts` al completar modulo.
- Minijuegos (4 + 10 extras): ver listas anteriores — max total del flujo **500 pts**.

## Estructura del proyecto

```txt
src/
├── components/
│   ├── ModuleWrapper.jsx
│   ├── PointsBadge.jsx
│   └── ProgressBar.jsx
├── data/
│   ├── docTopicOrder.js
│   ├── docTopicQuizzes.js
│   ├── extraMinijuegos10.js
│   ├── minijuegos.js
│   ├── miniHerramientasJuego.js
│   ├── miniValoresJuego.js
│   ├── pasosProceso.js
│   ├── plataformas.js
│   ├── preguntas.js
│   └── valores.js
├── lib/
│   └── progressStorage.js
├── modules/
│   ├── DocTopicView.jsx
│   ├── Finish.jsx
│   ├── MiniExtraSingle.jsx
│   ├── MiniHerramientasJuego.jsx
│   ├── MiniMatch.jsx
│   ├── MiniOddOne.jsx
│   ├── MiniScramble.jsx
│   ├── MiniTrueFalse.jsx
│   ├── MiniValoresJuego.jsx
│   ├── Puzzle.jsx
│   ├── Quiz.jsx
│   └── Welcome.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Ejecutar en local

```bash
npm install
npm run dev
```

Abrir en navegador: `http://localhost:5173`

## Scripts disponibles

- `npm run dev`: servidor de desarrollo.
- `npm run build`: build de produccion.
- `npm run preview`: preview local de build.
- `npm run lint`: chequeo de lint.

## Deploy en Vercel

### Opcion 1: desde GitHub (recomendada)

1. Subir este proyecto a un repositorio en GitHub.
2. Entrar a [Vercel](https://vercel.com) y seleccionar **Add New Project**.
3. Importar el repo.
4. Framework detectado: `Vite` (dejar por defecto).
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Deploy.

### Opcion 2: CLI de Vercel

```bash
npm i -g vercel
vercel
```

Luego seguir el asistente interactivo para crear el proyecto y publicar.

## Criterios de entrega sugeridos

- App funcional de inicio a fin sin errores.
- Sistema de puntos visible y consistente.
- Responsive en mobile y desktop.
- URL publica en Vercel.
- README explicativo en repositorio.

## Mejoras futuras

- Branding oficial (logo + paleta corporativa).
- Confetti y animaciones avanzadas al finalizar.
- Persistencia de progreso en `localStorage`.
- Integracion con backend/API para tracking real.
