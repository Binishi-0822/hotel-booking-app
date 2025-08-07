import express, {Request, Response} from 'express'
import Hotel from '../models/hotel';
import { HotelSearchResponse } from '../shared/types';
import { query } from 'express-validator';

interface SearchQuery {
  page?: string;
  sortOption?: string
}

const router = express.Router();


router.get("/search", async (req: Request<{}, {}, {}, SearchQuery>, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);
    let sortOptions = {};
    const sortOption = req.query.sortOption;
    console.log("Sort Option : ",sortOption)

    switch(req.query.sortOption){
      case "starRating":
        sortOptions = {starRating: -1};
        break;
     
      case  "pricePerNightAsc": 
        sortOptions = {pricePerNight: 1};
        break;

      case "pricePerNightDesc":
        sortOptions = {pricePerNight: -1};
        break;
      
    }
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments(query);
    

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
    return
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

const constructSearchQuery = (queryParams: any) => {
  let constructQuery: any = {};
  if(queryParams.destination){
    constructQuery.$or = [
      {city: new RegExp(queryParams.destination, "i")},
      {country: new RegExp(queryParams.destination, "i")},
    ];
  }

  if(queryParams.adultCount){
    constructQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if(queryParams.childCount){
    constructQuery.childCount = {
      $gte: parseInt(queryParams.childCount)
    };
  }

  if(queryParams.facilities){
    constructQuery.facilities = {
      $in: Array.isArray(queryParams.facilities)
      ? queryParams.facilities
      : [queryParams.facilities]
    }
  }

  if(queryParams.types){
    constructQuery.type = {
      $in: Array.isArray(queryParams.types)
      ? queryParams.types
      : [queryParams.types]
    }
  }

  if(queryParams.stars){
    const starRating = Array.isArray(queryParams.stars)
    ? queryParams.stars.map((star: string) => parseInt(star))
    : parseInt(queryParams.stars);

    constructQuery.starRating = {$in: starRating};
  }

  if(queryParams.maxPrice){
    constructQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructQuery;
}

export default router;
