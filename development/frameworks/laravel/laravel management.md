# Table Migration System


### Check Status
```shell
php artisan migrate:status
```

### Run Migrations
```shell
php artisan migrate
```

### Make a Migration 
(Note: name is plural)
```shell
php artisan make:migration create_quotes_table
```



## Models


### Create a Model 
(Note: it is single form of table)
```shell
php artisan make:model Quote
```


## Controllers

### Create Controller 
(Note: add "--resource" if its used with model)
```shell
php artisan make:controller QuotesController --resource
```

## Routes

### Show Route List
```shell
php artisan route:list
```

### Add Resource to web route
```php
Route::resource('quotes', 'App\Http\Controllers\QuotesController');
```

## Additonal Notes


### When adding a model to a controller add:
```php
use App\Models\Quote;
```

### Calling a view in a directory
```php
return view('quotes.create'); 
```