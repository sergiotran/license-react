import React from 'react'
import Box from '@mui/material/Box'
import CollapsibleNavigation from '../components/collapsible-navigation'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box>
      <CollapsibleNavigation />
      <main>
        {children}
      </main>
    </Box>
  )
}

export default MainLayout