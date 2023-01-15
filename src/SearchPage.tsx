/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Page } from './Page'
import { searchQuestion } from './QuestionData'
import { QuestionList } from './QuestionList'
import { searchedQuestions, searchingQuestions, useAppSelector } from './Store'

const SearchPage = () => {
  const dispatch = useDispatch()
  const questions = useAppSelector((state) => state.questions.searched)
  const [searchParams] = useSearchParams()

  const search = searchParams.get('criteria') || ''

  useEffect(() => {
    const doSearch = async (criteria: string) => {
      dispatch(searchingQuestions())
      const foundResults = await searchQuestion(criteria)
      dispatch(searchedQuestions(foundResults))
    }
    doSearch(search)
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
