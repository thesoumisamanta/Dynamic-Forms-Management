import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import formRoutes from './routes/formRoutes.js';
import db from './config/database.js';  // Ensures database connection is initialized

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',  // Dynamically set the client URL from .env
    methods: ['GET', 'POST']
}));
app.use(express.json());  // Parse JSON request bodies

// Routes
app.use('/api/forms', formRoutes);  // Mount the form routes at /api/forms

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
