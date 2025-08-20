<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Course;

use function Illuminate\Log\log;

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/education.php';

Route::get('/', function () {
    $courses = Course::with('lessons')->get();
    return Inertia::render('welcome', ['courses' => $courses]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/{any}', function () {
    return Inertia::render('welcome', [
        'courses' => Course::with('lessons')->get(),
    ]);
})->where('any', '.*');
