import { useState } from "react";
import Card from "./components/Card/Card";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const baseUrl = "https://www.googleapis.com/books/v1/volumes";
    const apiKey = process.env.REACT_APP_API_KEY;
    setLoading("Loading...");
    setBooks(null);
    setError(null);
    try {
      if (!query || !/^[-\w\s]+$/.test(query)) {
        console.log(query);
        throw new Error(
          "Please enter a valid search query that consists of at least one alphanumeric character."
        );
      }
      const response = await fetch(
        `${baseUrl}?q=${query}&printType=books&langRestrict=en&key=${apiKey}`
      );
      const booksData = await response.json();
      if (booksData.totalItems === 0) {
        throw new Error(
          "No book could be found based on your query. Please try again."
        );
      }
      setLoading(false);
      setBooks(booksData.items);
    } catch (exception) {
      setLoading(false);
      setError(exception.message);
    }
  };

  return (
    <div className="container">
      <h1>Book Finder</h1>
      <form onSubmit={handleSearch}>
        <label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <section className="card-container">
        {loading && <p>{loading}</p>}
        {books &&
          books.map((book) => (
            <Card
              key={book.id}
              title={book.volumeInfo.title}
              author={book.volumeInfo.authors}
              publisher={book.volumeInfo.publisher}
              imageLink={book.volumeInfo.imageLinks.thumbnail}
              infoLink={book.volumeInfo.infoLink}
            />
          ))}
        {error && <p>{error}</p>}
      </section>
    </div>
  );
};

export default App;
