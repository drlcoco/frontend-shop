<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $product = 'products';

    //Relación de uno a muchos inversa (muchos a uno)
    public function user(){
        return $this->belongsTo('App/user', 'userId');
    }

    public function category(){
        return $this->belongsTo('App/category', 'categoryId');
    }
}
