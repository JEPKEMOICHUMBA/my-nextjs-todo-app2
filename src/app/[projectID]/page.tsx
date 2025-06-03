"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import TaskForm from "@/components/TaskForm";
import { useState } from "react";
import { useDeleteProjectTaskMutation } from "@/lib/generated/graphql";

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

export default function ProjectTasks() {
  const params = useParams();
  const router = useRouter();
  const projectIdRaw = params.projectId ?? params.id ?? "";
  const projectId = Number(projectIdRaw);

  // Only allow positive integers
  const isValidProjectId = Number.isInteger(projectId) && projectId > 0;

  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("loggedIn") === "true";
  if (!isLoggedIn) {
    router.push("/login");
    return null;
  }
  if (!isValidProjectId) {
    return <div>Invalid project ID.</div>;
  }

  const { data, loading, error, refetch } = useQuery(GET_PROJECT_TASKS, {
    variables: { projectId },
    skip: !isValidProjectId || !isLoggedIn,
  });

  const [localTasks, setLocalTasks] = useState<any[]>([]);
  const [deleteTaskMutation] = useDeleteProjectTaskMutation();

  const handleAddTask = (task: { name: string; description: string; dueDate: string }) => {
    const newTask = {
      id: Date.now(), // Fake ID for now
      name: task.name,
      description: task.description,
      dateDue: task.dueDate,
      isLocal: true, // Mark as local
    };
    setLocalTasks(prev => [...prev, newTask]);
  };

  // Delete handler for both backend and local tasks
  const handleDeleteTask = async (task: any) => {
    if (task.isLocal) {
      setLocalTasks(prev => prev.filter(t => t.id !== task.id));
    } else {
      try {
        await deleteTaskMutation({ variables: { taskId: task.id } });
        refetch();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const allTasks = [...(data?.retrieveProjectTasks || []), ...localTasks];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks for Project {projectId}</h1>

      <TaskForm onAddTask={handleAddTask} />

      <ul className="space-y-2 mt-6">
        {allTasks.map((task: any) => (
          <li
            key={task.id}
            className="p-4 bg-gray-100 rounded text-gray-900 flex items-center justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{task.name}</h2>
              <p>{task.description}</p>
              <p>Due: {task.dateDue}</p>
            </div>
            <button
              onClick={() => handleDeleteTask(task)}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}