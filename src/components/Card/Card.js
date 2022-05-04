import "./Card.css";

const Card = ({ title, author, publisher, imageLink, infoLink }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={imageLink || "data:,"} alt={title || "Alternative Text"} />
      </div>
      <div className="card-content">
        <div className="card-info">
          <h2>{title}</h2>
          <p>
            By:{" "}
            {author
              ? author.reduce((prev, curr) => [prev, ", ", curr])
              : "No authors found"}
          </p>
          <p>Published By: {publisher || "No publisher found"}</p>
        </div>
        <div className="card-cta">
          <a href={infoLink} className="btn">
            See this book
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
