import React from 'react'

import Markdown from 'react-markdown'

import type { Metadata } from 'next'

import { Card, CardContent, Divider } from '@mui/material'

import { getContent, getGeneratedContent } from '@/services/api'
import LangTabs from './LangTabs'

type Props = {
  params: { contentId: string; langId: string }
}

type GeneratedContent = {
  slug: string
  title_tag: string
  meta_description: string
  meta_keywords: string
  og_title: string
  og_description: string
  twitter_title: string
  twitter_description: string
  content: string
  version: number
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

export async function generateMetadata({ params: { contentId, langId } }: Props): Promise<Metadata> {
  const baseUrl = process.env.WEB_BASE

  const response: GeneratedContent = await getGeneratedContent(contentId, langId)

  return {
    title: response.title_tag,
    description: response.meta_description,
    alternates: {
      canonical: `${baseUrl}/${contentId}/${langId}`
    },
    robots: {
      follow: true,
      index: true
    },
    twitter: {
      card: 'summary',
      site: '@site',
      title: response.twitter_title,
      description: response.twitter_description
    },
    openGraph: {
      url: `${baseUrl}/${contentId}/${langId}`,
      type: 'website',
      title: response.og_title,
      description: response.og_description
    },
    keywords: response.meta_keywords
  }
}

async function page({ params: { contentId, langId } }: Props) {
  const response: GeneratedContent = await getGeneratedContent(contentId, langId)

  const contentResponse: ContentType = await getContent(contentId)

  return (
    <main>
      <Card>
        <CardContent>
          <div className='py-5'>
            <LangTabs response={contentResponse} contentId={contentId} />
          </div>
          <Divider />
          {response.title_tag ? (
            <>
              <h1>{response.title_tag}</h1>
              <Divider className='my-5' />
              <div>
                <Markdown>{response.content}</Markdown>
              </div>
            </>
          ) : (
            <h1 className='my-5'>Content could not genereted</h1>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

export default page
