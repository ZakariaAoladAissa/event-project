<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//User Routes
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::middleware('auth:sanctum')->post('/logout',[AuthController::class,'logout']);

Route::get('/',[EventController::class,'index']);
Route::middleware('auth:sanctum')->get('/user/events',[EventController::class,'userEvents']);
Route::middleware('auth:sanctum')->post('/',[EventController::class,'store']);
Route::delete('/{id}',[EventController::class,'destroy']);
Route::put('/{id}',[EventController::class,'update']);

