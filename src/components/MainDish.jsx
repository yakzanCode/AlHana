import { useEffect, useState } from "react";
import { fetchMainDish, urlFor } from "../lib/sanityClient";

export default function MainDish() {
  const [mainDish, setMainDish] = useState(null);

  useEffect(() => {
    fetchMainDish().then(setMainDish);
  }, []);

  if (!mainDish) return <p className="text-center my-5">Loading main dish...</p>;

  return (
    <section className="container my-5">
      <h1 className="text-center mb-4">Our Main Dish</h1>

      {/* Bootstrap Carousel */}
      {mainDish.images?.length > 0 && (
        <div id="mainDishCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner rounded shadow">
            {mainDish.images.map((img, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
              >
                <img
                  src={urlFor(img.asset).width(900).url()}
                  className="d-block w-100"
                  alt={mainDish.name}
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#mainDishCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#mainDishCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}

      {/* Dish Info */}
      <div className="mt-4 text-center">
        <h2>{mainDish.name}</h2>
        <p className="lead">{mainDish.description}</p>
        <h4 className="text-primary">{mainDish.price} €</h4>
      </div>
    </section>
  );
}
