function ArticleCard({ children }) {
  return (
    <div className="bg-red-500 border-opacity-85 p-6 text-center text-white font-bold rounded-md shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-red-600 cursor-pointer">
      {children}
    </div>
  );
}

export default ArticleCard;
