// src/components/FeedbackCard.jsx
import { urlFor } from "../lib/sanityClient";

export default function FeedbackCard({ feedback }) {
  if (!feedback) return null;

  return (
    <div className="card bg-light shadow-sm h-100 text-center border-0 ms-3">
      <div className="card-body">
        {feedback.user?.avatar && (
          <img
            src={urlFor(feedback.user.avatar).width(80).height(80).url()}
            alt={feedback.user.name}
            className="rounded-circle mb-3 mx-auto"
          />
        )}
        <hr />
        {feedback.dish?.name && (
          <small className="text-muted">{feedback.dish.name}</small>
        )}
        <p className="fst-italic">"{feedback.message}"</p>
        <hr />
        <h6 className="fw-bold mt-3">- {feedback.user?.name}</h6>
      </div>
    </div>
  );
}
