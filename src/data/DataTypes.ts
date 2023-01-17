export interface QuestionData {
  questionId: number
  title: string
  content: string
  userName: string
  created: string
  answers: AnswerData[]
}

export interface PostQuestionData {
  title: string
  content: string
  userName: string
  created: string
}

export interface AnswerData {
  answerId: number
  content: string
  userName: string
  created: string
}

export interface PostAnswerData {
  questionId: number
  content: string
  userName: string
  created: string
}
