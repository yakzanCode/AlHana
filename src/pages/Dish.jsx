// src/pages/Dish.jsx
import { useEffect, useState } from "react";
import { fetchDishBySlug, fetchFeedbacksByDishSlug, urlFor } from "../lib/sanityClient";
import { useParams } from "react-router-dom";
import FeedbackCard from "../components/FeedbackCard";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dish() {
  const { slug } = useParams();
  const [dish, setDish] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch the specific dish by slug
    fetchDishBySlug(slug).then(setDish);

    // Fetch feedbacks only for this dish
    fetchFeedbacksByDishSlug(slug).then(setFeedbacks);
  }, [slug]);

  if (!dish) return <p>Loading dish...</p>;

  return (
    <section className="container my-5">
      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p className="fw-bold">{dish.price} €</p>

      {dish.images?.length > 0 && (
        <div id="dishCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
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

      {/* Dish Feedbacks */}
      {feedbacks.length > 0 && (
        <section className="my-5">
          <h3 className="mb-4">Customer Reviews</h3>
          <div className="row g-4">
            {feedbacks.map((fb) => (
              <div key={fb._id} className="col-12 col-md-6 col-lg-4">
                <FeedbackCard feedback={fb} />
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
