import { combineReducers, createStore, Store } from 'redux'
import { QuestionData } from './QuestionData'

interface QuestionState {
  readonly loading: boolean
  readonly unanswered: QuestionData[]
  readonly viewing: QuestionData | null
  readonly searched: QuestionData[]
}

export interface AppState {
  readonly questions: QuestionState
}

const initialQuestionState: QuestionState = {
  loading: false,
  unanswered: [],
  viewing: null,
  searched: []
}

export const GETTING_UNANSWERED_QUESTIONS = 'GettingUnansweredQuestions'
export const GettingUnansweredQuestionsAction = () =>
  ({
    type: GETTING_UNANSWERED_QUESTIONS
  } as const)

export const GOT_UNANSWERED_QUESTIONS = 'GotUnansweredQuestions'
export const GotUnansweredQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: GOT_UNANSWERED_QUESTIONS,
    payload: questions
  } as const)

export const GETTING_QUESTION = 'GettingQuestion'
export const GettingQuestionAction = () =>
  ({
    type: GETTING_QUESTION
  } as const)

export const GOT_QUESTION = 'GotQuestion'
export const GotQuestionAction = (question: QuestionData | null) =>
  ({
    type: GOT_QUESTION,
    payload: question
  } as const)

export const SEARCHING_QUESTIONS = 'SearchingQuestions'
export const SearchingQuestionsAction = () =>
  ({
    type: SEARCHING_QUESTIONS
  } as const)

export const SEARCHED_QUESTIONS = 'SearchedQuestions'
export const SearchedQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: SEARCHED_QUESTIONS,
    payload: questions
  } as const)

type QuestionsActions =
  | ReturnType<typeof GettingUnansweredQuestionsAction>
  | ReturnType<typeof GotUnansweredQuestionsAction>
  | ReturnType<typeof GettingQuestionAction>
  | ReturnType<typeof GotQuestionAction>
  | ReturnType<typeof SearchingQuestionsAction>
  | ReturnType<typeof SearchedQuestionsAction>

const questionsReducer = (
  state = initialQuestionState,
  action: QuestionsActions
) => {
  switch (action.type) {
    case GETTING_UNANSWERED_QUESTIONS: {
      return {
        ...state,
        loading: true,
        unanswered: []
      }
    }
    case GOT_UNANSWERED_QUESTIONS: {
      return {
        ...state,
        loading: false,
        unanswered: action.payload
      }
    }
    case GETTING_QUESTION: {
      return {
        ...state,
        loading: true,
        viewing: null
      }
    }
    case GOT_QUESTION: {
      return {
        ...state,
        loading: false,
        viewing: action.payload
      }
    }
    case SEARCHING_QUESTIONS: {
      return {
        ...state,
        loading: true,
        searched: []
      }
    }
    case SEARCHED_QUESTIONS: {
      return {
        ...state,
        loading: false,
        searched: action.payload
      }
    }
    default:
      return state
  }
}

const rootReducer = combineReducers<AppState>({
  questions: questionsReducer
})

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, { questions: initialQuestionState })
  return store
}
