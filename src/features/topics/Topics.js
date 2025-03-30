/**
 * Topics Component
 *
 * Displays a list of all available topics with their icons and related quiz counts.
 * Provides navigation to individual topic pages and option to create new topics.
 */
import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector } from "react-redux";
import { selectTopics } from "./topicsSlice";

export default function Topics() {
  // Retrieve all topics from Redux store
  const topics = useSelector(selectTopics);

  return (
    <section className="center">
      {/* Section title */}
      <h1>Topics</h1>

      {/* List of all available topics */}
      <ul className="topics-list">
        {Object.values(topics).map((topic) => (
          <li className="topic" key={topic.id}>
            <Link to={ROUTES.topicRoute(topic.id)} className="topic-link">
              <div className="topic-container">
                {/* Topic icon */}
                <img src={topic.icon} alt="" />

                {/* Topic details */}
                <div className="text-content">
                  <h2>{topic.name}</h2>
                  <p>{topic.quizIds.length} Quizzes</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Button to create a new topic */}
      <Link
        to={ROUTES.newTopicRoute()}
        className="button create-new-topic-button"
      >
        Create New Topic
      </Link>
    </section>
  );
}
