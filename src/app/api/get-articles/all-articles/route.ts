import { ArticleModel, IArticle } from "@/models/Article.model";
// import { currentUser } from "@clerk/nextjs/server";
import { DBConnect } from "@/lib/db";
import { NextRequest } from "next/server";

export interface ArticleData {
  articles: IArticle[];
  totalPages: number;
  hasNextPage: boolean;
}

export async function GET(req: NextRequest) {
  try {
    // SEARCH PARAMS
    const page = req.nextUrl.searchParams.get("page") || "";
    const perPage = req.nextUrl.searchParams.get("perPage") || "";

    // SKIP AND LIMIT
    const skip = (parseInt(page) - 1) * parseInt(perPage);
    const limit = parseInt(perPage);

    // // CHECK IF USER IS LOGGED IN
    // const user = await currentUser();

    // // CHECK IF USER EXISTS
    // if (!user) {
    //   return Response.json({ error: "Unauthorized" }, { status: 401 });
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
    const totalPages = Math.ceil(articles.length / parseInt(perPage));

    // HAS NEXT PAGE
    const hasNextPage = skip + limit < articlesCount;

    // DATA OBJECT
    const data: ArticleData = {
      articles,
      totalPages,
      hasNextPage,
    };

    // RETURN ARTICLES
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
