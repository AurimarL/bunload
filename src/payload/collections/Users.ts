// payload/collections/Users.ts
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: true,
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [
    //
    {
      name: "roles",
      type: "relationship",
      relationTo: "roles",
      hasMany: true, // a user can have multiple roles
      required: true,
      defaultValue: "",
    },
    //
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "team",
      type: "relationship",
      relationTo: "teams",
      hasMany:true
    },
  ],
};

export default Users;
