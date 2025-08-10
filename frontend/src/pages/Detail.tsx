import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import type { HotelType } from '../../../backend/src/shared/types';
import * as apiClient from '../api-client'
import { AiFillStar } from 'react-icons/ai';
import GuestInfoForm from '../components/forms/GuestInfoForm/GuestInfoForm';

const Detail = () => {
    const {hotelId} = useParams();
    

    const { data: hotel} = useQuery<HotelType, Error>({
        queryKey: ["fetchMyHotelById", hotelId],
        queryFn: () => apiClient.fetchHotelById(hotelId || ''),
        enabled: !!hotelId,
    });

    if(!hotel){
        return <></>
    }

    return (
        <div className='space-y-6'>
            <div>
                <span className="flex">
                    { 
                        Array.from({length: hotel?.starRating}).map(() => (
                            <AiFillStar className='fill-yellow-400'/>
                        ))
                    }
                </span>
                <h1 className='text-3xl font-bold'>{hotel.name}</h1>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {
                    hotel.imageUrls.map((image) => (
                        <div className='h-[300px]'>
                            <img src={image} alt={hotel.name} className='rounded-md w-full h-full object-cover object-center'/>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-wrap gap-2">
                {hotel.facilities.map((facility, index) => (
                    <span
                    key={index}
                    className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-medium"
                    >
                    {facility}
                    </span>
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
                <div className='whitespace-pre-line'>{hotel.description}</div>
                <div className='h-fit'>
                    <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id}/>
                </div>
            </div>


        </div>

    )
}

export default Detail