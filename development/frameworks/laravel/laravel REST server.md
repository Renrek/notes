$ php artisan make:model Task --migration

------
Task.php
------
?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'slug',
        'description'
    ];
}



------
Task migration
-----

public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }
-----

$ php artisan make:controller TaskController --api

