/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/Hooks'
import { getUnanswered } from '../redux/QuestionsSlice'
import { PrimaryButton } from '../styles/StyledComponents'
import { Page } from './Page'
import { PageTitle } from './PageTitle'
import { QuestionList } from './QuestionList'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const questions = useAppSelector((state) => state.questions.unanswered)
  const questionsLoading = useAppSelector((state) => state.questions.loading)
  useEffect(() => {
    dispatch(getUnanswered())
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
