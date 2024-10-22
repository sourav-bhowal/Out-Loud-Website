import ErrorPage from "@/app/error";
import { DBConnect } from "@/lib/db";
import { ArticleModel, IArticle } from "@/models/Article.model";
import { Metadata } from "next";
import { cache } from "react";
import Card from "./Card";
import { IAttachment } from "@/models/Attachment.model";
import ArticleCard from "@/components/articles/ArticleCard";

// INTERFACE FOR ARTICLE
interface ArticlePageProps {
  params: Promise<{ articleId: string }>;
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

// RELATED ARTICLES
const fetchRelatedArticles = cache(async (articleId: string) => {
  // Connect to Database
  await DBConnect();
  // Fetch Articles
  const articles = await ArticleModel.find({
    category: (await fetchArticle(articleId))?.category,
  })
    .limit(5)
    .populate("attachments")
    .where({
      _id: { $ne: articleId },
    });
  // Return Articles
  return articles;
});

// Generate Meta Data for User Page
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  // Fetch Article
  const { articleId } = await params;
  const article = await fetchArticle(articleId);
  // Return Meta Data
  return {
    title: `${article?.title.slice(0, 10)}`,
  };
}

// ARTICLE PAGE
export default async function Article({ params }: ArticlePageProps) {
  const { articleId } = await params;
  // Fetch Article
  const article = await fetchArticle(articleId);
  // Fetch Related Articles
  const relatedArticles = await fetchRelatedArticles(articleId);
  return (
    <div className="w-full flex lg:flex-row flex-col gap-5">
      <div className="lg:w-[70%]">
        <Card
          article={
            article as IArticle & {
              attachments: IAttachment[];
            }
          }
        />
      </div>
      <div className="lg:w-[30%]">
        <h2 className="text-center mb-3 bg-card rounded-sm font-semibold text-2xl tracking-wide p-4">
          Related Articles
        </h2>
        <div className="space-y-5">
          {relatedArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
