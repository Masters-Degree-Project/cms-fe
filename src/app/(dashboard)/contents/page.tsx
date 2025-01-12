'use client'

// MUI Imports

import { useEffect, useState } from 'react'

import Link from 'next/link'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// Components Imports
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import type { ChipPropsColorOverrides } from '@mui/material'
import { Button, Chip, Tooltip } from '@mui/material'

import { getContents } from '@/services/api'
import { useLoading } from '@/context/LoadingContext'

const ChipStatus: {
  [key: string]: ChipPropsColorOverrides
} = {
  Completed: 'success',
  Waiting: 'secondary',
  Processing: 'info',
  Failed: 'error'
}

type Props = {}

type ContentApiType = {
  id: number
  title: string
  description: string
  keywords: string[]
  languages: {
    id: number
    language: string
    iso_code: string
    status: 'Completed' | 'Waiting' | 'Processing' | 'Failed'
  }[]
}

function Page({}: Props) {
  // const router = useRouter()
  // const { showMessage } = useMessage()
  const { setLoading } = useLoading()

  // Hooks
  const [contents, setContents] = useState<ContentApiType[]>([])

  const fetchLangs = async () => {
    setLoading(true)
    const response = await getContents()

    setContents(response)
    setLoading(false)
  }

  useEffect(() => {
    // Fetch contents from API

    fetchLangs()
  }, [])

  return (
    <Card>
      <div className='flex justify-between items-center pr-10'>
        <CardHeader title='Contents' />
        <Button variant='contained' onClick={fetchLangs}>
          <span>Refresh</span>
          <i className='tabler-refresh ml-3' />
        </Button>
      </div>
      <CardContent>
        <Grid xs={12} container spacing={6}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='table' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Languages</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contents.map(row => {
                    return (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component='th' scope='row'>
                          {row.id}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          <Link href={`/content/${row.id}/${row.languages[0].id}`}>{row.title}</Link>
                        </TableCell>
                        <TableCell>
                          {row.languages.map(lan => {
                            return (
                              <Tooltip title={lan.status} key={lan.id}>
                                <Link key={lan.id} href={`/content/${row.id}/${lan.id}`} className='mr-2'>
                                  <Chip
                                    key={lan.id}
                                    variant='outlined'
                                    label={lan.language}
                                    size='small'
                                    color={ChipStatus[lan.status] as any}
                                    className='capitalize'
                                  />
                                </Link>
                              </Tooltip>
                            )
                          })}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Page
