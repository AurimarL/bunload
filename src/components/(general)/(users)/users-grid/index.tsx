import Link from "next/link";
import type { User } from "@/payload-types";
import { UserCard } from "./user-card";

type UsersGridProps = {
  users: User[];
};

export function UsersGrid({ users }: UsersGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <Link key={user.id} href={"/user/" + user.id}>
          <UserCard user={user} />
        </Link>
      ))}
    </div>
  );
}
