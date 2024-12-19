import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ArticleDetails() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [articleError, setArticleError] = useState(null);
  const [commentsError, setCommentsError] = useState(null);
  const [loadingComments, setLoadingComments] = useState(true);

  // Fetch Article and Comments
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(
          `https://be-nc-news-l4le.onrender.com/api/articles/${articleId}`
        );
        setArticle(data.article);
        setArticleError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setArticleError(
            err.response?.data?.message || "Failed to fetch article details."
          );
        } else {
          setArticleError("An unexpected error occurred.");
        }
      }
    };

    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          `https://be-nc-news-l4le.onrender.com/api/${articleId}/comments`
        );
        setComments(data.comments);
        setCommentsError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setCommentsError(
            err.response?.status === 404
              ? "No comments found for this article."
              : err.response?.data?.message || "Failed to fetch comments."
          );
        } else {
          setCommentsError("An unexpected error occurred.");
        }
      } finally {
        setLoadingComments(false);
      }
    };

    fetchArticle();
    fetchComments();
  }, [articleId]);

  // Handle Adding a New Comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const { data } = await axios.post(
        `https://be-nc-news-l4le.onrender.com/api/articles/${articleId}/comments`,
        { body: newComment, author: "guest_user" }
      );
      setComments((prev) => [data.comment, ...prev]);
      setNewComment("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setCommentsError(
          err.response?.data?.message ||
            "Failed to add comment. Please try again."
        );
      } else {
        setCommentsError("An unexpected error occurred.");
      }
    }
  };

  // Handle Deleting a Comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `https://be-nc-news-l4le.onrender.com/api/comments/${commentId}`
      );
      setComments((prev) =>
        prev.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setCommentsError(
          err.response?.data?.message ||
            "Failed to delete comment. Please try again."
        );
      } else {
        setCommentsError("An unexpected error occurred.");
      }
    }
  };

  // Handle Voting on the Article
  const handleArticleVote = async (increment) => {
    try {
      const { data } = await axios.patch(
        `https://be-nc-news-l4le.onrender.com/api/articles/${articleId}`,
        { inc_votes: increment }
      );
      setArticle((prev) => ({ ...prev, votes: data.article.votes }));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setArticleError(
          err.response?.data?.message ||
            "Failed to update article votes. Please try again."
        );
      } else {
        setArticleError("An unexpected error occurred.");
      }
    }
  };

  // Render Comments
  const renderComments = () => {
    if (loadingComments) {
      return <p className="text-gray-500">Loading comments...</p>;
    }

    if (commentsError) {
      return <p className="text-red-600 text-center">{commentsError}</p>;
    }

    if (comments.length > 0) {
      return comments.map((comment) => (
        <div key={comment.comment_id} className="border-b py-2 mb-4">
          <p className="text-gray-700">{comment.body}</p>
          <p className="text-gray-500 text-sm">
            By: {comment.author} | Votes: {comment.votes} |{" "}
            {new Date(comment.created_at).toLocaleDateString()}
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded mt-2"
            onClick={() => handleDeleteComment(comment.comment_id)}
          >
            Delete Comment
          </button>
        </div>
      ));
    }

    return (
      <p className="text-gray-500">No comments yet. Be the first to comment!</p>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Article Section */}
      {articleError ? (
        <p className="text-red-600 text-center">{articleError}</p>
      ) : article ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-red-600">
            {article.title}
          </h1>
          <p className="text-gray-700 mb-2">Author: {article.author}</p>
          <p className="text-gray-700 mb-2">Votes: {article.votes}</p>
          <p className="text-gray-700">{article.body}</p>
          <div className="mt-4 flex space-x-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => handleArticleVote(1)}
            >
              Upvote
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => handleArticleVote(-1)}
            >
              Downvote
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-red-600">Loading article...</p>
      )}

      {/* Comments Section */}
      <section className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Comments</h2>
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2"
            onClick={handleAddComment}
          >
            Submit Comment
          </button>
        </div>
        {renderComments()}
      </section>
    </div>
  );
}

export default ArticleDetails;
