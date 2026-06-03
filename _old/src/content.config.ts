import { kEnableArchive } from "$consts";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Typst files in the `content/article/` directory.
  loader: glob({ base: "./content/blog", pattern: "**/*.typ" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    description: z.any().optional(),
    date: z.coerce.date(),
    // Transform string to Date object
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const pub = defineCollection({
  // Load Typst files in the `content/article/` directory.
  loader: glob({ base: "./content/publication", pattern: "**/*.typ" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    author: z.string(),
    venue: z.string(),
    description: z.any().optional(),
    date: z.coerce.date(),
    // Transform string to Date object
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    file: z.any().optional(),
    doi: z.any().optional(),
  }),
});

export const collections = { blog, pub };

// const archive = kEnableArchive
//   ? {
//       archive: defineCollection({
//         // Load Typst files in the `content/article/` directory.
//         loader: glob({ base: "./content/archive", pattern: "**/*.typ" }),
//         // Type-check frontmatter using a schema
//         schema: z.object({
//           title: z.string(),
//           author: z.string().optional(),
//           description: z.any().optional(),
//           date: z.coerce.date(),
//           indices: z.array(z.string()).optional(),
//           // Transform string to Date object
//           updatedDate: z.coerce.date().optional(),
//           tags: z.array(z.string()).optional(),
//         }),
//       }),
//     }
//   : {};

// export const collections = { blog, pub, ...archive };
