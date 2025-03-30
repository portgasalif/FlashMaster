/**
 * Card Component
 *
 * Displays an individual flashcard with front and back content.
 * Cards can be flipped by clicking on them to reveal the answer.
 * This component retrieves card data from Redux store using the card ID.
 */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCardById } from "./cardsSlice";

/**
 * Card component for displaying interactive flashcards
 * @param {Object} props - Component props
 * @param {string} props.id - The unique ID of the card to display
 */

export default function Card({ id }) {
  // Retrieve specific card data from Redux store using ID
  const card = useSelector(selectCardById(id));

  // Track whether card is flipped to show front or back
  const [flipped, setFlipped] = useState(false);

  return (
    <li>
      {/* Interactive card that toggles between front/back when clicked */}
      <button className="card" onClick={(e) => setFlipped(!flipped)}>
        {/* Display either front text or back text based on flipped state */}
        {flipped ? card.back : card.front}
      </button>
    </li>
  );
}
