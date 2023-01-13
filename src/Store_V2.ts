import { createSlice } from '@reduxjs/toolkit'

interface QuestionState {
  loading: false;
  unanswered: [];
  viewing: null;
  searched: []
}

const initialState:QuestionState

const questionsSlice = createSlice({
  name: "questions",
  initialState: 
})
