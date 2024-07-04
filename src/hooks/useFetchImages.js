import { useState, useEffect } from "react";

const useFetchImages = (page, query, clientID, mainUrl, searchUrl) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newImages, setNewImages] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
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
      } catch (error) {
        setError(`Failed to fetch images: ${error.message}`);
        setNewImages(false);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, query, clientID, mainUrl, searchUrl]);

  return { photos, loading, newImages, error, setNewImages };
};

export default useFetchImages;
