'use client'

// MUI Imports

// import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// import Button from '@mui/material/Button'

// Third-party Imports
// import { useForm, Controller } from 'react-hook-form'
// import { useForm } from 'react-hook-form'

// Components Imports
// import Divider from '@mui/material/Divider'

// Components Imports
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import type { LanguageApiType } from '@/components/input/LangSelect'

// import CustomTextField from '@core/components/mui/TextField'
import { getLanguages } from '@/services/api'

// import { useMessage } from '@/context/MessageContext'
// import { useLoading } from '@/context/LoadingContext'

type Props = {}

export type FormType = {
  name: string
}

// const formDefaultValues: FormType = {
//   name: ''
// }

function Page({}: Props) {
  // const router = useRouter()
  // const { showMessage } = useMessage()
  // const { setLoading } = useLoading()

  // Hooks
  const [languages, setLanguages] = useState<LanguageApiType[]>([])

  // const { handleSubmit } = useForm<FormType>({
  //   defaultValues: formDefaultValues
  // })

  // const onSubmit = async (data: FormType) => {
  //   console.log('DATA: ', data)
  // }

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
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                gap: 8
              }}
            >
              <Grid item xs={10} sm={6}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: 'Please write a language name' }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Language Name'
                      placeholder=''
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button variant='contained' size='small' type='submit'>
                  Submit
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </form> */}
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
