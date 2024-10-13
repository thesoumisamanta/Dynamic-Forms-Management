import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchForms, syncExcel } from '../redux/formSlice';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';

export default function Listing() {
    const dispatch = useDispatch();
    const forms = useSelector((state) => state.form.forms);
    const syncStatus = useSelector((state) => state.form.syncStatus);
    const navigate = useNavigate();
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        dispatch(fetchForms());
    }, [dispatch]);

    const handleRefresh = async () => {
        setIsSyncing(true);
        dispatch(syncExcel());

        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSyncing(false);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <Container className="py-8">
            <h1 className="text-3xl font-bold mb-4">Form Submissions</h1>

            <div className="flex justify-between mb-4">
                <Button
                    onClick={handleRefresh}
                    disabled={isSyncing}
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {isSyncing ? 'Syncing...' : 'Refresh Excel'}
                </Button>

                <Button onClick={handleBackToHome} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                    Back to Home
                </Button>
            </div>

            {isSyncing && (
                <div className="flex justify-center items-center mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-left">Form Type</th>
                            <th className="px-4 py-2 border-b text-left">Name</th>
                            <th className="px-4 py-2 border-b text-left">Country Code</th>
                            <th className="px-4 py-2 border-b text-left">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(forms) && forms.length > 0 ? (
                            forms.map((form) => (
                                <tr key={form.id}>
                                    <td className="px-4 py-2 border-b text-left">{form.formType}</td>
                                    <td className="px-4 py-2 border-b text-left">{form.name}</td>
                                    <td className="px-4 py-2 border-b text-left">{form.countryCode}</td>
                                    <td className="px-4 py-2 border-b text-left">{form.phoneNumber}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 border-b text-left">No forms available.</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </Container>
    );
}