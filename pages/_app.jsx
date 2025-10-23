// pages/_app.tsx
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import '../styles/globals.css' // if you have global styles

const GA_ID = G-F0S6W6SDR5 // G-XXXXXXXXXX

function sendPageView(url: string) {
  // @ts-ignore
  window.gtag?.('event', 'page_view', { page_path: url })
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => sendPageView(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
      {/* Load GA script */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      )}

      <Component {...pageProps} />
    </>
  )
}
