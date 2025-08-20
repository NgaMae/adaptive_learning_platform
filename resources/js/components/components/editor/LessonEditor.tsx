// resources/js/components/LessonEditor.tsx
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill's styles

interface LessonEditorProps {
    data: any;
    setData: (key: string, data: any) => void;
    initialContent?: string;
    onSave: () => void;
    processing?: boolean;
}

const LessonEditor: React.FC<LessonEditorProps> = ({ initialContent, onSave, data, setData, processing }) => {
    const handleSave = () => {
        onSave();
    };
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'], // remove formatting button
    ];

    return (
        <div className="space-y-4">
            <ReactQuill
                modules={{ toolbar: toolbarOptions }}
                theme="snow"
                placeholder="Start writing your lesson content here..."
                value={data.content}
                onChange={(value) => setData('content', value)}
                className="bg-white"
            />
            <button onClick={handleSave} disabled={processing} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                {processing ? 'Saving...' : 'Save Lesson'}
            </button>
        </div>
    );
};

export default LessonEditor;
