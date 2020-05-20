import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import DestView from "../../Images/laptop-dest-list-view.png";
// import DestMain from "../../Images/laptop-dest-main-view.png";
// import EntriesView from "../../Images/laptop-entries-view.png";
import DestView from "../../Images/TT_DestListPage.png";
import DestMain from "../../Images/TT_DestMainPage.png";
import EntriesView from "../../Images/TT_DestEntries.png";
import "./LandingPage.css";

export default class LandingPage extends Component {
  render() {
    return (
      <main>
        <header className="LP-header">
          <h1>Thoughtful Travels</h1>
          <h2>
            <FontAwesomeIcon icon="compass" className="header-icon" />
            Your Journey, Your Experience
          </h2>
        </header>
        <div className="LP-sections">
          <section className="LP-section">
            <header>
              <h3 className="LP-section-header">
                Make Your Travel Goals Come True
              </h3>
              <p>
                Thoughtful Travels is a place to set your traveling goals, plan
                your trips and document your experiences.{" "}
              </p>
            </header>
            <img
              src={DestView}
              alt="destination list page view"
              className="LP-image"
            />
          </section>
          <section className="LP-section reversed">
            <img
              src={DestMain}
              alt="destination main page view"
              className="LP-image"
            />
            <header>
              <h3 className="LP-section-header">
                Plan Your Next Travel Destination
              </h3>
              <p>
                The first start to making your goals happen is setting them. Set
                your goals and start planning your travels with all the
                bucket-list items your trip can consist of.{" "}
              </p>
            </header>
          </section>
          <section className="LP-section">
            <header>
              <h3 className="LP-section-header">Reflect On Your Experience</h3>
              <p>
                Accomplishing a goal is a great feeling, and gaining a new
                experience through traveling is invaluable. Reflect on the
                travel goals you complete with a journal entry, documenting the
                moments you never want to forget.
              </p>
            </header>
            <img
              src={EntriesView}
              alt="destination entries view"
              className="LP-image"
            />
          </section>
          <section className="LP-signUp" id="LP-SignUp">
            <h3 className="LP-section-header">
              Begin your Thoughtful Travels Now
            </h3>
            <div className="button-container">
              <Link className="LP-link " to="/sign-up">
                Sign-up
              </Link>

              <Link className="LP-link" to="/login">
                Login
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
