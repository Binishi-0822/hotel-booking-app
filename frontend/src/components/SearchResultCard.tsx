import { Link } from "react-router-dom";
import type { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
import { FaMapMarkerAlt, FaHotel, FaUsers, FaTag } from "react-icons/fa";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  const facilitiesToShow = hotel.facilities.slice(0, 3);
  const remainingCount = hotel.facilities.length - facilitiesToShow.length;

  return (
    <div className="flex bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden w-full max-w-4xl mx-auto">
      {/* Hotel Image */}
      <div className="w-[300px] h-[200px] flex-shrink-0">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hotel Info */}
      <div className="flex flex-col justify-between p-6 flex-grow">
        <div>
          <h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">{hotel.description}</p>

          {/* Location, Type, Price, Guests, Rating */}
          <div className="flex flex-wrap gap-2 text-sm mb-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1">
              <FaMapMarkerAlt className="text-blue-600" /> {hotel.city}, {hotel.country}
            </span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center gap-1">
              <FaHotel className="text-indigo-600" /> {hotel.type}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
              <FaTag className="text-green-600" /> Rs. {hotel.pricePerNight}/night
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1">
              <FaUsers className="text-purple-600" /> {hotel.adultCount} Adults, {hotel.childCount} Children
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <AiFillStar key={i} className="text-yellow-500" />
              ))}
              {hotel.starRating} Star Rating
            </span>
          </div>

          {/* Facilities */}
          <div className="flex flex-wrap gap-2 text-xs">
            {facilitiesToShow.map((facility, i) => (
              <span
                key={i}
                className="bg-slate-200 text-slate-800 px-3 py-1 rounded-full font-medium"
              >
                {facility}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="text-sm text-gray-500 font-semibold">
                +{remainingCount} more
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <div className="text-right mt-4">
          <Link
            to={`/details/${hotel._id}`}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
