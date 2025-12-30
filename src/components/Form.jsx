import { useState, useRef, useEffect } from 'react';

function Form({ onSubmitData }) {
    const [task, setTask] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitData(task);
        setTask("");
    }

    return (
        <form onSubmit={handleSubmit} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-4 transition-all hover:border-slate-700">
            <input
                ref={inputRef}
                type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Create Tasks"
                className="grow bg-slate-800/50 text-white placeholder-slate-500 px-5 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Task
            </button>
        </form>
    );
}

export default Form;