import { useState, useEffect } from "react";

function NavBar() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`NavBar fixed top-0 left-0 right-0 p-4 flex justify-between items-center shadow-md transition-transform duration-500 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <span
        className="font-bold text-red-600"
        style={{ fontFamily: "Playfair Display" }}
      >
        NC-NEWS
      </span>
      <div className="space-x-4">
        <a
          href="#"
          className="text-black font-semibold text-red-600"
          style={{ fontFamily: "Playfair Display" }}
        >
          home
        </a>
        <a
          href="#"
          className="text-black font-semibold text-red-600"
          style={{ fontFamily: "Playfair Display" }}
        >
          articles
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
