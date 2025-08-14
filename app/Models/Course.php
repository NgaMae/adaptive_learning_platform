<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'difficulty',
        'created_by',
    ];

    /**
     * A course has many lessons.
     */
    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    /**
     * A course is created by a user (instructor).
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getDifficultyLabelAttribute()
    {
        return [
            1 => 'Beginner',
            2 => 'Intermediate',
            3 => 'Advanced',
        ][$this->difficulty] ?? 'Unknown';
    }
}
