// pages/_app.jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

const GA_ID = "G-F0S6W6SDR5"

function sendPageView(url) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', { page_path: url })
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => sendPageView(url)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
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
