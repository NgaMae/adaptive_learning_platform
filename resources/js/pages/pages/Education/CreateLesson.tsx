import LessonEditor from '@/components/components/editor/LessonEditor';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ChevronLeftIcon } from 'lucide-react';
import AuthLayout from '../AuthPages/AuthPageLayout';

interface CreateLessonProps {
    title: string;
    course_id: number;
    lesson_order: number;
    content?: string; // Optional content field for lesson details
    id?: number; // Optional ID for existing lesson}
    [key: string]: any;
}
export default function CreateLessson() {
    const { lesson } = usePage<CreateLessonProps>().props;
    console.log(lesson);
    const { data, setData, post, processing, errors } = useForm({
        content: lesson?.content || '',
    });

    const handleSave = () => {
        post(route('lesson.update', { lesson: lesson.id }));
    };
    return (
        <>
            <AuthLayout>
                {/* <form onSubmit={submit} className="mx-auto max-w-2xl space-y-6">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Lesson Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                        {errors.title && <div className="text-red-500">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Lesson Content</label>
                        <LessonEditor content={data.content} onChange={(html) => setData('content', html)} />
                        {errors.content && <div className="text-red-500">{errors.content}</div>}
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Lesson'}
                    </Button>
                </form> */}
                <div className="fixed z-0 mx-auto my-auto h-8 w-full bg-white dark:bg-gray-900">
                    <Link
                        href="/"
                        className="inline-flex items-center align-middle text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <ChevronLeftIcon className="size-5" />
                        Back to dashboard
                    </Link>
                </div>
                <div className="mt-20">
                    <h1 className="text-center text-2xl font-bold dark:text-gray-400">Chapter - {lesson.order}</h1>
                    <h2 className="mb-4 text-center text-xl dark:text-gray-400">{lesson.title}</h2>
                    <hr />
                    <LessonEditor onSave={handleSave} initialContent={data.content} data={data} setData={setData} processing={processing} />
                </div>
            </AuthLayout>
        </>
    );
}
