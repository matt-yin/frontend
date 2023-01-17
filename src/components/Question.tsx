/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { QuestionData } from '../data/DataTypes'
import { gray2, gray3 } from '../styles/Variables'

interface Props {
  data: QuestionData
  showContent?: boolean
}

export const Question = ({ data, showContent = true }: Props) => (
  <div
    css={css`
      padding: 10px 0;
      font-size: 19px;
    `}
  >
    <Link
      to={`/question/${data.questionId}`}
      css={css`
        text-decoration: none;
        color: ${gray2};
      `}
    >
      {data.title}
    </Link>
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {showContent && (
        <div
          css={css`
            padding-bottom: 10px;
            font-size: 15px;
            color: ${gray2};
          `}
        >
          {data.content.length > 50
            ? `${data.content.substring(0, 50)}...`
            : data.content}
        </div>
      )}
      {`Asked by ${data.userName} on ${new Date(
        data.created
      ).toLocaleDateString()} ${new Date(data.created).toLocaleTimeString()}`}
    </div>
  </div>
)
