import {
  AnswerData,
  PostAnswerData,
  PostQuestionData,
  QuestionData
} from './DataTypes'
import { questions } from './MockData'

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  await wait(500)
  const results = questions.filter((q) => q.answers.length === 0)
  return JSON.parse(JSON.stringify(results))
}

export const getQuestion = async (
  questionId: number
): Promise<QuestionData | null> => {
  await wait(500)
  const results = questions.filter((q) => q.questionId === questionId)
  return results.length === 0 ? null : JSON.parse(JSON.stringify(results[0]))
}

export const searchQuestion = async (
  criteria: string
): Promise<QuestionData[]> => {
  await wait(500)
  const results = questions.filter(
    (q) =>
      q.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 ||
      q.content.toLocaleLowerCase().indexOf(criteria.toLowerCase()) >= 0
  )
  return results.length === 0 ? [] : JSON.parse(JSON.stringify(results))
}

export const postQuestion = async (
  question: PostQuestionData
): Promise<QuestionData | undefined> => {
  await wait(500)
  const questionId = Math.max(...questions.map((q) => q.questionId)) + 1
  const newQuestion: QuestionData = {
    ...question,
    questionId,
    answers: []
  }
  questions.push(newQuestion)
  return newQuestion
}

export const postAnswer = async (
  answer: PostAnswerData
): Promise<AnswerData | undefined> => {
  await wait(500)

  const { questionId, ...answerWithoutQuestionId } = answer
  const answerInQuestion: AnswerData = {
    answerId: 99,
    ...answerWithoutQuestionId
  }

  const results = questions.filter((q) => q.questionId === answer.questionId)
  if (results.length) {
    results[0].answers.push(answerInQuestion)
  }
  return answerInQuestion
}
