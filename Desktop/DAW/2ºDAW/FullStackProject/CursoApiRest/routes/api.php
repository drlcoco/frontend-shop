<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{ProductController, UserController, CategoryController, LoginUserController};
use App\Http\Controllers\Api\PruebasController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::apiResource('products', ProductController::class);

Route::apiResource('categories', CategoryController::class);

Route::apiResource('users', UserController::class)->middleware('jwt_verify');

Route::post('login',[LoginUserController::class,'login']);

Route::post('pruebas/login',[PruebasController::class,'login']);

Route::middleware('jwt_verify')->group(function () {

});
