import { useDeno } from 'aleph/react'
import React from 'react'
import Navigation from '../components/navigation.tsx'

export default function Home() {
  const version = useDeno(() => Deno.version.deno)

  return (
    <div className="page">
      <head>
        <title>Hello World - Aleph.js</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <Navigation></Navigation>
      <p className="copyinfo">Built by Aleph.js in Deno {version}</p>
    </div>
  )
}
