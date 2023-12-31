import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Navbar, Sidebar } from '../ui';
import { Box } from '@mui/material';

interface Props {
    children: ReactNode,
    title?: string
}

export const Layout: FC<Props> = ({ title = 'OpenJira', children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
        <Head>
            <title>{ title }</title>
        </Head>
         <Navbar />
        <Sidebar />
        <Box sx={{ padding: '10px 20px' }}>
            {children}
        </Box>
    </Box>
  )
}