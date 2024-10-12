import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Dropdown from './Dropdown';
import Button from './Button';
import Container from './Container';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtils';

export default function FormTemplate({ formType, onSubmit }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        countryCode: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({ name: '', phoneNumber: '' });

    const countryCodes = [
        { value: '+1', label: 'US (+1)' },
        { value: '+44', label: 'UK (+44)' },
        { value: '+91', label: 'India (+91)' }
    ];

    useEffect(() => {
        const savedData = loadFromLocalStorage();
        if (savedData) {
            setFormData(savedData);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (name === 'phoneNumber' || name === 'countryCode') {
            validatePhoneNumber(formData.countryCode, value);
        } else {
            validateField(name, value);
        }
    };

    const validateField = (fieldName, value) => {
        let fieldErrors = { ...errors };

        if (fieldName === 'name') {
            if (value.trim() === '') {
                fieldErrors.name = 'Please enter your name';
            } else {
                fieldErrors.name = '';
            }
        }

        setErrors(fieldErrors);
    };

    const validatePhoneNumber = (countryCode, phoneNumber) => {
        let phoneNumberError = '';

        if (countryCode === '+91') {
            // Indian phone number validation (starts with 6, 7, 8, or 9 and 10 digits)
            const indianPhoneRegex = /^[6-9]\d{9}$/;
            if (!indianPhoneRegex.test(phoneNumber)) {
                phoneNumberError = 'Indian phone number must be 10 digits and start with 6, 7, 8, or 9';
            }
        } else if (countryCode === '+1') {
            // US phone number validation (exactly 10 digits)
            const usPhoneRegex = /^\d{10}$/;
            if (!usPhoneRegex.test(phoneNumber)) {
                phoneNumberError = 'US phone number must be 10 digits';
            }
        } else if (countryCode === '+44') {
            // UK phone number validation (7 to 11 digits)
            const ukPhoneRegex = /^\d{7,11}$/;
            if (phoneNumber.length < 7) {
                phoneNumberError = 'UK phone number must be at least 7 digits long';
            } else if (phoneNumber.length > 11) {
                phoneNumberError = 'UK phone number must not exceed 11 digits';
            } else if (!ukPhoneRegex.test(phoneNumber)) {
                phoneNumberError = 'Please enter a valid UK phone number between 7 and 11 digits';
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: phoneNumberError
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            saveToLocalStorage(formData);
            onSubmit(formData);
        }
    };

    const validateForm = () => {
        return (
            formData.name.trim() !== '' &&
            formData.countryCode !== '' &&
            errors.phoneNumber === ''
        );
    };

    return (
        <Container className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Form {formType}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="countryCode" className="block mb-1">Country Code</label>
                    <Dropdown
                        id="countryCode"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        options={countryCodes}
                        className="w-full"
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block mb-1">Phone Number</label>
                    <Input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                </div>
                <div className="flex justify-between">
                    <Button type="button" onClick={() => navigate('/')} className="bg-gray-500">
                        Back
                    </Button>
                    <Button type="submit" disabled={!validateForm()} className="bg-green-500">
                        Submit
                    </Button>
                </div>
            </form>
        </Container>
    );
}
