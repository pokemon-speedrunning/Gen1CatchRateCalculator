import React, { FC } from 'react'
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'

export default function App({ Page, pageProps }: { Page: FC, pageProps: Record<string, unknown> }) {
  return (
    <main>
      <head>
        <meta name="description" content="Gen 1 Catch Rate Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <Page {...pageProps} />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </main>
  )
}
