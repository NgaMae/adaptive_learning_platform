<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Quiz;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        // Create 5 courses
        Course::factory(5)->create()->each(function ($course) {
            // For each course, create 10 lessons
            foreach (range(1, 10) as $order) {
                Lesson::factory()->create([
                    'course_id' => $course->id,
                    'order' => $order,
                ])->each(function ($lesson) {
                    // For each lesson, create quiz
                    Quiz::factory()->create([
                        'lesson_id' => $lesson->id,
                    ]);
                });
            }
        });
    }
}
