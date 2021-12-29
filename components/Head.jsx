import React from 'react'
import {default as NextHead} from 'next/head'

/**
 * Head rfc containing meta tags.
 */
export default function Head({pageTitle}) {
    return (
        <NextHead>
            <title>{pageTitle?`${pageTitle} | `:''}SongNebula</title>
            <meta property="og:title" content={pageTitle} key="ogtitle" />
            <meta
            property="og:description"
            content="Visual music exploration tool"
            key="ogdescription"
          />
        </NextHead>
    )
}
