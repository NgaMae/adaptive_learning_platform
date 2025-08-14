<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;

class LessonSeeder extends Seeder
{
    public function run()
    {
        foreach (range(1, 10) as $order) {
            Lesson::factory()->create([
                'order' => $order,
            ]);
        }
    }
}
