# Virage Frontend
Nuxt 4 + Vue 3 + Pinia + Nuxt UI + Tailwind CSS. Production.

## Требования:
- Node.js 20+
- npm

## Деплой
Push VIR-33-server. GitHub Actions.

## Сборка
cd ~/Virage/frontend
npm ci
export NUXT_TELEMETRY_DISABLED=1
export NODE_OPTIONS=--max-old-space-size=1536
NUXT_BACKEND_URL=http://127.0.0.1:8000 npm run build

http://95.142.35.218