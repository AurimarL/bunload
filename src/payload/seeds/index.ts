import { fileURLToPath } from "node:url";
import config from "@payload-config";
import { getPayload } from "payload";
import { seedUsers } from "./seedUsers";

export const seed = async (): Promise<void> => {
  const payload = await getPayload({ config });

  payload.logger.info("Seeding data...");

  await seedUsers(payload);

  payload.logger.info("All seeding completed ✅");
};

// Run only if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Seeding failed:", err);
      process.exit(1);
    });
}
