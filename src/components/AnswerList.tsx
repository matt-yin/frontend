/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { AnswerData } from '../data/DataTypes'
import { gray5 } from '../styles/Variables'
import Answer from './Answer'

interface Props {
  data: AnswerData[]
}

const AnswerList = ({ data }: Props) => (
  <ul
    css={css`
      list-style: none;
      margin: 10px 0 0;
      padding: 0;
    `}
  >
    {data.map((answer) => (
      <li
        css={css`
          border-top: 1px solid ${gray5};
        `}
        key={answer.answerId}
      >
        <Answer data={answer} />
      </li>
    ))}
  </ul>
)

export default AnswerList
