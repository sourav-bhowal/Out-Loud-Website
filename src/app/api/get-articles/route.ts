import { ArticleModel } from "@/models/Article.model";
import { currentUser } from "@clerk/nextjs/server";
import { DBConnect } from "@/lib/db";

export async function GET() {
  try {
    // CHECK IF USER IS LOGGED IN
    const user = await currentUser();

    // CHECK IF USER EXISTS
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // CONNECT TO DATABASE
    await DBConnect();

    // FIND ARTICLES
    const articles = await ArticleModel.find()
      .populate("attachments")
      .sort({ createdAt: -1 });

    // RETURN ARTICLES
    return Response.json({ data: articles }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
