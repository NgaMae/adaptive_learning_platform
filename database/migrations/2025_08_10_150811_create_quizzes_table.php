<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lesson_id')->constrained()->onDelete('cascade'); // Link to lesson
            $table->string('question'); // Quiz question
            $table->json('options'); // Multiple choice options in JSON
            $table->string('correct_answer'); // Correct option key or text
            $table->integer('points')->default(1); // Score for the question

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
