import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import type { HotelType } from "../../../backend/src/shared/types";
import { useEffect } from "react";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { showToast } = useAppContext();

  const { data: hotelData, isLoading, isError, error } = useQuery<HotelType[], Error>({
    queryKey: ["fetchMyHotels"],
    queryFn: apiClient.fetchMyHotels,
  });

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

  if (!hotelData || hotelData.length === 0) {
    return (
      <div className="text-center py-20 text-xl text-gray-600 font-semibold">
        No hotels found. <br />
        <Link to="/add-hotel" className="text-blue-600 hover:underline">
          Click here to add your first hotel.
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900">My Hotels</h1>
          <p className="text-gray-500 mt-1">Manage and edit all your listed hotels here.</p>
        </div>
        <Link
          to="/add-hotel"
          className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-200"
        >
          + Add New Hotel
        </Link>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between"
          >
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{hotel.name}</h2>
                <p className="text-gray-600 mb-4 break-words whitespace-pre-wrap max-h-32 overflow-y-auto">
                {hotel.description}
                </p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-2 rounded-md">
                  <BsMap />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-2 rounded-md">
                  <BsBuilding />
                  {hotel.type}
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-2 rounded-md">
                  <BiMoney />
                  Rs. {hotel.pricePerNight}/night
                </div>
                <div className="flex items-center gap-2 bg-purple-50 text-purple-800 px-3 py-2 rounded-md">
                  <BiHotel />
                  {hotel.adultCount} Adults, {hotel.childCount} Children
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-2 rounded-md col-span-2">
                  <BiStar />
                  {hotel.starRating} Star Rating
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
