import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({ auth, users }: PageProps<{ users: User[] }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Users
        </h2>
      }
    >
      <Head title="Users" />

      <div className="py-4">
        <div className="mx-auto flex max-w-7xl flex-col space-y-2 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between bg-white p-4 shadow-sm sm:rounded-lg">
            <div className="text-gray-900">
              You can see this because you are an {auth.user.role}.
            </div>
            <button className="rounded bg-neutral-900 px-4 py-2 font-medium text-white transition-colors duration-150 ease-in-out hover:bg-neutral-800">
              Add User
            </button>
          </div>

          {users.map((user) => (
            <div className="bg-white shadow-sm sm:rounded-lg" key={user.id}>
              <div className="border-b border-gray-200 p-4">
                <div className="text-lg font-semibold">{user.name}</div>
                <div className="text-gray-500">{user.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
