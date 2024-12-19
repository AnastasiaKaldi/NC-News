import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Articles from "./Articles";

function Homepage() {
  return (
    <header className="bg-red-300 p-60 max-w-7xl mx-auto text-center rounded-lg">
      <h1
        className="Homepage text-7xl font-bold mb-2 text-red-600"
        style={{ fontFamily: "Tinos" }}
      >
        Welcome to NC News
      </h1>
      <p
        className="font-semibold text-red-600 text-2xl"
        style={{ fontFamily: "Tinos" }}
      >
        Here are some articles you might be interested in
      </p>
      <Articles />
    </header>
  );
}

export default Homepage;
