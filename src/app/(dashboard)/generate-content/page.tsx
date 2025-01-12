'use client'

// MUI Imports

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Components Imports
import Divider from '@mui/material/Divider'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'
import KeywordSpan from '@/components/input/KeywordSpan'
import LangSelect from '@/components/input/LangSelect'
import { createContents } from '@/services/api'

import { useMessage } from '@/context/MessageContext'
import { useLoading } from '@/context/LoadingContext'

type Props = {}

type FormType = {
  title: string
  description: string
  keywords: string[]
  keywordsInput: string
  languages: number[]
}

const formDefaultValues: FormType = {
  title: '',
  description: '',
  keywordsInput: '',
  keywords: [],
  languages: []
}

function CustomerDetail({}: Props) {
  const router = useRouter()
  const { showMessage } = useMessage()
  const { setLoading } = useLoading()
  const [keywordList, setKeywordList] = useState<string[]>([])

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormType>({
    defaultValues: formDefaultValues
  })

  const onSubmit = async (data: FormType) => {
    setLoading(true)

    const response = await createContents({
      title: data.title,
      description: data.description,
      keywords: keywordList,
      languages: data.languages
    })

    if (response) {
      reset()
      setKeywordList([])
      showMessage('Content creation is in a queue, it will be created in a few minutes.', { type: 'success' })
      router.push('/contents')
    } else {
      showMessage('Error while creating content', { type: 'error' })
    }

    setLoading(false)
  }

  const handleKeywordDelete = (label: string) => {
    setKeywordList(prev => prev.filter(keyword => keyword !== label))
  }

  const handleKeywordsKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setValue('keywordsInput', '')
      setKeywordList(prev => [...prev, e.target.value])
    }
  }

  return (
    <Card>
      <CardHeader title='Generate Content' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid xs={12} sm={6} container spacing={6}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='title'
                control={control}
                rules={{ required: 'Please write a title' }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Title'
                    placeholder=''
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                rules={{ required: 'Please write description' }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    rows={4}
                    fullWidth
                    multiline
                    placeholder=''
                    label='Description'
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='keywordsInput'
                control={control}
                rules={{ required: keywordList.length > 0 ? false : 'Please add keywords' }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Keywords'
                    onKeyDown={handleKeywordsKeyDown}
                    placeholder='Seperate keywords by enter'
                    error={Boolean(errors.keywordsInput)}
                    helperText={errors.keywordsInput?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <div className='flex flex-wrap gap-1'>
                {keywordList.map((keyword, index) => (
                  <KeywordSpan key={index} label={keyword} handleDelete={handleKeywordDelete} />
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <LangSelect control={control} errors={errors} />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' type='reset' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CustomerDetail
