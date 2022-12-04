<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $category = 'categories';

    //Relación de uno a muchos
    public function products(){
        return $this->hasMany('App/Product');
    }
}
