// payload/collections/Users.ts

import type { Access, CollectionConfig } from "payload";
import type { User } from "@/payload-types";

const isAdmin: Access<User> = ({ req: { user } }) => {
  console.log("user aqui");
  console.log(Boolean(user?.roles?.includes("admin")));
  return Boolean(user?.roles?.includes("admin"));
};
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
  access: {
    delete: isAdmin,
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
      hasMany: true,
    },
  ],
};

export default Users;
