<?php

namespace Database\Seeders;

use App\Models\Quiz;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (range(1, 10) as $lessonId) {
            Quiz::factory()->create([
                'lesson_id' => $lessonId,
            ]);
        }
    }
}
