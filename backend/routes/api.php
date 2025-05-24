<?php

use App\Http\Controllers\AdminEventController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;


    // Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Student routes
    Route::post('/events/register', [RegistrationController::class, 'register']);
    Route::delete('/events/register', [RegistrationController::class, 'cancel']);
    Route::get('/user/events', [RegistrationController::class, 'userEvents']);
    
    // Admin routes
    Route::get('/admin/events', [AdminEventController::class, 'index']);
    Route::post('/admin/events', [AdminEventController::class, 'store']);
    Route::put('/admin/events/{id}', [AdminEventController::class, 'update']);
    Route::delete('/admin/events/{id}', [AdminEventController::class, 'destroy']);
    Route::get('/admin/events/{id}/registrations', [AdminEventController::class, 'registrations']);
});

