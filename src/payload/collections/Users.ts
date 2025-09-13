import type { CollectionConfig } from "payload";

const RolesOptions = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
];

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      saveToJWT: true,
      options: [...RolesOptions],
      defaultValue: "user",
    },
  ],
};
