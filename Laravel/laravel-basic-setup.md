# Larvel Basic Project Setup

This process needs review, it is missing some setup steps.
```shell
composer self-update
composer global require laravel/installer
laravel new renrek.com
cd renrek.com
composer require laravel/ui
touch database/database.sqlite
nano .env
php artisan ui --auth bootstrap
npm install && npm run dev
php artisan migrate
git init
git add .
git commit -m "initial commit"
php artisan serve
```


Random sqlite notes that need a home
```shell
create a new clean file
sqlite3 name.db ".databases"

touch database/database.sqlite

.quit
.dump
.table
.databases

php artisan migrate
```