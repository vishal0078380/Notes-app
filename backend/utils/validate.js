const { body } = require('express-validator');

exports.registerValidation = [
  body('name').isLength({ min: 2 }).withMessage('Name must be min 2 chars'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password required')
];

exports.noteValidation = [
  body('title').isLength({ min: 1 }).withMessage('Title required'),
  body('content').optional().isString()
];
