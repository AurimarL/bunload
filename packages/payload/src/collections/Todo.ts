import type { CollectionConfig } from "payload";

export const Todos: CollectionConfig = {
    slug: "todo",
    fields: [
        {
            name: "title",
            type: "text",
            required: true
        },
        {
            name: "description",
            type: "textarea",
            required: false
        },
        {
            name: "status",
            type: "select",
            options: ['PENDING', 'STARTED', 'DONE'],
            defaultValue: "PENDING",
            required: true
        },
        {
            name: "attachment",
            type: 'upload',
            relationTo: "media",
            hasMany: true
        }
    ]
}