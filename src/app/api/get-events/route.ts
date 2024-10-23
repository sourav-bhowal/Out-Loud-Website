import { DBConnect } from "@/lib/db";
import { EventPage } from "@/lib/types";
import { EventModel } from "@/models/Event.model";
import { NextRequest } from "next/server";

// import { redis } from "@/lib/redis";
// CACHE KEY
export async function GET(req: NextRequest) {
  try {
    // SEARCH PARAMS
    const page = req.nextUrl.searchParams.get("page") || "";
    const perPage = req.nextUrl.searchParams.get("perPage") || "";

    // SKIP AND LIMIT
    const skip = (parseInt(page) - 1) * parseInt(perPage);
    const limit = parseInt(perPage);

    // const cacheKey = `events:${page}`;

    // CHECK IF DATA IS CACHED
    // const cachedData = await redis.get(cacheKey);

    // IF CACHED DATA RETURN
    // if (cachedData) {
    //   console.log("Cached data");
    //   return Response.json(JSON.parse(cachedData), { status: 200 });
    // }

    // CONNECT TO DATABASE
    await DBConnect();

    // FIND ARTICLES
    const events = await EventModel.find({
      date: {
        $lte: new Date(),
      },
    })
      .populate("attachments")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // TOTAL ARTICLES COUNT
    const eventsCount = await EventModel.countDocuments();

    // PAGINATION
    const totalPages = Math.ceil(eventsCount / parseInt(perPage));

    // HAS NEXT PAGE
    const hasNextPage = skip + limit < eventsCount;

    // DATA OBJECT
    const data: EventPage = {
      events,
      totalPages,
      hasNextPage,
    };
    // console.log("Database data");
    // CACHE DATA
    // await redis.setex(cacheKey, 300, JSON.stringify(data));

    // RETURN ARTICLES
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
