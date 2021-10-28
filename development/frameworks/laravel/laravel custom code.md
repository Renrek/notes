# HTML snippet of laravel authentication

```html
<div class="card p-3">
        {{ Auth::user()->name }}
        </div>
        <div class="card p-3">
        Admin: {{ Auth::user()->is_admin ? 'true' : 'false' }}
        </div>
        <div class="card p-3">
        Active: {{ Auth::user()->is_active ? 'true' : 'false' }}
</div>
```