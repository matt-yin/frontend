/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import AnswerList from './AnswerList'
import { Page } from './Page'
import { getQuestion, postAnswer } from './QuestionData'
import { gettingQuestion, gotQuestion, useAppSelector } from './Store'
import {
  FieldContainer,
  FieldError,
  FieldLabel,
  FieldSet,
  FieldTextArea,
  FormButtonContainer,
  gray3,
  gray6,
  PrimaryButton,
  SubmissionSuccess
} from './Styles'

type FormData = {
  content: string
}

const QuestionPage = () => {
  const dispatch = useDispatch()
  const question = useAppSelector((state) => state.questions.viewing)
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false)
  const { questionId } = useParams()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<FormData>({ mode: 'onBlur' })

  useEffect(() => {
    const doGetQuestion = async (id: number) => {
      dispatch(gettingQuestion())
      const result = await getQuestion(id)
      dispatch(gotQuestion(result))
    }
    if (questionId) {
      doGetQuestion(Number(questionId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId])

  const submitForm = async (data: FormData) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: data.content,
      userName: 'Fred',
      created: new Date()
    })
    setSuccessfullySubmitted(result ? true : false)
  }

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0 5px;
          `}
        >
          {questionId === null ? '' : question?.title}
        </div>
        <div>
          {question && (
            <>
              <p
                css={css`
                  margin-top: 0;
                  background-color: white;
                `}
              >
                {question.content}
              </p>
              <div
                css={css`
                  font-size: 12px;
                  font-style: italic;
                  color: ${gray3};
                `}
              >
                {`Asked by ${
                  question.userName
                } on ${question.created.toLocaleDateString()} ${question.created.toLocaleTimeString()}`}
              </div>
              <AnswerList data={question.answers} />
              <form
                css={css`
                  margin-top: 20px;
                `}
                onSubmit={handleSubmit(submitForm)}
              >
                <FieldSet disabled={isSubmitting || successfullySubmitted}>
                  <FieldContainer>
                    <FieldLabel htmlFor="content">Your Answer</FieldLabel>
                    <FieldTextArea
                      id="content"
                      {...register('content', {
                        required: true,
                        minLength: 50
                      })}
                    />
                    {errors && errors.content?.type === 'required' && (
                      <FieldError>You must enter the answer</FieldError>
                    )}
                    {errors && errors.content?.type === 'minLength' && (
                      <FieldError>
                        The answer must be at least 50 characters
                      </FieldError>
                    )}
                  </FieldContainer>
                  <FormButtonContainer>
                    <PrimaryButton type="submit">
                      Submit Your Answer
                    </PrimaryButton>
                  </FormButtonContainer>
                  {successfullySubmitted && (
                    <SubmissionSuccess>
                      Your answer was successfully submitted
                    </SubmissionSuccess>
                  )}
                </FieldSet>
              </form>
            </>
          )}
        </div>
      </div>
    </Page>
  )
}

export default QuestionPage
