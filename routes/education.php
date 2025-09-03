<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;

Route::middleware('auth')->group(function () {
    Route::post('courses', [CourseController::class, 'store'])->name('course.create');
    Route::post('courses/{course}', [CourseController::class, 'destroy'])->name('course.destroy');
    Route::post('lessons/', [LessonController::class, 'store'])->name('lesson.create');


    Route::prefix('lessons/{lesson}')->group(function () {
        Route::get('/', [LessonController::class, 'edit'])->name('lesson.edit');
        Route::post('update', [LessonController::class, 'update'])->name('lesson.update');
        Route::post('generate-quizzes', [QuizController::class, 'generate'])->name('lessons.generate-quizzes');
        Route::get('/quizzes', [QuizController::class, 'index'])->name('quizzes.index');
        Route::post('/quizzes', [QuizController::class, 'store'])->name('quizzes.store');
    });

    Route::put('/quizzes/{quiz}', [QuizController::class, 'update'])->name('quizzes.update');
    Route::delete('/quizzes/{quiz}', [QuizController::class, 'destroy'])->name('quizzes.destroy');
});
