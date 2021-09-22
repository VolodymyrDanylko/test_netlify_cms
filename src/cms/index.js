import CMS from "netlify-cms-app"
// import BlogPostPreview from "./preview-templates/BlogPostPreview"
// import { de } from "netlify-cms-locales"

// CMS.registerPreviewTemplate("blog", BlogPostPreview)
// CMS.registerLocale("de", de)

CMS.registerEventListener({
  name: "prePublish",
  handler: ({ author, entry }) =>
    console.log(JSON.stringify({ author, data: entry.get("data") })),
})
