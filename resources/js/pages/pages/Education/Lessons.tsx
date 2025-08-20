import Input from '@/components/components/form/input/InputField';
import Label from '@/components/components/form/Label';
import Button from '@/components/components/ui/button/Button';
import { Modal } from '@/components/components/ui/modal';
import InputError from '@/components/input-error';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import PageBreadcrumb from '../../../components/components/common/PageBreadCrumb';

import { useModal } from '@/hooks/hooks/useModal';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

function addLesson(courseId: number, lessonOrder: number) {
    router.visit(route('lesson.create', { course: courseId, lesson: lessonOrder }));
}

interface LessonForm {
    title: string;
    course_id: number;
    lesson_order: number;
    content?: string; // Optional content field for lesson details
}
const Lessons = () => {
    const { courses } = usePage<SharedData>().props;

    const { isOpen, openModal, closeModal } = useModal();

    const { data, setData, errors, processing, post } = useForm<Required<LessonForm>>({
        title: '',
        course_id: 0,
        lesson_order: 1,
        content: '', // Optional content field for lesson details
    });

    const handleSave: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('lesson.create'));
    };
    return (
        <div className="min-h-screen">
            <PageBreadcrumb pageTitle="Lessons" />
            {courses?.map((course) => (
                <div
                    key={course.id}
                    className="mb-8 grid grid-cols-1 gap-8 rounded-2xl border border-gray-200 bg-white px-5 py-7 sm:grid-cols-2 lg:grid-cols-3 xl:px-10 xl:py-12 dark:border-gray-800 dark:bg-white/[0.03]"
                >
                    <div className="rounded-2xl border border-gray-200 p-4 text-center text-theme-xl font-bold sm:col-span-2 lg:col-span-3 dark:text-white">
                        {course.title}
                    </div>
                    {course.lessons?.map((lesson) => (
                        <div
                            key={lesson.id}
                            onClick={() => {
                                router.visit(route('lesson.edit', { lesson: lesson.id }));
                            }}
                            className="max-h-50 cursor-pointer overflow-hidden rounded-2xl border border-gray-200 p-4 pr-5 select-none hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                        >
                            <h3 className="mb-4 text-theme-xl font-semibold text-gray-800 sm:text-2xl dark:text-white/90">Lesson-{lesson.order}</h3>
                            <p className="line-clamp-5 text-sm text-pretty text-gray-500 sm:text-base dark:text-gray-400">{lesson.title}</p>
                        </div>
                    ))}

                    <div
                        className="px-auto flex max-h-50 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 p-4 pr-5 select-none hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                        // onClick={() => addLesson(course.id, (course.lessons?.length || 0) + 1)}
                        onClick={() => {
                            setData('course_id', course.id);
                            setData('lesson_order', (course.lessons?.length || 0) + 1);
                            setData('title', '');
                            openModal();
                        }}
                    >
                        <PlusIcon className="size-8" />
                    </div>
                </div>
            ))}
            <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
                <div className="relative no-scrollbar w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Chapter - {data.lesson_order}</h4>
                        <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">Enter Chapter Title</p>
                    </div>
                    <form className="flex flex-col" onSubmit={handleSave}>
                        <div className="custom-scrollbar overflow-y-auto px-2">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                                <div>
                                    <Label>Title</Label>
                                    <Input
                                        type="text"
                                        id="title"
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Chapter Title"
                                        value={data.title}
                                    />
                                    <InputError className="mt-2" message={errors.title} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button size="sm" type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Lesson'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};
export default Lessons;
