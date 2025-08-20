import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    courses?: Course[];
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Course {
    id: number;
    title: string;
    description: string;
    difficulty: number; // 1: beginner, 2: intermediate, 3: advanced
    created_at: string;
    updated_at: string;
    lessons?: Lesson[];
    [key: string]: unknown; // allows extra fields without breaking type checks
}
export interface Lesson {
    id: number;
    title: string;
    content: string;
    course_id: number;
    order: number;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // allows extra fields without breaking type checks
}