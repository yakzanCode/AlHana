import { Link } from "react-router-dom";
import { urlFor } from "../lib/sanityClient";

export default function DishCard({ dish, center }) {
  const firstImage = dish.images?.[0]
    ? urlFor(dish.images[0]).width(500).url()
    : null;

  return (
    <div className={`col-6 col-md-4 col-lg-3 ${center ? "mx-auto" : ""}`}>
      <div className="card border-0 rounded-0">
        {firstImage && (
          <img src={firstImage} alt={dish.name} style={{aspectRatio: "4/5", objectFit: "cover"}} />
        )}
        <Link
          to={dish.slug ? `/dish/${dish.slug}` : "#"}
          className="btn btn-outline-dark w-100 mt-2 rounded-0"
        >
          View Details
        </Link>
        <h5 className="mt-2 mb-0">{dish.name}</h5>
        {/* <p className="card-text">{dish.description}</p> */}
        <p className="fw-bold">{dish.price} €</p>
      </div>
    </div>
  );
}
