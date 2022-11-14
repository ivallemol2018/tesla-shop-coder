import React, { FC, PropsWithChildren } from 'react'
import { SideMenu } from '../ui';
import { Navbar } from '../ui/Navbar';

interface Props extends PropsWithChildren<{}> {
    title: string;
    pageDescription: string;
    imageFullUrl?: string
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />

                {imageFullUrl && (
                    <meta name="org:image" content={imageFullUrl} />
                )}
            </head>
            <nav>
                <Navbar />
            </nav>

             <SideMenu />       

            <main style={{
                margin: '80px auto',
                maxWidth: '1440 px',
                padding: '0px 30px'
            }}>
                {children}
            </main>

            <footer>
                {/* TODO:  */}
            </footer>
        </>
    )
}
