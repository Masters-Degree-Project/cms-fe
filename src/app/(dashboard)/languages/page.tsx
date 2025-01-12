'use client'

// MUI Imports

// import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

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

import type { LanguageApiType } from '@/components/input/LangSelect'

import { getLanguages } from '@/services/api'

type Props = {}

function Page({}: Props) {
  // Hooks
  const [languages, setLanguages] = useState<LanguageApiType[]>([])

  useEffect(() => {
    // Fetch languages from API
    const fetchLangs = async () => {
      const response = await getLanguages()

      setLanguages(response)
    }

    fetchLangs()
  }, [])

  return (
    <Card>
      <CardHeader title='Languages' />
      <CardContent>
        <Grid xs={12} container spacing={6}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='table' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {languages.map((row: LanguageApiType) => {
                    return (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component='th' scope='row'>
                          {row.id}
                        </TableCell>
                        <TableCell component='th' scope='row'>
                          {row.name}
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
