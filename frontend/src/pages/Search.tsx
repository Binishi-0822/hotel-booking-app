import { useQuery } from '@tanstack/react-query';
import { useSearchContext } from '../contexts/SearchContext';
import * as apiClient from "../api-client";
import { useEffect, useState } from 'react';
import type { HotelType } from '../../../backend/src/shared/types';
import SearchResultCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';
import HotelTypesFilter from '../components/HotelTypesFilter';
import FacilitiesFilter from '../components/FacilitiesFilter';
import PriceFilter from '../components/PriceFilter';

const Search  = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([])
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const[selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    console.log("Page : ",page)
  },[page])

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) => 
      event.target.checked
      ? [...prevStars, starRating]
      : prevStars.filter((star) => star !== starRating)
    )
  }

  const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) => 
      event.target.checked
      ? [...prevHotelTypes, hotelType]
      : prevHotelTypes.filter((type) => type !== hotelType)
    )
  }

  const handleFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) => 
      event.target.checked
      ? [...prevFacilities, facility]
      : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    )
  }  

  const { data: hotelData, isLoading, isError } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error loading hotels.</div>;

  return (
    <div className="px-4 lg:px-20 py-6">
      {/* Count Title */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <div className="flex items-center gap-2 mx-26">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 hidden sm:block">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Default</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">Price (low to high)</option>
              <option value="pricePerNightDesc">Price (high to low)</option>
            </select>
          </div>
        </div>


      

      {/* Grid Layout: Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar */}
        <div className="w-full rounded-lg border border-slate-300 p-5 h-fit sticky top-10 bg-white shadow-sm">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-4">Filter by:</h3>
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
          <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange}/>
          <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilitiesChange}/>
          <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)}/>
        </div>

        {/* Hotel Results */}
        <div className="flex flex-col gap-4">
          {hotelData?.data.map((hotel: HotelType) => (
            <SearchResultCard key={hotel._id} hotel={hotel} />
          ))}
          <div>
            <Pagination 
              page={hotelData?.pagination.page || 1} 
              pages={hotelData?.pagination.pages || 1} 
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Search;
