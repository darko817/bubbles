import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number cannot exceed 15 digits"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });