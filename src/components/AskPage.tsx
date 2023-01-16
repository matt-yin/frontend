import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { postQuestion } from '../data/DataUtils'
import {
  FieldContainer,
  FieldError,
  FieldInput,
  FieldLabel,
  FieldSet,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  SubmissionSuccess
} from '../styles/StyledComponents'
import { Page } from './Page'

type FormData = {
  title: string
  content: string
}

const AskPage = () => {
  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false)

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<FormData>({ mode: 'onBlur' })

  const submitForm = async (data: FormData) => {
    const result = await postQuestion({
      title: data.title,
      content: data.content,
      userName: 'Fred',
      created: new Date()
    })
    setSuccessfullySubmitted(result ? true : false)
  }

  return (
    <Page title="Ask a quesiton">
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldSet disabled={isSubmitting || successfullySubmitted}>
          <FieldContainer>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <FieldInput
              id="title"
              type="text"
              {...register('title', {
                required: true,
                minLength: 10
              })}
            />
            {errors.title && errors.title.type === 'required' && (
              <FieldError>You must enter the question title</FieldError>
            )}
            {errors.title && errors.title.type === 'minLength' && (
              <FieldError>The title msut be at least 10 characters</FieldError>
            )}
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <FieldTextArea
              id="content"
              {...register('content', {
                required: true,
                minLength: 50
              })}
            />
            {errors.content && errors.content.type === 'required' && (
              <FieldError>You must enter the question content</FieldError>
            )}
            {errors.content && errors.content.type === 'minLength' && (
              <FieldError>
                The content msut be at least 50 characters
              </FieldError>
            )}
          </FieldContainer>
          <FormButtonContainer>
            <PrimaryButton type="submit">Submit Your Question</PrimaryButton>
          </FormButtonContainer>
          {successfullySubmitted && (
            <SubmissionSuccess>
              Your question was successfully submitted
            </SubmissionSuccess>
          )}
        </FieldSet>
      </form>
    </Page>
  )
}

export default AskPage
