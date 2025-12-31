# Task Board Documentation

## Overview
Task Board is a modern task management application built with React. It features a dark theme, saves your work, and allows you to organize tasks by dragging and dropping them.

## Project Structure
The project is built using **Components**, which are like building blocks. We build small parts (like a button or a header) and combine them to create the full application.

All source code is located in the `src` folder.

### Key Components

#### 1. App.jsx
This is the main component that holds everything together.
-   **Task Storage**: It keeps a list of all your tasks.
-   **Saving Data**: It automatically saves your tasks to the browser's storage (LocalStorage). This ensures your tasks are not lost when you refresh the page.
-   **Drag & Drop**: It sets up the "DndContext", which allows the dragging magic to happen throughout the app.

#### 2. Header.jsx
Displays the application title and the current time at the top of the screen.
-   **Live Clock**: Updates the time every second so you always know the current time.
-   **Sticky Position**: Stays fixed at the top of the window even when you scroll down.

#### 3. Form.jsx
The input area where you create new tasks.
-   **Auto-Focus**: When the page loads, the cursor automatically appears in this box so you can start typing immediately.
-   **Input Handling**: Captures what you type and sends it to the App component when you click "Add Task".

#### 4. Tasks.jsx
Displays your list of tasks in a grid layout.
-   **Responsive Grid**: The layout changes based on your screen size:
    -   **Mobile**: Shows 1 column.
    -   **Tablet**: Shows 2 columns.
    -   **Desktop**: Shows 3 columns.
-   **Sorting**: Uses a "SortableContext" to allow you to drag and reorder your tasks.

#### 5. SubTask.jsx
A smaller input form found at each task card.
-   **Functionality**: Allows you to add smaller steps (subtasks) to a main task.

#### 6. Footer.jsx
Displays the simple copyright text at the bottom of the page.

---

## Styling (Design)
The project uses **Tailwind CSS** for styling.

## How to Run Locally

1.  **Install Dependencies** (Get the required libraries):
    ```bash
    npm install
    ```

2.  **Start the App** (Open it in your browser):
    ```bash
    npm run dev
    ```
