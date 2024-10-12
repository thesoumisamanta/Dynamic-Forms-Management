export const saveToLocalStorage = (data) => {
    localStorage.setItem('formData', JSON.stringify(data));
};

export const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : null;
};