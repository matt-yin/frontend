/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { AnswerData } from './AnswerData'
import { gray3 } from './Styles'

interface Props {
  data: AnswerData
}

const Answer = ({ data }: Props) => (
  <div
    css={css`
      padding: 10px 0;
    `}
  >
    <div
      css={css`
        padding: 10px 0;
        font-size: 13px;
      `}
    >
      {data.content}
    </div>
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Answered by ${
        data.userName
      } on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
    </div>
  </div>
)

export default Answer
