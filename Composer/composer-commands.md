# Composer Commands

#### Check Version
```shell
composer --version
```

#### Update composer
```shell
composer self-update
```

#### Repair an install
```shell
composer clearcache && rm -rf vendor && composer update
```

#### Update/Install Laravel package locally
```shell
composer global require laravel/installer --update-with-all-dependencies
```

#### Create Laravel Project 
Standard based on Laravel being installed globally
```shell
laravel new example.com
```
Alt installation
```shell
composer create-project laravel/laravel example.com
```