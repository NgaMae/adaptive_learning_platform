import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Lesson {
    id: number;
    title: string;
    quizzes: Quiz[];
}
interface Quiz {
    id: number;
    question: string;
    options: string[];
    correct_answer: string;
    points: number;
}
export default function QuizIndex({ lesson }: { lesson: Lesson }) {
    const [editing, setEditing] = useState<Quiz | null>(null);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
    } = useForm({
        question: '',
        options: ['', ''],
        correct_answer: '',
        points: 1,
    });

    interface SubmitEvent extends React.FormEvent<HTMLFormElement> {}

    interface QuizFormData {
        question: string;
        options: string[];
        correct_answer: string;
        points: number;
    }

    const submit = (e: SubmitEvent) => {
        e.preventDefault();
        if (editing) {
            put(route('quizzes.update', (editing as Quiz).id), {
                onSuccess: () => {
                    reset();
                    setEditing(null);
                },
            });
        } else {
            post(route('quizzes.store', lesson.id), { onSuccess: () => reset() });
        }
    };

    return (
        <div className="min-h-screen space-y-4 p-4">
            <h2 className="text-xl font-bold">Quizzes for {lesson.title}</h2>

            {/* Quiz Form */}
            <form onSubmit={submit} className="space-y-3 rounded-xl bg-white p-4 shadow">
                <input
                    type="text"
                    value={data.question}
                    onChange={(e) => setData('question', e.target.value)}
                    placeholder="Enter question"
                    className="w-full rounded border p-2"
                />

                {data.options.map((opt, i) => (
                    <input
                        key={i}
                        type="text"
                        value={opt}
                        onChange={(e) => {
                            const newOpts = [...data.options];
                            newOpts[i] = e.target.value;
                            setData('options', newOpts);
                        }}
                        placeholder={`Option ${i + 1}`}
                        className="w-full rounded border p-2"
                    />
                ))}
                <button type="button" onClick={() => setData('options', [...data.options, ''])} className="text-blue-500">
                    + Add Option
                </button>

                <input
                    type="text"
                    value={data.correct_answer}
                    onChange={(e) => setData('correct_answer', e.target.value)}
                    placeholder="Correct answer"
                    className="w-full rounded border p-2"
                />

                <input
                    type="number"
                    value={data.points}
                    onChange={(e) => setData('points', Number(e.target.value))}
                    className="w-full rounded border p-2"
                />

                <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
                    {editing ? 'Update Quiz' : 'Add Quiz'}
                </button>
            </form>

            {/* Quiz List */}
            <div className="space-y-3">
                {lesson.quizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between rounded border p-4">
                        <div>
                            <p className="font-semibold">{quiz.question}</p>
                            <ul className="list-disc pl-6">{Array.isArray(quiz.options) && quiz.options.map((opt, i) => <li key={i}>{opt}</li>)}</ul>
                            <p className="text-sm text-green-600">Answer: {quiz.correct_answer}</p>
                            <p className="text-sm">Points: {quiz.points}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => {
                                    setEditing(quiz);
                                    setData(quiz);
                                }}
                                className="rounded bg-yellow-400 px-2 py-1 text-white"
                            >
                                Edit
                            </button>
                            <button onClick={() => destroy(route('quizzes.destroy', quiz.id))} className="rounded bg-red-500 px-2 py-1 text-white">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
