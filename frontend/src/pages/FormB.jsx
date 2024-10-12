import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitForm } from '../redux/formSlice';
import FormTemplate from '../components/FormTemplate';

export default function FormB() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        dispatch(submitForm({ ...formData, formType: 'B' }));
        navigate("/listing");
    };

    return <FormTemplate formType="B" onSubmit={handleSubmit} />;
}