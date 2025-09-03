<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Lesson;
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Support\Facades\Log;

class QuizController extends Controller
{
    public function generate(Lesson $lesson, Request $request)
    {
        $validated = $request->validate([
            'count' => 'required|integer|min:1|max:5'
        ]);
        // Call ChatGPT API
        $response = OpenAI::chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are a quiz generator. Output ONLY raw JSON without any explanations or Markdown fences.'
                ],
                [
                    'role' => 'user',
                    'content' => "Create" . $validated['count'] . " multiple-choice quiz questions based on this lesson:\n\n" . $lesson->content .
                        "\n\nFormat: [{\"question\": \"...\", \"options\": [\"...\",\"...\",\"...\",\"...\"], \"correct_answer\": \"...\"}]"
                ],
            ],
        ]);

        // Extract JSON string from response
        $content = $response->choices[0]->message->content;

        // Clean up response: remove markdown fences (```json ... ```)
        $content = preg_replace('/^```(?:json)?|```$/m', '', trim($content));

        // Extract only JSON array if there's extra text
        if (preg_match('/\[[\s\S]*\]/', $content, $matches)) {
            $content = $matches[0];
        }

        // Decode JSON
        $json = json_decode($content, true);

        if (!is_array($json)) {
            Log::error("Failed to decode quiz JSON", ['raw' => $content]);
            return back()->with('error', 'Quiz generation failed. Please try again.');
        }

        // Save quizzes in DB
        foreach ($json as $q) {
            Quiz::create([
                'lesson_id' => $lesson->id,
                'question' => $q['question'],
                'options' => $q['options'],
                'correct_answer' => $q['correct_answer'],
                'points' => $q['points'] ?? 1, // default if not provided
            ]);
        }

        return redirect('tutor/quizzes')->with('success', 'Quizzes generated!');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Lesson $lesson)
    {
        return inertia('pages/Education/ViewQuizzes', [
            'lesson' => $lesson->load('quizzes')
        ]);
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
    public function store(Request $request, Lesson $lesson)
    {
        $data = $request->validate([
            'question' => 'required|string',
            'options' => 'required|array|min:2',
            'correct_answer' => 'required|string',
            'points' => 'required|integer|min:1',
        ]);

        $lesson->quizzes()->create($data);

        return redirect()->back()->with('success', 'Quiz added!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quiz $quiz)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz)
    {
        $data = $request->validate([
            'question' => 'required|string',
            'options' => 'required|array|min:2',
            'correct_answer' => 'required|string',
            'points' => 'required|integer|min:1',
        ]);

        $quiz->update($data);

        return redirect()->back()->with('success', 'Quiz updated!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        return redirect()->back()->with('success', 'Quiz deleted!');
    }
}
