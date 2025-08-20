import Input from '@/components/components/form/input/InputField';
import TextArea from '@/components/components/form/input/TextArea';
import Label from '@/components/components/form/Label';
import Select from '@/components/components/form/Select';
import Button from '@/components/components/ui/button/Button';
import { Modal } from '@/components/components/ui/modal';
import InputError from '@/components/input-error';
import { useModal } from '@/hooks/hooks/useModal';
import { SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import PageBreadcrumb from '../../../components/components/common/PageBreadCrumb';

interface CoursesProps {
    courses: SharedData['courses'];
}
interface CourseForm {
    title: string;
    description: string;
    difficulty: number;
    created_by: number; // 1: beginner, 2: intermediate, 3: advanced
}
export default function Courses() {
    const { auth, courses } = usePage<SharedData>().props;
    const [description, setDescription] = useState('');

    const { data, setData, errors, processing, post } = useForm<Required<CourseForm>>({
        title: '',
        description: '',
        difficulty: 1,
        created_by: auth.user.id,
    });
    const { isOpen, openModal, closeModal } = useModal();

    const handleSave: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('course.create'));
        setDescription(''); // Clear description after submission
        if (!processing)
            // Only close modal if not processing
            closeModal();
    };

    const options = [
        { value: 1, label: 'Beginner' },
        { value: 2, label: 'Intermediate' },
        { value: 3, label: 'Advanced' },
    ];
    const handleSelectChange = (value: string) => {
        setData('difficulty', parseInt(value, 10));
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="Courses" />
            <div className="grid min-h-screen grid-cols-1 gap-8 rounded-2xl border border-gray-200 bg-white px-5 py-7 sm:grid-cols-2 lg:grid-cols-3 xl:px-10 xl:py-12 dark:border-gray-800 dark:bg-white/[0.03]">
                {courses?.map((course) => (
                    <div
                        key={course.id}
                        className="max-h-50 cursor-pointer overflow-hidden rounded-2xl border border-gray-200 p-4 pr-5 select-none hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                    >
                        <h3 className="mb-4 text-theme-xl font-semibold text-gray-800 sm:text-2xl dark:text-white/90">{course.title}</h3>
                        <p className="line-clamp-5 text-sm text-pretty text-gray-500 sm:text-base dark:text-gray-400">{course.description}</p>
                    </div>
                ))}

                <div
                    className="px-auto flex min-h-50 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 p-4 pr-5 select-none hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                    onClick={openModal}
                >
                    <PlusIcon className="size-8" />
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
                <div className="relative no-scrollbar w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Create Course</h4>
                        <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">Enter the details of the course.</p>
                    </div>
                    <form className="flex flex-col" onSubmit={handleSave}>
                        <div className="custom-scrollbar overflow-y-auto px-2">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div>
                                    <Label>Title</Label>
                                    <Input type="text" id="title" onChange={(e) => setData('title', e.target.value)} placeholder="Couse Title" />
                                    <InputError className="mt-2" message={errors.title} />
                                </div>

                                <div>
                                    <Label>Difficulty Level</Label>
                                    <Select options={options} placeholder="Select level" onChange={handleSelectChange} className="dark:bg-dark-900" />
                                    <InputError className="mt-2" message={errors.difficulty} />
                                </div>

                                <div className="lg:col-span-2">
                                    <Label>Description</Label>
                                    <TextArea
                                        value={description}
                                        onChange={(value) => {
                                            setDescription(value);
                                            setData('description', value);
                                        }}
                                        rows={6}
                                    />
                                    <InputError className="mt-2" message={errors.description} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
                            <Button size="sm" variant="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button size="sm" type="submit" disabled={processing}>
                                Create Course
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
