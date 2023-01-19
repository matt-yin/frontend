/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/Hooks'
import { getSearched } from '../redux/QuestionsSlice'
import { Page } from './Page'
import { QuestionList } from './QuestionList'

const SearchPage = () => {
  const dispatch = useAppDispatch()
  const questions = useAppSelector((state) => state.questions.searched)
  const [searchParams] = useSearchParams()

  const search = searchParams.get('criteria') || ''

  useEffect(() => {
    dispatch(getSearched(search))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  )
}

export default SearchPage
