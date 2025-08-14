<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;

Route::middleware('auth')->group(function () {
    Route::post('courses', [CourseController::class, 'store'])->name('course.create');
});
