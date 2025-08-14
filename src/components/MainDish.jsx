import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMainDish, urlFor } from "../lib/sanityClient";

export default function MainDish() {
  const [mainDish, setMainDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMainDish()
      .then((data) => {
        setMainDish(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading main dish...</p>;
  if (!mainDish) return <p>No main dish found.</p>;

  const firstImage = mainDish.images?.[0]
    ? urlFor(mainDish.images[0]).width(600).url()
    : null;

  return (
    <section className="container text-center my-5">
      <h2 className="mb-4">Main Dish</h2>
      <div className="card mb-4">
        {firstImage && (
          <img
            src={firstImage}
            alt={mainDish.name}
            className="card-img-top"
          />
        )}
        <div className="card-body">
          <h3 className="card-title">{mainDish.name}</h3>
          <p className="card-text">{mainDish.description}</p>
          <p className="fw-bold">{mainDish.price} €</p>
          <Link
            to={mainDish.slug ? `/dish/${mainDish.slug}` : "#"}
            className="btn btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </section>
  );
}
