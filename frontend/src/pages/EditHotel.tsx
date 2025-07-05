import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client'
import type { HotelType } from '../../../backend/src/shared/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import ManageHotelForm from '../components/forms/ManageHotelForms/ManageHotelForm';


const EditHotel = () => {
    const {hotelId} = useParams();
    const { showToast } = useAppContext();
    const navigate = useNavigate()
    

    const { data: hotel, isLoading, isError, error } = useQuery<HotelType, Error>({
        queryKey: ["fetchMyHotelById", hotelId],
        queryFn: () => apiClient.fetchMyHotelById(hotelId || ''),
        enabled: !!hotelId,
    });

    const { mutate} = useMutation<void, Error, FormData>({
        mutationFn: apiClient.updateMyHotelById,
        onSuccess: async () => {
            showToast({ message: "Hotel Updated!", type: "SUCCESS" });
            navigate("/");
        },
        onError: () => {
            showToast({ message: "Error updating hotel", type: "ERROR" });
        }
    });

    const handleSave = (HotelFormData: FormData) => {
        mutate(HotelFormData);
    }


    useEffect(() => {
        if (isError && error) {
        showToast({ message: "Failed to fetch hotels", type: "ERROR" });
        }
    }, [isError, error]);

    if (isLoading) {
        return (
        <div className="text-center py-20 text-xl text-gray-500 font-medium animate-pulse">
            Loading your hotels...
        </div>
        );
    }

        
    return (
        <ManageHotelForm hotel={hotel} onSave={handleSave}/>
    )
}

export default EditHotel