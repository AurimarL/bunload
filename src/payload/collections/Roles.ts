// payload/collections/Roles.ts
import type { CollectionConfig } from "payload";

const Roles: CollectionConfig = {
  slug: "roles",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "permissions",
      type: "array",
      fields: [
        {
          name: "permission",
          type: "text",
          required: true,
        },
      ],
      defaultValue: [],
    },
  ],
};

export default Roles;
