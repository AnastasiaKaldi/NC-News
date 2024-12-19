import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import Articles from "./Articles";
import ArticleDetails from "./ArticleDetails";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <section className="App h-screen">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />{" "}
            <Route path="/articles" element={<Articles />} />{" "}
            <Route path="/articles/:articleId" element={<ArticleDetails />} />{" "}
          </Routes>
        </main>
        <Footer />
      </section>
    </Router>
  );
}

export default App;
