import type { Payload } from "payload";
import type { User } from "@/payload-types";

export const seedUsers = async (payload: Payload): Promise<void> => {
  payload.logger.info("Seeding users...");

  // Fetch all roles in one query
  const allRoles = await payload.find({
    collection: "roles",
    limit: 100,
  });

  // Helper to get role ID by name
  const getRoleId = (roleName: string) => {
    const role = allRoles.docs.find((r) => r.name === roleName);
    if (!role) throw new Error(`Role not found: ${roleName}`);
    return role.id;
  };

  const usersToSeed: Pick<User, "email" | "password" | "roles">[] = [
    {
      email: "qwerty@example.com",
      roles: [getRoleId("viewer")],
      password: "qwerty123",
    },
    {
      email: "admin@example.com",
      roles: [getRoleId("admin")],
      password: "admin123",
    },
  ];

  for (const userData of usersToSeed) {
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: userData.email } },
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: userData,
      });
      payload.logger.info(`Created user: ${userData.email}`);
    } else {
      payload.logger.info(`User already exists: ${userData.email}`);
    }
  }

  payload.logger.info("Users seeding completed ✅");
};
