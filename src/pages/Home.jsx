import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import DishCard from '../components/DishCard';
import TeamMember from "../components/TeamMember";
import FeedbackCard from "../components/FeedbackCard";

import { fetchTeamMembers, fetchFeedbacks, fetchDishes, urlFor } from "../lib/sanityClient";
import Carousel from "../components/Carousel";

export default function Home() {
  const location = useLocation();
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

  useEffect(() => {
    if (!loading && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // small delay to ensure browser has painted the element
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [loading, location]);

  if (loading) return <p className="text-center my-5">Loading...</p>;

  return (
    <>
      {/*********   MAIN DISH   ********/}
      <section className="card rounded-0 border-0 text-center">
        <img className="w-100 h-100" src="https://thedailydish.me/wp-content/uploads/2009/10/my-kitchen.jpg" alt="photo of our kitchen" />
        <div className="card-img-overlay top-50 start-50 translate-middle text-white" style={{ textShadow: '0 0 10px rgba(0,0,0,0.7)' }}>
          <h1 className="display-3">Welcome to AlHana</h1>
          <p className="fs-5">Delicious food, made with love and tradition.</p>
          <Link to="/contact">
            <button className="btn btn-danger">
              Order Now
            </button>
          </Link>
        </div>
      </section>

      {/*********   MAIN DISH   ********/}
      {mainDish && (
        <section className="container-fluid p-4 my-5 text-center">
          <h2 className="mb-4">Main Dish</h2>
          <div className="card col-10 col-md-8 col-lg-6 mx-auto mb-4 rounded-0 border-0">
            {mainDish.images?.[0] && (
              <img src={urlFor(mainDish.images[0]).url()} alt={mainDish.name} />
            )}
            <div className="card-body">
              <h3 className="card-title">{mainDish.name}</h3>
              <p className="card-text">{mainDish.description}</p>
              <p className="fw-bold">{mainDish.price} €</p>
              <Link to={mainDish.slug ? `/dish/${mainDish.slug}` : "#"} className="btn btn-outline-danger w-50">
                View Details
              </Link>
            </div>
          </div>
        </section>
      )}

      {/*********   DISHES   ********/}
      <section className="container-fluid p-4 my-5" id="dishes">
        <h2 className="mb-5">Other Dishes</h2>
        <div className="row g-4">
          {dishes.map((dish) => (
            <DishCard key={dish._id} dish={dish} center={dishes.length < 4} />
          ))}
        </div>
      </section>

      {/*********   ABOUT US   ********/}
      <section className="py-5 bg-light" id="about">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">Our Team</h2>

          {team.length > 0 ? (
            <Carousel>
              {team.map((member) => (
                <TeamMember key={member._id} member={member} />
              ))}
            </Carousel>
          ) : (
            <p className="text-center">Team members are coming soon!</p>
          )}
        </div>
      </section>


      {/*********   FEEDBACKS   ********/}
      <section className="py-5">
        <div className="container-fluid">
          <h2 className="text-center mb-4">What Our Customers Say</h2>

          {feedbacks.length > 0 ? (
            <Carousel>
              {feedbacks.map((fb) => (
                <FeedbackCard key={fb._id} feedback={fb} />
              ))}
            </Carousel>
          ) : (
            <p className="text-center">No feedbacks yet. Be the first to leave one!</p>
          )}
        </div>
      </section>
    </>
  );
}
