import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDishes, urlFor } from "../lib/sanityClient";

export default function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDishes()
      .then((data) => {
        // Filter out main dish if that field exists
        const otherDishes = data.filter((dish) => !dish.mainDish);
        setDishes(otherDishes);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dishes...</p>;
  if (!dishes.length) return <p>No dishes found.</p>;

  return (
    <section className="container my-5">
      <h2 className="mb-4">Other Dishes</h2>
      <div className="row g-4">
        {dishes.map((dish) => {
          const firstImage = dish.images?.[0]
            ? urlFor(dish.images[0]).width(500).url()
            : null;

          return (
            <div className="col-6 col-md-4" key={dish._id}>
              <div className="card h-100">
                {firstImage && (
                  <img
                    src={firstImage}
                    alt={dish.name}
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{dish.name}</h5>
                  <p className="card-text">{dish.description}</p>
                  <p className="fw-bold">{dish.price} €</p>
                  <Link
                    to={dish.slug ? `/dish/${dish.slug}` : "#"}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
