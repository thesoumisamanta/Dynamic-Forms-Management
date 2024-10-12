import express from "express"
import { body } from 'express-validator';
import { submitForm, getForms, syncExcel } from '../controllers/formController.js';

const router = express.Router();

router.post('/submit', [
    body('formType').isIn(['A', 'B']).withMessage('Invalid form type'),
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('countryCode').isString().notEmpty().withMessage('Country code is required'),
    body('phoneNumber').isString().isLength({ min: 10, max: 15 }).withMessage('Invalid phone number length')
], submitForm);

router.get('/all', getForms);
router.post('/sync-excel', syncExcel);

export default router;
