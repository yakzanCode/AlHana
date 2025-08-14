// src/pages/Dish.jsx
import { useEffect, useState } from "react";
import { fetchDishBySlug, urlFor } from "../lib/sanityClient";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dish() {
  const { slug } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    fetchDishBySlug(slug).then(setDish);
  }, [slug]);

  if (!dish) return <p>Loading dish...</p>;

  return (
    <section className="container my-5">
      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p className="fw-bold">{dish.price} €</p>

      {dish.images?.length > 0 && (
        <div id="dishCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {dish.images.map((img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={urlFor(img.asset).width(800).url()}
                  className="d-block w-100"
                  alt={`${dish.name} ${index + 1}`}
                  style={{ objectFit: "cover", height: "400px" }}
                />
              </div>
            ))}
          </div>

          {dish.images.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#dishCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#dishCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
