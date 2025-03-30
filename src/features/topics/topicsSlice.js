import { createSlice } from "@reduxjs/toolkit";

const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    topics: {},
  },
  reducers: {
    addTopic: (state, action) => {
      const { id, name, icon } = action.payload;
      state.topics[id] = {
        id,
        name,
        icon,
        quizIds: [],
      };
    },
    addQuizID: (state, action) => {
      const { id, topicId } = action.payload;
      const topic = state.topics[topicId];
      topic.quizIds.push(id);
    },
  },
});

export const selectTopics = (state) => state.topics.topics;
export const { addTopic, addQuizID } = topicsSlice.actions;
export default topicsSlice.reducer;
