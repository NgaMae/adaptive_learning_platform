import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ArrowRight, ArrowRightIcon, Book, BookMarked } from 'lucide-react';
import { Link } from 'react-router';
import { BoxIconLine } from '../../../icons';
import Badge from '../ui/badge/Badge';

export default function EcommerceMetrics() {
    const { auth, courses } = usePage<SharedData>().props;
    const total_lessons = (): number => {
        let total = 0;
        courses?.forEach((c) => {
            total += c.lessons?.length || 0;
        });
        return total;
    };
    const total_quizzes = (): number => {
        let total = 0;
        courses?.forEach((c) => {
            c.lessons?.forEach((l) => {
                total += l.quizzes?.length || 0;
            });
        });
        return total;
    };

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                    <Book className="size-6 text-gray-800 dark:text-white/90" />
                </div>

                <div className="mt-5 flex items-end justify-between">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Courses</span>
                        <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">{courses?.length}</h4>
                    </div>
                    <Link to={'courses'}>
                        <Badge color="success">
                            View All
                            <ArrowRightIcon />
                        </Badge>
                    </Link>
                </div>
            </div>
            {/* <!-- Metric Item End --> */}

            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                    <BookMarked className="size-6 text-gray-800 dark:text-white/90" />
                </div>
                <div className="mt-5 flex items-end justify-between">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Lessons</span>
                        <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">{total_lessons()}</h4>
                    </div>
                    <Link to={'lessons'}>
                        <Badge color="success">
                            View All
                            <ArrowRight />
                        </Badge>
                    </Link>
                </div>
            </div>
            {/* <!-- Metric Item End --> */}
            {/* <!-- Metric Item Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                    <BoxIconLine className="size-6 text-gray-800 dark:text-white/90" />
                </div>

                <div className="mt-5 flex items-end justify-between">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Quizzes</span>
                        <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">{total_quizzes()}</h4>
                    </div>
                    <Link to={'quizzes'}>
                        <Badge color="success">
                            View All
                            <ArrowRight />
                        </Badge>
                    </Link>
                </div>
            </div>
            {/* <!-- Metric Item End --> */}
        </div>
    );
}
