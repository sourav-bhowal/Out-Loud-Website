import ErrorPage from "@/app/error"; 
import { DBConnect } from "@/lib/db";
import { ArticleModel, IArticle } from "@/models/Article.model";
import { Metadata } from "next";
import { cache } from "react";

// INTERFACE FOR ARTICLE
interface ArticlePageProps {
  params: {
    articleId: string;
  };
}

// FETCH ARTICLE DATA
const fetchArticle = cache(async (articleId: string) => {
  // Connect to Database
  await DBConnect();
  // Fetch Article
  const article = await ArticleModel.findById(articleId).populate(
    "attachments"
  );
  // If Article Not Found
  if (!article) ErrorPage();
  // Return Article
  return article;
});

// Generate Meta Data for User Page
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  // Fetch Article
  const article = await fetchArticle(params.articleId);
  // Return Meta Data
  return {
    title: `${article?.title.slice(0, 10)}`,
  };
}

// ARTICLE PAGE
export default async function Article({
  params
}: ArticlePageProps) {
  // Fetch Article
  const article = await fetchArticle(params.articleId);
  return (
    <div className="w-full flex">
      <div className="">
        <ArticleCard article={article!} />
      </div>
    </div>
  );
}

interface ArticleCardProps {
  article: IArticle;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <>
    {article.title}
    </>
  )
}