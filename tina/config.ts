import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        format: "md",
        label: "Landing Graphic",
        name: "landing_graphic",
        path: "content",
        frontmatterFormat: "yaml",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "_index",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        format: "md",
        label: "Sections",
        name: "sections",
        path: "content/homepage",
        frontmatterFormat: "yaml",
        match: {
          include: "*",
          exclude: "index",
        },
        fields: [
          {
            name: "title",
            type: "string",
            label: "Title",
            description: "The title of the section"
          },
          {
            name: "weight",
            type: "number",
            label: "Weight",
            description: "The order on the page",
            ui: {
              parse: (val) => parseFloat(val),
              format: (val) => (val ? parseFloat(val) : "0.0") 
            }
          },
          {
            name: "header_menu",
            type: "boolean",
            label: "Show in Menu?",
            description: "Should the section show up in the menu?"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
