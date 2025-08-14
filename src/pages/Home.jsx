import React, { useState, useEffect } from "react";

import Hero from '../components/Hero';
import MainDish from '../components/MainDish';
import Dishes from '../components/Dishes';
import TeamMember from "../components/TeamMember";
import FeedbackCard from "../components/FeedbackCard";

import { fetchTeamMembers, fetchFeedbacks } from "../lib/sanityClient";

export default function Home() {
  const [team, setTeam] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchTeamMembers().then(setTeam);
    fetchFeedbacks().then(setFeedbacks);
  }, []);

  return (
    <>
      <Hero />
      <MainDish />
      <Dishes />

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
