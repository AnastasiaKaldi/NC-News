import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ArticleCard from "./ArticleCard";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://be-nc-news-l4le.onrender.com/api/articles"
        );
        setArticles(response.data.articles);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to fetch articles. Please try again later.");
      }
    };
    fetchArticles();
  }, []);

  return (
    <section className="mt-10">
      {error && <p className="text-red-600 text-center">{error}</p>}
      {articles.length > 0 ? (
        <div className="grid grid-cols-2 gap-4" style={{ fontFamily: "Tinos" }}>
          {articles.map((article) => (
            <ArticleCard key={article.article_id}>
              <img src={article.article_img_url} alt="Picture of the article" />
              <Link
                to={`/articles/${article.article_id}`}
                className="hover:underline"
              >
                {article.title}
              </Link>
            </ArticleCard>
          ))}
        </div>
      ) : (
        <p className="text-red-600">Loading articles...</p>
      )}
    </section>
  );
}

export default Articles;
