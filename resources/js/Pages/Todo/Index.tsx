import DangerButton from "@/Components/DangerButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Todo } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Index({ auth, todos }: PageProps<{ todos: Todo[] }>) {
  const [visible, setVisible] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { flash } = usePage<PageProps>().props;

  function deleteTodo(id: number) {
    setProcessing(true);

    router.delete(route("todo.delete", id), {
      onFinish: () => setProcessing(false),
    });
  }

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [flash]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            To Do
          </h2>

          <Link
            href={route("todo.create")}
            className="inline-flex h-9 items-center rounded-md bg-neutral-900 px-3 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-neutral-800"
          >
            Add Todo
          </Link>
        </div>
      }
    >
      <Head title="To Do" />

      <div className="py-4">
        {flash.success && visible && (
          <div className="mx-auto mb-4 flex max-w-7xl flex-col space-y-4 sm:px-6 lg:px-8">
            <div className="border border-green-700 bg-green-50 p-4 shadow-sm sm:rounded-lg">
              <div className="font-medium text-green-700">{flash.success}</div>
            </div>
          </div>
        )}

        <div className="mx-auto flex max-w-7xl flex-col space-y-4 sm:px-6 lg:px-8">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                className="w-full bg-white p-4 shadow-sm sm:rounded-lg"
                key={todo.id}
              >
                <div className="inline-flex w-full items-center justify-between">
                  <h4 className="font-medium text-gray-900">{todo.content}</h4>
                  <div className="inline-flex gap-2">
                    <Link
                      href={route("todo.edit", todo.id)}
                      className="inline-flex h-9 items-center rounded-md bg-neutral-900 px-3 text-sm font-medium text-white transition-colors duration-150 ease-in-out hover:bg-neutral-800"
                    >
                      Edit
                    </Link>
                    <DangerButton
                      onClick={() => deleteTodo(todo.id)}
                      disabled={processing}
                    >
                      Delete
                    </DangerButton>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-4 shadow-sm sm:rounded-lg">
              <div className="text-gray-900">You have no todos</div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
