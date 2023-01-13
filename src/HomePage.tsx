/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Page } from './Page'
import { PageTitle } from './PageTitle'
import { getUnansweredQuestions } from './QuestionData'
import { QuestionList } from './QuestionList'
import {
  AppState,
  GettingUnansweredQuestionsAction,
  GotUnansweredQuestionsAction
} from './Store'
import { PrimaryButton } from './Styles'

export const HomePage = () => {
  const dispatch = useDispatch()
  const questions = useSelector((state: AppState) => state.questions.unanswered)
  const questionsLoading = useSelector(
    (state: AppState) => state.questions.loading
  )

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      dispatch(GettingUnansweredQuestionsAction())
      const unansweredQuestions = await getUnansweredQuestions()
      dispatch(GotUnansweredQuestionsAction(unansweredQuestions))
    }
    doGetUnansweredQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()
  const handleAskQuestionClick = () => navigate('ask')

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask a question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div>Loading</div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  )
}
