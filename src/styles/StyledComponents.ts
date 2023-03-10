import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  fontFamily,
  fontSize,
  gray2,
  gray5,
  gray6,
  primary1,
  primary2
} from './Variables'

export const PrimaryButton = styled.button`
  background-color: ${primary2};
  border-color: ${primary2};
  border-radius: 5px;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  :hover {
    background-color: ${primary1};
  }
  :focus {
    outline-color: ${primary2};
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const FieldSet = styled.fieldset`
  margin: 10px auto 0 auto;
  padding: 30px;
  width: 350px;
  background-color: ${gray6};
  border-radius: 4px;
  border: 1px solid ${gray5};
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
`

export const FieldContainer = styled.div`
  margin-bottom: 10px;
`

export const FieldLabel = styled.label`
  font-weight: bold;
`

const baseFieldCSS = css`
  box-sizing: border-box;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  margin-bottom: 5px;
  padding: 8px 10px;
  border: 1px solid ${gray5};
  border-radius: 3px;
  color: ${gray2};
  background-color: white;
  width: 100%;
  :focus {
    outline-color: ${gray5};
  }
  :disabled {
    background-color: ${gray6};
  }
`

export const FieldInput = styled.input`
  ${baseFieldCSS}
`

export const FieldTextArea = styled.textarea`
  ${baseFieldCSS}
  height: 100px;
`

export const FieldError = styled.div`
  font-size: 12px;
  color: red;
`

export const FormButtonContainer = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid ${gray5};
`

export const SubmissionSuccess = styled.div`
  margin-top: 10px;
  color: green;
`

export const SubmissionFailure = styled.div`
  margin-top: 10px;
  color: red;
`
