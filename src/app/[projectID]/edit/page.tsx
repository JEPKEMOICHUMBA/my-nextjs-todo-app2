"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const GET_PROJECT = gql`
  query GetProject($projectId: Int!) {
    project: retrieveProject(projectId: $projectId) {
      id
      name
      description
      dateDue
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject($args: UpdateProjectInput!) {
    updateProject(args: $args) {
      id
      name
      description
      dateDue
    }
  }
`;

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId ? parseInt(params.projectId as string) : 0;

  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { projectId },
    skip: !projectId,
  });

  const [updateProject, { loading: updating }] = useMutation(UPDATE_PROJECT);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      dateDue: "",
    },
  });

  useEffect(() => {
    if (data?.project) {
      reset({
        name: data.project.name || "",
        description: data.project.description || "",
        dateDue: data.project.dateDue ? data.project.dateDue.slice(0, 16) : "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: any) => {
    try {
      await updateProject({
        variables: {
          args: {
            id: projectId,
            name: formData.name,
            description: formData.description,
            dateDue: formData.dateDue,
          },
        },
      });
      router.push(`/${projectId}`);
    } catch (err) {
      alert("Failed to update project.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading project.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full p-2 border rounded"
            type="text"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            {...register("dateDue")}
            className="w-full p-2 border rounded"
            type="datetime-local"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
}