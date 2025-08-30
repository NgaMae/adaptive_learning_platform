<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LessonController extends Controller
{
    /** 
     * Display a listing of the resource.
     */
    public function index() {}

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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'course_id' => 'required|exists:courses,id',
            'lesson_order' => 'required|integer|min:1',
            'content' => 'nullable|string', // Assuming content can be HTML or Markdown
        ]);
        Log::info('Creating lesson with data: ', $validated);

        $lesson = Lesson::create([
            'course_id' => $validated['course_id'],
            'order' => $validated['lesson_order'],
            'title' => $validated['title'],
            'content' => $validated['content'], // store HTML
        ]);

        return redirect()->route('lesson.edit', ['lesson' => $lesson->id]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Lesson $lesson) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lesson $lesson)
    {
        return Inertia::render('pages/Education/CreateLesson', ['lesson' => $lesson, 'previousUrl' => url()->previous()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lesson $lesson)
    {
        $validated = $request->validate([
            'content' => 'nullable|string', // Assuming content can be HTML or Markdown
        ]);
        $lesson->update([
            'content' => $validated['content'], // store HTML
        ]);
        return redirect('/lessons/')->with('status', 'Lesson updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        //
    }
}
