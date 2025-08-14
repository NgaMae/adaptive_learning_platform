<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson_id',
        'question',
        'options',
        'correct_answer',
        'points',
    ];

    protected $casts = [
        'options' => 'array', // auto-cast JSON to array
    ];

    /**
     * A quiz belongs to a lesson.
     */
    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    /**
     * A quiz has many results from users.
     */
    public function results()
    {
        return $this->hasMany(QuizResult::class);
    }
}
