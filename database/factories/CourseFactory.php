<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'difficulty' => $this->faker->randomElement([1, 2, 3]), // 1: Beginner, 2: Intermediate, 3: Advanced
            'created_by' => 1, // automatically make a user if needed
        ];
    }
}
