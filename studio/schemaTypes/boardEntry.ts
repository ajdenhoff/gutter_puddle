import { defineField, defineType } from "sanity";

export default defineType({
  name: "boardEntry",
  title: "Board Entry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used in the entry page URL.",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "board",
      title: "Board",
      type: "reference",
      to: [{ type: "board" }],
      description: "Which board this entry belongs to, e.g. bookshelf.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "gutter puddle",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 2,
      description: "Short preview shown on the board listing page.",
    }),
    defineField({
      name: "url",
      title: "External link",
      type: "url",
      description: "Optional link to an external page, PDF, etc.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "board.title", media: "body.0" },
  },
});
