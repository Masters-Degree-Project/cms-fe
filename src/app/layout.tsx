// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import ContextProviders from '@/context/ContextProvider'
import Loading from '@/components/loading/Loading'

export const metadata = {
  title: 'Cms',
  description: 'CMS panel for ai based content generation application'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <ContextProviders>
          {children}
          <Loading />
        </ContextProviders>
      </body>
    </html>
  )
}

export default RootLayout
