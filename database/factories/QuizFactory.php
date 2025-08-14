<?php

namespace Database\Factories;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuizFactory extends Factory
{
    public function definition(): array
    {
        $options = [
            'A' => $this->faker->word(),
            'B' => $this->faker->word(),
            'C' => $this->faker->word(),
            'D' => $this->faker->word(),
        ];

        return [
            'lesson_id' => $this->faker->numberBetween(1, 10), // Assuming lessons are created with IDs 1-10
            'question' => $this->faker->sentence() . '?',
            'options' => $options,
            'correct_answer' => $this->faker->randomElement(array_keys($options)),
            'points' => 1, // Default points for the question
        ];
    }
}
