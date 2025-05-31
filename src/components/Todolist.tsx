"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "@/lib/generated/graphql"; // Adjust path as needed
import {
  useRetrieveProjectsQuery,
  useRetrieveProjectTasksQuery,
  useCreateProjectMutation,
  useCreateProjectTaskMutation,
  useDeleteProjectTaskMutation,
  useDeleteProjectMutation,
} from "@/lib/generated/graphql";

// Define Zod schemas for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const projectSchema = z.object({
  newProjectName: z.string().min(1, "Project name is required"),
});

const taskSchema = z.object({
  newTask: z.string().min(1, "Task name is required"),
  description: z.string().min(1, "Description is required"),
  dateDue: z.string().min(1, "Due date is required").refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

// Infer TypeScript types from schemas
type LoginFormData = z.infer<typeof loginSchema>;
type ProjectFormData = z.infer<typeof projectSchema>;
type TaskFormData = z.infer<typeof taskSchema>;

interface Task {
  id: number;
  text: string;
  description: string;
  dateDue: string;
  completed: boolean;
}

interface Project {
  id: number;
  name: string;
  tasks: Task[];
  completed: boolean;
}

export default function Todolist() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: projectsData, refetch: refetchProjects } = useRetrieveProjectsQuery();
  const { refetch: refetchTasks } = useRetrieveProjectTasksQuery({ skip: true });
  const [createProjectMutation] = useCreateProjectMutation();
  const [createTaskMutation] = useCreateProjectTaskMutation();
  const [deleteTaskMutation] = useDeleteProjectTaskMutation();
  const [deleteProjectMutation] = useDeleteProjectMutation();
   const [loginMutation] = useLoginMutation();

  // Initialize React Hook Form for each form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const projectForm = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { newProjectName: "" },
  });

  const taskForm = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { newTask: "", description: "", dateDue: "" },
  });

  useEffect(() => {
    const loginStatus = localStorage.getItem("loggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
  const fetchProjectsAndTasks = async () => {
    if (projectsData?.retrieveProjects) {
      const projectList = projectsData.retrieveProjects;
      const updatedProjects: Project[] = [];

      for (const project of projectList) {
        
  if (!project.id) continue; // skip if project.id is invalid
 
        const { data: taskData } = await refetchTasks({ projectId: project.id });
 console.log("Task data for project:", project.id, taskData?.retrieveProjectTasks);
        updatedProjects.push({
          id: project.id,
          name: project.name,
          completed: false,
          tasks: Array.isArray(taskData?.retrieveProjectTasks)
  ? taskData.retrieveProjectTasks.map((task) => ({
      id: task.id,
      text: task.name,
      description: task.description,
      dateDue: task.dateDue ?? "", // Ensure dateDue is always a string
      completed: !!task.dateCompleted,
    }))
  : [],

        });
      }

      setProjects(updatedProjects);
    }
  };

  fetchProjectsAndTasks();
}, [projectsData, refetchTasks]);


  


  const handleLogin = loginForm.handleSubmit(async (data) => {
    try {
 console.log("Login form data:", data);
      const response = await loginMutation({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      // Optionally store JWT token if needed:
      // localStorage.setItem("jwtToken", response.data?.login?.jwtToken);

      localStorage.setItem("loggedIn", "true");
      setIsLoggedIn(true);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally show an error message to the user
    }
  });

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const addProject = projectForm.handleSubmit(async (data) => {
    const dueDate = new Date("2025-12-31T00:00:00.000Z");
    const formattedDate = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dueDate.getDate()).padStart(2, "0")} ${String(dueDate.getHours() + 3).padStart(
      2,
      "0"
    )}:${String(dueDate.getMinutes()).padStart(2, "0")}:${String(
      dueDate.getSeconds()
    ).padStart(2, "0")}.000000 +0300`;

    try {
      const response = await createProjectMutation({
        variables: {
          args: {
            name: data.newProjectName,
            description: "Created from frontend",
            dateDue: formattedDate,
          },
        },
      });
      const newProjectId = response.data?.createProject?.id;
      if (newProjectId) {
        setProjects([
          ...projects,
          { id: newProjectId, name: data.newProjectName, tasks: [], completed: false },
        ]);
      }
      await refetchProjects();
      projectForm.reset();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  });

  const addTask = taskForm.handleSubmit(async (data) => {
  try {
    if (selectedProjectIndex === null || !projects[selectedProjectIndex]) return;

    const selectedProject = projects[selectedProjectIndex];
    const dueDate = new Date(data.dateDue);
    // Format dateDue to match '%Y-%m-%d %H:%M:%S.%f%z'
    const formattedDateDue = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dueDate.getDate()).padStart(2, "0")} ${String(dueDate.getHours()).padStart(
      2,
      "0"
    )}:${String(dueDate.getMinutes()).padStart(2, "0")}:${String(
      dueDate.getSeconds()
    ).padStart(2, "0")}.000000 +0300`;

    const response = await createTaskMutation({
      variables: {
        args: {
          name: data.newTask,
          description: data.description,
          projectId: selectedProject.id,
          dateDue: formattedDateDue,
        },
      },
    });
    const newTaskId = response.data?.createProjectTask?.id;
    if (newTaskId) {
      const updatedProjects = projects.map((project, index) =>
        index === selectedProjectIndex
          ? {
              ...project,
              tasks: [
                ...project.tasks,
                {
                  id: newTaskId,
                  text: data.newTask,
                  description: data.description,
                  dateDue: data.dateDue,
                  completed: false,
                },
              ],
            }
          : project
      );
      setProjects(updatedProjects);
    } else {
      await refetchTasks({ projectId: selectedProject.id });
    }
    taskForm.reset();
  } catch (error) {
    console.error("Error creating task:", error);
  }
});
  const toggleTaskCompletion = (projectIndex: number, taskIndex: number) => {
    const updatedProjects = projects.map((project, pIndex) =>
      pIndex === projectIndex
        ? {
            ...project,
            tasks: project.tasks.map((task, tIndex) =>
              tIndex === taskIndex ? { ...task, completed: !task.completed } : task
            ),
          }
        : project
    );
    setProjects(updatedProjects);
  };

  const toggleProjectCompletion = (projectIndex: number) => {
    const updatedProjects = projects.map((project, pIndex) =>
      pIndex === projectIndex ? { ...project, completed: !project.completed } : project
    );
    setProjects(updatedProjects);
  };

  const deleteTask = async (projectIndex: number, taskIndex: number) => {
    try {
      const task = projects[projectIndex].tasks[taskIndex];
      const taskId = task.id;
      if (!taskId) {
        console.error("Task ID is undefined, refetching projects...");
        await refetchProjects();
        return;
      }
      await deleteTaskMutation({
        variables: { taskId },
      });
      const updatedProjects = projects.map((project, pIndex) =>
        pIndex === projectIndex
          ? { ...project, tasks: project.tasks.filter((_, tIndex) => tIndex !== taskIndex) }
          : project
      );
      setProjects(updatedProjects);
      if (!projects[projectIndex]) return;

      await refetchTasks({ projectId: projects[projectIndex].id });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const deleteProject = async (projectIndex: number) => {
    try {
      const projectId = projects[projectIndex].id;
      await deleteProjectMutation({
        variables: { projectId },
      });
      const updatedProjects = projects.filter((_, pIndex) => pIndex !== projectIndex);
      setProjects(updatedProjects);
      if (selectedProjectIndex === projectIndex) {
        setSelectedProjectIndex(null);
      }
      await refetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleProjectClick = (projectId: number) => {
    router.push(`/${projectId}`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-orange-200 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md transform transition-shadow hover:shadow-xl">
          <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">
            Welcome Back!
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                {...loginForm.register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 border border-yellow-200 rounded-xl outline-none focus:border-yellow-400 transition-colors placeholder-blue-900 text-blue-900"
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...loginForm.register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full p-4 border border-yellow-200 rounded-xl outline-none focus:border-yellow-400 transition-colors placeholder-blue-900 text-blue-900"
              />
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-white p-4 rounded-xl border-none cursor-pointer hover:bg-yellow-500 hover:scale-105 transition-all"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-pink-300 flex flex-col items-center justify-center p-6">
      <header className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-6 rounded-2xl shadow-md w-full max-w-2xl mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Todo Adventure
        </h1>
        <p className="text-sm mt-2 text-orange-50">
          Current Time: {new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" })}
        </p>
        <button
          onClick={logout}
          className="mt-4 bg-white text-blue-900 px-5 py-2 rounded-full border-none cursor-pointer hover:bg-yellow-100 hover:scale-105 transition-all"
        >
          Log Out
        </button>
      </header>

      <main className="w-full max-w-2xl bg-white rounded-3xl shadow-md p-8 border border-yellow-100 transition-shadow hover:shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-8">
          Your Projects & Tasks
        </h2>

        <div className="flex flex-col gap-6 mb-8">
          <form onSubmit={addProject} className="flex flex-col gap-3">
            <div>
              <input
                {...projectForm.register("newProjectName")}
                type="text"
                placeholder="Add a new project..."
                className="flex-1 p-4 border border-yellow-200 rounded-xl outline-none focus:border-yellow-400 transition-colors placeholder-black text-gray-900"
              />
              {projectForm.formState.errors.newProjectName && (
                <p className="text-red-500 text-sm mt-1">
                  {projectForm.formState.errors.newProjectName.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className={`p-3 bg-green-600 text-white rounded-xl border-none transition-all ${
                projectForm.formState.isValid
                  ? "cursor-pointer hover:bg-green-700 hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add Project
            </button>
          </form>

          <form onSubmit={addTask} className="flex flex-col gap-3">
            <select
              value={selectedProjectIndex ?? ""}
              onChange={(e) =>
                setSelectedProjectIndex(e.target.value ? parseInt(e.target.value) : null)
              }
              className="flex-1 p-4 border border-yellow-200 rounded-xl outline-none focus:border-yellow-400 transition-colors text-blue-900"
            >
              <option value="">Select a project</option>
              {projects.map((project, index) => (
                <option key={index} value={index}>
                  {project.name}
                </option>
              ))}
            </select>
            <div>
              <input
                {...taskForm.register("newTask")}
                type="text"
                placeholder="Add a new task..."
                disabled={selectedProjectIndex === null}
                className={`flex-1 p-4 border border-yellow-200 rounded-xl outline-none focus:border-yellow-400 transition-colors placeholder-black text-gray-900 ${
                  selectedProjectIndex === null ? "opacity-50 cursor-not-allowed" : "cursor-text"
                }`}
              />
              {taskForm.formState.errors.newTask && (
                <p className="text-red-500 text-sm mt-1">
                  {taskForm.formState.errors.newTask.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...taskForm.register("description")}
                type="text"
                placeholder="Task description..."
                disabled={selectedProjectIndex === null}
                className={`flex-1 p-4 border border-yellow-200 rounded-xl outline-none focus:border-yellow-400 transition-colors placeholder-black text-gray-900 ${
                  selectedProjectIndex === null ? "opacity-50 cursor-not-allowed" : "cursor-text"
                }`}
              />
              {taskForm.formState.errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {taskForm.formState.errors.description.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...taskForm.register("dateDue")}
                type="datetime-local"
                disabled={selectedProjectIndex === null}
                className={`flex-1 p-4 border border-yellow-200 rounded-xl outline-none focus:border-yellow-400 transition-colors placeholder-black text-gray-900 ${
                  selectedProjectIndex === null ? "opacity-50 cursor-not-allowed" : "cursor-text"
                }`}
              />
              {taskForm.formState.errors.dateDue && (
                <p className="text-red-500 text-sm mt-1">
                  {taskForm.formState.errors.dateDue.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={selectedProjectIndex === null}
              className={`p-3 bg-blue-500 text-white rounded-xl border-none transition-all ${
                selectedProjectIndex !== null && taskForm.formState.isValid
                  ? "cursor-pointer hover:bg-blue-600 hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add Task
            </button>
          </form>
        </div>

        {projects.length === 0 ? (
          <p className="text-blue-900 text-center p-6 bg-yellow-100 rounded-xl">
            No projects yet! Start by adding one above.
          </p>
        ) : (
          projects.map((project, pIndex) => (
            <div
              key={pIndex}
              className="bg-yellow-100 rounded-xl p-4 mb-6 shadow-sm cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="flex flex-col items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={project.completed}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleProjectCompletion(pIndex);
                    }}
                    className="h-5 w-5 accent-green-600 border-yellow-200 rounded"
                  />
                  <h3
                    className={`text-xl font-semibold ${
                      project.completed ? "text-gray-400 line-through" : "text-black"
                    }`}
                  >
                    {project.name}
                  </h3>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(pIndex);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg border-none cursor-pointer hover:bg-red-600 hover:scale-105 transition-all"
                >
                  Delete Project
                </button>
              </div>
              {project.tasks.length === 0 ? (
                <p className="text-blue-900 italic text-center">
                  No tasks yet. Add some above!
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {project.tasks.map((task, tIndex) => (
                    <li
                      key={tIndex}
                      className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(pIndex, tIndex)}
                          className="h-5 w-5 accent-green-600 border-yellow-200 rounded"
                        />
                        <div>
                          <span
                            className={
                              task.completed ? "text-gray-400 line-through" : "text-blue-900"
                            }
                          >
                            {task.text}
                          </span>
                          <p className="text-sm text-gray-600">{task.description}</p>
                          <p className="text-sm text-gray-600">Due: {task.dateDue}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteTask(pIndex, tIndex)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg border-none cursor-pointer hover:bg-red-600 hover:scale-105 transition-all"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
}