import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SubTask from "./SubTask";

function SortableSubTask({ subTask, onDelete, onToggle }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: subTask.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            ref={setNodeRef} style={style}
            className={`
                group flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 
                hover:border-slate-600 transition-all mb-2
                ${isDragging ? 'opacity-50 ring-2 ring-blue-500/50 z-50' : ''}
            `}
        >
            <span {...attributes} {...listeners}
                className="cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-400 p-1 rounded hover:bg-slate-800 transition-colors touch-none"
            >
                ⋮⋮
            </span>
            <div className="relative flex items-center">
                <input type="checkbox" checked={subTask.completed} onChange={onToggle}
                    className="appearance-none w-5 h-5 rounded-md border-2 border-slate-600 bg-slate-800 checked:bg-blue-500 checked:border-blue-500 transition-all cursor-pointer peer"
                />
                <svg className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <span className={`text-sm text-slate-300 grow ${subTask.completed ? 'text-slate-500' : ''}`}>
                {subTask.content}
            </span>
            <button
                onClick={onDelete} aria-label="Delete subtask"
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 p-1 rounded-md hover:bg-red-500/10 transition-all"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </li>
    );
}

function SortableTask({ task, index, addSubTask, deleteTask, deleteSubTask, toggleSubTask }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}
            className={`
                bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col
                ${isDragging ? 'opacity-80 ring-2 ring-blue-500 z-50 rotate-1' : 'hover:border-slate-600'}
                transition-all duration-200 h-full
            `}
        >
            <div className="p-4 border-b border-slate-700/50 bg-slate-800/50 flex items-start gap-3">
                <span {...attributes} {...listeners}
                    className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-700 transition-colors mt-0.5 touch-none"
                >
                    ⋮⋮
                </span>

                <h3 className="text-lg font-semibold text-white grow leading-tight py-1 break-normal">
                    {task.data}
                </h3>

                <button onClick={() => deleteTask(task.id)} title="Delete Task"
                    className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-all group shrink-0"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            <div className="p-4 bg-slate-800/80 grow flex flex-col gap-4">
                {task.subTasks.length > 0 ? (
                    <ul className="space-y-2">
                        <SortableContext
                            items={task.subTasks.map(st => st.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {task.subTasks.map((subTask) => (
                                <SortableSubTask
                                    key={subTask.id}
                                    subTask={subTask}
                                    onDelete={() => deleteSubTask(task.id, subTask.id)}
                                    onToggle={() => toggleSubTask(task.id, subTask.id)}
                                />
                            ))}
                        </SortableContext>
                    </ul>
                ) : (
                    <div className="text-center py-6 text-slate-600 text-sm italic border-2 border-dashed border-slate-700 rounded-xl">
                        No Subtasks Yet
                    </div>
                )}

                <SubTask onAdd={(subTask) => addSubTask(task.id, subTask)} />
            </div>
        </div>
    );
}

function Tasks(props) {
    if (!props.tasks.length) return (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-xl border border-slate-700">
                <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <h3 className="text-xl font-medium text-slate-400">No Tasks Yet</h3>
            <p className="text-slate-600 mt-2 max-w-md">Create Task To Get Started With Your Productivity Journey.</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-[912px]:grid-cols-3 gap-8 pb-32">
            <SortableContext
                items={props.tasks.map(t => t.id)}
                strategy={verticalListSortingStrategy}
            >
                {props.tasks.map((task, index) => (
                    <SortableTask key={task.id} task={task} index={index}
                        addSubTask={props.addSubTask} deleteTask={props.deleteTask}
                        deleteSubTask={props.deleteSubTask} toggleSubTask={props.toggleSubTask}
                    />
                ))}
            </SortableContext>
        </div>
    );
}

export default Tasks;