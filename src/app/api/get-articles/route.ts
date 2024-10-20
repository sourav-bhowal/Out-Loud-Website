import { ArticleModel } from "@/models/Article.model";
import { DBConnect } from "@/lib/db";
import { NextRequest } from "next/server";
import { ArticlePage } from "@/lib/types";
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

    // const cacheKey = `articles:${page}`;

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
    const articles = await ArticleModel.find()
      .populate("attachments")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // TOTAL ARTICLES COUNT
    const articlesCount = await ArticleModel.countDocuments();

    // PAGINATION
    const totalPages = Math.ceil(articlesCount / parseInt(perPage));

    // HAS NEXT PAGE
    const hasNextPage = skip + limit < articlesCount;

    // DATA OBJECT
    const data: ArticlePage = {
      articles,
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
