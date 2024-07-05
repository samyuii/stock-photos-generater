import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import Photo from "./components/Photo";
import useDarkMode from "./hooks/useDarkMode";
import useFetchImages from "./hooks/useFetchImages";
import useDebounce from "./hooks/useDebounce";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const mounted = useRef(false);
  const [darkMode, toggleDarkMode] = useDarkMode();
  const { photos, loading, newImages, error, setNewImages } = useFetchImages(
    page,
    query,
    clientID,
    mainUrl,
    searchUrl
  );
  const debouncedEvent = useDebounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", debouncedEvent);
    return () => window.removeEventListener("scroll", debouncedEvent);
  }, [debouncedEvent]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages || loading) return;
    setPage((oldPage) => oldPage + 1);
  }, [newImages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    setPage(1);
  };

  return (
    <main>
      <header className="header">
        <h1>Image Search App</h1>
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </header>
      <section className="search">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for photos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index) => (
            <Photo key={index} {...image} />
          ))}
        </div>
        {loading && <div className="loading-spinner"></div>}
        {error && <p className="error">{error}</p>}
      </section>
      <footer className="footer">
        <p>Image search app powered by Unsplash API</p>
      </footer>
    </main>
  );
}

export default App;
