import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitForm } from '../redux/formSlice';
import FormTemplate from '../components/FormTemplate';

export default function FormA() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (formData) => {
        dispatch(submitForm({ ...formData, formType: 'A' }));
        navigate("/listing");
    };

    return <FormTemplate formType="A" onSubmit={handleSubmit} />;
}