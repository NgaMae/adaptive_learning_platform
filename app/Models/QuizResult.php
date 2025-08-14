<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'quiz_id',
        'is_correct',
        'score',
    ];

    /**
     * Result belongs to a quiz.
     */
    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    /**
     * Result belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
