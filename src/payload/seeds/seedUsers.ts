import type { Payload } from "payload";
import type { User } from "@/payload-types";

export const seedUsers = async (payload: Payload): Promise<void> => {
  payload.logger.info("Seeding users...");

  const usersToSeed: Pick<User, "email" | "password" | "roles">[] = [
    { email: "qwerty@example.com", roles: ["user"], password: "qwerty123" },
    { email: "admin@example.com", roles: ["admin"], password: "admin123" },
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
