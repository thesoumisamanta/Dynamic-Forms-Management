import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import formRoutes from './routes/formRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', 
    methods: ['GET', 'POST']
}));
app.use(express.json());  

app.use('/api/forms', formRoutes);  


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
