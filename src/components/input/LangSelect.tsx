'use client'

import React, { useEffect } from 'react'

import MenuItem from '@mui/material/MenuItem'

import { Chip } from '@mui/material'

import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import CustomTextField from '@core/components/mui/TextField'

type LanguageApiType = {
  id: number
  name: string
}

type Props = {
  control: Control<any, any>
}

function LangSelect({ control }: Props) {
  const [languages, setLanguages] = React.useState<LanguageApiType[]>([])

  useEffect(() => {
    // Fetch languages from API
    const fetchLangs = async () => {
      setLanguages([
        { id: 1, name: 'Turkish' },
        { id: 2, name: 'English' },
        { id: 3, name: 'Spanish' },
        { id: 4, name: 'German' }
      ])
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
          SelectProps={{
            multiple: true,
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
