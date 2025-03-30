/**
 * Redux Store Configuration
 *
 * Configures the central Redux store with all reducers for the application.
 * Each reducer manages a specific slice of the application state.
 */
import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from "../features/topics/topicsSlice";
import quizzesReducer from "../features/quizzes/quizzesSlice";
import cardsReducer from "../features/cards/cardsSlice";

export default configureStore({
  reducer: {
    // Topics state - manages all topic objects and their relationships with quizzes
    topics: topicsReducer,

    // Quizzes state - manages all quiz objects and their relationships with topics and cards
    quizzes: quizzesReducer,

    // Cards state - manages all flashcard objects used within quizzes
    cards: cardsReducer,
  },
});
