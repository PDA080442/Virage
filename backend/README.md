# Virage Backend
Laravel 13 API + Sanctum. SQLite. Local.

## Требования:
- PHP 8.3+
- Composer
- SQLite

## Запуск:
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
php artisan db:seed
php artisan serve

API: http://127.0.0.1:8000
