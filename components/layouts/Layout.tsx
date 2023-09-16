import Head from "next/head"
import { FC, ReactNode } from "react"
import { Navbar } from "../"
import { Box } from '@mui/material';


interface LayoutProps {
    children: ReactNode,
    title?: string
}

export const Layout: FC<LayoutProps> = ({ children, title }) => {

    return (
        <>

            <Head>
                <title>{ title || 'Pokemon App' }</title>
                <meta name="author" content="Luciano Rodriguez" />
                <meta name="description" content="Informacion sobre el pokemon" />
                <meta name="keywords" content="pokemon, pokedex, pokemon app" />
                
            </Head>
            <Navbar />


            <Box component='main' sx={{ padding: 3 }}>
                { children }
            </Box>

        </>
    )
}
