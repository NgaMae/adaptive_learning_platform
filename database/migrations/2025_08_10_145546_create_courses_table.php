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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Course name
            $table->text('description')->nullable(); // Detailed course info
            $table->integer('difficulty')->default(1)->comment('1:beginner 2:intermediate 3:advanced'); // beginner, intermediate, advanced

            $table->foreignId('created_by')->constrained('users')->onDelete('cascade'); // Who created the course

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
