import { useFormContext } from "react-hook-form"
import {hotelFacilities} from "../../../config/hotel-options-config"
import type { HotelFormData } from "./ManageHotelForm"

const FacilitiesSection = () => {
    const {register, formState: {errors}} = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-4 lg:grid-cols-6 gap-2 sm:grid-cols-3">
                {
                    hotelFacilities.map((facility) => (
                        <label className="text-sm flex gap-1 text-gray-700">
                            <input type="checkbox" value={facility}
                                {...register("facilities", {
                                    validate: (facilities) => {
                                        if(facilities && facilities.length > 0){
                                            return true;
                                        }else{
                                            return "At least one facility is required";
                                        }
                                    }
                                })}  
                            />
                            <span>{facility}</span>

                        </label>
                    ))
                }
            </div>
            {errors.type && (
                <span className="text-red-500 font-bold">{errors.type.message}</span>
            )} 
        </div>
    )
}

export default FacilitiesSection