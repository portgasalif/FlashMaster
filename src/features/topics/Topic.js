/**
 * Topic Component
 *
 * Displays a single topic and its associated quizzes.
 * This component fetches topic and quiz data from Redux store
 * and renders details based on the topicId URL parameter.
 */
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams, Navigate } from "react-router-dom";
import ROUTES from "../../app/routes";
import { selectTopics } from "./topicsSlice";
import { selectQuizzes } from "../quizzes/quizzesSlice";

export default function Topic() {
  // Access topics and quizzes data from Redux store
  const topics = useSelector(selectTopics);
  const quizzes = useSelector(selectQuizzes);

  // Extract topicId from URL parameters
  const { topicId } = useParams();

  // Find the topic object that matches the URL parameter
  const topic = topics[topicId];

  // Redirect to topics list if the requested topic doesn't exist
  if (!topic) {
    return <Navigate to={ROUTES.topicsRoute()} replace />;
  }

  // Map quiz IDs stored in the topic to their full quiz objects
  const quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);

  return (
    <section>
      {/* Topic header with icon and name */}
      <img src={topic.icon} alt="" className="topic-icon" />
      <h1>{topic.name}</h1>

      {/* List of quizzes for this topic */}
      <ul className="quizzes-list">
        {quizzesForTopic.map((quiz) => (
          <li className="quiz" key={quiz.id}>
            <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
          </li>
        ))}
      </ul>

      {/* Button to create a new quiz */}
      <Link to="/quizzes/new" className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
