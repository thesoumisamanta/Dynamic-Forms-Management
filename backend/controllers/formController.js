import db from '../config/database.js';
import { validationResult } from 'express-validator';


export const submitForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { formType, name, countryCode, phoneNumber } = req.body;
        const [result] = await db.execute(
            'INSERT INTO forms (formType, name, countryCode, phoneNumber) VALUES (?, ?, ?, ?)',
            [formType, name, countryCode, phoneNumber]
        );
        res.status(201).json({ id: result.insertId, formType, name, countryCode, phoneNumber });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getForms = async (req, res) => {
    try {
        
        const [rows] = await db.query('SELECT * FROM forms');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const syncExcel = async (req, res) => {
    
    res.status(200).json({ message: 'Excel sync not implemented yet' });
};
