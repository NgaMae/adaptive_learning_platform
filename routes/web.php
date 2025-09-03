<?php

use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\RegisteredUserController;

// General Routes
Route::get('/sign-up', function () {
    return Inertia::render('SignUp');
})->name('sign-up');
Route::post('/sign-up', [RegisteredUserController::class, 'signUp'])->name('sign-up.post');
Route::post('/sign-in', [RegisteredUserController::class, 'signIn'])->name('sign-in.post');
Route::get('/sign-in', function () {
    return Inertia::render('SignIn');
})->name('sign-in');
Route::get('/tutor-sign-up', function () {
    return Inertia::render('pages/AuthPages/SignUp');
})->name('tutor-sign-up');
Route::post('/tutor-sign-up', [RegisteredUserController::class, 'tutorSignUp'])->name('tutor-sign-up.post');
Route::get('/tutor-sign-in', function () {
    return Inertia::render('pages/AuthPages/SignIn');
})->name('tutor-sign-in');
Route::post('/tutor-sign-in', [RegisteredUserController::class, 'tutorSignIn'])->name('tutor-sign-in.post');

// Default Landing Page
Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('landing-page');

// Learner Routes
Route::prefix('learner')->name('learner.')->middleware(['auth', 'role:1'])->group(function () {

    Route::get('/home', function () {
        $courses = Course::with('lessons.quizzes', 'creator')->get();
        return Inertia::render('LearnerHome', ['courses' => $courses]);
    })->name('home');

    Route::get('/course/{courseId}', function ($courseId) {
        $course = Course::with('creator', 'lessons.quizzes')->find($courseId);
        return Inertia::render('learner/LearnerCourses', ['course' => $course, 'currentLessonId' => 1]);
    })->name('course');

    Route::get('/settings', function () {
        return Inertia::render('learner/Settings');
    })->name('settings');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Route::prefix('test')->group(function () {

//     Route::get('learner-courses', function () {
//         $course = Course::find(2)->with('creator', 'lessons.quizzes')->first();
//         return Inertia::render('learner/LearnerCourses', ['course' => $course, 'currentLessonId' => 11]);
//     });
// });


Route::prefix('tutor')->middleware(['auth', 'role:2'])->group(function () {

    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // });

    Route::get('/', function () {
        $courses = Course::with('lessons.quizzes', 'creator')->where('created_by', Auth::user()->id)->get();
        return Inertia::render('welcome', ['courses' => $courses]);
    })->name('tutor.dashboard');

    require __DIR__ . '/education.php';

    Route::get('/{any}', function () {
        return Inertia::render('welcome', [
            'courses' => Course::with('lessons.quizzes')->get(),
        ]);
    })->where('any', '.*');
});
