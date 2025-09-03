<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;
use App\Http\Requests\CourseCreateRequest;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CourseCreateRequest $request)
    {
        Model::unguard();
        $course = Course::create($request->validated());

        return redirect('tutor/courses')->with('success', 'Course created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        try {
            // If your course has related lessons/quizzes, you might need to handle them
            // Example: $course->lessons()->delete();
            $course->delete();

            return redirect('/tutor/courses')
                ->with('success', 'Course deleted successfully!');
        } catch (\Exception $e) {
            Log::error('Failed to delete course', ['error' => $e->getMessage()]);

            return back()->with('error', 'Failed to delete the course. Please try again.');
        }
    }
}
