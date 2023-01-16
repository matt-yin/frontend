/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUnansweredQuestions } from '../data/DataUtils'
import { useAppSelector } from '../redux/Hooks'
import {
  gettingUnansweredQuestions,
  gotUnansweredQuestions
} from '../redux/QuestionsSlice'
import { PrimaryButton } from '../styles/StyledComponents'
import { Page } from './Page'
import { PageTitle } from './PageTitle'
import { QuestionList } from './QuestionList'

export const HomePage = () => {
  const dispatch = useDispatch()
  const questions = useAppSelector((state) => state.questions.unanswered)
  const questionsLoading = useAppSelector((state) => state.questions.loading)

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      dispatch(gettingUnansweredQuestions())
      const unansweredQuestions = await getUnansweredQuestions()
      dispatch(gotUnansweredQuestions(unansweredQuestions))
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
