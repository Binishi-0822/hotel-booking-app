import { useMutation } from "@tanstack/react-query"
import ManageHotelForm from "../components/forms/ManageHotelForms/ManageHotelForm"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const { mutate} = useMutation<void, Error, FormData>({
        mutationFn: apiClient.addHotel,
        onSuccess: async () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" });
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: "Error saving hotel", type: "ERROR" });
        }
    });

    const handleSave = (HotelFormData: FormData) => {
        mutate(HotelFormData);
    }

    return (
        <div>
            <ManageHotelForm onSave={handleSave}/>
        </div>
    );
}

export default AddHotel;
