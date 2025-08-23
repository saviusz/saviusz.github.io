import { defineCollection, z } from 'astro:content';

import { glob, file } from 'astro/loaders';

const projects = defineCollection({
    loader: file("src/content/projects/meta.yaml"),
    // loader: glob({ pattern: "*.md", base: "src/content/projects", }),
    schema: z.object({
        title: z.string().nonempty(),
        description: z.string().optional(),
        link: z.string().url().optional()
    })
});

const privateBlogPosts = defineCollection({
    loader: glob({pattern: "*.md", base: "src/content/personal"}),
    schema: z.object({
        title: z.string().nonempty(),
        publishedAt: z.date().optional(),
        publishedBy: z.string().optional(),
        tags: z.array(z.string()).optional(),
    })
});

export const collections = {
    projects,
    privateBlogPosts
};