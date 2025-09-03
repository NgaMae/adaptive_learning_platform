// resources/js/components/RecentActivities.tsx
import { Table, TableBody, TableCell, TableRow } from '../ui/table';

interface Activity {
    id: number;
    message: string; // e.g. "User1 attempted the quiz"
    date: string; // e.g. "2025-08-25 14:20"
}

const activityData: Activity[] = [
    {
        id: 1,
        message: 'User1 attempted the quiz on JavaScript Basics',
        date: '2025-08-25 14:20',
    },
    {
        id: 2,
        message: 'User2 completed the lesson: Functions in PHP',
        date: '2025-08-24 09:15',
    },
    {
        id: 3,
        message: 'User1 updated profile details',
        date: '2025-08-23 18:45',
    },
    {
        id: 4,
        message: 'User3 enrolled in course: Laravel for Beginners',
        date: '2025-08-22 11:05',
    },
];

export default function RecentActivities() {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Activities</h3>
            </div>
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {activityData.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell className="py-3">
                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{activity.message}</p>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
