// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "homepage",
        label: "Homepage Content",
        path: "content",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "headline", label: "Headline" },
              { type: "string", name: "subheadline", label: "Subheadline" },
              { type: "string", name: "image", label: "Hero Image URL" }
            ]
          },
          {
            type: "object",
            name: "about",
            label: "About Us",
            fields: [
              { type: "string", name: "profileDescription", label: "Profile Description", ui: { component: "textarea" } },
              { type: "string", name: "mottoQuote", label: "Motto / Philosophy Quote", ui: { component: "textarea" } },
              {
                type: "object",
                list: true,
                name: "education",
                label: "Education Details",
                fields: [
                  { type: "string", name: "degree", label: "Degree / Certificate" },
                  { type: "string", name: "institution", label: "Institution & Year" }
                ]
              },
              { type: "string", name: "memberships", label: "Memberships" }
            ]
          },
          {
            type: "object",
            list: true,
            name: "services",
            label: "Dental Services",
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "New Service" };
              }
            },
            fields: [
              { type: "string", name: "id", label: "Service ID (URL slug)" },
              { type: "string", name: "title", label: "Service Title" },
              { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" } },
              {
                type: "string",
                name: "icon",
                label: "Icon Type",
                options: [
                  "Heart",
                  "ShieldCheck",
                  "UserRound",
                  "Stethoscope",
                  "Plus",
                  "Minus",
                  "Smile",
                  "Shield",
                  "Clock",
                  "Sparkles"
                ]
              },
              { type: "string", name: "duration", label: "Average Duration" },
              { type: "string", name: "recovery", label: "Recovery Time" },
              { type: "string", name: "cost", label: "Estimated Cost Range" },
              {
                type: "string",
                list: true,
                name: "benefits",
                label: "Patient Benefits"
              }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer & Contact",
            fields: [
              { type: "string", name: "phoneNumber", label: "Contact Phone Number" },
              { type: "string", name: "hours", label: "Operating Hours" },
              { type: "string", name: "address", label: "Clinic Address", ui: { component: "textarea" } }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
