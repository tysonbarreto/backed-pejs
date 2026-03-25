

import { z } from "zod";

/*
Validate user registration
Validate name, email format and password strength
*/
const registrationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be atleast 2 characters"),
    email:z
        .string()
        .trim()
        .min(1, "Email is required")
        .toLowerCase(),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be atleast 6 characters")
});


/*
Validate user registration
Validate name, email format and password strength
*/
const loginSchema = z.object({
    email:z
        .string()
        .trim()
        .min(1, "Email is required")
        .toLowerCase(),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be atleast 6 characters")
});


export { registrationSchema, loginSchema };