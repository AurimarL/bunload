import type { GlobalConfig } from "payload";

const NavMain: GlobalConfig = {
  slug: "nav-main",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "links",
      type: "array",
      label: "Main Navigation Links",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
          admin: {
            description:
              "Use a full URL or a relative path (e.g., /docs/intro)",
          },
        },
        {
          name: "icon",
          type: "text",
          required: true,
          admin: {
            description:
              "Enter the name of the Lucide icon (e.g., SquareTerminal, Bot)",
          },
        },
        {
          name: "items",
          type: "array",
          label: "Sub-Navigation Items",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "projects",
      type: "array",
      label: "Main Navigation Projects",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
          admin: {
            description:
              "Use a full URL or a relative path (e.g., /projects/intro)",
          },
        },
        {
          name: "icon",
          type: "text",
          required: true,
          admin: {
            description:
              "Enter the name of the Lucide icon (e.g., SquareTerminal, Bot)",
          },
        },
      ],
    },
  ],
};

export default NavMain;
