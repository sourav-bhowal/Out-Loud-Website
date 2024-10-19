interface ArticlePageProps {
  params: {
    articleId: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return <div>
    <h1>Article Page</h1>
    <p>Article ID: {params.articleId}</p>
  </div>;
}
