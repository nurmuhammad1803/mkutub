import { body } from "express-validator";

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('fullName').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL(),
]