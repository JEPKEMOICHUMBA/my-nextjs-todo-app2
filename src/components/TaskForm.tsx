import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const taskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().min(1, "Due date is required").refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onAddTask: (task: TaskFormData) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
  });

  const onSubmit = (data: TaskFormData) => {
    onAddTask(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="block mb-1 font-medium text-blue-900">Task Name</label>
        <input
          {...register("name")}
          type="text"
          placeholder="Task name"
          className="w-full p-4 border border-yellow-200 rounded-xl outline-none focus:border-yellow-400 transition-colors placeholder-blue-900 text-gray-900"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-blue-900">Description</label>
        <textarea
          {...register("description")}
          placeholder="Task description"
          className="w-full p-4 border border-yellow-200 rounded-xl outline-none focus:border-yellow-400 transition-colors placeholder-blue-900 text-gray-900"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-blue-900">Due Date</label>
        <input
          {...register("dueDate")}
          type="datetime-local"
          className="w-full p-4 border border-yellow-200 rounded-xl outline-none focus:border-yellow-400 transition-colors placeholder-blue-900 text-gray-900"
        />
        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full p-4 bg-blue-500 text-white rounded-xl border-none transition-all ${
          isValid ? "cursor-pointer hover:bg-blue-600 hover:scale-105" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Add Task
      </button>
    </form>
  );
}