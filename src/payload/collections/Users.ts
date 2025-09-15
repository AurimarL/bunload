// payload/collections/Users.ts
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "roles",
      type: "relationship",
      relationTo: "roles",
      hasMany: true, // a user can have multiple roles
      required: true,
    },
  ],
};

export default Users;
