import type { CollectionConfig } from "payload";

export const Teams: CollectionConfig = {
  slug: "teams",
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "plan",
      type: "text",
      defaultValue: "free",
    },
  ],
};
