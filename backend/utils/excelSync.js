import * as XLSX from 'xlsx';
import Form from '../models/Form';

export const syncDataToExcel = async () => {
    try {
        
        const forms = await Form.findAll();

        
        const workbook = XLSX.utils.book_new();

        
        const worksheet = XLSX.utils.json_to_sheet(forms.map(form => form.toJSON()));

        
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Forms');

        
        XLSX.writeFile(workbook, 'forms_data.xlsx');
    } catch (error) {
        console.error('Error syncing data to Excel:', error);
        throw error;
    }
};