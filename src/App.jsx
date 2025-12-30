import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import Tasks from './components/Tasks';
import './App.css';

function App() {
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = localStorage.getItem('tasks');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleSubmitData = (data) => {
        if (!data.trim()) return;
        const newTask = {
            id: crypto.randomUUID(),
            data,
            subTasks: []
        };
        setTasks([...tasks, newTask]);
    }

    const addSubTask = (taskId, subTaskData) => {
        if (!subTaskData.task.trim()) return;
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    subTasks: [
                        ...task.subTasks,
                        {
                            id: crypto.randomUUID(),
                            content: subTaskData.task,
                            completed: false
                        }
                    ]
                };
            }
            return task;
        }));
    }

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    }

    const deleteSubTask = (taskId, subTaskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    subTasks: task.subTasks.filter(st => st.id !== subTaskId)
                };
            }
            return task;
        }));
    }

    const toggleSubTask = (taskId, subTaskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    subTasks: task.subTasks.map(st => {
                        if (st.id === subTaskId) {
                            return { ...st, completed: !st.completed };
                        }
                        return st;
                    })
                };
            }
            return task;
        }));
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const activeTaskIndex = tasks.findIndex(t => t.id === activeId);
        const overTaskIndex = tasks.findIndex(t => t.id === overId);

        if (activeTaskIndex !== -1 && overTaskIndex !== -1) {
            setTasks((items) => arrayMove(items, activeTaskIndex, overTaskIndex));
            return;
        }

        const activeParentTask = tasks.find(t => t.subTasks.some(st => st.id === activeId));
        const overParentTask = tasks.find(t => t.subTasks.some(st => st.id === overId));

        if (activeParentTask && overParentTask && activeParentTask.id === overParentTask.id) {
            setTasks(tasks.map(task => {
                if (task.id === activeParentTask.id) {
                    const oldIndex = task.subTasks.findIndex(st => st.id === activeId);
                    const newIndex = task.subTasks.findIndex(st => st.id === overId);
                    return {
                        ...task,
                        subTasks: arrayMove(task.subTasks, oldIndex, newIndex)
                    };
                }
                return task;
            }));
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-['Google_Sans'] selection:bg-blue-500/30 flex flex-col pt-40 sm:pt-28">
            <Header />

            <main className="grow container mx-auto px-4 py-8 max-w-7xl w-full">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <div className="space-y-10">
                        <section className="mb-12 max-w-4xl mx-auto">
                            <Form onSubmitData={handleSubmitData} />
                        </section>

                        <section>
                            <Tasks
                                tasks={tasks}
                                addSubTask={addSubTask}
                                deleteTask={deleteTask}
                                deleteSubTask={deleteSubTask}
                                toggleSubTask={toggleSubTask}
                            />
                        </section>
                    </div>
                </DndContext>
            </main>

            <Footer />
        </div>
    )
}

export default App;