/**
 * Topics Slice
 *
 * Manages the state for all topics in the application.
 * Topics are categories that organize quizzes and contain references to related quizzes.
 */
import { createSlice } from "@reduxjs/toolkit";

const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    topics: {}, // Object to store all topics with their IDs as keys
  },
  reducers: {
    /**
     * Creates a new topic and adds it to the state
     * @param {Object} payload - contains id, name, and icon for the new topic
     */
    addTopic: (state, action) => {
      const { id, name, icon } = action.payload;
      // Add new topic to state with empty quizIds array
      state.topics[id] = {
        id,
        name,
        icon,
        quizIds: [], // Array to track associated quizzes
      };
    },

    /**
     * Associates a quiz with a specific topic by adding the quiz ID
     * to the topic's quizIds array
     * @param {Object} payload - contains quiz id and topicId to establish relationship
     */
    addQuizID: (state, action) => {
      const { id, topicId } = action.payload;
      // Find the topic and add the quiz ID to its list
      const topic = state.topics[topicId];
      topic.quizIds.push(id);
    },
  },
});

/**
 * Selector that returns all topics from state
 * @param {Object} state - The Redux state
 * @returns {Object} The topics object containing all topics
 */
export const selectTopics = (state) => state.topics.topics;

// Export action creators for use in components
export const { addTopic, addQuizID } = topicsSlice.actions;

// Export the reducer for store configuration
export default topicsSlice.reducer;
