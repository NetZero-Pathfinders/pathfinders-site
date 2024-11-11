import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en-US" style={{ width: "100%", overflowX: "hidden" }}>
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
