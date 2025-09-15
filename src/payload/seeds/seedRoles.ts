// rolesSeed.ts
import type { Payload } from "payload";

export const seedRoles = async (payload: Payload): Promise<void> => {
  payload.logger.info("Seeding roles...");

  const roles = [
    {
      name: "admin",
      description: "Full access to users and media",
      permissions: [
        { permission: "users:read" },
        { permission: "users:update" },
        { permission: "users:delete" },
        { permission: "media:read" },
        { permission: "media:create" },
        { permission: "media:update" },
        { permission: "media:delete" },
      ],
    },
    {
      name: "editor",
      description: "Can manage media",
      permissions: [
        { permission: "media:read" },
        { permission: "media:create" },
        { permission: "media:update" },
      ],
    },
    {
      name: "viewer",
      description: "Can only read media",
      permissions: [{ permission: "media:read" }],
    },
  ];

  for (const roleData of roles) {
    const existing = await payload.find({
      collection: "roles",
      where: { name: { equals: roleData.name } },
    });

    if (existing.docs.length === 0) {
      await payload.create({
        collection: "roles",
        data: roleData,
      });
      payload.logger.info(`Created role: ${roleData.name}`);
    } else {
      payload.logger.info(`Role already exists: ${roleData.name}`);
    }
  }

  payload.logger.info("Roles seeding completed ✅");
};
