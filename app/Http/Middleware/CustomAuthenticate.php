<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Log;

class CustomAuthenticate extends Middleware
{
    protected function redirectTo($request)
    {
        // Check if the current route belongs to learner.*
        if ($request->is('learner/*') || $request->is('learner')) {
            return route('sign-in'); // Redirect to learner login
        } elseif ($request->is('tutor/*') || $request->is('tutor')) {
            return route('tutor-sign-in'); // Redirect to admin login
        }

        // Optionally, default redirect for other routes
        // return route('login');
    }
}
