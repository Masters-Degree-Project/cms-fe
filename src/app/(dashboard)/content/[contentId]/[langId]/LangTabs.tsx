'use client'

import React from 'react'

import { Chip, Tooltip } from '@mui/material'

import { ChipStatus } from '@/app/(dashboard)/contents/page'
import Link from '@/components/Link'
import type { ContentType } from './page'

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
