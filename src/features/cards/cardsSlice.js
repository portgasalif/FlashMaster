/**
 * Cards Slice
 *
 * Manages the state for all flashcards in the application.
 * Cards are identified by unique IDs and contain front and back text content.
 * Cards are used within quizzes as study materials.
 */
import { createSlice } from "@reduxjs/toolkit";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: {}, // Object to store all cards with their IDs as keys
  },
  reducers: {
    /**
     * Adds a new flashcard to the state
     * @param {Object} payload - contains id, front text and back text
     */
    addCard: (state, action) => {
      const { id, front, back } = action.payload;
      // Add new card to state using its ID as key
      state.cards[id] = {
        id,
        front,
        back,
      };
    },
  },
});

/**
 * Selector that returns a specific card by ID
 * Uses currying pattern to accept an ID parameter
 * @param {string} id - The ID of the card to select
 * @returns {Function} - Selector function that accepts the Redux state
 */
export const selectCardById = (id) => (state) => state.cards.cards[id];

// Export the action creators
export const { addCard } = cardsSlice.actions;

// Export the reducer
export default cardsSlice.reducer;
