import type { Access, CollectionConfig } from "payload";
import type { User } from "@/payload-types";

const isAdmin: Access<User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes("admin"));
};

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    delete: isAdmin,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
