import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Form = sequelize.define('Form', {
    formType: {
        type: DataTypes.ENUM('A', 'B'),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    countryCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Form;