import { configureStore } from '@reduxjs/toolkit'
import questionsReducer from './QuestionsSlice'

const store = configureStore({
  reducer: {
    questions: questionsReducer
  }
})
export default store

export type rootState = ReturnType<typeof store.getState>
