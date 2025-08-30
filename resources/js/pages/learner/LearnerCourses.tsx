import { useEffect, useMemo, useRef, useState } from 'react';
// import 'react-quill/dist/quill.snow.css';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'quill/dist/quill.snow.css';

// -------------------- Types --------------------
interface Lesson {
    id?: number;
    title: string;
    content: string; // from Quill (stored as HTML)
    durationMinutes?: number;
    order: number;
    quizzes?: Quiz[];
    quizCount?: number;
}

interface Quiz {
    id: number;
    lesson_id: number;
    question: string;
    options: string[];
    correct_answer: string;
    points: number;
    [key: string]: any;
}
// interface Section {
//     id: number;
//     title: string;
//     lessons: Lesson[];
// }

interface Course {
    id: number;
    title: string;
    description?: string;
    lessons: Lesson[];
}

interface Props {
    course: Course;
    currentLessonId?: number;
}

// -------------------- Helpers --------------------
function clsx(...xs: Array<string | false | null | undefined>) {
    return xs.filter(Boolean).join(' ');
}

const storageKey = (courseId: number, suffix: string) => `alp:course:${courseId}:${suffix}`;
const noteKey = (courseId: number, lessonId: number) => `alp:note:${courseId}:${lessonId}`;
const completeKey = (courseId: number) => storageKey(courseId, 'completedLessons');
const bookmarkKey = (courseId: number) => storageKey(courseId, 'bookmark');

function useLocalStorage<T>(key: string, initial: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? (JSON.parse(raw) as T) : initial;
        } catch {
            return initial;
        }
    });
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {}
    }, [key, value]);
    return [value, setValue] as const;
}

function flattenLessons(course: Course) {
    const list: Lesson[] = [];
    course?.lessons.forEach((l) => list.push(l));
    return list.sort((a, b) => a.order - b.order);
}

function computeProgress(course: Course, completed: (number | undefined)[]) {
    const total = flattenLessons(course).length;
    const done = completed.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { total, done, pct };
}

function extractHeadingsFromHTML(html: string) {
    if (typeof window === 'undefined') return [] as { id: string; text: string; level: number }[];
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const nodes = Array.from(tmp.querySelectorAll('h1, h2, h3')) as HTMLElement[];
    return nodes.map((el, idx) => ({
        id: el.id || `h-${idx}`,
        text: el.innerText || el.textContent || '',
        level: Number(el.tagName.replace('H', '')),
    }));
}

// -------------------- Main Component --------------------
export default function LearnerCoursePage({ course, currentLessonId }: Props) {
    const allLessons = useMemo(() => flattenLessons(course), [course]);
    const initialLessonId = currentLessonId ?? allLessons[0]?.id;
    const [activeLessonId, setActiveLessonId] = useState<number | undefined>(initialLessonId);

    const [completedLessons, setCompletedLessons] = useLocalStorage<(number | undefined)[]>(completeKey(course?.id), []);
    const [bookmark, setBookmark] = useLocalStorage<number | undefined | null>(bookmarkKey(course?.id), null);

    const activeLesson = useMemo(() => allLessons.find((l) => l.id === activeLessonId) || allLessons[0], [allLessons, activeLessonId]);

    // Right-rail anchors from lesson content
    const headings = useMemo(() => extractHeadingsFromHTML(activeLesson?.content || ''), [activeLesson]);

    const progress = useMemo(() => computeProgress(course, completedLessons), [course, completedLessons]);

    // sidebar state
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [tocQuery, setTocQuery] = useState('');

    function gotoLesson(id: number | undefined) {
        setActiveLessonId(id);
        // Optional: use Inertia router.visit(route('learner.lesson', { id })) here
        setSidebarOpen(false);
    }

    function markCompleteToggle() {
        setCompletedLessons((prev) => (prev.includes(activeLesson.id) ? prev.filter((x) => x !== activeLesson.id) : [...prev, activeLesson.id]));
    }

    function setBookmarkHere() {
        setBookmark(activeLesson.id);
    }

    const idx = allLessons.findIndex((l) => l.id === activeLesson.id);
    const prevLesson = allLessons[idx - 1];
    const nextLesson = allLessons[idx + 1];

    return (
        <div className="min-h-screen w-full bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            {/* Top bar */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200/50 bg-white/70 px-4 py-3 backdrop-blur dark:border-gray-800/60 dark:bg-gray-900/70">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen((s) => !s)}
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300/60 px-3 py-2 hover:bg-gray-100 lg:hidden dark:border-gray-700/60 dark:hover:bg-gray-800"
                        aria-label="Toggle sidebar"
                    >
                        ☰
                    </button>
                    <div className="hidden text-sm text-gray-500 sm:block dark:text-gray-400">
                        <span className="cursor-pointer hover:underline">Home</span>
                        <span className="mx-2">/</span>
                        <span className="cursor-pointer hover:underline">Courses</span>
                        <span className="mx-2">/</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{course?.title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <div className="hidden items-center gap-2 md:flex">
                        <div className="h-2 w-40 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                            <div className="h-full bg-blue-600" style={{ width: `${progress.pct}%` }} />
                        </div>
                        <span className="text-gray-600 tabular-nums dark:text-gray-300">{progress.pct}%</span>
                    </div>
                    <button
                        onClick={setBookmarkHere}
                        title="Bookmark lesson"
                        className={clsx(
                            'rounded-lg border px-3 py-2 transition',
                            bookmark === activeLesson?.id
                                ? 'border-amber-500 bg-amber-50/50 text-amber-600 dark:bg-amber-500/10'
                                : 'border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
                        )}
                    >
                        🔖 {bookmark === activeLesson?.id ? 'Bookmarked' : 'Bookmark'}
                    </button>
                </div>
            </div>

            <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-0 lg:grid-cols-[300px_minmax(0,1fr)_300px]">
                {/* Sidebar */}
                <aside
                    className={clsx(
                        'border-r border-gray-200/60 bg-white lg:sticky lg:top-14 lg:h-[calc(100vh-56px)] lg:overflow-y-auto dark:border-gray-800/60 dark:bg-gray-900',
                        'transition-transform duration-200 lg:translate-x-0',
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
                    )}
                >
                    <div className="border-b border-gray-200/60 p-4 dark:border-gray-800/60">
                        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Contents</h2>
                        <input
                            value={tocQuery}
                            onChange={(e) => setTocQuery(e.target.value)}
                            placeholder="Search lessons…"
                            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800"
                        />
                    </div>
                    <nav className="space-y-3 p-2">
                        <div>
                            <div className="px-2 py-2 text-xs tracking-wider text-gray-500 uppercase dark:text-gray-400">{course.title}</div>
                            <ul className="space-y-1">
                                {course?.lessons
                                    .filter((l) => (l.title + ' ' + (l.order ?? '')).toLowerCase().includes(tocQuery.toLowerCase()))
                                    .map((l) => {
                                        const active = l.id === activeLesson.id;
                                        const done = completedLessons.includes(l.id);
                                        return (
                                            <li key={l.id}>
                                                <button
                                                    onClick={() => gotoLesson(l.id)}
                                                    className={clsx(
                                                        'w-full rounded-lg border px-3 py-2 text-left',
                                                        active
                                                            ? 'border-blue-500 bg-blue-50/60 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300'
                                                            : 'border-transparent hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
                                                    )}
                                                >
                                                    <div className="flex items-center justify-between gap-3">
                                                        <span className="truncate">
                                                            <span className="mr-2 text-gray-400">{l.order}.</span>
                                                            {l.title}
                                                        </span>
                                                        <span className="shrink-0 text-xs text-gray-500">
                                                            {done ? '✅' : l.quizCount ? `📝 ${l.quizCount}` : ''}
                                                        </span>
                                                    </div>
                                                </button>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                        <div className="h-8" />
                    </nav>
                </aside>

                {/* Main content */}
                <main className="min-h-[70vh] px-4 py-8 md:px-8">
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-gray-100">{activeLesson?.title}</h1>
                    <div className="mt-2 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <span>Lesson {activeLesson?.order}</span>
                        {activeLesson?.durationMinutes ? <span>• {activeLesson.durationMinutes} min</span> : null}
                        {completedLessons.includes(activeLesson?.id) ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600">✅ Completed</span>
                        ) : null}
                    </div>

                    <Tabs lesson={activeLesson} onMarkComplete={markCompleteToggle} isCompleted={completedLessons.includes(activeLesson?.id)} />

                    {/* Prev / Next + Mark complete */}
                    <div className="mt-8 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="flex gap-3">
                            <button
                                disabled={!prevLesson}
                                onClick={() => prevLesson && gotoLesson(prevLesson?.id)}
                                className={clsx(
                                    'rounded-lg border px-4 py-2 text-sm',
                                    prevLesson
                                        ? 'border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800'
                                        : 'cursor-not-allowed border-gray-200 text-gray-400 dark:border-gray-800',
                                )}
                            >
                                ← Prev
                            </button>
                            <button
                                disabled={!nextLesson}
                                onClick={() => nextLesson && gotoLesson(nextLesson?.id)}
                                className={clsx(
                                    'rounded-lg border px-4 py-2 text-sm',
                                    nextLesson
                                        ? 'border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800'
                                        : 'cursor-not-allowed border-gray-200 text-gray-400 dark:border-gray-800',
                                )}
                            >
                                Next →
                            </button>
                        </div>

                        <button
                            onClick={markCompleteToggle}
                            className={clsx(
                                'rounded-lg px-4 py-2 text-sm',
                                completedLessons.includes(activeLesson?.id)
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                    : 'bg-blue-600 text-white hover:bg-blue-700',
                            )}
                        >
                            {completedLessons.includes(activeLesson?.id) ? 'Mark as Incomplete' : 'Mark as Complete'}
                        </button>
                    </div>
                </main>

                {/* Right rail */}
                <aside className="hidden border-l border-gray-200/60 bg-white lg:sticky lg:top-14 lg:block lg:h-[calc(100vh-56px)] lg:overflow-y-auto dark:border-gray-800/60 dark:bg-gray-900">
                    <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">On this page</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                            {headings.length === 0 && <li className="text-gray-500 dark:text-gray-400">No headings</li>}
                            {headings.map((h) => (
                                <li key={h.id} className={clsx(h.level >= 3 && 'pl-4')}>
                                    <a href={`#${h.id}`} className="text-blue-600 hover:underline">
                                        {h.text}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6">
                            <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Progress</h4>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                                <div className="h-full bg-blue-600" style={{ width: `${progress.pct}%` }} />
                            </div>
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {progress.done} of {progress.total} lessons completed
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Bookmarked</h4>
                            {bookmark ? (
                                <button onClick={() => setActiveLessonId(bookmark)} className="text-sm text-blue-600 hover:underline">
                                    Jump to lesson #{bookmark}
                                </button>
                            ) : (
                                <div className="text-sm text-gray-500">No bookmark yet</div>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

// -------------------- Tabs (Lesson / Examples / Try It / Quiz) --------------------
function Tabs({ lesson, onMarkComplete, isCompleted }: { lesson: Lesson; onMarkComplete: () => void; isCompleted: boolean }) {
    const [tab, setTab] = useState<'lesson' | 'examples' | 'try' | 'quiz'>('lesson');
    return (
        <div className="mt-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200/60 dark:border-gray-800/60">
                {[
                    { k: 'lesson', label: 'Lesson' },
                    // { k: 'examples', label: 'Examples' },
                    { k: 'try', label: 'Try it' },
                    { k: 'quiz', label: 'Quiz' },
                ].map(({ k, label }) => (
                    <button
                        key={k}
                        onClick={() => setTab(k as any)}
                        className={clsx(
                            '-mb-px border-b-2 px-4 py-2 text-sm',
                            tab === (k as any) ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700',
                        )}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                {tab === 'lesson' && <LessonContent html={lesson?.content} />}
                {/* {tab === 'examples' && <Examples examples={lesson?.examples || []} />} */}
                {tab === 'try' && <TryIt />}
                {tab === 'quiz' && <QuizPane quizzes={lesson?.quizzes} lessonId={lesson?.id} count={lesson?.quizCount || 5} />}
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-500">{isCompleted ? '✅ Marked complete' : 'Tip: mark complete when you finish.'}</div>
                <button
                    onClick={onMarkComplete}
                    className={clsx(
                        'rounded-lg px-3 py-2 text-sm',
                        isCompleted ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-blue-600 text-white hover:bg-blue-700',
                    )}
                >
                    {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                </button>
            </div>
        </div>
    );
}

// -------------------- Lesson Content --------------------
function LessonContent({ html }: { html: string }) {
    // Add IDs to headings in the rendered HTML for anchor links
    console.log(html);
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!ref.current) return;
        const hs = Array.from(ref.current.querySelectorAll('h1, h2, h3')) as HTMLElement[];
        hs.forEach((h, i) => {
            if (!h.id) h.id = `h-${i}`;
        });
        // 2. Fix code blocks from Quill
        const pres = Array.from(ref.current.querySelectorAll('pre.ql-syntax')) as HTMLElement[];
        pres.forEach((pre) => {
            // Wrap text in <code> if not already
            if (!pre.querySelector('code')) {
                const code = document.createElement('code');
                code.textContent = pre.textContent || '';
                code.className = 'language-javascript'; // 🔑 assume JS, or detect from context
                pre.textContent = '';
                pre.appendChild(code);
            }

            // Highlight it
            pre.querySelectorAll('code').forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });
        });
    }, [html]);
    return (
        <div
            ref={ref}
            className="prose prose-xl prose-slate dark:prose-invert prose-pre:bg-gray-900 prose-pre:text-gray-100 ql-editor max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

// -------------------- Examples --------------------
// function Examples({ examples }: { examples: NonNullable<Lesson['examples']> }) {
//     if (!examples.length) return <div className="text-gray-500">No examples for this lesson.</div>;
//     return (
//         <div className="space-y-6">
//             {examples.map((ex) => (
//                 <ExampleCard key={ex.id} example={ex} />
//             ))}
//         </div>
//     );
// }

// function ExampleCard({ example }: { example: NonNullable<Lesson['examples']>[number] }) {
//     const [copied, setCopied] = useState(false);
//     function copy() {
//         navigator.clipboard.writeText(example.code).then(() => {
//             setCopied(true);
//             setTimeout(() => setCopied(false), 1200);
//         });
//     }
//     return (
//         <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
//             <div className="flex items-center justify-between bg-gray-50 px-4 py-2 dark:bg-gray-800">
//                 <div className="font-semibold">{example.title}</div>
//                 <button
//                     onClick={copy}
//                     className="rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
//                 >
//                     {copied ? 'Copied ✓' : 'Copy'}
//                 </button>
//             </div>
//             <pre className="overflow-x-auto bg-white p-4 text-sm text-gray-900 dark:bg-gray-900 dark:text-gray-100">
//                 <code>{example.code}</code>
//             </pre>
//         </div>
//     );
// }

// -------------------- Try It (mini code runner) --------------------
function TryIt() {
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');

    const srcDoc = useMemo(
        () => `<!doctype html><html><head><meta charset=\"utf-8\"><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`,
        [html, css, js],
    );

    return (
        <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
                <Editor label="HTML" value={html} onChange={setHtml} />
                <Editor label="CSS" value={css} onChange={setCss} />
                <Editor label="JS" value={js} onChange={setJs} />
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setHtml('<h1>Hello</h1>');
                            setCss('body{font-family:ui-sans-serif;padding:1rem}');
                            setJs("console.log('Hi')");
                        }}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => {
                            const blob = new Blob([srcDoc], { type: 'text/html' });
                            const url = URL.createObjectURL(blob);
                            window.open(url, '_blank');
                            setTimeout(() => URL.revokeObjectURL(url), 20000);
                        }}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                    >
                        Open in new tab
                    </button>
                </div>
            </div>
            <div className="min-h-[300px] overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <iframe title="preview" srcDoc={srcDoc} sandbox="allow-scripts" className="h-[420px] w-full" />
            </div>
        </div>
    );
}

function Editor({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div>
            <div className="mb-1 text-xs font-semibold text-gray-600 dark:text-gray-300">{label}</div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                spellCheck={false}
                className="font-mono h-32 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm dark:border-gray-700 dark:bg-gray-900"
            />
        </div>
    );
}

// -------------------- Quiz Pane (inline) --------------------
function QuizPane({ quizzes, lessonId, count }: { quizzes: Quiz[] | undefined; lessonId: number | undefined; count: number }) {
    // Replace with server data via Inertia. Here, mock 3 questions.
    const [questions, setQuestions] = useState(quizzes);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const score = useMemo(() => {
        if (!submitted) return 0;
        return questions?.reduce((acc, q) => (answers[q.id] === q.correct_answer ? acc + 1 : acc), 0);
    }, [submitted, questions, answers]);

    function allAnswered() {
        return questions?.every((q) => answers[q.id] !== undefined);
    }

    function submit() {
        setSubmitted(true);
        // TODO: POST to server: router.post(route('learner.quiz.submit'), { lessonId, answers })
    }

    function reset() {
        setSubmitted(false);
        setAnswers({});
    }

    if (!questions?.length) return <div className="text-gray-500">No quizzes available.</div>;

    return (
        <div className="space-y-6">
            {questions.map((q, idx) => (
                <div key={q.id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                    <div className="mb-2 font-semibold">
                        {idx + 1}. {q.question}
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {q.options.map((opt) => {
                            const active = answers[q.id] === opt;
                            const correct = submitted && opt === q.correct_answer;
                            const wrong = submitted && active && opt !== q.correct_answer;
                            return (
                                <label
                                    key={opt}
                                    className={clsx(
                                        'cursor-pointer rounded-lg border px-3 py-2 text-sm',
                                        active ? 'border-blue-500' : 'border-gray-300 dark:border-gray-700',
                                        submitted && correct && 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
                                        submitted && wrong && 'border-red-500 bg-red-50 dark:bg-red-900/20',
                                    )}
                                >
                                    <input
                                        type="radio"
                                        value={opt}
                                        disabled={submitted}
                                        checked={answers[q.id] === opt}
                                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                                        className="mr-2"
                                    />
                                    {opt}
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div className="flex items-center gap-3">
                {!submitted ? (
                    <button onClick={submit} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" disabled={!allAnswered()}>
                        Submit
                    </button>
                ) : (
                    <>
                        <div className="text-sm font-semibold">
                            Score: {score} / {questions.length}
                        </div>
                        {/* <button
                            onClick={reset}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                            Retry
                        </button> */}
                    </>
                )}
            </div>
        </div>
    );
}

// -------------------- MOCK (optional): remove when wiring real data --------------------
// If you want to preview quickly, you can render <DemoPage/> somewhere.
export function DemoPage() {
    const demoCourse: Course = {
        id: 1,
        title: 'JavaScript Essentials',
        description: 'Core JS concepts with hands-on practice',
        lessons: [
            {
                id: 101,
                order: 1,
                title: 'Introduction to JavaScript',
                content:
                    "<h2><del>What is JavaScript?</del></h2><p>JavaScript is a programming language for the web.</p><h3>Why learn it?</h3><ol><li>Interactivity</li><li>Ubiquity</li></ol><pre><code>console.log('Hello JS')\n</code></pre>",
                quizCount: 3,
                quizzes: [
                    {
                        id: 22,
                        lesson_id: 13,
                        question: 'Which keyword should be used to declare constants that should not be reassigned?',
                        options: ['let', 'var', 'const', 'final'],
                        correct_answer: 'const',
                        points: 1,
                        created_at: '2025-08-26T11:14:35.000000Z',
                        updated_at: '2025-08-26T11:14:35.000000Z',
                    },
                    {
                        id: 23,
                        lesson_id: 13,
                        question: "What is a potential issue with using the 'var' keyword in modern JavaScript?",
                        options: [
                            'It cannot be used for strings.',
                            'It has confusing scoping rules.',
                            'It is not allowed in any browser.',
                            'It is automatically converted to const.',
                        ],
                        correct_answer: 'It has confusing scoping rules.',
                        points: 1,
                        created_at: '2025-08-26T11:14:36.000000Z',
                        updated_at: '2025-08-26T11:14:36.000000Z',
                    },
                    {
                        id: 24,
                        lesson_id: 13,
                        question: "In the statement 'let name = \"Alice\";', what type of variable is 'name'?",
                        options: ['constant', 'immutable', 'variable', 'reassigned'],
                        correct_answer: 'variable',
                        points: 1,
                        created_at: '2025-08-26T11:14:36.000000Z',
                        updated_at: '2025-08-26T11:14:36.000000Z',
                    },
                    {
                        id: 25,
                        lesson_id: 13,
                        question: 'Which of the following will correctly log the values of name, pi, and age to the console?',
                        options: [
                            'console.write(name, pi, age);',
                            'console.log(name, pi, age);',
                            'print(name, pi, age);',
                            'log.console(name, pi, age);',
                        ],
                        correct_answer: 'console.log(name, pi, age);',
                        points: 1,
                        created_at: '2025-08-26T11:14:36.000000Z',
                        updated_at: '2025-08-26T11:14:36.000000Z',
                    },
                ],
            },
            {
                id: 102,
                order: 2,
                title: 'Variables & Types',
                durationMinutes: 12,
                content:
                    '<h2>Variables</h2><p>Use <code>let</code> and <code>const</code>.</p><h3>Example</h3><pre><code>let x = 1; const y = 2;\n</code></pre>',
                quizCount: 3,
            },
            {
                id: 201,
                order: 3,
                title: 'If / Else',
                durationMinutes: 10,
                content: '<h2>If Statements</h2><p>Control logic with conditions.</p>',
                quizCount: 2,
            },
        ],
    };

    return <LearnerCoursePage course={demoCourse} currentLessonId={101} />;
}
