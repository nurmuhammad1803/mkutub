import { body } from "express-validator";

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
];

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('fullName').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Enter the title of article').isLength({ min: 3 }).isString(),
    body('text', 'Enter the context of article').isLength({ min: 10 }).isString(),
    body('tags', 'Incorrect type of tags (choose array)').optional().isString(),
    body('imageUrl', 'Incorrect link to image').optional().isString(),
]