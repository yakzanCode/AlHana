import { useEffect, useState } from "react";
import { fetchDishes, urlFor } from "../lib/sanityClient";

export default function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDishes()
      .then((data) => setDishes(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center my-5">Loading dishes...</p>;
  if (!dishes.length) return <p className="text-center my-5">No dishes found.</p>;

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Other Dishes</h2>
      <div className="row g-4">
        {dishes.map((dish) => (
          <div key={dish._id} className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              
              {/* Dish Carousel */}
              {dish.images?.length > 0 && (
                <div id={`dishCarousel-${dish._id}`} className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {dish.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`carousel-item ${idx === 0 ? "active" : ""}`}
                      >
                        <img
                          src={urlFor(img.asset).width(500).url()}
                          className="d-block w-100"
                          alt={dish.name}
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                  {dish.images.length > 1 && (
                    <>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#dishCarousel-${dish._id}`}
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#dishCarousel-${dish._id}`}
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Dish Details */}
              <div className="card-body text-center">
                <h5 className="card-title">{dish.name}</h5>
                <p className="card-text">{dish.description}</p>
                <h6 className="text-primary">{dish.price} €</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
