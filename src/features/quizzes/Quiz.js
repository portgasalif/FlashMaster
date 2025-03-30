/**
 * Quiz Component
 *
 * Displays an individual quiz with its flashcards.
 * Retrieves quiz data from Redux store based on URL parameter
 * and renders each associated card as an interactive flashcard.
 */
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams, Navigate } from "react-router-dom";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";
import { selectQuizzes } from "./quizzesSlice";

export default function Quiz() {
  // Get all quizzes from Redux store
  const quizzes = useSelector(selectQuizzes);

  // Extract quizId from URL parameters
  const { quizId } = useParams();

  // Find the specific quiz that matches the URL parameter
  const quiz = quizzes[quizId];

  // Redirect to quizzes list if the requested quiz doesn't exist
  if (!quiz) {
    return <Navigate to={ROUTES.quizzesRoute()} replace />;
  }

  return (
    <section>
      {/* Quiz title */}
      <h1>{quiz.name}</h1>

      {/* List of flashcards associated with this quiz */}
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>

      {/* Button to create a new quiz */}
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
