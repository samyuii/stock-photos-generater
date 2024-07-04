import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const mounted = useRef(false);
  const [newImages, setNewImages] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    url = query
      ? `${searchUrl}${clientID}${urlPage}${urlQuery}`
      : `${mainUrl}${clientID}${urlPage}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();

      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(error.message);
      setNewImages(false);
      setLoading(false);
    }
  }, [page, query]);

  useEffect(() => {
    fetchImages();
  }, [page, fetchImages]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages || loading) return;
    setPage((oldPage) => oldPage + 1);
  }, [newImages, loading]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
    }
    setPage(1);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode");
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
