// src/components/FeedbackCard.jsx
import React from "react";
import { urlFor } from "../lib/sanityClient";

export default function FeedbackCard({ feedback }) {
  if (!feedback) return null;

  return (
    <div className="card shadow-sm h-100 text-center">
      <div className="card-body">
        {feedback.user?.photo && (
          <img
            src={urlFor(feedback.user.photo).width(80).height(80).url()}
            alt={feedback.user.name}
            className="rounded-circle mb-3"
          />
        )}
        <p className="fst-italic">"{feedback.message}"</p>
        <h6 className="fw-bold mt-3">- {feedback.user?.name}</h6>
        {feedback.dish?.name && (
          <small className="text-muted">Dish: {feedback.dish.name}</small>
        )}
      </div>
    </div>
  );
}
