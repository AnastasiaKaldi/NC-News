import { useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import Articles from "./Articles";
import Footer from "./Footer";

function App() {
  return (
    <>
      <section className="App">
        <NavBar />
        <main>
          <Homepage />
          <Articles />
        </main>
        <Footer />
      </section>
    </>
  );
}

export default App;
