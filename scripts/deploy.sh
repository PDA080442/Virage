#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/Virage}"
BRANCH="${DEPLOY_BRANCH:-VIR-33-server}"

cd "$APP_DIR"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

cd backend
composer install --no-dev --optimize-autoloader
php artisan migrate --force

cd ../frontend
npm ci
NUXT_BACKEND_URL=http://127.0.0.1:8000 npm run build

if [ "$(id -u)" -eq 0 ]; then
  systemctl restart virage-api virage-web
else
  sudo systemctl restart virage-api virage-web
fi
