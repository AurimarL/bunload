import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/payload-types";

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  const photo =
    typeof user.photo === "object" && user.photo?.url
      ? user.photo.url
      : "/placeholder-user.jpg";

  return (
    <Card className="bg-zinc-900 border border-zinc-800">
      <CardHeader className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border border-zinc-700">
          <Image
            src={photo}
            alt={user.email}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
        <CardTitle className="mt-4 text-lg font-medium">{user.email}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-400 text-center">Registered User</p>
      </CardContent>
    </Card>
  );
}
