<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;

Route::middleware('auth')->group(function () {
    Route::post('courses', [CourseController::class, 'store'])->name('course.create');
    Route::get('lessons/{lesson}', [LessonController::class, 'edit'])->name('lesson.edit');
    Route::post('lessons/', [LessonController::class, 'store'])->name('lesson.create');
    Route::post('lessons/{lesson}/update', [LessonController::class, 'update'])->name('lesson.update');
});
