import { defineField, defineType } from "sanity";

export default defineType({
  name: "board",
  title: "Board",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "bookshelf" — shown in the site header path.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used in the URL, e.g. bookshelf.html reads the board with slug \"bookshelf\".",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
