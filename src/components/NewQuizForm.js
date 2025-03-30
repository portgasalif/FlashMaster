/**
 * NewQuizForm Component
 *
 * Provides a form interface for creating new quizzes. Allows users to:
 * - Name the quiz
 * - Select a topic from available topics
 * - Add, edit, and remove flashcards
 * - Submit the quiz to Redux store
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { selectTopics } from "../features/topics/topicsSlice";
import { addQuiz } from "../features/quizzes/quizzesSlice";
import { addCard } from "../features/cards/cardsSlice";

export default function NewQuizForm() {
  // Form state management
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");

  // Hooks for navigation and Redux interactions
  const navigate = useNavigate();
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();

  /**
   * Handles form submission - creates new quiz and saves to Redux store
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    // Collect card IDs and create new cards
    const cardIds = [];
    cards.forEach((card) => {
      // Generate unique ID for each card
      const cardId = uuidv4();

      // Store ID for later use with quiz
      cardIds.push(cardId);

      // Dispatch action to create card in Redux store
      dispatch(
        addCard({
          id: cardId,
          front: card.front,
          back: card.back,
        })
      );
    });

    // Generate unique ID for the quiz
    const quizId = uuidv4();

    // Dispatch action to add quiz with reference to all created cards
    dispatch(
      addQuiz({
        id: quizId,
        name,
        topicId,
        cardIds, // Array of all card IDs created above
      })
    );

    // Redirect to quizzes list after creation
    navigate(ROUTES.quizzesRoute());
  };

  /**
   * Adds a new blank card to the form
   */
  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  /**
   * Removes a card from the form
   */
  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  /**
   * Updates a card's content (front or back)
   */
  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        {/* Quiz title input */}
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />

        {/* Topic selection dropdown */}
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>

        {/* Cards section - renders all current cards */}
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}

        {/* Form action buttons */}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button type="submit">Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
