'use client'

import React from 'react'

import type { ChipPropsColorOverrides } from '@mui/material'
import { Chip, Tooltip } from '@mui/material'

import Link from '@/components/Link'

const ChipStatus: {
  [key: string]: ChipPropsColorOverrides
} = {
  Completed: 'success',
  Waiting: 'secondary',
  Processing: 'info',
  Failed: 'error'
}

type ContentType = {
  id: number
  title: string
  description: string
  keywords: string[]
  languages: {
    id: number
    language: string
    iso_code: string
    status: string
  }[]
}

type Props = {
  response: ContentType
  contentId: string
}

function LangTabs({ response, contentId }: Props) {
  return (
    <>
      {response.languages.map(lan => {
        return (
          <Tooltip title={lan.status === 'Completed' ? '' : lan.status} key={lan.id}>
            <Link key={lan.id} href={`/content/${contentId}/${lan.id}`} className='mr-2'>
              <Chip
                key={lan.id}
                variant='outlined'
                label={lan.language}
                size='medium'
                color={ChipStatus[lan.status] as any}
                className='capitalize'
              />
            </Link>
          </Tooltip>
        )
      })}
    </>
  )
}

export default LangTabs
