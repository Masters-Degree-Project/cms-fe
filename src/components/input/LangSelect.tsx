'use client'

import React, { useEffect } from 'react'

import MenuItem from '@mui/material/MenuItem'

import { Chip } from '@mui/material'

import type { Control, FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import CustomTextField from '@core/components/mui/TextField'
import { getLanguages } from '@/services/api'

type FormType = {
  title: string
  description: string
  keywords: string[]
  keywordsInput: string
  languages: number[]
}

export type LanguageApiType = {
  id: number
  name: string
}

type Props = {
  control: Control<FormType, any>
  errors: FieldErrors<FormType>
}

function LangSelect({ control, errors }: Props) {
  const [languages, setLanguages] = React.useState<LanguageApiType[]>([])

  useEffect(() => {
    // Fetch languages from API
    const fetchLangs = async () => {
      const response = await getLanguages()

      console.log('RESPONSE : ', response)
      setLanguages(response)
    }

    fetchLangs()
  }, [])

  return (
    <Controller
      name='languages'
      control={control}
      rules={{ required: 'Please Select atleast 1 language' }}
      render={({ field }) => (
        <CustomTextField
          {...field}
          select
          fullWidth
          label='Languages'
          id='lang-select'
          error={Boolean(errors.languages)}
          helperText={errors.languages?.message}
          SelectProps={{
            multiple: true,
            onChange: event => {
              field.onChange(event.target.value)
            },
            renderValue: (selected: any) => (
              <div className='flex flex-wrap gap-1'>
                {(selected as unknown as number[]).map(lan => {
                  const lang = languages.find(l => l.id === lan)

                  if (!lang) return null

                  return <Chip key={lang.id} label={lang.name} size='small' />
                })}
              </div>
            )
          }}
        >
          {languages.map(lang => (
            <MenuItem key={lang.id} value={lang.id}>
              {lang.name}
            </MenuItem>
          ))}
        </CustomTextField>
      )}
    />
  )
}

export default LangSelect
