import { useState } from 'react';

function SubTask({ onAdd }) {
    const [subTask, setSubTask] = useState({ task: "", completed: false });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(subTask);
        setSubTask({ task: "", completed: false });
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
            <input
                type="text" value={subTask.task} onChange={(e) => setSubTask({ ...subTask, task: e.target.value })} placeholder="Enter SubTask"
                className="grow bg-slate-950/50 text-sm text-white placeholder-slate-600 px-4 py-2.5 rounded-lg border border-slate-700/50 focus:outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all shadow-inner"
            />
            <button
                type="submit" title="Add Subtask" disabled={!subTask.task.trim()}
                className="bg-slate-700 hover:bg-slate-600 text-white p-2.5 rounded-lg shadow-lg active:scale-95 transition-all text-sm font-medium"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
        </form>
    );
}

export default SubTask;