<?php

namespace Database\Factories;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{
    protected $model = Lesson::class;

    public function definition(): array
    {
        return [
            'course_id' => 1,
            'title' => $this->faker->sentence(4),
            'content' => $this->faker->paragraphs(3, true),
        ];
    }
}
