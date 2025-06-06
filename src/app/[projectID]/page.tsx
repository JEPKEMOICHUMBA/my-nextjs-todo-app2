"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import TaskForm from "@/components/TaskForm";
import { useState } from "react";
import { useDeleteProjectTaskMutation, useCreateProjectTaskMutation, useUpdateProjectTaskMutation } from "@/lib/generated/graphql";

// GraphQL query to retrieve tasks for a specific project
const GET_PROJECT_TASKS = gql`
  query GetProjectTasks($projectId: Int!) {
    retrieveProjectTasks(projectId: $projectId) {
      id
      name
      description
      dateDue
      dateCompleted
      project {
        id
      }
      creator {
        id
        email
      }
    }
  }
`;

interface Task {
  id: number;
  name: string;
  description: string;
  dateDue: string;
  dateCompleted?: string | null;
  isLocal?: boolean;
  project?: { id: number };
  creator?: { id: number; email: string };
}

export default function ProjectTasks() {
  const params = useParams();
  const router = useRouter();
  const projectIdRaw = params.projectId ?? params.id ?? "";
  const projectId = Number(projectIdRaw);

  // Only allow positive integers
  const isValidProjectId = Number.isInteger(projectId) && projectId > 0;
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("loggedIn") === "true";

  // Move hooks to top level
  const { data, refetch, loading } = useQuery(GET_PROJECT_TASKS, {
    variables: { projectId },
    skip: !isValidProjectId || !isLoggedIn,
    fetchPolicy: 'cache-and-network', // Ensures fresh data on page load
  });
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [deleteTaskMutation] = useDeleteProjectTaskMutation();
  const [createTaskMutation] = useCreateProjectTaskMutation();
  const [updateTaskMutation] = useUpdateProjectTaskMutation();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Early returns after hooks
  if (!isLoggedIn) {
    router.push("/login");
    return null;
  }
  if (!isValidProjectId) {
    return <div className="text-red-500">Invalid project ID.</div>;
  }

  const handleAddTask = async (task: { name: string; description: string; dueDate: string }) => {
    try {
      // Format the date for the backend
      const dueDate = new Date(task.dueDate);
      const formattedDateDue = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(dueDate.getDate()).padStart(2, "0")} ${String(dueDate.getHours()).padStart(
        2,
        "0"
      )}:${String(dueDate.getMinutes()).padStart(2, "0")}:${String(
        dueDate.getSeconds()
      ).padStart(2, "0")}.000000 +0300`;

      await createTaskMutation({
        variables: {
          args: {
            name: task.name,
            description: task.description,
            projectId: projectId,
            dateDue: formattedDateDue,
          },
        },
      });
      
      // Refetch to get updated data from backend
      await refetch();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  // Edit handler for both backend and local tasks
  const handleEditTask = async (task: Task, updatedData: { name: string; description: string; dueDate: string }) => {
    try {
      if (task.isLocal) {
        // Handle local tasks (fallback)
        setLocalTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? {
                  ...t,
                  name: updatedData.name,
                  description: updatedData.description,
                  dateDue: updatedData.dueDate,
                }
              : t
          )
        );
      } else {
        // Handle backend tasks
        const dueDate = new Date(updatedData.dueDate);
        const formattedDateDue = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(dueDate.getDate()).padStart(2, "0")} ${String(dueDate.getHours()).padStart(
          2,
          "0"
        )}:${String(dueDate.getMinutes()).padStart(2, "0")}:${String(
          dueDate.getSeconds()
        ).padStart(2, "0")}.000000 +0300`;

        await updateTaskMutation({
          variables: {
            args: {
              taskId: task.id,
              name: updatedData.name,
              description: updatedData.description,
              dateDue: formattedDateDue,
            },
          },
        });
        
        // Refetch to get updated data from backend
        await refetch();
      }
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  // Delete handler for both backend and local tasks
  const handleDeleteTask = async (task: Task) => {
    try {
      if (task.isLocal) {
        setLocalTasks((prev) => prev.filter((t) => t.id !== task.id));
      } else {
        await deleteTaskMutation({ variables: { taskId: task.id } });
        // Refetch to get updated data from backend
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const allTasks: Task[] = [...(data?.retrieveProjectTasks || []), ...localTasks];

  // Show loading state
  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-pink-300 p-6 flex items-center justify-center">
        <div className="text-blue-900 text-xl">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-pink-300 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Tasks for Project {projectId}</h1>

      <TaskForm onAddTask={handleAddTask} />

      <ul className="space-y-2 mt-6">
        {allTasks.map((task) => (
          <li
            key={task.id}
            className="p-4 bg-gray-100 rounded text-gray-900"
          >
            {editingTask?.id === task.id ? (
              <EditTaskForm
                task={task}
                onSave={(updatedData) => handleEditTask(task, updatedData)}
                onCancel={() => setEditingTask(null)}
              />
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{task.name}</h2>
                  <p>{task.description}</p>
                  <p>Due: {task.dateDue}</p>
                  {task.dateCompleted && <p>Completed: {task.dateCompleted}</p>}
                  {task.isLocal && <span className="text-sm text-blue-600">(Local - not saved)</span>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg border-none cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg border-none cursor-pointer hover:bg-red-600 hover:scale-105 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
                </ul>
        </div>
      </div>
    //</div>
  );
}

// Inline edit form component
interface EditTaskFormProps {
  task: Task;
  onSave: (data: { name: string; description: string; dueDate: string }) => void;
  onCancel: () => void;
}

function EditTaskForm({ task, onSave, onCancel }: EditTaskFormProps) {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dateDue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim() && dueDate) {
      onSave({ name: name.trim(), description: description.trim(), dueDate });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Task Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 border border-yellow-200 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 border border-yellow-200 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900"
          rows={3}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-4 border border-yellow-200 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-900"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-xl border-none cursor-pointer hover:bg-green-600 hover:scale-105 transition-all"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-6 py-3 rounded-xl border-none cursor-pointer hover:bg-gray-600 hover:scale-105 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}