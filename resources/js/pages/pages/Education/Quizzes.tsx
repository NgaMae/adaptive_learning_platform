import Label from '@/components/components/form/Label';
import Button from '@/components/components/ui/button/Button';
import { Modal } from '@/components/components/ui/modal';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import PageBreadcrumb from '../../../components/components/common/PageBreadCrumb';

import Select from '@/components/components/form/Select';
import Badge from '@/components/components/ui/badge/Badge';
import { useModal } from '@/hooks/hooks/useModal';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const options = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
];

interface QuizForm {
    count: number;
    lesson_order?: number;
    lesson_id: number;
}
const Quizzes = () => {
    const { courses } = usePage<SharedData>().props;
    const { isOpen, openModal, closeModal } = useModal();

    const { data, setData, errors, processing, post } = useForm<Required<QuizForm>>({
        lesson_id: 0,
        count: 1,
        lesson_order: 0,
    });

    const handleSelectChange = (value: number) => {
        setData('count', value);
    };
    const handleSave: FormEventHandler = (e) => {
        e.preventDefault();
        if (!processing) {
            closeModal();
        }
        post(route('lessons.generate-quizzes', { lesson: data.lesson_id }));
    };
    const handleQuizGenerate = (lessonId: number) => {
        router.visit(route('quizzes.index', { lesson: lessonId }));
    };
    return (
        <div className="min-h-screen">
            <PageBreadcrumb pageTitle="Quizzes" />
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
                            className="max-h-50 cursor-pointer overflow-hidden rounded-2xl border border-gray-200 p-4 pr-5 select-none hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                        >
                            <div className="flex items-start justify-between">
                                <h3 className="text-theme-xl font-semibold text-gray-800 sm:text-2xl dark:text-white/90">Lesson-{lesson.order}</h3>
                                {lesson.quizzes && lesson.quizzes.length > 0 && (
                                    <Badge variant="light" color="primary">
                                        Generated
                                    </Badge>
                                )}
                            </div>
                            <p className="line-clamp-5 text-sm text-pretty text-gray-500 sm:text-base dark:text-gray-400">{lesson.title}</p>
                            <div className="mt-4 flex items-center justify-between">
                                {lesson.quizzes && lesson.quizzes.length > 0 ? (
                                    <Button size="sm" variant="outline" onClick={() => handleQuizGenerate(lesson.id)}>
                                        View Quizzes
                                    </Button>
                                ) : (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            setData('lesson_order', lesson.order);
                                            setData('lesson_id', lesson.id);
                                            openModal();
                                        }}
                                    >
                                        Generate Quiz
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        router.visit(route('lesson.edit', { lesson: lesson.id }));
                                    }}
                                >
                                    view Lesson
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
                <div className="relative no-scrollbar w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Chapter - {data.lesson_order}</h4>
                        <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">Generate Quizzes for this chapter</p>
                    </div>
                    <form className="flex flex-col" onSubmit={handleSave}>
                        <div className="custom-scrollbar overflow-y-auto px-2">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                                <div>
                                    <Label>How many quizzes do you want to generate?</Label>
                                    <Select
                                        options={options}
                                        placeholder="Select a number"
                                        onChange={handleSelectChange}
                                        className="dark:bg-dark-900"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button size="sm" type="submit" disabled={processing}>
                                {processing ? 'Generating...' : 'Generate'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};
export default Quizzes;
