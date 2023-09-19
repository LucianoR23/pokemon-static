import Head from "next/head"
import { FC, ReactNode } from "react"
import { Navbar } from "../"
import { Box } from '@mui/material';


interface LayoutProps {
    children: ReactNode,
    title?: string
}

const origin = ( typeof window === 'undefined' ) ? '' : window.location.origin

export const Layout: FC<LayoutProps> = ({ children, title }) => {


    return (
        <>

            <Head>
                <title>{ title || 'Pokemon App' }</title>
                <meta name="author" content="Luciano Rodriguez" />
                <meta name="description" content={ `Info about ${ title }` } />
                <meta name="keywords" content="pokemon, pokedex, pokemon app" />

                <meta property="og:title" content={ `Info about ${ title }` } />
                <meta property="og:description" content={ `This is a page about ${ title }` } />
                <meta property="og:image" content={ `${ origin }/img/banner.png` } />
                
            </Head>
            <Navbar />


            <Box component='main' sx={{ padding: 3 }}>
                { children }
            </Box>

        </>
    )
}
