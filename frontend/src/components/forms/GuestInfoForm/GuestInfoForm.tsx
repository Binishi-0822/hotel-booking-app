import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../../../contexts/SearchContext";
import { useAppContext } from "../../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const {isLoggedIn} = useAppContext()
  const search = useSearchContext();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const navigate = useNavigate();
  const location = useLocation()

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
        "",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.adultCount
    );
    navigate("/sign-in", {state: {from: location}})
  }

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
        "",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.adultCount
    );
    navigate(`/hotel/${hotelId}/booking`, {state: {from: location}})
  }

  return (
    <div className="p-6 g-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-2xl shadow-lg border border-gray-200 space-y-5">
      <h3 className="text-lg font-bold text-blue-900">
        Rs.{pricePerNight}{" "}
        <span className="text-sm font-medium text-gray-500">/ night</span>
      </h3>

      <form className="space-y-4" onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-In Date
          </label>
          <DatePicker
            required
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Select date"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-Out Date
          </label>
          <DatePicker
            required
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date as Date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || minDate}
            maxDate={maxDate}
            placeholderText="Select date"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Guest Count */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adults
            </label>
            <input
              type="number"
              min={1}
              max={20}
              {...register("adultCount", {
                min: { value: 1, message: "At least 1 adult required" },
                valueAsNumber: true,
              })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {errors.adultCount && (
              <span className="text-red-500 text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Children
            </label>
            <input
              type="number"
              min={0}
              max={20}
              {...register("childCount", { valueAsNumber: true })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
       
        {
            isLoggedIn ? (
                 <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-5 py-2 rounded-md font-semibold shadow-md transition-all duration-200"
                >
                    Book Now
                </button>
            ) : (
                 <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-5 py-2 rounded-md font-semibold shadow-md transition-all duration-200"
                >
                    Sign in to Book 
                </button>
            )
        }
      </form>
    </div>
  );
};

export default GuestInfoForm;
