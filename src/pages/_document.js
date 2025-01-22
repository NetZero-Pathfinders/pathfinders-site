import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  // To fix the grid here on mobile use `overflowX: "hidden"`
  // but this will break the scroll story
  return (
    <Html lang="en-US" style={{ width: "100%" }}>
      <Head>
        <link href="/fonts.css" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
