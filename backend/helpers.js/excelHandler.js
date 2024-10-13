import ExcelJS from 'exceljs';
import dotenv from 'dotenv';

dotenv.config();

const EXCEL_FILE_PATH = process.env.EXCEL_FILE_PATH;

export const getDataFromExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
    const worksheet = workbook.getWorksheet(1);

    const data = [];
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) { 
            data.push({
                formType: row.getCell(1).value,
                name: row.getCell(2).value,
                countryCode: row.getCell(3).value,
                phoneNumber: row.getCell(4).value
            });
        }
    });

    return data;
};

export const appendDataToExcel = async (rowData) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
    const worksheet = workbook.getWorksheet(1);

    worksheet.addRow(rowData);
    await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
};

export const updateExcelWithDatabaseData = async (databaseData) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
    const worksheet = workbook.getWorksheet(1);

    
    worksheet.spliceRows(2, worksheet.rowCount - 1);

    
    databaseData.forEach(row => {
        worksheet.addRow([row.formType, row.name, row.countryCode, row.phoneNumber]);
    });

    await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
};