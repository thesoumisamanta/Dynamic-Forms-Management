import * as XLSX from 'xlsx';
import Form from '../models/Form';

export const syncDataToExcel = async () => {
    try {
        // Fetch all form data from the database
        const forms = await Form.findAll();

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert form data to JSON and create a worksheet
        const worksheet = XLSX.utils.json_to_sheet(forms.map(form => form.toJSON()));

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Forms');

        // Write the workbook to an Excel file
        XLSX.writeFile(workbook, 'forms_data.xlsx');
    } catch (error) {
        console.error('Error syncing data to Excel:', error);
        throw error;
    }
};