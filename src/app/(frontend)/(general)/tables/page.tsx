import { Suspense } from "react";
import { columns } from "@/components/(general)/(tables)/columns";
import CreateUserModal from "@/components/(general)/(tables)/create-user/modal/create-user-modal";
import { DataTable } from "@/components/(general)/(tables)/data-table";
import payload from "@/payload";

export default async function TablePage() {
  const { docs: usersData } = await payload.find({
    collection: "users",
  });
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Suspense fallback={<p>loading...</p>}>
        <DataTable columns={columns} usersData={usersData}>
          <CreateUserModal />
        </DataTable>
      </Suspense>
    </main>
  );
}
