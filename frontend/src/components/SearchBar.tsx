import { useState, type FormEvent } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    console.log("Destination : ",destination, checkIn,checkOut)
    event.preventDefault();
    search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
    navigate("/search")
  };

  const handleClear = () => {
    const today = new Date();
    setDestination("");
    setCheckIn(today);
    setCheckOut(today);
    setAdultCount(1);
    setChildCount(0);
  };

  const minDate = new Date();
  const maxDate = new Date(minDate.getFullYear() + 1, 11, 31); // 1 year ahead

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-7xl mx-auto -mt-10 p-4 bg-white shadow-xl rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4"
    >
      {/* Destination Input */}
      <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-inner">
        <MdTravelExplore size={24} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full bg-transparent focus:outline-none text-sm"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      {/* Adults & Children Input */}
      <div className="flex flex-col sm:flex-row gap-2 justify-between bg-gray-100 p-3 rounded-lg shadow-inner">
        <div className="flex items-center gap-1">
          <label className="text-sm text-gray-600 font-medium">Adults:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
            className="w-16 px-2 py-1 rounded-md focus:outline-none font-semibold text-center"
          />
        </div>
        <div className="flex items-center gap-1">
          <label className="text-sm text-gray-600 font-medium">Children:</label>
          <input
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
            className="w-16 px-2 py-1 rounded-md focus:outline-none font-semibold text-center"
          />
        </div>
      </div>

      {/* Check-in Date */}
      <div className="bg-gray-100 p-2 rounded-lg shadow-inner">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in"
          className="w-full bg-transparent px-2 py-1 focus:outline-none"
        />
      </div>

      {/* Check-out Date */}
      <div className="bg-gray-100 p-2 rounded-lg shadow-inner">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={checkIn}
          maxDate={maxDate}
          placeholderText="Check-out"
          className="w-full bg-transparent px-2 py-1 focus:outline-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-200"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-200"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
