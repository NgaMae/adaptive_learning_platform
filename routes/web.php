<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Support\Facades\Log;

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return Inertia::render('LandingPage');
    })->name('landing-page');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::prefix('test')->group(function () {

    Route::get('landingPage', function () {
        return Inertia::render('LandingPage');
    })->name('lee');

    Route::get('test-sign-in', function () {
        return Inertia::render('SignIn');
    });

    Route::get('test-sign-up', function () {
        return Inertia::render('SignUp');
    });

    Route::get('learner-courses', function () {
        $course = Course::find(2)->with('creator', 'lessons.quizzes')->first();
        Log::info($course);
        return Inertia::render('learner/LearnerCourses', ['course' => $course, 'currentLessonId' => 11]);
    });
});


Route::prefix('tutor')->middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/', function () {
        $courses = Course::with('lessons.quizzes', 'creator')->get();
        return Inertia::render('welcome', ['courses' => $courses]);
    })->name('home');

    require __DIR__ . '/education.php';

    Route::get('/{any}', function () {
        return Inertia::render('welcome', [
            'courses' => Course::with('lessons.quizzes')->get(),
        ]);
    })->where('any', '.*');
});
