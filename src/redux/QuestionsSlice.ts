import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { QuestionData } from '../data/DataTypes'
import {
  getQuestion,
  getUnansweredQuestions,
  searchQuestion
} from '../data/DataUtils'

interface QuestionState {
  loading: boolean
  unanswered: QuestionData[]
  viewing: QuestionData | null
  searched: QuestionData[]
}

const initialState: QuestionState = {
  loading: false,
  unanswered: [],
  viewing: null,
  searched: []
}

export const getUnanswered = createAsyncThunk(
  'questions/getUnanswered',
  async () => {
    return await getUnansweredQuestions()
  }
)

export const getById = createAsyncThunk(
  'questions/getById',
  async (id: number) => {
    return await getQuestion(id)
  }
)

export const getSearched = createAsyncThunk(
  'questions/getSearched',
  async (criteria: string) => {
    return await searchQuestion(criteria)
  }
)

const questionsSlice = createSlice({
  name: 'questions',
  initialState: initialState,
  reducers: {},
  extraReducers: (buidler) => {
    buidler.addCase(getUnanswered.pending, (state) => {
      state.loading = true
    })
    buidler.addCase(getUnanswered.fulfilled, (state, { payload }) => {
      state.loading = false
      state.unanswered = payload
    })
    buidler.addCase(getById.pending, (state) => {
      state.loading = true
    })
    buidler.addCase(getById.fulfilled, (state, { payload }) => {
      state.loading = false
      state.viewing = payload
    })
    buidler.addCase(getSearched.pending, (state) => {
      state.loading = true
    })
    buidler.addCase(getSearched.fulfilled, (state, { payload }) => {
      state.loading = false
      state.searched = payload
    })
  }
})

export default questionsSlice.reducer
