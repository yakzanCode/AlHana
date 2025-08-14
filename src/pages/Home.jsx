import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Hero from '../components/Hero';
import DishCard from '../components/DishCard';
import TeamMember from "../components/TeamMember";
import FeedbackCard from "../components/FeedbackCard";

import { fetchTeamMembers, fetchFeedbacks, fetchDishes, urlFor } from "../lib/sanityClient";

export default function Home() {
  const [team, setTeam] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [mainDish, setMainDish] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchTeamMembers(), fetchFeedbacks(), fetchDishes()])
      .then(([teamData, feedbackData, dishesData]) => {
        setTeam(teamData);
        setFeedbacks(feedbackData);

        const main = dishesData.find(d => d.mainDish) || null;
        const otherDishes = dishesData.filter(d => !d.mainDish && d.isAvailable);
        setMainDish(main);
        setDishes(otherDishes);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center my-5">Loading...</p>;

  return (
    <>
      <Hero />


      {/*********   MAIN DISH   ********/}
      {mainDish && (
        <section className="container-fluid p-4 my-5 text-center">
          <h2 className="mb-4">Main Dish</h2>
          <div className="card col-10 col-md-8 col-lg-6 mx-auto mb-4 rounded-0 border-0">
            {mainDish.images?.[0] && (
              <img src={urlFor(mainDish.images[0]).width(600).url()} alt={mainDish.name}/>
            )}
            <div className="card-body">
              <h3 className="card-title">{mainDish.name}</h3>
              <p className="card-text">{mainDish.description}</p>
              <p className="fw-bold">{mainDish.price} €</p>
              <Link to={mainDish.slug ? `/dish/${mainDish.slug}` : "#"} className="btn btn-danger w-50">
                View Details
              </Link>
            </div>
          </div>
        </section>
      )}

      {/*********   DISHES   ********/}
      <section className="container-fluid p-4 my-5">
        <h2 className="mb-5">Other Dishes</h2>
        <div className="row g-4">
          {dishes.map((dish) => (
            <DishCard key={dish._id} dish={dish} center={dishes.length < 4}/>
          ))}
        </div>
      </section>

      {/*********   ABOUT US   ********/}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">Our Team</h2>
          {team.length > 0 ? (
            <div className="row g-4">
              {team.map((member) => (
                <div key={member._id} className="col-12 col-sm-6 col-lg-4">
                  <TeamMember member={member} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Team members are coming soon!</p>
          )}
        </div>
      </section>

      {/*********   FEEDBACKS   ********/}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">What Our Customers Say</h2>
          {feedbacks.length > 0 ? (
            <div className="row g-4">
              {feedbacks.map((fb) => (
                <div key={fb._id} className="col-12 col-md-6 col-lg-4">
                  <FeedbackCard feedback={fb} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No feedbacks yet. Be the first to leave one!</p>
          )}
        </div>
      </section>
    </>
  );
}
