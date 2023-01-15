import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux'
import { QuestionData } from './QuestionData'

export interface QuestionState {
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

const questionsSlice = createSlice({
  name: 'questions',
  initialState: initialState,
  reducers: {
    gettingUnansweredQuestions: (state) => {
      state.loading = true
      state.unanswered = []
    },
    gotUnansweredQuestions: (state, action: PayloadAction<QuestionData[]>) => {
      state.loading = false
      state.unanswered = action.payload
    },
    gettingQuestion: (state) => {
      state.loading = true
      state.viewing = null
    },
    gotQuestion: (state, action: PayloadAction<QuestionData | null>) => {
      state.loading = false
      state.viewing = action.payload
    },
    searchingQuestions: (state) => {
      state.loading = true
      state.searched = []
    },
    searchedQuestions: (state, action: PayloadAction<QuestionData[]>) => {
      state.loading = false
      state.searched = action.payload
    }
  }
})

export const {
  gettingUnansweredQuestions,
  gotUnansweredQuestions,
  gettingQuestion,
  gotQuestion,
  searchingQuestions,
  searchedQuestions
} = questionsSlice.actions

const questionsReducer = questionsSlice.reducer

export const store = configureStore({
  reducer: {
    questions: questionsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type rootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector
