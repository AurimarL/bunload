import payload from "@/payload";
import { columns } from "./columns";
import CreateUserModal from "./create-user-modal";
import { DataTableClient } from "./data-table.client";

export default async function DataTable() {
  const { docs: usersData } = await payload.find({
    collection: "users",
  });
  return (
    <DataTableClient columns={columns} usersData={usersData}>
      <CreateUserModal />
    </DataTableClient>
  );
}
