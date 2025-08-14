<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Course;

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/education.php';

Route::get('/', function () {
    $courses = Course::all();
    return Inertia::render('welcome', ['courses' => $courses]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/{any}', function () {
    return Inertia::render('welcome', [
        'courses' => Course::all(),
    ]);
})->where('any', '.*');
