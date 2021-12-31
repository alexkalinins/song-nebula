import React from 'react'
import { default as NextHead } from 'next/head'

/**
 * Head rfc containing meta tags.
 */
export default function Head({ pageTitle }) {
    return (
        <NextHead>
            <link rel="icon" href="/favicon.ico" />

            <title>{pageTitle ? `${pageTitle} | ` : ''}SongNebula</title>
            <meta property="og:title" content={pageTitle} key="ogtitle" />
            <meta
                property="og:description"
                content="Visual music exploration tool"
                key="ogdescription"
            />
            <meta property="og:image" content="https://songnebula.com/media/songnebula.png" />
        </NextHead>
    )
}
