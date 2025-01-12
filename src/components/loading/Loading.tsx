'use client'

import React from 'react'

import { CircularProgress } from '@mui/material'

import { useLoading } from '@/context/LoadingContext'

type Props = {}

function Loading({}: Props) {
  const { loading } = useLoading()

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex: loading ? 999999999 : -1000000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: loading ? 1 : 0,
        transition: 'all 0.6s ease-in-out'
      }}
    >
      <CircularProgress />
    </div>
  )
}

export default Loading
