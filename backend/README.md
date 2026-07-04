# Virage Backend
Laravel 13 API + Sanctum. SQLite. Production.

## Требования:
- PHP 8.3+
- Composer

## Деплой
Push VIR-33-server. GitHub Actions в `scripts/deploy.sh` на VPS.

## Обновление
cd ~/Virage/backend
composer install --no-dev --optimize-autoloader
php artisan migrate --force

## Первый запуск БД 
php artisan migrate --force
php artisan db:seed --force

API на VPS: http://127.0.0.1:8000
