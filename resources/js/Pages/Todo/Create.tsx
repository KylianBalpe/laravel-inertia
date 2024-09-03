import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Todo } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function Create({ auth }: PageProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    content: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("todo.store"), {
      onFinish: () => reset("content"),
    });
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Create Todo
          </h2>
        </div>
      }
    >
      <Head title="To Do" />

      <div className="py-12">
        <div className="mx-auto flex max-w-7xl flex-col space-y-4 sm:px-6 lg:px-8">
          <div className="bg-white p-4 shadow-sm sm:rounded-lg">
            <form onSubmit={submit}>
              <InputLabel htmlFor="content" value="Content" />
              <TextInput
                id="content"
                name="content"
                value={data.content}
                className="mt-2 block w-full"
                onChange={(e) => setData("content", e.target.value)}
              />
              <InputError message={errors.content} className="mt-2" />
              <div className="mt-2 flex w-full flex-row justify-end">
                <PrimaryButton disabled={processing}>Create Todo</PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
