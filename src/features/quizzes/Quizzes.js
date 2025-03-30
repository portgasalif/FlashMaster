/**
 * Quizzes Component
 *
 * Displays a listing of all available quizzes and provides
 * navigation to individual quiz pages as well as the option
 * to create new quizzes.
 */
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { selectQuizzes } from "./quizzesSlice";

export default function Quizzes() {
  // Retrieve all quizzes from Redux store
  const quizzes = useSelector(selectQuizzes);

  return (
    <section className="center">
      {/* Section title */}
      <h1>Quizzes</h1>

      {/* List of all available quizzes */}
      <ul className="quizzes-list">
        {Object.values(quizzes).map((quiz) => (
          <Link key={quiz.id} to={ROUTES.quizRoute(quiz.id)}>
            <li className="quiz">{quiz.name}</li>
          </Link>
        ))}
      </ul>

      {/* Button to create a new quiz */}
      <Link to={ROUTES.newQuizRoute()} className="button">
        Create New Quiz
      </Link>
    </section>
  );
}
