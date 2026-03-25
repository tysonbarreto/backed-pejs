import {z} from "zod";


/**
 * Validate schema for creating a new movie
 * Validate title, releaseYear and optional fields
 */

const createMovieSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Movie title is required"),
    releaseYear: z
        .coerce
        .number()
        .int("Release year must be an integer")
        .min(1900,"Release year must be an integer")
        .max(new Date().getFullYear()+5, "Release year must be a valid year"),
    overview: z
        .string()
        .trim()
        .optional(),
    runtime:z
        .coerce
        .number()
        .int("Runtime must be an integer")
        .positive("Runtime must be a positive number (in minutes)")
        .optional(),
    postUrl: z
        .string()
        .url("Post URL must be a valid URL")
        .optional()
});

const updateMovieSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Movie title is required"),
    releaseYear: z
        .coerce
        .number()
        .int("Release year must be an integer")
        .min(1900,"Release year must be an integer")
        .max(new Date().getFullYear()+5, "Release year must be a valid year"),
    overview: z
        .string()
        .trim()
        .optional(),
    runtime:z
        .coerce
        .number()
        .int("Runtime must be an integer")
        .positive("Runtime must be a positive number (in minutes)")
        .optional(),
    postUrl: z
        .string()
        .url("Post URL must be a valid URL")
        .optional()
});


export { createMovieSchema, updateMovieSchema };